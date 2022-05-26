
<script>

export default {
  inject: ['history', 'lenght'],
  data () {
    return {
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
        <h4 @click="log()">History</h4>
        <h6 v-for='text in history.value' :key='text'>
          <span>{{text.text}}</span>
          <q-icon v-bind:name="text.answer"/>
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
}

q-icon{
  font-family: Arial, Helvetica, sans-serif !important;
}
</style>
