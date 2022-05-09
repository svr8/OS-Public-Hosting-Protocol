const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { router } = require('./routes')
const { PORT } = require('./config')
const { Cron } = require('./cron')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/', router)

app.set('session-validator-list', [])
app.set('session-creator-list', [])

app.listen(PORT, () => {
  console.log(`Auth Server started at http://localhost:${PORT}`)
  const cron = new Cron(app)
})