const sql = require('../../sql')

class SqlController {

	async getOrdersByContactData(req, res) {

		const {email, phone} = req.query,

			selectDeliveryDataByEmailOrPhoneNum = `order_infos.${email ?
				"email = '" + email:
				"phone = '" + phone}'`,

			qResult = await sql.query(`
	select
			basket_products.id,
			basket_products.quantity,
			baskets.id as "orderId",
			products.img,
			products.name,
			products.price
	from
			basket_products,
			baskets,
			order_infos,
			products
	where
			${selectDeliveryDataByEmailOrPhoneNum} and
			baskets."orderInfoId" = order_infos.id and
			basket_products."basketId" = baskets.id and
			products.id = basket_products."productId";
		`)

		return res.json(qResult.rows)
	}
}

module.exports = new SqlController()