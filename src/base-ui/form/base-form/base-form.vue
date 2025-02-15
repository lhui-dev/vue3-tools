<template>
  <el-form
    class="form"
    :model="modelValue"
    :rules="formRules"
    ref="formRef"
    :label-width="labelWidth"
    label-position="right"
  >
    <el-row>
      <el-col v-bind="colLayout" v-for="(item, index) in formItems" :key="`col-${index}`">
        <el-form-item
          :prop="item.field"
          :label="item.label"
          v-if="!item.hidden"
          style="width: 100%"
        >
          <!-- 输入框 -->
          <template v-if="item.type === 'input' || item.type === 'password'">
            <el-input
              :model-value="modelValue[item.field]"
              v-bind="item.otherOption"
              :placeholder="item.placeholder"
              :show-password="item.type === 'password'"
              @update:modelValue="handleValueChange($event, item.field)"
            ></el-input>
          </template>
          <!-- 数字输入框 -->
          <template v-if="item.type === 'number'">
            <el-input-number
              :model-value="modelValue[item.field]"
              v-bind="item.otherOption"
              :placeholder="item.placeholder"
              style="width: 100%"
              @update:modelValue="handleValueChange($event, item.field)"
            ></el-input-number>
          </template>
          <!-- 下拉选择 -->
          <template v-if="item.type === 'select'">
            <el-select
              :model-value="modelValue[item.field]"
              :placeholder="item.placeholder"
              style="width: 100%"
              @update:modelValue="handleValueChange($event, item.field)"
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
              :model-value="modelValue[item.field]"
              v-bind="item.otherOption"
              style="width: 100%"
              @update:modelValue="handleValueChange($event, item.field)"
            />
          </template>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import type { PropType } from 'vue';
import type { FormInstance } from 'element-plus';
import type { IFormItem } from '@/base-ui/form/base-form/types';

export default defineComponent({
  props: {
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    modelValue: {
      type: Object,
      default: () => {}
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    colLayout: {
      type: Object,
      default: () => ({
        // xl: 6, // >1920px 4个
        xl: 4, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  setup(props, { emit }) {
    // ref
    const formRef = ref<FormInstance>();
    // 表单校验规则
    const formRules = reactive<{ [item: string]: any }>({});

    // 遍历表单项
    props.formItems.forEach(item => {
      if (item.rules && item.rules.length) {
        formRules[item.field] = item.rules;
      }
    });

    // 表单校验
    const validateForm = () => {
      return new Promise(resolve => {
        formRef.value?.validate(valid => {
          if (valid) {
            resolve('ok');
          }
        });
      });
    };

    // 清除表单校验
    const resetForm = () => {
      formRef.value?.resetFields();
    };

    // 表单项的值发生变化
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value });
    };

    // 返回
    return {
      formRef,
      formRules,
      handleValueChange,
      validateForm,
      resetForm
    };
  }
});
</script>
