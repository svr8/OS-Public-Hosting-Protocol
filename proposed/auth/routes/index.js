const { Router } = require('express')

const router = new Router()

router.post('/session', async (req, res) => {
  req.app.get('session-creator-list').push({res})
})

router.get('/session/validate', (req, res) => {
  req.app.get('session-validator-list').push({req, res})
})

module.exports = {
  router
}