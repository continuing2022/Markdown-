<template>
  <div class="markdown">
    <textarea
      v-model="markdownContent"
      placeholder="写点 Markdown 内容吧..."
      class="textarea"
    ></textarea>
    <div 
      class="preview"
      v-html="compiledMarkdown">
    </div>
  </div>
</template>

<script setup> 
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import { marked } from 'marked'
import { useRoute, useRouter } from 'vue-router'
import { getNoteById,updateNote,createNote } from '@/api'
const route = useRoute()
const router = useRouter()

// 输入内容
const markdownContent = ref('# Hello Markdown!\n\n这是 **Vue3 + marked.js** 示例')
// 编译后的HTML内容
const compiledMarkdown = computed(() => {
  return marked.parse(markdownContent.value)
})
// 监听文本变化并且调用函数保存（使用 debounce 减少请求）
const saveTimer = ref(null)
const lastSaved = ref(markdownContent.value)

watch(markdownContent, (newValue) => {
  // 如果和上次已保存内容相同，则跳过
  if (newValue === lastSaved.value) return

  if (saveTimer.value) clearTimeout(saveTimer.value)

  // 用户停止输入 1200ms 后再保存一次
  saveTimer.value = setTimeout(async () => {
    const id = route.params.id
    try {
      if (id && id !== 'new') {
        console.log('Auto-saving note id:', id)
        await updateNote(id, { content: newValue })
        lastSaved.value = newValue
      } else {
        const res = await createNote({ content: newValue })
        const newId = res.data.data.id
        lastSaved.value = newValue
        // 切换到新创建的笔记路由
        router.replace({ path: `/markdown/${newId}` })
      }
    } catch (err) {
      console.error('Auto-save failed:', err)
    }
  }, 1200)
})

onBeforeUnmount(() => {
  if (saveTimer.value) clearTimeout(saveTimer.value)
})
onMounted(()=>{
  const id = route.params.id
  if(id && id !== 'new'){
    getNoteById(id).then(res => {
      markdownContent.value = res.data.data.content
    })
  }
})

</script>

<style scoped lang="scss">
.markdown {
  margin-top: 64px;
  padding: 24px;
  width: 100%;
  min-height: calc(100vh - 64px);
  display: flex;
  gap: 20px;
  box-sizing: border-box;
  background:var(--note-bg); /* page background for this view */
}

.textarea {
  width: 48%;
  padding: 18px;
  font-size: 15px;
  background: var(--note-content-bg);
  color: var(--text-color);
  border-radius: 6px 0 0 6px;
  outline: none;
  border:none;
  resize: vertical;
  min-height: calc(100vh - 120px);
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
  line-height: 1.6;
}

.textarea::placeholder{
  color: #9aa0a6;
}

.preview {
  width: 52%;
  padding: 20px;
  background: var(--note-content-bg);
  color: var(--text-color);
  border-radius: 0 6px 6px 0;
  min-height: calc(100vh - 120px);
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
  overflow-y: auto;
}

.preview h1, .preview h2, .preview h3 {
  margin-top: 0;
}

.preview pre, .preview code {
  display: block;
  background: #f4f4f4;
  color: #111;
  padding: 8px;
  border-radius: 4px;
  overflow: auto;
}

.preview a{
  color: #3366cc;
  text-decoration: underline;
}

@media (max-width: 900px) {
  .markdown { flex-direction: column; padding: 12px; }
  .textarea, .preview { width: 100%; border-radius: 6px; }
  .textarea { border-radius: 6px 6px 0 0; }
  .preview { border-radius: 0 0 6px 6px; }
}
</style>

