
<script>
import Info from './InfoContainer.vue'
import Statistics from './StatisticsContainer.vue'
import History from './HistoryContainer.vue'
export default {
  data () {
    return {}
  },
  components: {
    Info,
    Statistics,
    History
  }
}
</script>

<template id='left'>
    <div id="container" class='fixed'>
        <Info id="info"/>
        <Statistics id="stats"/>
        <History id="history"/>
    </div>
</template>

<style scoped>
#container{
    box-sizing: border-box;
    padding: 0 2vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: absolute;
    left:0px;
    top:0px;
    height: 100vh;
    width: 20vw;
    background-color: #003049;
}
#info{
    padding: 0px;
    width: 100%;
    height: 20vh;
}
#stats{
    width:100%;
    height:  20vh;
}
#history{
    width:100%;
    height: 50vh;
}
</style>
<style>

q-separator,hr{
    border-style: solid !important;
    border-color: aliceblue !important;
    background-color: aliceblue !important;
    height: 0.1vh !important;
}

h4,h6{
    margin:2.5vh !important;
}

h4{
    font-size: 4vh;
}

h6{
    font-size: 2vh;
}

.fixed{
    position: fixed !important;
}
</style>
