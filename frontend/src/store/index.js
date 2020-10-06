import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiURL: 'http://localhost:5000',
    ui: {
      showMenu: false,
      showCart: false,
      showCreateUser: false,
      menuLeafOverlay: false
      
    },
    coffees: Array,
    cart: [],
    cartLength: 0,
    orders: [],
    orderHistory: [],
    user: [],
  },
  mutations: {
    updateProducts(state, products){
      state.coffees = products
    },
    orderHistory(state, products){
      state.orderHistory = products
      console.log('updating orderHistory with:',state.orderHistory)
    },
    toggleMenu(state){
      state.ui.showMenu = !state.ui.showMenu;
    },
    toggleCart(state){
      state.ui.showCart = !state.ui.showCart;
    },
    addToCart(state, product){

      //om produkt redan finns 

      let index = state.cart.findIndex(item => item.id === product.id)
      console.log(index)

      // +1 till quantity istället
      if(index >= 0) {

        //++1
        state.cart[index].quantity++
        /*let item = state.cart[index].quantity;
        item = item + 1;
        increaseQuantity(id)*/
      }else {
        product.quantity = 1

        state.cart.push(product)
        console.log(product)
      }

      //state.cart.push(product)
     // totalCartlength()
      console.log('this is the cart',this.cart)
      
    },
    decreaseQuantity(state, product){
      let index = state.cart.findIndex(item => item.id === product.id)
      let item = state.cart[index] 
      console.log('decreasequantity', index)
      item.quantity--
      state.cartLength--

      if(item.quantity < 1) {
        console.log('hejehejehej')
        state.cart.splice(index, 1)
      }
      //state.cart[index].quantity = state.cart[index].quantity--;
      //console.log('increased quantity',state, product, index)

    },
    totalCartLength(state) {
      state.cartLength = 0
        
      state.cart.forEach(item => {
      state.cartLength += item.quantity;
      });
    },
    currentSignedInUser(state, user) {
      state.user = user
      console.log('currentSignedInUser', user)
    }
    
    //,
    //countCart(item){
    //  this.cartLength += item.quantity

   // }
  },
  actions: {
    async fetchProducts(ctx){
      try{
      let resp = await fetch(`${ctx.state.apiURL}/menu`)
      let data = await resp.json()

      console.log(data)
      ctx.commit('updateProducts', data)
      }
      catch(err){
        console.error(err)
      }
    },
    async placeOrder(ctx, cost){
      let currentDate = new Date()

      var date = currentDate.getDate();
      var month = currentDate.getMonth(); //Be careful! January is 0 not 1
      var year = currentDate.getFullYear();
      
      // dunno varför, men det funkar 
      let user = JSON.parse(sessionStorage.getItem('user'));

      if(user === null) {
        user = {name: undefined}
      }

      var dateString = date + "/" +(month + 1) + "/" + year;
      let cart = {user: user.name, totalCost: cost, orderDate: dateString, cartItems: ctx.state.cart}
      let settings = {
        method: 'POST',
        body: JSON.stringify(cart),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
      }
          /*if(user === null) {
            //cart.user = 'No User'
            let resp = await fetch(`${ctx.state.apiURL}/orders`, settings)
            let data = await resp.json();
            ctx.state.orders.push(data.orderNr)
            ctx.state.ui.showCart = false
            ctx.state.cart = []
            console.log('this is was im looking for', cost)

            return data
          } else {*/
            let resp = await fetch(`${ctx.state.apiURL}/orders`, settings)
            let data = await resp.json();

            if(!data.signedIn) {
              let cart = {purchase: data.orderNr ,totalCost: cost, orderDate: dateString, cartItems: ctx.state.cart}
              sessionStorage.setItem('NoUserOrder', JSON.stringify(cart))

            }
            ctx.state.orders.push(data.orderNr)
            ctx.state.ui.showCart = false
            ctx.state.cart = []
            console.log('this is was im looking for', data )
            
            return data
          //}
          
        
         // sessionStorage.setItem('Order', JSON.stringify(cart))
        
          //console.log('this is store POST', JSON.stringify(cart))
          //console.log('detta borde vara id', data)
          //ctx.state.orders.push(data.orderNr)
          //ctx.state.ui.showCart = false
          //ctx.state.cart = []
          //console.log('this is was im looking for', cost)
         // return data;  
    },
    async fetchOrders(ctx){
      try{
      let user = JSON.parse(sessionStorage.user)
      console.log('------------------------------', user.name)
      let resp = await fetch(`${ctx.state.apiURL}/profile?user=${user.name}`)
      let data = await resp.json()

      console.log('fetching orders',data)
      if(sessionStorage.user) {

        ctx.commit('orderHistory', data)
      }
      }
      catch(err){
        console.error(err)
      }
    },
    updateCart(ctx, product) {
      ctx.commit('addToCart', product)
      ctx.commit('totalCartLength')
    },
    async isLoggedIn(ctx) {
    let checkToken = await ctx.commit('getToken')
    console.log(checkToken)
    const token = await this.state.user;
    const url = 'http://localhost:5000/api/auth/isloggedin';

    const response = await fetch(url, { 
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        } 
    });
    const data = await response.json();
    console.log('this is the isLoggedin data',data)
    if (data.isLoggedIn) {
        console.log('Yes! youre logged in!');
    }
  },
  async getUser(ctx) {
    try{
      let user = JSON.parse(sessionStorage.user)
      let resp = await fetch(`${ctx.state.apiURL}/users?user=${user.name}`)
      let data = await resp.json()
      
      console.log('this is your user',data)
      //let user = {name: data.name, mail: data.mail}
      ctx.commit('currentSignedInUser', data)
      }
      catch(err){
        console.error(err)
      }
    },
    async createUser(ctx, userInfo) {

      // lägger användare i session storage
      console.log('YOURE LOOKING FOR THIS LINE --------------', userInfo)
      sessionStorage.setItem('user', JSON.stringify(userInfo))
      
      // kolla om det finns en order i session storage
      
      let user = {name: userInfo.name, mail: userInfo.mail}
      if(sessionStorage.getItem('NoUserOrder')) {
        user.history = [JSON.parse(sessionStorage.getItem('NoUserOrder'))]
      }
      let settings = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
      }
          /*if(user === null) {
            //cart.user = 'No User'
            let resp = await fetch(`${ctx.state.apiURL}/orders`, settings)
            let data = await resp.json();
            ctx.state.orders.push(data.orderNr)
            ctx.state.ui.showCart = false
            ctx.state.cart = []
            console.log('this is was im looking for', cost)

            return data
          } else {*/
            let resp = await fetch(`${ctx.state.apiURL}/profile/create`, settings)
            let data = await resp.json();

      // skicka användare till databasen, skicka med session storage order om det finns en
      console.log('here is the thing i want to look at ------------------',data)
      if(data.status === 'ok') {

        await ctx.dispatch('fetchOrders', data.name)
        sessionStorage.removeItem('NoUserOrder')
        ctx.state.ui.showCreateUser = !ctx.state.ui.showCreateUser
      } else {
        console.log('använd ett annat användarnamn')
      }
    }
  },
  modules: {
  },
  getters: {
    coffees: state => {
      return state.coffees
    },
    cart: state => {
      return state.cart
    },
    totalCart: state => {
      //let sum = 0;
        state.cartLength = 0
        state.cart.forEach(item => {
          state.cartLength += item.quantity;
        });
        return state.cartLength;
      },
      currentOrder: state => {
        let index = state.orders.length -1
        return state.orders[index]
      }
  }
})

/*
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const router = new Router();

const { getUserFromUsername, GetUserFromID } = require('../models/database-functions');
const { matchPassword } = require('../models/hashPassword');

router.post('/login', async (req, res) => {
    const body = req.body;
    console.log(body);

    let resObj = {
        success: false
    }

    const user = await getUserFromUsername(body);
    console.log(user.role);
    const isAMatch = await matchPassword(body.password, user.password);
    console.log('isAMatch: ', isAMatch);
    if (user && isAMatch) {
        const token = jwt.sign({ uuid: user.uuid }, 'a1b1c1', {
            expiresIn: 600 //Expires in 10 min
        })
        resObj.success = true;
        resObj.token = token;
        resObj.role = user.role;
    }
    res.send(JSON.stringify(resObj));
});

router.get('/isloggedin', async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    
    let resObj = {
        isLoggedIn: false
    }

    if (token !== 'null') {
        const user = jwt.verify(token, 'a1b1c1');

        if (user) {
            resObj.isLoggedIn = true;
            resObj.user = user;
        }
    }

    res.send(JSON.stringify(resObj));
});

module.exports = router;*/