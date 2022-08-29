const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

const generateJwt = (id, email, role) =>
	jwt.sign(
		{id, email, role},
		process.env.SECRET_KEY,
		{expiresIn: '24h'}
	)

class UserController {
	async signin(req, res, next) {
		const {email, password, role} = req.body
		if (!email || !password)
			return next(ApiError.badRequest('Некорректный email или password'))

		const candidate = await User.findOne({where: {email}})
		if (candidate)
			return next(ApiError.badRequest('Пользователь с таким email уже существует'))

		const hashPassword = await bcrypt.hash(password, 5)
		const user = await User.create({email, role, password: hashPassword})

		const token = {token:generateJwt(user.id, user.email, user.role)}
		return res.json(token)
	}

	async login(req, res, next) {
		const {email, password} = req.body
		const user = await User.findOne({where: {email}})
		if (!user)
			return next(ApiError.internal('Пользователь не найден'))

		let comparePassword = bcrypt.compareSync(password, user.password)
		if (!comparePassword)
			return next(ApiError.internal('Указан неверный пароль'))

		const token = {token:generateJwt(user.id, user.email, user.role)}
		return res.json(token)
	}

	async check(req, res, next) {
/*		для теста закомментировать authMiddleware в userRouter.js
		http://localhost:5000/api/user/auth?id=5

		const {id} = req.query

		if (!id)
			return next(ApiError.badRequest('Не задан ID'))

		res.json(id)
*/
		const token = generateJwt(req.user.id, req.user.email, req.user.role)
		return res.json({token})
	}

	async getOne(req, res) {
		return res.json(
			await User.findOne({ where: {id: req.params.id} }))
	}
}

module.exports = new UserController()