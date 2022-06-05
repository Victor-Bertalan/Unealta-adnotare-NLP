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
      file: ref({}),
      history: ref([]),
      lenght: ref(this.len),
      upload_file (f) {
        this.file.value = f
        console.log(this.file)
      },
      update_history (x) {
        this.history.value = x
        this.len = 0
        x.forEach(() => {
          this.len += 1
        })
        this.lenght = ref(this.len)
      }
    }
  }
})
</script>
