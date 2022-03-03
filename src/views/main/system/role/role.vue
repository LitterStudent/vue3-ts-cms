<template>
  <div class="role">
    <page-search v-bind:config="formconfig"></page-search>
    <page-contnet
      pageName="role"
      :contnetTableConfig="tableconfig"
    ></page-contnet>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formconfig } from './config/form.config'
import { tableconfig } from './config/table.config'
import PageSearch from '@/components/page-search'
import PageContnet from '@/components/page-content'
export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContnet
  },
  setup() {
    return { formconfig, tableconfig }
  }
})
</script>

<style scoped></style>
