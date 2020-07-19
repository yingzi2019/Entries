<!-- Item.vue -->
<template>
  <div>aaa-> {{ item.title }}</div>
</template>

<script>
export default {
  computed: {
    item () {
      return {
        title: this.$route.query
      }
    }
  },

  asyncData ({ store, route }) {
    const { dispatch } = store
    console.log('b-async', route)
    return Promise.all([
      dispatch('fetchItem', 12)
    ])
  }
}
</script>
