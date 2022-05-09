const axios = require('axios')
const { AUTHSERVER_URL } = require('./config')

const validateSession = async (sessionId) => {
  const headers = { 'SERVER-INDEX': 0 }
  const res = await axios.get(`${AUTHSERVER_URL}/session/validate?sessionId=${sessionId}`, {headers})
  return {data: res.data, sessionId: res.headers['sessionid']}
}

module.exports = {
  validateSession
}