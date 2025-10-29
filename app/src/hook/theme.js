import {ref, watchEffect } from 'vue';

const theme = ref(localStorage.getItem('theme') || 'dark');

const setTheme = (newTheme) => {
  theme.value = newTheme;
  localStorage.setItem('theme', newTheme);
}

watchEffect(() => {
  document.documentElement.setAttribute('data-theme', theme.value);
});

export default function(){
  return {
    theme,
    setTheme
  }
}