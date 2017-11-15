const { MongoClient } = require('mongodb')

MongoClient.connect('mongodb://localhost/clocks', (err, db) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  const timezones = db.collection('timezones')
  timezones
    .deleteMany()
    .then(() => {
      timezones.insertMany([
        { zone: 'America/Los_Angeles' },
        { zone: 'America/New_York' },
        { zone: 'America/Mexico_City' },
        { zone: 'Africa/Johannesburg' },
        { zone: 'America/Bogota' },
        { zone: 'Australia/Perth' },
        { zone: 'Europe/Madrid' },
        { zone: 'Asia/Shanghai' },
        { zone: 'Asia/Tokyo' }
      ])
    })
    .catch(err => {
      console.log(err)
      process.exit(1)
    })
    .then(() => console.log('Timezones are seeded!'))
    .then(() => db.close())
})
