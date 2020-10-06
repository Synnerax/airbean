const { Router } = require('express')
const router = new Router();


//Database 
const { db } = require('./../db')

router.get('/', (req, res) => {
    //res.send('Products!!')

    let products = db.get('menu').value()
    console.log(products)
    // detta var ett objekt innan 
    res.send(products)
})

module.exports = router