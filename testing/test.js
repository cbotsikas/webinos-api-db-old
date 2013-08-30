//var Engine = require('tingodb')()
//    assert = require('assert');

//var db = new Engine.Db('./data', {});
var db = require('../lib/db.js');
db.init();

var collection = db.collection("batch_document_insert_collection_safe1");
var collection = db.collection("batch_document_insert_collection_safe2");
var collection = db.collection("batch_document_insert_collection_safe3");
var collection = db.collection("batch_document_insert_collection_safe4");
var collection = db.collection("batch_document_insert_collection_safe5");
var collection = db.collection("batch_document_insert_collection_safe1");
var collection = db.collection("batch_document_insert_collection_safe6");
var collection = db.collection("batch_document_insert_collection_safe");
var collection = db.collection("batch_document_insert_collection_safe7");
var collection = db.collection("batch_document_insert_collection_safe2");
var collection = db.collection("batch_document_insert_collection_safe3");
var collection = db.collection("batch_document_insert_collection_safe5");
var collection = db.collection("batch_document_insert_collection_safe6");
var collection = db.collection("batch_document_insert_collection_safe");
var collection = db.collection("batch_document_insert_collection_safe3");
var collection = db.collection("batch_document_insert_collection_safe4");
var collection = db.collection("batch_document_insert_collection_safe");
collection.insert([{hello:'world_safe1'}
    , {hello:'world_safe2'},{lala:"234234"},{lala2:db}], {w:1}, function(err, result) {
//    assert.equal(null, err);
    console.log(err);
    console.log(result);

    collection.findOne({hello:'world_safe2'}, function(err, item) {
        console.log(err);
        console.log(item);
//        assert.equal(null, err);
//        assert.equal('world_safe2', item.hello);
    })
});



