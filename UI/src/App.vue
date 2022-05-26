<template>
  <router-view />
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'App',
  data () {
    return {
      data: []
    }
  },
  provide () {
    return {
      update_history (x) {
        this.history.value = x
        return this.history
      },
      history: ref([])
    }
  }
})
</script>
