<template>
  <div id="app">

    <NavMenu v-show="MenuToggle"/>
    <NavBtn/>
    <router-view/>
  </div>
</template>

<script>
    //<LeafOverlay v-show="Overlay"/>
    //<LandingPageOverlay v-show="!Overlay"/>
//import LandingPageOverlay from '@/components/LandingPageFlowers'
//import LeafOverlay from '@/components/LeafOverlay'
import NavMenu from '@/components/Navigation'
import NavBtn from '@/components/NavButton'

export default {
  name: 'App',
  components: {
    //LandingPageOverlay,
    //LeafOverlay,
    NavMenu,
    NavBtn
  },
  computed: {
    MenuToggle() {
      return this.$store.state.ui.showMenu
    },
    Overlay() {
      return this.$store.state.ui.menuLeafOverlay
    }
  },
  beforeMount(){
  this.$store.dispatch('fetchProducts')
  }
}
</script>

<style lang="scss">

@import './scss/main';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
