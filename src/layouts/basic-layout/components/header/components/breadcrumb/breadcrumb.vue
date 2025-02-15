<template>
  <el-breadcrumb class="app-breadcrumb" :separator-icon="ArrowRight">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in routePath" :key="item.path" @click="handleClick">
        <span class="text" :class="{ last: index === routePath.length - 1 }">{{ item.meta.name }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const routePath = computed(() => {
  return route.matched;
});

const handleClick = () => {
  console.log('click');
};
</script>

<style scoped>
.text {
  color: #999999;
  cursor: pointer;
}

.last {
  color: #666666;
}
</style>
