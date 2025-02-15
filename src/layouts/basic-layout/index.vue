<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { useApplicationStore } from '@/store/hook';

const appStore = useApplicationStore();
const { isCollapse } = storeToRefs(appStore);
</script>

<template>
  <div class="layout-container">
    <el-container class="main-container">
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <el-scrollbar>
          <el-menu default-active="index" class="menu" router>
            <el-menu-item index="index">首页</el-menu-item>
            <el-sub-menu index="management">
              <template #title>分类管理</template>
              <el-menu-item index="category">商品分类</el-menu-item>
              <el-menu-item index="product">商品管理</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="system">
              <template #title>分页组件</template>
              <el-menu-item index="page/page-example">分页例子</el-menu-item>
              <el-menu-item index="role">角色管理</el-menu-item>
              <el-menu-item index="menu">菜单管理</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="chart-component">
              <template #title>图表组件</template>
              <el-menu-item index="bar-chart">饼状图</el-menu-item>
              <el-menu-item index="line-chart">折线图</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header height="68px">
          <div class="header-container header-class">
            <div class="logo">
              LEFT
            </div>
            <div>right</div>
          </div>
        </el-header>
        <el-main class="main-content">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<style scoped lang="less">
.layout-container {
  height: 100%;

  .main-container {
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

    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .main-content {
      background-color: rgba(240, 240, 240, 0.82);
    }
  }
}
</style>
