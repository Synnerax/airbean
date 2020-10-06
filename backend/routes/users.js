const { Router } = require('express')
const router = new Router();


//Database 
const { db } = require('./../db')

router.get('/', (req, res) => {
    //res.send('Products!!')
    let currentUser = req.query.user
    let users = db.get('users').value()
    //console.log(currentUser)
    console.log('this is from user.js in backend',users)
    console.log('same here', req.query.user)

    for(let i = 0; i < users.length; i++) {
        
            console.log('körs denna forloop?',users[i])
            if(users[i].name === currentUser){
                console.log('WINNING')
                res.send(users[i])
                return
            }
        
    }
    // detta var ett objekt innan 
})

module.exports = router