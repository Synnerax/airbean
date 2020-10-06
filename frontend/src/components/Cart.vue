<template>
  <section class="cart-box">
      <section id="cart">
          <h2>Din beställning</h2>

            
            <CartItem v-for="coffee in cart" :key="coffee.id" :coffee="coffee"/>
          <h2 class="total">Total <span class="total-dots"></span>{{totalCost}} kr</h2>
          <p>inkl moms + drönarleverans</p>
          <button class="order-button" @click="placeOrder">Take my money!</button>
      </section>
  </section>
</template>

<script>

import CartItem from '@/components/CartItem'

export default {
    name: 'Cart',
    components: {
        CartItem
    },
    computed: {
        cart() {
            return this.$store.state.cart
        },
        totalCost(){
            return this.$store.state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
        }
    },
    methods: {
        placeOrder() {
           
            let info = this.$store.state.cart
            console.log(info)
            if(info.length < 1) {
                console.log('tomt')
                alert('Varukorgen är tom')
            } else {
                this.$store.dispatch('placeOrder', this.totalCost)
                this.$router.push('/status')
            }
            //this.$store.commit('uniqueid')
            
        }
    }
}
</script>

<style lang="scss">

@import './../scss/variables';

.cart-box {
    
    position: absolute; /* Sit on top of the page content */
    //display: none; /* Hidden by default */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    //cursor: pointer; /* Add a pointer on hover */

    padding: 6rem 1rem;
}


#cart {
    background: #FFFFFF;
    position: relative;
    padding: 3rem 1rem;

    p {
        text-align: left;
    }

    &::before {
            content: "";
            position: absolute;
            top: -30px;
            right: 13px;
            //left: 50%;
            margin-left: -5px;
            border-width: 20px;
            border-style: solid;
            border-color: transparent transparent #ffffff transparent;
            }

}

.cart-item {
    text-align: left;
    display: flex;

    .item-quantity {
        margin-left: auto;
       // align-self: center;

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        margin-left: .5rem;


        .inc-quantity, .dec-quantity {
            cursor: pointer;
            height: 5px;
        }

        .dec-quantity {
            transform: rotate(180deg);
        }
    }

    .item-info {
        display: flex;
        flex-direction: column;
    }



}
        .total {
            display: flex;
            text-align: left;
        }


.order-button {
    width: 248px;
    height: 55px;

    /* Airbean - brown */
    background: $airBeanBrown;
    border-radius: 50px;

    color: #FFFFFF;
    font-size: 24px;

    margin-top: 2.5rem;
}

</style>