
<script>
import { computed } from '@vue/runtime-core'
import axios from 'axios'

export default {
  inject: ['history', 'update_history'],
  data () {
    return {
      total: computed(() => {
        let len = 0
        this.session++
        this.history.value.forEach(() => {
          len += 1
        })
        return len
      }),
      session: null
    }
  },
  async mounted () {
    this.session = -2
    this.update_history((await axios.get('http://localhost:3000/get_history')).data)
    console.log(this.history.value)
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
        <h6>THIS SESSION: {{session}}</h6>
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
