<template>
  <aside id="navigation-button"  @click="toggleMenu">
      <div class="menu-bar"></div>
      <div class="menu-bar"></div>
      <div class="menu-bar"></div>
  </aside>
</template>

<script>
export default {
    name: 'navigation-button',
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu')
        }
  }
}
</script>

<style>

</style>