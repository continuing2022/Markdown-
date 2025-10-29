
<template>
  <div>
    <Header></Header>  
    <router-view />
  </div>

</template>

<script setup>
import Header from './components/header.vue'
</script>

<style scoped>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
</style>
