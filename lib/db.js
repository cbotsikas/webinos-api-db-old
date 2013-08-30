/*******************************************************************************
 *  Code contributed to the webinos project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Copyright 2013 EPU-National Technical University of Athens
 * Author: Christos Botsikas, NTUA
 ******************************************************************************/
var webinos = {},
    dbParams,
    initialized = false,
    engine = null,
    path = require('path'),
    Service = require("./service.js");

var init = function (rpcHandler, params, webinosConfig, serviceRegister, serviceUnregister) {
    //TODO: validations
    webinos.rpcHandler = rpcHandler;
    webinos.config = webinosConfig;
    webinos.service = {
        register: serviceRegister,
        unregister: serviceUnregister
    };
    dbParams = params;
    engine = require('./db.engine.js')({engine:'tingodb', path:path.join(__dirname, '../testing/data')});
    //not needed. what about mongodb?
//    engine.db.open(function(err,db) {
//        console.log(err);
//    });
    engine.db.collectionNames({namesOnly:1}, function(err, items) {
        for (var i=0; i<items.length; i++){
            console.log(items[i]);
            webinos.service.register(new Service(webinos.rpcHandler, {name: items[i]}));
            /*
             webinos.discovery.findServices(new ServiceType('http://webinos.org/api/db'),
             {onFound: function (service) {console.log('+++++++++++++++++++',service)}})
             */
        }
    });
    initialized = true;
};
var collections = {};
var collection = function (name) {
    if (!initialized) return null;
    if (!collections[name]) collections[name] = {collection:engine.db.collection(name)};
    var timestamp = (new Date()).getTime();
    collections[name].lastAccessed = timestamp;
    setTimeout(cleanupCollections, 1); //do not block execution for cleanup
    return collections[name].collection;
};

var cleanupCollections = function () {
    var timestamp = (new Date()).getTime();
    for (var collection in collections){
        //if the collection was last used 5 minutes ago, remove it to free memory.
        if (collections[collection].lastAccessed < (timestamp - 5*60*1000)){
            delete collections[collection];
        }
    }
};

module.exports = {
    init: init,
    collection: collection
};