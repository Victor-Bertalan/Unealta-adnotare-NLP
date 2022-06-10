<template>
  <q-layout view="lHh Lpr lFf">
    <LeftContainer />
    <RightContainer/>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import LeftContainer from 'components/LeftContainer.vue'
import RightContainer from 'components/RightContainer.vue'

export default defineComponent({
  name: 'MainLayout',
  data () {
  },
  provide: ['uploaded'],
  components: {
    LeftContainer,
    RightContainer
  }
})
</script>
