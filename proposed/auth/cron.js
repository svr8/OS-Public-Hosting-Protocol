const { REQUEST_PROCESSOR_CRON_SECONDS } = require("./config");
const { SessionManager } = require("./session-manager");

const sessionManager = new SessionManager()

const validationProcessor = async (req, res) => {
  let { sessionId } = req.query
  const isValid = await sessionManager.validateSession(sessionId)
  let newSessionId = sessionId
  
  if (isValid && req.header('SERVER-INDEX') == 0) {
    newSessionId = sessionManager.addBlockToSession(sessionId)
  }

  if (newSessionId != sessionId) {
    sessionManager.session[newSessionId] = sessionManager.session[sessionId]
    sessionId = newSessionId
  }
  res.set('sessionId', sessionId)
  res.status(200)
  res.send(isValid)
}

class Cron {
  constructor(app) {
    setInterval(async () => {
      const item = app.get('session-validator-list').pop()
      if (!item)
        return
      const { req, res } = item
      validationProcessor(req, res)
    }, REQUEST_PROCESSOR_CRON_SECONDS * 1000)

    setInterval(() => {
      const item = app.get('session-creator-list').pop()
      if (!item) {
        return
      }
      const {res} = item
      
      const sessionId = sessionManager.createNewSession()
      res.status(200).send(sessionId)
    }, REQUEST_PROCESSOR_CRON_SECONDS * 1000)
  }
}

module.exports = {
  Cron
}