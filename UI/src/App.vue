<template>
  <router-view />
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'App',
  data () {
    return {
      len: 0
    }
  },
  provide () {
    return {
      history: ref([]),
      lenght: ref(this.len),
      update_history (x) {
        this.history.value = x
        this.len = 0
        x.forEach(() => {
          this.len += 1
        })
        console.log(this.len)
        this.lenght = ref(this.len)
        console.log(this.lenght.value)
      }
    }
  }
})
</script>
