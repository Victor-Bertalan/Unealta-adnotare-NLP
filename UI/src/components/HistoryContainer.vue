
<script>
import { computed } from '@vue/runtime-core'

export default {
  inject: ['history', 'lenght', 'update_history'],
  data () {
    return {
      current_history: computed(() => this.history.value)
    }
  },
  methods: {
  }
}
</script>

<template>
    <div id="container">
        <h4>History</h4>
        <div class='history_text'>
          <h6 v-for='text in current_history' :key='text'>
            <div>
             {{text.text}}
            </div>
            <q-icon v-bind:name="text.answer"/>
          </h6>
        </div>
    </div>
</template>

<style scoped>
div{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color:#FFFFFF;
}
h6 div{
  max-width: 10vw;
  overflow: hidden;
  max-lines: 1;
  white-space: nowrap;
  word-break: break-all;
}
h6 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5vh !important;
  margin-bottom: 0vh !important;

}

q-icon{
  font-family: Arial, Helvetica, sans-serif !important;
}

.history_text{
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
}
</style>
