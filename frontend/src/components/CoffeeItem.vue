<template>
  <section class="coffe-wrapper" >
      <section class="coffee-item">
      <button class="purchase-btn" @click="addToOrder">
          +
      </button>

      <h2 class="item-name">{{coffee.title}}</h2>
      <span class="dots"></span>
      <p class="price">{{coffee.price}} kr</p>
  </section>
      <section class="desc-wrapper">
          <p class="desc">{{coffee.desc}}</p>
      </section>
  </section>
</template>

<script>
export default {
    name: 'coffee-item',
    props: {
        coffee: Object
        },
    methods: {
        addToOrder() {
            //console.log('test')
            //let item = {desc: this.coffee.desc, id: this.coffee.id, price: this.coffee.price, title: this.coffee.title}
            //console.log('this is item:',item)
            //console.log('this is this.coffee:',this.coffee)

            this.$store.dispatch('updateCart', this.coffee)
            
        },
        
    } 
} 
</script>

<style lang="scss">

.coffe-wrapper {
    grid-column: 2 / span 1;
}
.coffee-item {
    //width: 80%;
    display: flex;
    //margin: 2.5rem;

    //margin-top: 5rem;
    //margin-left: 2.5rem;
    
    //margin: 1rem 0;
    

    .purchase-btn {
        width: 32px;
        height: 32px;
        
        border-radius: 999rem;
        background: #2F2926;
        box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.12);
        color: #ffffff;
        //grid-column: 1 / span 1;
        //margin-right: 1rem;
    }

    h2 {
        text-align: left;
        padding-left: 1rem;
        //grid-column: 2 / span 1;
    }

    .price {
        //grid-column: 3 / span 1;
        line-height: 33px;
        margin-left: auto;
    }
}
        .desc {
            width: 100%;
            text-align: left;
            margin-left: 50px;
        }
.dot{
 //width: 50%;
 border-bottom: 2px dotted black;
 height: 22px;
}
</style>