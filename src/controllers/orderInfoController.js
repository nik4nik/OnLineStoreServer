const {Basket, OrderInfo, User} = require('../models/models')
const ApiError = require('../error/ApiError')

class OrderInfoController {
	async create(req, res) {
		const {address, email, name, phone} = req.body
		console.log("OrderInfoController: ", {address, email, name, phone})
		const {id} = await OrderInfo.create({address, email, name, phone}),
			basket = await Basket.create({userId:req.body.userId, orderInfoId:id})
			if (req.body.userId > 1) // save the last contact details for the registered user
				await User.update({orderInfoId: id}, {
					where: {id: req.body.userId}
				})
		return res.json(basket)
	}

	async getAll(req, res) {
		return res.json(
			await OrderInfo.findAll())
	}

	async getOne(req, res) {
		return res.json(
			await OrderInfo.findOne({
				where: {id: req.params.id}
			})
	)}
}

module.exports = new OrderInfoController()