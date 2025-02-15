<template>
  <div class="page-container">
    <el-card class="tip module" shadow="hover">
      <template #header>小提示</template>
      <div class="content">
        1. 表格均采用element-plus的表格组件，通过额外封装的一个
        base-table（src/components/common/DhTable/base-table.vue） 组件，传入具体配置即可成型
        <br />
      </div>
      <el-table class="field-info" :data="cpsInfo" border>
        <el-table-column label="props" prop="name"></el-table-column>
        <el-table-column label="字段类型" prop="type"></el-table-column>
        <el-table-column label="默认值" prop="default"></el-table-column>
        <el-table-column label="介绍" prop="info"></el-table-column>
      </el-table>

      <el-table class="field-info" :data="tableItemsInfo" border>
        <el-table-column label="props【ITableItem】" prop="name"></el-table-column>
        <el-table-column label="字段类型" prop="type"></el-table-column>
        <el-table-column label="默认值" prop="default"></el-table-column>
        <el-table-column label="介绍" prop="info"></el-table-column>
      </el-table>
    </el-card>

    <el-card class="module" shadow="hover">
      <template #header>基础表格</template>
      <div class="content">
        <BaseTable :tableItems="tableItems" :tableData="shopData" :tableCallback="tableCallback">
          <!-- 字段显示格式化 -->
          <template #name="scope">
            <div class="shop-info">
              <el-image
                class="shop-image"
                :src="scope.row.image"
                :preview-src-list="[scope.row.image]"
                fit="cover"
                preview-teleported
              ></el-image>
              <div class="shop">
                <div class="name two-line">{{ scope.row.name }}</div>
                <div class="phone">电话：{{ scope.row.phone }}</div>
              </div>
            </div>
          </template>
          <template #business_status="scope">
            <el-link :type="scope.row.business_status ? 'success' : 'warning'" :underline="false">
              {{ scope.row.business_status ? '营业中' : '歇业中' }}
            </el-link>
          </template>
          <template #status="scope">
            <el-link :type="scope.row.status ? 'success' : 'danger'" :underline="false">
              {{ scope.row.status ? '正常' : '异常' }}
            </el-link>
          </template>
          <template #booking_type="scope">
            {{
              scope.row.booking_type ? (scope.row.booking_type === 1 ? '预约取号' : '预约取号 即时取号') : '即时取号'
            }}
          </template>
          <template #city="scope">
            {{ `${scope.row.province}-${scope.row.city}-${scope.row.district}` }}
          </template>
        </BaseTable>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import shopData from './shopData';
import type { ITableItem } from '@/base-ui/table/base-table/types';
import BaseTable from '@/base-ui/table/base-table/base-table.vue';

const cpsInfo = [
  { name: 'tableItems', type: 'ITableItem[]', default: '必传', info: '渲染表格字段' },
  { name: 'tableConfig', type: 'Object，属性为el-table的配置项', default: '空', info: '配置表格' },
  {
    name: 'tableCallback',
    type: 'Object，属性为el-table的回调事件',
    default: '空',
    info: 'el-table的回调事件，事件名为key，事件函数为value'
  },
  { name: 'tableData', type: 'any[]', default: '必传', info: '表格数据' }
];
const tableItemsInfo = [
  { name: 'useSlot', type: 'Boolean', default: 'false', info: '是否使用插槽,使用插槽名为prop' },
  { name: '[tableProp:string]', type: 'any', default: '空', info: 'el-table-column的表格项配置' }
];

// 表格项
const tableItems: ITableItem[] = [
  { type: 'selection', prop: '' },
  { label: '店铺信息', prop: 'name', useSlot: true, width: '300' },
  { label: '评分', prop: 'score', useSlot: true, width: '180' },
  { label: '省市区', prop: 'city', useSlot: true, width: '170' },
  { label: '营业状态', prop: 'business_status', useSlot: true, width: '90' },
  { label: '店铺状态', prop: 'status', useSlot: true, width: '90' },
  { label: '取号类型', prop: 'booking_type', useSlot: true, 'min-width': '90' }
];

// 表格事件回调
const tableCallback = {
  'select': (selection: any) => {
    let shop = '';
    if (selection.length) {
      selection.forEach((v: any) => {
        shop += (v.name + ',');
      });
      ElMessage.success('当前回调：' + shop);
    } else {
      ElMessage.warning('取消选中');
    }
  }
};
</script>

<style lang="less" scoped>
.module {
  margin-bottom: 20px;
}

.field-info {
  margin-top: 10px;
}

.shop-info {
  display: flex;

  .shop-image {
    width: 60px;
    height: 60px;
    border-radius: 4px;
    margin-right: 10px;
    flex-shrink: 0;
  }

  .shop {
    font-size: 12px;
    color: #999999;
  }

  .name {
    height: 40px;
    color: #333333;
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
  }
}

:deep(.el-table th) {
  background-color: #f8f8f8;
}
</style>
