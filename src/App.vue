<template>
  <div id="app">
    <Header v-show="!isHideHeaderFooter" />
    <router-view />
    <Footer v-show="!isHideHeaderFooter" />
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'

export default {
  name: 'App',
  components: { Header, Footer },
  computed: {
    isHideHeaderFooter() {
      return this.$route.meta.hideHeaderFooter
    }
  }
}
</script>

<style>
#app {
  min-width: 1200px;
}
</style>
