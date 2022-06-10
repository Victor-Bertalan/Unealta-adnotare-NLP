
<script>
import axios from 'axios'
export default {
  data () {
    return {
      ds_name: '',
      model_name: ''
    }
  },
  async mounted () {
    const names = await axios.get('http://localhost:3000/get_names')
    console.log(names)
    this.ds_name = names.data.dataset
    this.model_name = names.data.model
  }
}
</script>

<template>
    <div id="container">
        <h4>Info</h4>
        <h6>DATASET: {{ds_name}}</h6>
        <h6>MODEL: {{model_name}}</h6>
        <q-separator inset />
    </div>
</template>

<style scoped>
div{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color:#FFFFFF;
}
</style>
