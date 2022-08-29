const Router = require('express')
const router = new Router()

const basketController = require('../controllers/basketController')

//check for authorization for an authorized user
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware , basketController.getBasketUser)
router.post('/', authMiddleware , basketController.addToBasket)
router.delete('/:id', authMiddleware , basketController.delFromBasket)

module.exports = router