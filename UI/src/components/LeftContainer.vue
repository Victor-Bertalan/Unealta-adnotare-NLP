
<script>
import Info from './Info.vue'
import Statistics from './Statistics.vue'
import History from './History.vue'
export default {
    data(){
        return {}
    },
    components: {
        Info,
        Statistics,
        History
    }
}
</script>

<template>
    <div id="container">
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
    width: 25vw;
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
    width:100% !important;
    height:1px !important;
}
</style>
