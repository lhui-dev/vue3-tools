<template>
  <el-dialog v-model="dialogVisible" :title="props.title" width="500px" center @close="handleClose">
    <!--  表单区域  -->
    <div>
      <base-form ref="customFormRef" v-bind="props.modalConfig" v-model="formData" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button :loading="loading" @click="dialogVisible = false">取消</el-button>
        <el-button :loading="loading" type="primary" @click="handleConfirmClick">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, withDefaults, defineExpose } from 'vue';
import BaseForm from '@/base-ui/form/base-form/base-form.vue';
import type { IPageModalProps } from './types';

const props = withDefaults(defineProps<IPageModalProps>(), {
  primaryKey: 'id',
  loading: false,
  title: '信息'
});

// 添加默认值
props.modalConfig.formItems.forEach(item => {
  if (item.default) {
    formData.value[item.field] = item.default;
  }
});

// 自定义事件
const emit = defineEmits<{
  /**
   * 新增
   * @param e
   * @param value
   */
  (e: 'add', value: any): void;
  /**
   * 编辑
   * @param e
   * @param value
   */
  (e: 'edit', value: any): void;
}>();

const customFormRef = ref<any>();
// 表单数据
const formData = ref<any>({});
// 是否展示对话框
const dialogVisible = ref<boolean>(false);

// 将默认值放入表单数据中
watch(
  () => props.defaultData,
  (newValue: any) => {
    for (const item of props.modalConfig.formItems) {
      formData.value[item.field] = newValue[item.field];
    }
  }
);

// 点击确认按钮触发的回调
const handleConfirmClick = () => {
  const validateForm = customFormRef?.value.validateForm;
  if (validateForm) {
    validateForm().then(() => {
      if (props.defaultData[props.primaryKey]) {
        // 编辑
        emit('edit', formData.value);
      } else {
        // 新增
        emit('add', formData.value);
      }
    });
  }
};

// 关闭对话框回调逻辑
const handleClose = () => {
  // 重置表单内容
  customFormRef.value?.resetForm();
};

// 暴露给外部的属性和方法
defineExpose({ dialogVisible });
</script>

<style scoped lang="less"></style>
