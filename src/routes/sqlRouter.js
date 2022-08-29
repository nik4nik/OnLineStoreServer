const router = new (require('express')),
	ctrl = require('../controllers/sqlController')

router.get('/',	ctrl.getOrdersByContactData)

module.exports = router