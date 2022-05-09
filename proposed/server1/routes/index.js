const { Router } = require('express')
const { PAYLOAD_CHUNK_INDEX, DATABASE_URL } = require('../config')
const axios = require('axios')
const { validateSession } = require('../util')
const axiosInstance = axios.create({
  baseURL: DATABASE_URL,
  headers: {
    'Packet-Index': PAYLOAD_CHUNK_INDEX,
  }
})

const router = new Router()

router.get('/data', async (req, res) => {
  let sessionId = req.header('SESSION-ID')
  const { payloadType } = req.query
  const validationResponse = await validateSession(sessionId)
  const isSessionValid = validationResponse.data
  sessionId = validationResponse.sessionId
  if (!isSessionValid) {
    res.status(400).send('Invalid session')
    return
  }
  
  const axiosRes = await axiosInstance.get(`${DATABASE_URL}/data?payloadType=${payloadType}`)
  res.set('sessionId', sessionId? sessionId : '')
  res.status(200).send(axiosRes.data)
})

module.exports = {
  router
}