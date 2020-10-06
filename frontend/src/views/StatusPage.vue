<template>
  <main id="confirmation">
      <p>Ordernummer #{{currentOrder}}</p>
      <figure>
      <img src="../assets/drone.svg" alt="" class="drone">
      <img src="../assets/cup.svg" alt="" class="cup">
      </figure>
      <h1>Din beställning är på väg!</h1>

      <p>{{eta}} minuter</p>

      <button class="confirm-btn" @click="confirm" >Ok, cool!</button>
  </main>
</template>

<script>
export default {
  name: 'status-page',
  computed: {
    currentOrder() {
      return this.$store.getters.currentOrder
    },
    eta() {
      let time = Math.ceil(Math.random() * 15)
      return time
    }
  },
  methods:{
    confirm() {
      this.$router.push('/profile')
    }
  }
}
</script>

<style>

</style>