const router = new (require('express')),
	ctrl = require('../controllers/orderInfoController')

router.post('/',	ctrl.create)
router.get('/',		ctrl.getAll)
router.get('/:id',	ctrl.getOne)

module.exports = router