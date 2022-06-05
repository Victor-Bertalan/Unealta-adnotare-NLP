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
      dataset: ref({}),
      upload_dataset (f) {
        this.dataset.value = f
        console.log(this.dataset)
      },
      model: ref({}),
      upload_model (f) {
        this.model.value = f
        console.log(this.model)
      },
      history: ref([]),
      lenght: ref(this.len),
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
