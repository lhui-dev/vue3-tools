<template>
  <div class="app">
    <el-config-provider
      :size="componentSize"
      :locale="locale"
      :button="buttonConfig"
      :message="messageConfig"
    >
      <!-- 路由出口 -->
      <router-view />
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';

import { useApplicationStore } from '@/store/hook';
import { useI18n } from '@/hooks';

const appStore = useApplicationStore();
const { componentSize } = storeToRefs(appStore);

// language hook
const { locale } = useI18n();

// 按钮配置
const buttonConfig = reactive({
  autoInsertSpace: true /* 两个中文字符之间自动插入空格 */
});

// 消息提示数量配置
const messageConfig = reactive({
  grouping: true /* 合并内容相同的消息 */,
  duration: 2000 /* 显示时间，单位为毫秒 */,
  max: 1 /* 可同时显示的消息最大数量 */
});
</script>

<style scoped lang="less">
.app {
  width: 100vw;
  height: 100vh;
}
</style>
