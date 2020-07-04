<template>
  <div id="app">
    <router-link to='a'>a</router-link>
    <router-link to='b'>b</router-link>
    <router-link to='c'>c</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',

  data () {
    return {
      title: 'zhang',
      scrollNum: 0
    }
  },

  methods: {
    handleScroll () {
      this.scrollNum = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset)
    }
  },

  mounted () {
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll, true)
  }
}
</script>

<style scoped>

</style>
