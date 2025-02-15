<template>
  <div class="base-charts">
    <div class="echarts-container" ref="echartsRef" :style="{ height, width }" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { useEcharts } from '@/hooks';
import type { RendererType } from '@/hooks/types';

/**
 * echarts props配置项信息
 */
interface IEchartsProps {
  width?: string; // 宽度
  height?: string; // 高度
  options: any; //配置项
  renderType: RendererType; // 渲染类型
}
// props配置
const props = withDefaults(defineProps<IEchartsProps>(), {
  width: '100%',
  height: '100%',
  renderType: 'svg'
});

const echartsRef = ref<HTMLElement>();
onMounted(() => {
  // 初始化echarts实例
  const { setOptions } = useEcharts(echartsRef.value!, props.renderType);
  watchEffect(() => {
    setOptions(props.options);
  });
});
</script>
<style scoped lang="less"></style>
