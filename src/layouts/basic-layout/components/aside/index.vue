<script setup lang="ts">
import NavMenu from './components/nav-menu/nav-menu.vue';

import { storeToRefs } from 'pinia';
import { useApplicationStore } from '@/store/hook';

const appStore = useApplicationStore();
const { isCollapse } = storeToRefs(appStore);
</script>

<template>
  <div class="container">
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <nav-menu :is-fold="isCollapse" />
    </el-aside>
  </div>

</template>

<style scoped lang="less">

.container {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    transition: width 0.3s ease-in-out; /* width change */
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
