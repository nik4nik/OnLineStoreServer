const router = new require('express')()

for (let path of [

'basket',	
'brand',	
'product',	
'order',	
'type',		
'user',
'sql'

])
	router.use('/' + path, require(`./${path}Router`))

module.exports = router