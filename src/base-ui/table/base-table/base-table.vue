<template>
  <el-table
    :data="props.tableData"
    style="width: 100%"
    v-bind="props.tableConfig"
    v-on="props.tableCallback"
  >
    <template v-for="item in props.tableItems" :key="item.prop">
      <el-table-column v-bind="item">
        <template v-if="!item.type" #default="scope">
          <slot :name="item.prop" :row="scope.row">
            {{ scope.row[item.prop] }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script setup lang="ts">
import type { ITableProps } from '@/base-ui/table/base-table/types';

const props = withDefaults(defineProps<ITableProps>(), {
  // 表格回调函数
  tableCallback: {}
});
</script>

<style lang="less" scoped></style>
