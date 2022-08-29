require('dotenv').config()
const cors = require('cors')
const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
const router = require('./src/routes/index')
const sequelize = require('./db')
const {Brand, Type, User} = require('./src/models/models')
const errorHandler = require('./src/middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// app.get('/', (req, res) => {
	// res.status(200).json({message:"It's working"})
// })

// Error handling, that Middleware module should be the last one
app.use(errorHandler)

const start = async () => {
	try {
		await sequelize.authenticate()
		const force = false
		if (force) {
			await sequelize.sync({force}).then(async () => {
				await User.create({ role: 'RetailBuyer' })
				await Type.bulkCreate([
					{ name: 'Fridges'	},
					{ name: 'Laptops'	},
					{ name: 'Phones'	}])
				await Brand.bulkCreate([
					{ name: 'Acer'	},
					{ name: 'Apple'	},
					{ name: 'LG'	},
					{ name: 'Samsung'	}])
			})
		} else
			await sequelize.sync()
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

start()