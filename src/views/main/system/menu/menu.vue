<template>
  <div class="menu">
    <page-contnet
      pageName="menu"
      :contnetTableConfig="contentTableConfig"
    ></page-contnet>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { contentTableConfig } from './config/table.config'
import PageContnet from '@/components/page-content'
export default defineComponent({
  components: {
    PageContnet
  },
  name: 'menu',
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
