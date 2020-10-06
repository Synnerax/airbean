<template>
  <main id="products">
    <LeafOverlay />
    <CartButton :cartQuantity="totalCart"/>
    <Cart v-if="MenuToggle"/>
    <h1>Meny</h1>

    <CoffeeItem v-for="product in products" :key="product.id" :coffee="product"/>
    <LeafFooter />
  </main>
</template>

<script>

    //<Product v-for="item in products" :key="item.id" :product="item"/>
//import Product from '@/components/Product'
import LeafOverlay from '@/components/LeafOverlay'
import LeafFooter from '@/components/LeafBottom'

import CoffeeItem from '@/components/CoffeeItem'
import CartButton from '@/components/CartButton'
import Cart from '@/components/Cart'


export default {
  name: 'menu-page',
  components: {
    LeafOverlay,
    LeafFooter,
    CoffeeItem,
    CartButton,
    Cart
  },
  computed: {
    products(){
      return this.$store.getters.coffees;
    },
    order() {
      return this.$store.getters.cart;
    },
    MenuToggle() {
      return this.$store.state.ui.showCart
    },
    totalCart() {
      let sum = 0;
        this.$store.getters.cart.forEach(item => {
          sum += item.quantity;
        });
        return sum;
      },
  
  }

}
</script>

<style>


</style>