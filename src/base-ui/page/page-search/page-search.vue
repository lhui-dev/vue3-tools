<template>
  <div class="page-search">
    <!-- 标题 -->
    <div class="title" v-if="props.title">{{ title }}</div>
    <!-- 数据展示 -->
    <div class="data-wrap">
      <slot name="data"></slot>
    </div>
    <!-- 筛选 -->
    <div class="filter-wrap clearfix">
      <div class="search-item" v-for="item in props.formItems" :key="item.field">
        <div class="label">{{ item.label }}:</div>
        <div class="form">
          <!-- 输入框 -->
          <template
            v-if="item.type === 'input' || item.type === 'password' || item.type === 'email'"
          >
            <el-input
              v-model="formData[item.field]"
              v-bind="item.otherOption"
              :placeholder="item.placeholder"
              :show-password="item.type === 'password'"
            ></el-input>
          </template>
          <!-- 下拉选择 -->
          <template v-if="item.type === 'select'">
            <el-select
              v-model="formData[item.field]"
              :placeholder="item.placeholder"
              style="width: 100%"
            >
              <el-option
                v-for="option in item.option"
                v-bind="item.otherOption"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              ></el-option>
            </el-select>
          </template>
          <!-- 时间选择 -->
          <template v-if="item.type === 'datepicker'">
            <el-date-picker
              v-model="formData[item.field]"
              v-bind="item.otherOption"
              style="width: 100%"
            />
          </template>
        </div>
      </div>
      <div class="button-item">
        <el-button :loading="loading" type="primary" @click="handleSearch">搜索</el-button>
        <el-button :loading="loading" @click="handleReset">重置</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { IPageSearchProps } from './types';

const route = useRoute();

const props = withDefaults(defineProps<IPageSearchProps>(), {
  formItems: () => [],
  loading: false
});

// 自定义事件
const emit = defineEmits<{
  (e: 'init', value: any): void;
  (e: 'search', value: any): void;
}>();

// 定义form的数据
const formOriginData: any = {};
for (let item of props.formItems) {
  formOriginData[item.field] = item.default || '';
}
// 保存原始的表单数据内容
const formData = ref({ ...formOriginData });
// 初始化内容
emit('init', formData.value);

// 按钮
const handleSearch = () => {
  emit('search', formData.value);
};
// 重置
const handleReset = () => {
  formData.value = formOriginData;
  emit('search', formOriginData);
};

// 显示标题
const title = computed(() => {
  if (props.title) {
    if (typeof props.title === 'boolean') {
      return route.meta.name;
    } else {
      return props.title;
    }
  }
  return '';
});
</script>

<style scoped lang="less">
.title {
  color: #111111;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 10px;
}

.filter-wrap {
  .button-item {
    width: 200px;
    float: left;
    padding: 10px 0;
  }

  .search-item {
    float: left;
    display: flex;
    align-items: center;
    padding: 10px 0;
    width: 340px;
    box-sizing: border-box;
    margin-right: 20px;

    .label {
      padding-right: 10px;
      font-size: 13px;
      color: #999999;
      font-weight: 600;
    }

    .form {
      flex: 1;
    }
  }
}

:deep(.filter-wrap .el-input__inner) {
  background-color: #f0f0f0;
  border: none;
  color: #111111;
  font-size: 13px;
}

:deep(.filter-wrap .el-date-editor .el-range-input) {
  background-color: transparent;
  color: #111111;
  font-size: 13px;
}
</style>
