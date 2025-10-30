<template>
  <div class="card">
    <el-icon class="card-add"><Plus /></el-icon>
    <p class="card-title">{{$t("create")}}</p>
  </div>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
.card{
  width: 280px;
  height: 200px;
  border-radius: 10px;
  border: 1px solid var(--muted);
  padding: 24px;  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .card-add{
    font-size: 2rem;
    color: var(--muted);
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: var(--card-more);
  }
  .card-title{
    margin-top: 1rem;
    font-size: 1.5rem;
    color: var(--text-color);
  }
}
</style>