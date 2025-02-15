<template>
  <div class="container">

    <page-search :form-items="searchConfig.formItems" :title="searchConfig.title">
      <template #data>
        <div>
          <h3>销量</h3>
          <span>200000台</span>
        </div>
      </template>
    </page-search>
  </div>
</template>
<script setup lang="ts">
import PageSearch from '@/base-ui/page/page-search/page-search.vue';
import searchConfig from './config/search.config';

</script>
<style scoped lang="less">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
</style>
