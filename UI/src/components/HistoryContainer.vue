
<script>

export default {
  inject: ['history'],
  data () {
    return {
    }
  },
  methods: {
    log () {
      console.log(this.history)
    }
  }
}
</script>

<template>
    <div id="container">
        <h4 @click="log()">History</h4>
        <h6 v-for='text in history.value' :key='text'>
          <span>{{text.text}}</span>
            {{text.answer == 'accept' ? <q-btn icon="done" color="gray"/>:(text.answer == 'reject' ?
            <q-btn icon="close" color="red" />:
            <q-btn icon="chevron_right" color="blue"/>)}}
          </h6>
    </div>
</template>

<style scoped>
div{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color:#FFFFFF;
}
h6 span{
  display: inline-flex;
  justify-content: center;
  max-width: 10vw;
  overflow: hidden;
  max-lines: 1;
  height: 3.5vh;
  word-break: break-all;
}
q-icon{
  font-family: Arial, Helvetica, sans-serif !important;
}
</style>
