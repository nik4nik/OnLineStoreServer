const sequelize = require('../../db')
const {DataTypes} = require('sequelize')

const OrderInfo = sequelize.define('order_info', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	address: {type: DataTypes.STRING},
	email: {type: DataTypes.STRING},
	name: {type: DataTypes.STRING},
	phone: {type: DataTypes.STRING},
})

const User = sequelize.define('user', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	email: {type: DataTypes.STRING, unique: true,},
	password: {type: DataTypes.STRING},
	role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketProduct = sequelize.define('basket_product', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	quantity: {type: DataTypes.INTEGER, allowNull: false},
})

const Product = sequelize.define('product', {
	id:		{type: DataTypes.INTEGER,	primaryKey: true, autoIncrement: true},
	name:	{type: DataTypes.STRING,	allowNull: false, unique: true},
	price:	{type: DataTypes.INTEGER,	allowNull: false},
	rating:	{type: DataTypes.INTEGER,	defaultValue: 0},
	img:	{type: DataTypes.STRING,	allowNull: false},
})

const Type = sequelize.define('type', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	rate: {type: DataTypes.INTEGER, allowNull: false},
})

const ProductInfo = sequelize.define('product_info', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	title: {type: DataTypes.STRING, allowNull: false},
	description: {type: DataTypes.STRING, allowNull: false},
})

const TypeBrand = sequelize.define('type_brand', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

OrderInfo.hasOne(User)
User.belongsTo(OrderInfo)

OrderInfo.hasOne(Basket)
Basket.belongsTo(OrderInfo)

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Type.hasMany(Product)
Product.belongsTo(Type)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Product.hasMany(Rating)
Rating.belongsTo(Product)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Product.hasMany(ProductInfo, {as: 'info'})
ProductInfo.belongsTo(Product)

Type.belongsToMany(Brand, {through: TypeBrand })
Brand.belongsToMany(Type, {through: TypeBrand })

module.exports = {
	OrderInfo,
	User,
	Basket,
	BasketProduct,
	Product,
	Type,
	Brand,
	Rating,
	TypeBrand,
	ProductInfo
}