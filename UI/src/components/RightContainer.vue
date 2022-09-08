
<script>
import axios from 'axios'

export default {
  data () {
    return {
      labels: [],
      current_text: '',
      initial_text: '',
      selected_label: '',
      current_label: '',
      freeze_flag: true,
      text_labels: [],
      text_string: ''
    }
  },
  inject: ['update_history', 'history', 'lenght'],
  methods: {
    async save () {
      await axios.get('http://localhost:3000/save_history')
      this.freeze_flag = true
      setTimeout(() => { this.freeze_flag = false }, 1000)
    },
    async update_text () {
      this.current_text = ''
      const text = await axios.get('http://localhost:3000/get_next_text')
      this.text_string = text.data[0]
      this.current_text = Object.values(text.data[1][0])
      this.initial_text = text.data[1][0]
      this.text_labels = text.data[1][1]
    },
    async send_text (val) {
      if (!this.freeze_flag) {
        this.freeze_flag = true
        setTimeout(() => { this.freeze_flag = false }, 1000)
        const message = {
          initial_text: this.text_string,
          text: this.current_text,
          answer: val
        }
        this.update_history((await axios.post('http://localhost:3000/send_text', message)).data)
        console.log(this.lenght.value)
        this.update_text()
      }
    },
    select_label (idx, label) {
      this.selected_label = label
      this.current_label = idx
    },
    label_remove (label) {
      const idx = label[3]
      for (const i of this.current_text) {
        if (i[3] === idx) {
          i[2] = false
          i[3] = ''
          console.log(i)
        }
      }
      delete this.text_labels[idx]
    },
    add_label (label, idx) {
      this.current_text[idx][2] = true
      this.current_text[idx][3] = Object.keys(this.text_labels).length
      this.text_labels[Object.keys(this.text_labels).length] = [this.current_text[idx], this.selected_label, idx, idx + 1]
    }
  },
  async mounted () {
    const text = await axios.get('http://localhost:3000/get_text')
    this.text_string = text.data[0]
    this.current_text = Object.values(text.data[1][0])
    this.initial_text = text.data[1][0]
    this.text_labels = text.data[1][1]
    this.labels = (await axios.get('http://localhost:3000/get_labels')).data
    this.selected_label = this.labels[0]
    setTimeout(() => { this.freeze_flag = false }, 1000)
  }
}
</script>

<template>
    <div id="container">
      <div id="content">
        <div id="button_group">
          <span v-for="(label, idx) in labels" :key="idx">
            <q-btn outline color="white" unelevated :ripple="false" @click="select_label(idx, label)" :class="{ active : current_label == idx }">{{label}}</q-btn>
          </span>
        </div>
        <div id="text">
          <span v-for='(label,idx) in current_text' :key="idx">
              <span v-if='label[2]' style="background-color: gold;" @click="label_remove(label)">
                {{label[0]+label[1]}}
                <span style="font-size:50%;vertical-align:text-top;" v-if='current_text[idx][3] !== current_text[idx+1][3]'>{{text_labels[label[3]][1]}}</span>
              </span>
              <span v-else @click="add_label(label, idx)">{{label[0]+label[1]}}</span>
          </span>
        </div>
      </div>
      <div id="button_group2">
        <q-btn disable='freeze_flg' @click="send_text('done')" icon="done" unelevated color="green" :ripple="false" />
        <q-btn disable='freeze_flag' @click="send_text('close')" icon="close" unelevated color="red" :ripple="false" />
        <q-btn disable='freeze_flag' @click="send_text('arrow_forward_ios')" icon="arrow_forward_ios" unelevated color="blue" :ripple="false" />
      </div>
      <q-btn id='save' disable='freeze_flag' @click="save()" icon="save" unelevated color="orange" :ripple="false"></q-btn>
    </div>
</template>

<style scoped>

#container{
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    right:0px;
    top:0px;
    height: 100vh;
    width: 80vw;
    background-color: #F0F8FF;
}
#content {
  display: block;
  margin: 0;
  margin-top: 10vh;
  height: 65vh;
  width: 60vw;
  background-color: #ffffff;
}

#text {
  margin-top: 2vh;
  display: block;
  max-height: 50vh;
  padding: 2vw;
  overflow-y: scroll;
  font-size: 1.5vw;
}

#button_group {
  display: flex;
  flex-wrap: wrap;
  width: 60vw;
  padding: 2vh;
  background: #191970;
  box-shadow: none;
}

#button_group .q-btn {
  margin: 0.25vh 0.25vw !important;
  padding: 0 0.5vw;
  color: white;
}

#button_group2{
    display: flex;
    width:40vw;
    padding:0;
    margin-bottom: 2vh;
    box-shadow: none;
    justify-content: space-around;
}

#button_group2 .q-btn{
    width:10vw;
    margin: 0 0.5vw !important;
    color: white;
    box-shadow: none;
    font-size: 3vh;
}

#save{
  position:absolute;
  right: 1vw;
  bottom: 2vh;
  width:10vw;
  color: white;
  box-shadow: none;
  font-size: 3vh;
}

.active{
  background: #ffffff !important;
  color:#191970 !important;
}
</style>
