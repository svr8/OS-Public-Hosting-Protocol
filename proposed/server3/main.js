const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { router } = require('./routes')
const { PORT } = require('./config')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})