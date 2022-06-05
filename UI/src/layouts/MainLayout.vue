<template>
  <q-layout view="lHh Lpr lFf">
    <LeftContainer />
    <RightContainer/>
    <UploadComponent v-if='!uploaded_files'/>
  </q-layout>
</template>

<script>
import { defineComponent, computed } from 'vue'
import axios from 'axios'
import LeftContainer from 'components/LeftContainer.vue'
import RightContainer from 'components/RightContainer.vue'
import UploadComponent from 'src/components/UploadComponent.vue'

export default defineComponent({
  name: 'MainLayout',
  data () {
    return {
      uploaded: {
        dataset: false,
        model: false
      },
      uploaded_files: computed(() => this.uploaded.model && this.uploaded.dataset)
    }
  },
  provide: ['uploaded'],
  components: {
    LeftContainer,
    RightContainer,
    UploadComponent
  },
  mounted: async function () {
    const dataset = await axios.get('http://localhost:3000/get_dataset')
    const model = await axios.get('http://localhost:3000/get_model')
    if (dataset.data !== {}) {
      this.uploaded.dataset = true
    }
    if (model.data) {
      this.uploaded.model = true
    }
    console.log(this.uploaded_files)
  }
})
</script>
