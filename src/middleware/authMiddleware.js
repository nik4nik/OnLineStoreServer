const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
	if (req.method === 'OPTIONS')
		next()

	const notAuthorized = () => res.status(401).json({message:'Not authorized'})
	try {
		const token = req.headers.authorization.split(' ')[1] // Bearer <token>
		if (!token)
			return notAuthorized()

		const decoded = jwt.verify(token, process.env.SECRET_KEY)
		req.user = decoded
		next()
	} catch (e) {
		notAuthorized()
	}
}