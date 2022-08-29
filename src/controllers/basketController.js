const { Product, BasketProduct } = require('../models/models')

class BasketController {

	async addToBasket(req, res, next) {
		return res.json(await BasketProduct.create({
			basketId: req.body.basketId, // как посмотреть, где добавляется req.user.id?
			productId: req.body.productId,
			quantity: req.body.quantity
		}))
	}

	async getBasketUser(req,res) {
		return res.json(await BasketProduct.findAll({
			include: {model: Product},
			where: {basketId: req.user}
		}))
	}

	async delFromBasket(req, res, next) {
		return res.json(await BasketProduct.destroy({
			where: {id: req.params.id}
		}))
	}
}

module.exports = new BasketController()