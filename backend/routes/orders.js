const { Router } = require('express')
const router = new Router();

//Database 
const { db } = require('./../db')

router.post('/', (req, res) => {
    console.log('this is the req.body',req.body)
    let id = uniqueid()
    console.log(id)
    console.log(req.body.user)
    let user = db.get('users').find({name: req.body.user}).get('history').value()
    if(req.body.user === undefined) {
        db.get('orders')
        .push({purchase: id, totalCost: req.body.totalCost, orderDate: req.body.orderDate, cartItems: req.body.cartItems})
        .write()
        res.send({msg: 'ok!', orderNr: id, signedIn: false})

        return
    } else {
        let newuser = db.get('users').find({name: req.body.user}).value()
        console.log('you just found the correct user', newuser, user)
        user.push({purchase: id, totalCost: req.body.totalCost, orderDate: req.body.orderDate, cartItems: req.body.cartItems})
        db.get('users').find({name: req.body.user})
        .assign({history: user})
        .write()


        /*//.push({purchase: id, totalCost: req.body.totalCost, orderDate: req.body.orderDate, cartItems: req.body.cartItems})
        db.get('orders')
        .push({user: req.body.user, purchase: id, totalCost: req.body.totalCost, orderDate: req.body.orderDate, cartItems: req.body.cartItems})
        //.push({user: req.body.user, purchase: id, totalCost: req.body.totalCost, orderDate: req.body.orderDate, cartItems: req.body.cartItems})
        .write()*/
        console.log('this is user in order.js')
        res.send({msg: 'ok!', orderNr: id, signedIn: true})
    }
    
})


function uniqueid(){
    // always start with a letter (for DOM friendlyness)
    var idstr=String.fromCharCode(Math.floor((Math.random()*25)+65));
    do {                
        // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
        var ascicode=Math.floor((Math.random()*42)+48);
        if (ascicode<58 || ascicode>64){
            // exclude all chars between : (58) and @ (64)
            idstr+=String.fromCharCode(ascicode);    
        }                
    } while (idstr.length<7);
    //state.cart.order = idstr
    //console.log('console log from',state.cart)
    return (idstr);
}

module.exports = router