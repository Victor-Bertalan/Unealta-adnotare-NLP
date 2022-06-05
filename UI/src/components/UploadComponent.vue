<script>
import axios from 'axios'
// import { ref } from '@vue/reactivity'
export default {
  inject: ['uploaded_files'],
  data  () {
    return {
      ds_name: '',
      model_name: '',
      ds_file: '',
      model_file: {}
    }
  },
  methods: {
    log () {
      const new_file = this.$refs.dataset.files[0]
      this.ds_name = this.$refs.dataset.files[0].name
      const reader = new FileReader()
      reader.onload = async ({ target: { result } }) => { await axios.post('http://localhost:3000/set_dataset', JSON.parse(result)) }
      reader.readAsText(new_file)
      console.log(this.ds_file)
    },
    async send_files () {
      const message = {
        dataset: this.dataset,
        model: this.dataset
      }
      const rep = await axios.post('http://localhost:3000/set_files', message)
      this.uploaded_files = true
      console.log(rep)
      location.reload()
    },
    send_model () {

    }
  }
}
</script>

<template>
  <div id='overlay'>
    <div id='card'>
      <div id="files">
        <div  class="file-input">
          <h4>
            Upload dataset file
          </h4>
          <div>
            <input type="file" id="dataset" ref="dataset" class="file" @change="log()">
            <label for="dataset">
              <q-btn onclick="document.getElementById('dataset').click()" style="background-color:#191970;color:white" unelevated >Select file &nbsp; &nbsp; <q-icon name="file_upload"/></q-btn>
            </label>
          </div>
          {{ds_name}}
        </div>
      </div>
      <q-separator id="#separator" vertical inset />
      <q-btn id="defaults" color='blue' icon-right='assignment' unelevated label='Use demo defaults'/>
    </div>
  </div>
</template>

<style scoped>
  .file{
    opacity: 0;
    width: 1px;
    height:1px;
    position:absolute;
}
  #overlay{
    display:block;
    position:fixed;
    width:100vw;
    height:100vh;
    padding: 20vh 20vw;
    background-color: rgba(0,0,0,0.7);
    left:0;
    top:0;
  }
  #card{
    display: flex;
    background-color:#F0F8FF;
    justify-content: space-between;
    align-items: center;
    width:60vw;
    height:60vh;
    padding:3vh 4vw;
    border-radius: 2vw;
  }
  #files{
    display:flex;
    height:100%;
    width:25vw;
    flex-direction: column;
    justify-content: space-around;
  }
  .file-input{
    display:flex;
    width: 25vw;
    height: 25%;
    flex-direction:column;
    align-items:center;
    justify-content: space-evenly;
  }
  input{
    width:100%;
  }
  hr{
    width: 1px;
    height: 100% !important;
    background-color: rgba(0,0,0,0.3) !important;
  }
  #defaults{
    padding: 2vh 2vw;
    font-size: larger;
    height: 15vh;
  }
  #custom{
    height: 15%;
    max-width: 100%;
    font-size: medium;
  }
  h4{
    margin: 0 !important;
  }
</style>
