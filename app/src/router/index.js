import { createRouter,createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Markdown from "@/views/markdown.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path:"/markdown/:id?",
      component:Markdown,
    }
  ]
})
export default router; 