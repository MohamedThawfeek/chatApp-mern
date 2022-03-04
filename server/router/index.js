const router = require('express').Router()
const group = require('./group')
const message = require('./message')


router.use('/rooms', group)
router.use('/message', message)



module.exports = router