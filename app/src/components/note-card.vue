<template>
  <div class="card">
    <div class="nav">
      <div class="icon">📚</div>
      <el-popover
        trigger="click"
        :effect="theme"
        placement="bottom"
      >
        <div class="settings">
          <div class="setting-item" @click.stop="updateTitle">
              <el-icon class="setting-icon"><EditPen /></el-icon>
              <p class="setting-text">{{$t("update")}}</p>
          </div>
          <div class="setting-item" @click.stop="deleteNote">
            <el-icon class="setting-icon"><Delete /></el-icon>
            <p class="setting-text">{{$t("delete")}}</p>
          </div>
        </div>
        <template #reference>
          <!-- 阻止点击事件冒泡到父组件（home.vue 对 note-card 使用了 @click） -->
          <el-icon class="more" @click.stop><More /></el-icon>
        </template>
      </el-popover>
    </div>
    <div class="content" :style="{ paddingTop: moveText ? '24px' : '63px' }">
      <p ref="text"> {{ title }} </p>
      <p> {{ $t("edit") }} {{ formattedTime }} </p>
    </div>
  </div>
</template>

<script setup>
import { More,EditPen,Delete } from '@element-plus/icons-vue'
import { computed, onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import useTheme from '@/hook/theme';
const { theme } = useTheme()
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  time: {
    type: String,
    default: ''
  }
})
const formattedTime = computed(() => {
  // 使用 props.time（在 <script setup> 中通过 defineProps 返回的对象）
  return props.time ? dayjs(props.time).format('MMM D, YYYY') : '';
});

const emit = defineEmits(['delete-note-handle', 'update-title-handle']);

// 获取标题文本 DOM ref（用于计算是否需要移动文本样式）
const text = ref(null);
const moveText = ref(false);
onMounted(() => {
  if (text.value && text.value.scrollHeight > 48) {
    moveText.value = true;
  }
});

const updateTitle = async () => {
  const newTitle = window.prompt('Enter new title', props.title);
  if (newTitle !== null) {
    emit('update-title-handle', newTitle);
  }
};

// 删除笔记：发出事件，父组件负责删除逻辑
const deleteNote = () => {
  emit('delete-note-handle');
};
</script>

<style scoped lang="scss">
.card{
  width: 280px;
  height: 200px;
  border-radius: 10px;
  background-color: var(--card-bg);
  padding: 24px; 
  transition: all 0.5s;
  &:hover{
    transform: translateY(-4px);
  } 
}
.nav{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 62px;
  .icon{
    font-size:4rem;
  }
  .more{
    cursor: pointer;
    color: var(--muted);
    transform: rotate(90deg);
    font-size:1.5rem;
    width:40px;
    height: 40px;
    &:hover{
      border-radius:50%;
      background-color: var(--card-more);
    }
  }
}
.settings{
  width: 120px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .setting-item{
    display: flex ;
    align-items: center;  
    // justify-content: space-between;
    .setting-icon{
      font-size: 1.2rem;
      margin-right: 1rem;
    }
    .setting-text{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &:hover{
      cursor: pointer;
      background-color: var(--card-more);
      border-radius: 4px;
    }
  }
}
.content{
  text-align: left; // 新增：使内部文本左对齐
  p{
    margin: 0;
    &:first-child{
      font-size: 1.7rem;
      font-weight: 600;
      margin-bottom: 12px;
    }
    &:last-child{
      font-size: 1rem;
      color: var(--muted);
    }
  }
}
</style>