const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const ifndDocuments = function(db, callback) {
  const collection = db.collection('documents');
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log('Found the following records');
    console.log(docs);
    callback(docs);
  })
}

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

/*(async function() {
  let client;

  try {
    client = await MongoClient.connect(url);
    console.log('Connected correctly to server');

    const db = client.db(dbName);

    let r = await  db.collection('inserts').insertOne({a: 1});
    assert.equal(1, r.insertedCount);

    r = await  db.collection('inserts').insertMany([{a: 2}, {a: 3}]);
    assert.equal(2, r.insertedCount);
  } catch(err) {
    console.log(err.stack);
  }

  client.close();
})();*/

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  insertDocuments(db, function() {
    client.close();
  });
});
