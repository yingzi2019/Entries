<template>
  <div class="init-home">
    我是家目录, 我的路径是{{ fooUrl }}
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  computed: {
    fooUrl () {
      return this.$route.fullPath
    }
  },

  asyncData ({store, route}) {
    const { dispatch } = store
    console.log('a-async', route)
    return Promise.all([
      dispatch('fetchItem', 12)
    ])
  }
}
</script>

<style scoped>
.init-home {
  color: red;
  background: blue;
}
</style>
