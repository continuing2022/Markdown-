<template>
  <div class="home">
    <h2 class="title">{{$t("Recent")}}</h2>
    <div class="notes">
      <note-add @click="()=> editNote(-1)"/>
      <note-card 
      v-for="item in notes" 
      :title="item.title"
      :time="item.updated_at"
      :key="item.id"
      @delete-note-handle="() => deleteNoteHandle(item.id)"
      @update-title-handle="(newTitle) => updateTitleHandle(item.id, newTitle)"
      @click="() => editNote(item.id)"/>
    </div>
  </div>
</template>

<script setup> 
import noteCard from '@/components/note-card.vue';
import { useRouter } from 'vue-router';
import { getNotes, deleteNote, updateNote } from '@/api';
import noteAdd from '@/components/note-add.vue';
import { ref, onMounted } from 'vue';
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
const deleteNoteHandle=async(id)=>{
  await deleteNote(id);
  // 删除后刷新列表
  const res = await getNotes();
  notes.value = res.data.data;
};
const updateTitle=async(id,newTitle)=>{
  await updateNote(id,{
    title: newTitle
  });
  // 更新后刷新列表
  const res = await getNotes();
  notes.value = res.data.data;
};
// 调用接口获取数据
const notes = ref([]);  
onMounted(async()=>{
  const res = await getNotes();
  notes.value = res.data.data;
});
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