const uuid = require('uuid')
const path = require('path')
const {Product, ProductInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class ProductController {
	async create(req, res, next) {
		try {
			let {name, price, brandId, typeId, info} = req.body
			const {img} = req.files
			let fileName = uuid.v4() + '.jpg'
			img.mv(path.resolve(__dirname, '../..', 'static', fileName))
			const product = await Product.create({name, price, brandId, typeId, img: fileName})

			if (info) {
				info = JSON.parse(info)
				info.forEach(i =>
					ProductInfo.create({
						title: i.title,
						description: i.description,
						productId: product.id
					})
				)
			}

			return res.json(product)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}

	async getAll(req, res) {
		let {brandId, typeId, limit, page} = req.query
		page ||= 1
		limit ||= 9
		const o = {limit, offset: (page - 1) * limit}

		if		(brandId && typeId)	 o['where'] = {typeId, brandId}
		else if (!brandId && typeId) o['where'] = {typeId}
		else if (brandId && !typeId) o['where'] = {brandId}

		return res.json( await Product.findAndCountAll(o))
	}

	async getOne(req, res) {
		return res.json( await Product.findOne({
			where: {id: req.params.id},
			include: [{model: ProductInfo, as: 'info'}]
		}))
	}
}

module.exports = new ProductController()