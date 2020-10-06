<template>
  <main @click="redirect" class="landing-page">
      <LandingPageOverlay />
      <article class="logo-border">
      <img src="@/assets/BeanLogo.svg" alt="Logo">
      </article>
      <h1>AIR BEAN</h1>
      <p>DRONEDELIVERED COFFEE</p>

  </main>
</template>

<script>

import LandingPageOverlay from '@/components/LandingPageFlowers'

// BeanLogo  '@/assets/BeanLogo.svg'
export default {
    name: 'landing-page',
    components: {
        LandingPageOverlay
    },
    methods: {
        redirect() {
          this.$router.push('/menu')

      }
    }
}
</script>

<style>


</style>