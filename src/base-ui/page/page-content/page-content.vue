<template>
  <div class="page-content">
    <div class="content-button" v-if="props.pageTableConfig.tableConfig?.showHeader">
      <el-button v-if="showAdd" type="primary" @click="handleCreateBtn">新建</el-button>
      <!-- 表格外部操作插槽：如导出等 -->
      <slot name="btn"></slot>
    </div>
    <div class="content-table">
      <base-table
        :table-data="tableData"
        :table-items="props.pageTableConfig.tableItems"
        :table-config="props.pageTableConfig.tableConfig?.options"
      >
        <template #btn="scope">
          <el-button v-if="showEdit" color="#3498db" :link="showLink" @click="handleUpdateBtn(scope.row)">
            编辑
          </el-button>
          <el-button v-if="showDelete" color="#e74c3c" :link="showLink" @click="handleDeleteBtn(scope.row)">
            删除
          </el-button>
          <!-- 表格内部对于单个数据的操作：如下载、查看详情等 -->
          <slot name="itemBtn"></slot>
        </template>
        <!-- 对外面释放插槽 -->
        <template v-for="slotItem in useSlotItems" :key="slotItem.prop" #[slotItem.prop]="scope">
          <slot :name="slotItem.prop" :row="scope.row"></slot>
        </template>
      </base-table>
    </div>
    <div class="content-footer">
      <div class="content-button"></div>
      <!--  分页区域  -->
      <div class="pagination-wrap">
        <el-pagination
          :page-size="page.size"
          :page-sizes="pageSizes"
          :current-page="page.page"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElMessageBox } from 'element-plus';
import BaseTable from '../../table/base-table/base-table.vue';
import type { IPageContentProps } from '@/base-ui/page/page-content/types';
import type { ITableItem } from '@/base-ui/table/base-table/types';

// props
const props = withDefaults(defineProps<IPageContentProps>(), {
  showAdd: true,
  showEdit: true,
  showDelete: true,
  showLink: true
});

// 定义emit事件
const emit = defineEmits<{
  (e: 'search', value: { size?: number; page?: number }): void;
  (e: 'create'): void;
  (e: 'delete', value: any): void;
  (e: 'update', value: any): void;
}>();

// 获取需要插槽的item
const useSlotItems = props.pageTableConfig.tableItems.filter((v: ITableItem) => v.useSlot);

// 创建、更新、删除操作的回调
const handleCreateBtn = () => {
  emit('create');
};
const handleUpdateBtn = (data: any) => {
  emit('update', data);
};
const handleDeleteBtn = (data: any) => {
  ElMessageBox.confirm('是否确认删除数据?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    emit('delete', data);
  });
};

// 分页：页大小、当前页变化的回调
const handleSizeChange = (size: number) => {
  emit('search', { size });
};
const handleCurrentChange = (page: number) => {
  emit('search', { page });
};
</script>

<style scoped lang="less">
.page-content {
  padding-top: 10px;

  .content-button {
    text-align: right;
    margin-bottom: 10px;
  }

  .content-footer {
    display: flex;
    margin-top: 10px;
    height: 40px;
    align-items: center;
    justify-content: space-between;
  }
}

.page-content :deep(.el-table th) {
  background-color: #f8f8f8;
}
</style>
