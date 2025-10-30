<template>
  <div class="home">
    <h2 class="title">{{$t("Recent")}}</h2>
    <div class="notes">
      <note-add @click="()=> editNote(-1)"/>
      <note-card 
      v-for="n in 6" 
      title="Webpack构建流程面试必备"
      time="2024-06-01 12:30"
      :key="n"
      @click="() => editNote(n)"/>
    </div>
  </div>
</template>

<script setup> 
import noteCard from '@/components/note-card.vue';
import { useRouter } from 'vue-router';
import noteAdd from '@/components/note-add.vue';
const router = useRouter();
const editNote=(id)=>{
  if(id===-1){
    router.push({
      path: '/markdown/new'
    })
    return;
  }
  router.push({
    path: `/markdown/${id}`
  })
}
</script>

<style scoped lang="scss">
.home {
  /* 限制最大宽度并水平居中，让页面在大屏上看起来居中 */
  padding: 6rem 20px 2rem;
  max-width: 1430px;
  margin: 0 auto;
  .title{
    margin: 0 0 1rem 0;
    text-align: left; /* 标题左对齐 */
  }
  .notes{
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: flex-start; /* 水平居中卡片 */
    align-items: flex-start;
  }
}
</style>