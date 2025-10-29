<template>
  <div class="header">
    <div class="left">
      <!-- public 下的静态资源可以通过根路径访问 -->
      <img :src="`/assets/images/logo-${theme}.svg`" alt="Logo" class="logo" />
    </div>
    <div class="right">
      <div class="theme" @click="handleThemeChange">
        <el-icon v-if="theme === 'dark'" size="20px"><Moon /></el-icon>
        <el-icon v-else size="20px"><Sunny /></el-icon>
      </div>
      <el-dropdown 
        placement="top-start" 
        popper-class="dropdown-style"
        trigger ="click"
        @command="handleCommand">
        <el-button> {{ currentLanguage }} </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="Chinese">中文</el-dropdown-item>
            <el-dropdown-item command="English">English</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-tooltip
        effect="dark"
        content="continue kai"
        placement="top"
      >
        <img class="photo" src="/assets/images/photo.png" alt="photo" />
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import { Moon, Sunny, Setting } from '@element-plus/icons-vue'
import { ref, computed } from 'vue'
import useTheme from '@/hook/theme'

// 主题
const { theme, setTheme } = useTheme()
const handleThemeChange = () => {
  setTheme(theme.value==='light' ? 'dark' : 'light')
}
// 语言切换
const currentLanguage = ref('Chinese')
const handleCommand=(command)=>{
  currentLanguage.value = command
}

</script>

<style scoped lang="scss">
.header{
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  height: 64px;
  width:100%;
}
.logo {
  height: 20px;
}
.right {
  display: flex;
  align-items: center;
  gap: 15px;
  .theme {
    cursor: pointer;
    width:30px;
    height: 30px;
    border: 1px solid var(--muted);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    transition: all 200ms;
  }
  .theme:hover {
    border-color: var(--text-color);
    background-color: rgba(0,0,0,0.04);
  }
  .translation{
    cursor: pointer;
    width:30px;
    height: 30px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(237, 239, 250);
  }
  .photo{
    width:38px;
    height:38px;
    border-radius:50%;
  }
}

</style>