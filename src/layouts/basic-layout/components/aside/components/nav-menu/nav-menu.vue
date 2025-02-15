<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/vue.svg" alt="...">
      <span v-show="!props.isFold" class="title">{{ SIDEBAR_TITLE }}</span>
    </div>
    <el-menu
      default-active="2"
      class="menu"
      :collapse="props.isFold"
      :text-color="SIDEBAR_TEXT_COLOR"
      :active-text-color="SIDEBAR_ACTIVE_TEXT_COLOR"
      :background-color="SIDEBAR_BACKGROUND_COLOR"
    >
      <el-sub-menu index="1">
        <template #title>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span>Navigator Four</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { SIDEBAR_TITLE, SIDEBAR_TEXT_COLOR, SIDEBAR_BACKGROUND_COLOR, SIDEBAR_ACTIVE_TEXT_COLOR } from '@/constants';

// props
const props = withDefaults(defineProps<{ isFold?: boolean }>(), { isFold: false });

</script>
<style scoped lang="less">
.main-menu {
  height: 100%;
  background: #001529;

  .logo {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    height: 28px;
    padding: 20px 10px 20px 10px;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
    }
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background: #0a60bd;
  }
}
</style>
