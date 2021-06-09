const express = require('express')
const router = express.Router()
const { userById } = require('../controllers/authControllers')
const { create, list, remove, categoryById  } = require('../controllers/categoryControllers')

// M V C -- Model view Controller

router.get('/categories', list)
router.post('/create/:userId', create)


router.delete('/:categoryId', remove)

router.param('categoryId', categoryById)
router.param('userId', userById)
module.exports = router
