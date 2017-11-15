const express = require('express')
const { MongoClient } = require('mongodb')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'public0')))

MongoClient.connect('mongodb://localhost/clocks', (err, db) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  const timezones = db.collection('timezones')

  app.get('/timezones', (req, res) => {
    timezones
      .find({})
      .toArray()
      .then(zones => {
        res.json(zones)
      })
      .catch(err => {
        console.error(err)
        res.sendStatus(500)
      })
  })
  app.listen(3000, () => console.log('Test at http://localhost:3000'))
})
