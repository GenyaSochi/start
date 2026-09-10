import { ref, watch } from 'vue'

const THEME_KEY = 'app_theme'
const theme = ref<'dark' | 'light'>('dark')

export function useTheme() {
  function init() {
    if (import.meta.server) return
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'light' || saved === 'dark') {
      theme.value = saved
    }
    apply()
  }

  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    if (import.meta.client) {
      localStorage.setItem(THEME_KEY, theme.value)
    }
    apply()
  }

  function apply() {
    if (import.meta.server) return
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  return { theme, init, toggle }
}