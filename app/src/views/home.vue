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
      @update-title-handle="(icon) => updateTitleHandle(item.id, icon)"
      @click="() => editNote(item.id)"/>
    </div>
    <edit-title 
      class="home-edit"
      :show="editShow"
      :icon="icon"
      :edit-id="editId"
      @close-edit="closeEdit">
    </edit-title> 
  </div>
</template>

<script setup> 
import noteCard from '@/components/note-card.vue';
import { useRouter } from 'vue-router';
import { getNotes, deleteNote } from '@/api';
import noteAdd from '@/components/note-add.vue';
import editTitle from '@/components/edit-title.vue';
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
const icon=ref('');
const editId=ref(-1);
const updateTitleHandle=async(id,icons)=>{
  icon.value = icons || '✏️';
  editId.value = id;
  editShow.value = true;
};
const editShow = ref(false);

const closeEdit=()=>{
  editShow.value = false;
  // 更新数据
  getNotes().then(res => {
    notes.value = res.data.data;
  });
};
// 调用接口获取数据
const notes = ref([]);
onMounted(async () => {
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