<template>
  <div class="goods">
    <pageContnet pageName="goods" :contnetTableConfig="contentTableConfig">
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>
    </pageContnet>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContnet from '@/components/page-content'
import { contentTableConfig } from './config/table.config'
export default defineComponent({
  name: 'goods',
  components: {
    PageContnet
  },
  setup() {
    console.log(contentTableConfig)
    return { contentTableConfig }
  }
})
</script>

<style scoped></style>
