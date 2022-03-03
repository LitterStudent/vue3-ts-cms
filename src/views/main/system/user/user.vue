<template>
  <div class="user">
    <page-search
      v-bind:config="formconfig"
      @resetEvent="handleResetEvent"
      @searchEvent="handlesearchEvent"
    ></page-search>
    <page-contnet
      ref="pageContentRef"
      pageName="users"
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
import { usePageSearch } from '@/hooks/use-page-search'
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContnet
  },
  setup() {
    let [pageContentRef, handleResetEvent, handlesearchEvent] = usePageSearch()
    return {
      formconfig,
      tableconfig,
      handlesearchEvent,
      pageContentRef,
      handleResetEvent
    }
  }
})
</script>

<style scoped></style>
