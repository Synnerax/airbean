<template>
  <section id="nav-menu">
      <nav @click="hideMenu">

      <router-link class="link" to="/menu">Meny</router-link>
        <span class="line-break"></span>

      <router-link class="link" to="/about">Vårt kaffe</router-link>
        <span class="line-break"></span>

      <router-link class="link" to="/profile">Min profil</router-link>
        <span class="line-break"></span>

      <router-link class="link" to="/status">Orderstatus</router-link>
        <span class="line-break"></span>

      </nav>
  </section>
</template>

<script>
export default {
    name: 'nav-menu',
    methods: {
        hideMenu() {
            this.$store.commit('toggleMenu')
        }
    }
}
</script>

<style lang="scss">

#nav-menu {

    
    position: absolute; /* Sit on top of the page content */
    //display: none; /* Hidden by default */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #2F2926;; /* Black background with opacity */
    z-index: 11; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */

    nav {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .link {
            color: #FFFFFF;
            font-size: 32px;
            line-height: 120%;
            text-decoration: none;

            
        }

        .line-break {
            border: 1px solid rgba(255, 255, 255, 0.2);
            width: 15%;
            //background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
            margin: 1rem 0;
        }
    }
}
</style>