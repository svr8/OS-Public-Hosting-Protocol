const { Router } = require('express')
const { PAYLOAD_CHUNK_COUNT } = require('../config')
const { PAYLOAD_LIGHT, PAYLOAD_HEAVY, PAYLOAD_MEDIUM } = require('../payload')

const router = new Router()

const getPayloadByType = (payloadType) => {
  if (payloadType == 'light')
    return PAYLOAD_LIGHT
  else if (payloadType == 'medium')
    return PAYLOAD_MEDIUM
  else
    return PAYLOAD_HEAVY
}

router.get('/data', (req, res) => {
  const {payloadType} = req.query
  const packetIndex = req.header('Packet-Index')
  if (!packetIndex) {
    res.status(400).send('Packet-Index not found')
    return
  }
  
  const payload = getPayloadByType(payloadType)
  const payloadChunkSize = Math.floor(payload.length/PAYLOAD_CHUNK_COUNT)
  const startIdx = payloadChunkSize * packetIndex
  const endIdx = Math.min(startIdx + payloadChunkSize, payload.length)
  const targetPayload = payload.substring(startIdx, endIdx)

  res.status(200).send(targetPayload)
})

module.exports = {
  router
}