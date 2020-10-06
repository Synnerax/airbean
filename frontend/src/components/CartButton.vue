<template>
  <aside id="cart-button"  @click="toggleCart">
      <span class="total-cart-items">{{totalCart}}</span>
      <div class="cart-top"></div>
      <div class="cart-lower"></div>
  </aside>
</template>

<script>
export default {
    name: 'navigation-button',
    props: {
      cartQuantity: Number
    },
    methods: {
        toggleCart() {
            this.$store.commit('toggleCart')
        }
  },
  data(){
    return {
      cartLength: this.cartQuantity
    }
  },
  computed: {
    itemsInCart() {
      return this.$store.getters.itemsInCart
    },
    totalCart() {
      return this.$store.getters.totalCart
    },
    cart() {
      let sum = 0;
        this.$store.getters.cart.forEach(item => {
          sum += item.quantity;
        });
        return sum;
    }
  }
}
</script>

<style lang="scss">


</style>