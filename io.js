/* Reading and writing data:
https://mongodb.github.io/node-mongodb-native/3.5/tutorials/crud/
*/

const MongoClient = require('mongodb').MongoClient;
const mongoURL = require('./url');

var database = 'pokemon';

function writeItem(data) {
    const client = new MongoClient(mongoURL.url, { useNewUrlParser: true });
    client.connect(function(err) {
        // This will create a collection with the collectionName if one doesn't exist. In
        // general, mongo will create a collection if you reference one that
        // doesn't yet exist. Likewise, if you ask for the quantity of a
        // model that doesn't exist, it will just say 0.
        if (err) {
          console.log('Connection error!');
          throw new Error(err);
        }
        const collection = client.db(database).collection('pokedex');
        if (Array.isArray(data)) {
          collection.insertMany(data);
        } else {
          collection.insertOne(data);
          console.log(`IO write finished, using:`);
        }
        client.close();
    })
}

function readItems(callback) {
    const client = new MongoClient(mongoURL.url, { useNewUrlParser: true });
    client.connect(function(err) {
        if (err) {
          console.log('Connection error!');
          throw new Error(err);
        }
        const collection = client.db(database).collection('pokedex');
        return collection.find({}).toArray(callback);
  })
}

function deleteItem(item) {
  const client = new MongoClient(mongoURL.url, { useNewUrlParser: true });
  client.connect(function(err) {
    const collection = client.db(database).collection('pokedex');
    collection.deleteOne(item, function(err, r){
      if (err) {
        throw new Error(err)
      } else {
        var _id = item._id;
        console.log(`IO delete finished, using: ${item.title}`);
      }
    })
  })
}

exports.writeItem = writeItem
exports.readItems = readItems
exports.deleteItem = deleteItem
