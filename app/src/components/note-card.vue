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
          <div class="setting-item" @click.stop>
              <el-icon class="setting-icon"><EditPen /></el-icon>
              <p class="setting-text">{{$t("update")}}</p>
          </div>
          <div class="setting-item" @click.stop>
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
    <div class="content">
      <p> {{ title }} </p>
      <p> {{ $t("edit") }} {{ time }} </p>
    </div>
  </div>
</template>

<script setup>
import { More,EditPen,Delete } from '@element-plus/icons-vue'
import useTheme from '@/hook/theme'
const { theme } = useTheme()
defineProps({
  title: {
    type: String,
    default: ''
  },
  time: {
    type: String,
    default: ''
  }
})
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
  padding-top:24px ;
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