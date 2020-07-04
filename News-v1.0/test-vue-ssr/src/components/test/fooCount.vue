<template>
  <div>
    <span style="position:fixed;">{{ fonnScroll }}</span>{{ 123 }}<br>
    <span style="position:fixed;">{{ getScroll }}</span>
    <div style="width:100%;height:9500px;"></div>
  </div>

</template>

<script>

export default {
  data () {
    return {
      getScroll: ''
    }
  },

  mounted () {
  },

  computed: {
    fonnScroll () {
      return this.$options.parent.scrollNum
    }
  },

  methods: {
  }
}
</script>
