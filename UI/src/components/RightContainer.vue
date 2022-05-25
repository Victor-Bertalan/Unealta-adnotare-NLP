
<script>
import axios from 'axios'

export default {
  data () {
    return {
      labels: [],
      current_text: ''
    }
  },
  methods: {
    async update_text () {
      const text = await axios.get('http://localhost:3000/get_next_text')
      this.current_text = text.data
    },
    async send_text (val) {
      await axios.post('http://localhost:3000/send_text', {
        text: this.current_text,
        answer: val
      })
      this.update_text()
    }
  },
  async mounted () {
    this.update_text()
    this.labels = (await axios.get('http://localhost:3000/get_labels')).data
  }
}
</script>

<template>
    <div id="container">
      <div id="content">
        <div id="button_group">
          <span v-for="label in labels" :key="label">
            <q-btn outline color="white" :ripple="false">{{label}}</q-btn>
          </span>
        </div>
        <div id="text">
          {{current_text}}
        </div>
      </div>
      <div id="button_group2">
        <q-btn @click="send_text('accept')" icon="done" color="green" :ripple="false" />
        <q-btn @click="send_text('reject')" icon="close" color="red" :ripple="false" />
        <q-btn @click="send_text('ignore')" icon="chevron_right" color="blue" :ripple="false" />
      </div>
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
  width: 60vw;
  padding: 2vh;
  background: #191970;
  box-shadow: none;
}

#button_group .q-btn {
  margin: 0 0.5vw !important;
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
</style>
