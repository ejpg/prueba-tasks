const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";
const dbName = "tasksTestDB";
const collectionName = 'tasks'

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  if (err) throw err;

  const db = client.db(dbName);

  db.createCollection(collectionName).then(() => {
    client.close()
  })
});