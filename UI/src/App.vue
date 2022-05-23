<template>
  <v-app>
    <v-main>
      <LeftContainer />
      <RightContainer /> 
    </v-main>
  </v-app>
</template>

<script>
import LeftContainer from './components/LeftContainer.vue'
import RightContainer from './components/RightContainer.vue'

export default {
  name: 'App',

  components: {
    LeftContainer,
    RightContainer
  },

  data: () => ({
    //
  }),
}
</script>
