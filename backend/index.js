// Imports
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

//Routes
const productsRoute = require('./routes/products')
const ordersRoute = require('./routes/orders')
const profileRoute = require('./routes/profile')
const loginRoute = require('./routes/login');
const userRoute = require('./routes/users');



// Variables
const app = express();
const PORT = 5000;


app.use(cors())
app.use(bodyParser.json());

// Get 
app.use('/menu', productsRoute)

// Get 
app.use('/profile', profileRoute)
app.use('/users', userRoute)


// Post 
app.use('/orders', ordersRoute)

// Get
//app.use('/api/auth', loginRoute);

// Static Assets
app.use('/assets', express.static('./assets'))




// Starting Server
app.listen(PORT,() => {
    console.log('Server has started')
} )