const { Router } = require('express')
const router = new Router();


//Database 
const { db } = require('./../db')

router.get('/', (req, res) => {
    //res.send('Products!!')
    
        if(req.query.user === 'undefined') {
            res.send(JSON.stringify({status: 'ok'}))
        }else {

            let user = db.get('users').find({name: req.query.user}).value()
            console.log('detta är det ända du vill se', user, req.query.user)
            //let products = db.get('orders').value()
            //console.log('du kom nu fram till profilen',products)
            // detta var ett objekt innan 
            res.send(user)
        }
    
})


router.post('/create', (req, res) => {
    console.log('this is when creating a user', req.body)
   // let checkUser = db.get('users').find({name: req.body.name}).value()
    console.log('checking user----', db.get('users').find({name: req.body.name}).value())
    if(db.get('users').find({name: req.body.name}).value() === undefined) {

        db.get('users').push({name: req.body.name, mail: req.body.mail, history: req.body.history}).write()
        // lägg till användare i databasen
        res.send(JSON.stringify({status: 'ok'}))
    } else {
        console.log('-------------------')
        console.log('User already Exists')

        res.send(JSON.stringify({status: 'User already Exists'}))
    }

})

module.exports = router

