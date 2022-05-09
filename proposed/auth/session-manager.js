const { BlockChain } = require('./blockchain')
const { SESSION_KEY_SALT, PAYLOAD_CHUNK_COUNT } = require('./config')

class SessionManager {
  constructor() {
    this.session = {}
  }

  createNewSession() {
    const key = `${SESSION_KEY_SALT}|${Date.now()}`
    const sessionChain = new BlockChain(key)
    const lastBlockHash = sessionChain.getLatestBlock().hash
    this.session[lastBlockHash] = sessionChain
    return lastBlockHash
  }

  addBlockToSession(sessionId) {
    const sessionChain = this.session[sessionId]
    const key = `${SESSION_KEY_SALT}|${Date.now()}`
    sessionChain.addData(key)
  
    // delete this.session[sessionId]
    const lastBlockHash = sessionChain.getLatestBlock().hash
    this.session[lastBlockHash] = sessionChain
    return lastBlockHash
  }

  validateSession(sessionId) {
    const sessionChain = this.session[sessionId]
    
    return new Promise(resolve => {
      if (!sessionChain)
        resolve(false)
      if (!sessionChain.metadata.validationCounter)
        sessionChain.metadata.validationCounter = 0

      sessionChain.metadata.validationCounter++

      const interval = setInterval(() => {
        if (sessionChain.metadata.validationCounter < PAYLOAD_CHUNK_COUNT) {
          return
        }

        if (!sessionChain.checkChainValidity()) {
          resolve(false)
          clearInterval(interval)
        } else {
          resolve(true)
          clearInterval(interval)
        }
      }, 100)
    })

    
  }
}

module.exports = {
  SessionManager
}