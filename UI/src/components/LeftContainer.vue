
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
    display: flex;
    flex-direction: column;
    position: absolute;
    left:0px;
    top:0px;
    height: 100vh;
    width: 25vw;
    background-color: #003049;
}
#info{
    width: 100%;
    height: 20%; 
}
#stats{
    width:100%;
    height:  35%;
}
#history{
    width:100%;
    height: 45%;
}
</style>
