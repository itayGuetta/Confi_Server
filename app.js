const express = require('express')
var MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, {useUnifiedTopology: true});
const app = express()
const port = 3000



app.get('/', (req, res) => res.send('Hoad HA naknik'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))



MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});