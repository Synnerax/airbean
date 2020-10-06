<template>
            <article class="cart-item">
                <section class="item-info">
                <h2 class="item-name">{{coffee.title}}</h2>
                <span>{{coffee.price}} kr</span>
                </section>
                <p class="dots"></p>
                <section class="item-quantity">
                    <img class="inc-quantity" @click="incQuantity" src="./../assets/arrow.svg" alt="">
                    <span >{{quantity}}</span>
                    <img class="dec-quantity" @click="decQuantity" src="./../assets/arrow.svg" alt="">
                
                </section>
            </article>
</template>

<script>
export default {
    name: 'cart-item',
    props: {
        coffee: Object
    },
    data(){
        return {
            quantity: this.coffee.quantity
        }
    },
    methods: {
        incQuantity() {
            //console.log(this.$vnode.key)
            this.quantity++;
            this.$store.commit('addToCart', this.coffee)
            console.log('this is running--------------------')
        },
        decQuantity() {
            this.quantity--
            this.$store.commit('decreaseQuantity', this.coffee)
        }
    }
}
</script>

<style lang="scss">

.cart-item {
    text-align: left;
    display: flex;

    .item-quantity {
        margin-left: auto;
        align-self: center;
    }
    
    
}
</style>