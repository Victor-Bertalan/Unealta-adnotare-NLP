
<script>
import { computed } from '@vue/runtime-core'
export default {
  inject: ['history', 'lenght'],
  data () {
    return {
      total: computed(() => {
        let len = 0
        this.history.value.forEach(() => {
          len += 1
        })
        return len
      })
    }
  },
  methods: {
    log () {
      console.log(this.history.value)
    }
  }
}
</script>

<template>
    <div id="container">
        <h4>Statistics</h4>
        <h6>THIS SESSION: {{session_nr}}</h6>
        <h6 @click="log()">TOTAL : {{total}}</h6>
        <q-separator inset />
    </div>
</template>

<style scoped>
div{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color:#FFFFFF;
}
</style>
