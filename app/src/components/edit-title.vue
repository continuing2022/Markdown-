<template>
  <div v-if="show">
    <!-- 蒙层 -->
    <div class="overlay"  @click="closeEdit"></div>

    <!-- 弹出编辑框 -->
    <div class="edit-title">
      <div class="content">
        <div class="icon">{{ icon }}</div>
        <el-input
          v-model="title"
          style="width: 200px;height: 50px; border-radius: 16px;"
          placeholder="Please input title"
        />
        <div class="btns">
          <el-button type="text" @click="confirm">确定</el-button>
          <el-button type="text" @click="closeEdit">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref , onMounted, watch } from "vue";
import { updateNote , getNoteById} from "@/api";
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '✏️',
  },
  editId: {
    type: Number,
    default: -1,
  },
});
const emit=defineEmits(['close-edit']);
const confirm = async () => {
  await updateNote(props.editId, { title: title.value });
  closeEdit();
};
const closeEdit = () => {
  emit('close-edit');
};
const title = ref('');
// 获取title
watch(() => props.editId, async (newId) => {
  if (newId !== -1) {
    const res = await getNoteById(newId);
    title.value = res.data.data.title;
  }
}, { immediate: true });
</script>

<style scoped lang="scss">
/* 🔹蒙层样式 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999; /* 在弹窗下面 */
}

/* 🔹弹出框样式 */
.edit-title {
  background-color: var(--edit-bg, #fff);
  border-radius: 16px;
  width: 220px;
  height: 260px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; /* 在蒙层上面 */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  padding: 20px;

  .content {
    padding: 20px 24px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    .icon{
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      width: 100px;
      height: 100px;
      font-size: 40px;
      background-color: var(--note-bg);
    }
  }

  .btns {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}
</style>
