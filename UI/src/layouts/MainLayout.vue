<template>
  <q-layout view="lHh Lpr lFf">
    <LeftContainer />
    <RightContainer/>
    <UploadComponent v-if='file'/>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import LeftContainer from 'components/LeftContainer.vue'
import RightContainer from 'components/RightContainer.vue'
import UploadComponent from 'src/components/UploadComponent.vue'

export default defineComponent({
  name: 'MainLayout',
  inject: ['file'],
  data () {
    return {
      file: this.file.value
    }
  },
  components: {
    LeftContainer,
    RightContainer,
    UploadComponent
  },
  mounted: () => { console.log(this.file.value) }
})
</script>
