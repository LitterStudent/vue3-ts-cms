<template>
  <div class="page-content">
    <hd-table
      v-model:page="pageInfo"
      v-bind="contnetTableConfig"
      title="用户列表"
      :dataList="dataList"
      :listCount="dataCount"
    >
      <!-- table-header -->
      <template #headerHandler>
        <el-button type="success" v-if="isCreate">添加</el-button>
      </template>
      <!-- table-content -->
      <template #enable="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable === 1 ? 'primary' : ''"
        >
          {{ scope.row.enable === 1 ? '正常' : '废除' }}
        </el-button>
      </template>
      <template #createAt="scope">
        {{ $filters.formateDate(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formateDate(scope.row.createAt) }}
      </template>
      <template #handler>
        <el-button
          type="primary"
          size="small"
          v-if="isUpdate"
          @click="handleUpdate(scope.row)"
        >
          修改</el-button
        >
        <el-button
          type="danger"
          size="small"
          v-if="isDelete"
          @click="handleDelete"
        >
          删除</el-button
        >
      </template>
      <!-- 再封装一层动态插槽 让外部组件引用该表格组件时可以动态的定义字段样式 -->
      <template
        v-for="item in OtherSlotNames"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
      <!-- table-footer -->
    </hd-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HdTable from '@/base-ui/table'
import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'
import { usePermission } from '@/hooks/use-permission'
export default defineComponent({
  components: {
    HdTable
  },
  props: {
    contnetTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(prop) {
    const store = useStore()
    // 0获取按钮权限
    const isCreate = usePermission(prop.pageName, 'create')
    const isUpdate = usePermission(prop.pageName, 'update')
    const isDelete = usePermission(prop.pageName, 'delete')
    const isQuery = usePermission(prop.pageName, 'query')
    // console.log(prop.pageName)
    // 1.
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 4
    })
    watch(pageInfo, () => {
      getPageData()
    })
    // 2.
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: prop.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    // 3.
    const dataCount = computed(() => {
      return store.getters['system/pageListCount'](prop.pageName)
    })
    const dataList = computed(() =>
      store.getters[`system/pageListData`](prop.pageName)
    )
    // 4.
    const OtherSlotNames = prop.contnetTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )
    // 5.
    const handleDelete = () => {
      console.log(11)
    }
    const handleUpdate = () => {
      console.log(22)
    }

    return {
      dataList,
      getPageData,
      pageInfo,
      dataCount,
      OtherSlotNames,
      isCreate,
      isUpdate,
      isDelete,
      handleDelete,
      handleUpdate
    }
  }
})
</script>

<style>
.page-content {
  text-align: center;
  border-top: 20px solid #f5f5f5;
}
</style>
