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

var db = require('./db');

var Module = function (rpcHandler, params, webinosConfig) {
    this.rpcHandler = rpcHandler;
    this.params = params;
    this.webinosConfig = webinosConfig;
};

Module.prototype.init = function (serviceRegister, serviceUnregister) {
    db.init(this.rpcHandler, this.params, this.webinosConfig, serviceRegister, serviceUnregister);
};

module.exports = Module;