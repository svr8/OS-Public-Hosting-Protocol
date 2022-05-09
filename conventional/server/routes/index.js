const { Router } = require('express')
const { DATABASE_URL } = require('../config')
const axios = require('axios')
const axiosInstance = axios.create({
  baseURL: DATABASE_URL,
})

const router = new Router()

router.get('/data', async (req, res) => {
  const {payloadType} = req.query
  const axiosRes = await axiosInstance.get(`${DATABASE_URL}/data?payloadType=${payloadType}`)
  res.status(200).send(axiosRes.data)
})

module.exports = {
  router
}