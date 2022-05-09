const { Router } = require('express')
const { PAYLOAD_LIGHT, PAYLOAD_MEDIUM, PAYLOAD_HEAVY } = require('../payload')

const router = new Router()

const payload = 'Hello World.'
const getPayloadByType = (payloadType) => {
  if (payloadType == 'light')
    return PAYLOAD_LIGHT
  else if (payloadType == 'medium')
    return PAYLOAD_MEDIUM
  else
    return PAYLOAD_HEAVY
}

router.get('/data', (req, res) => {
  const { payloadType } = req.query
  const payload = getPayloadByType(payloadType)
  res.status(200).send(payload)
})

module.exports = {
  router
}