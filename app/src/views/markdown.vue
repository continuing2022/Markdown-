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
import { ref, computed, onMounted } from 'vue'
import { marked } from 'marked'
import { useRoute } from 'vue-router'
const route = useRoute()

// 输入内容
const markdownContent = ref('# Hello Markdown!\n\n这是 **Vue3 + marked.js** 示例')
// 编译后的HTML内容
const compiledMarkdown = computed(() => {
  return marked.parse(markdownContent.value)
})
onMounted(()=>{
  const id = route.params.id
  if(id && id !== 'new'){
    // 模拟获取笔记内容
    markdownContent.value = `# 笔记 ${id}\n\n这是第 ${id} 个笔记的内容。`
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

