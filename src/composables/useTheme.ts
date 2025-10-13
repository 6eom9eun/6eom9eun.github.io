import { ref, computed, watch, onMounted } from 'vue'

export type Theme = 'light' | 'dark'

const currentTheme = ref<Theme>('light')
const systemPrefersDark = ref(false)

export function useTheme() {
  const isDark = computed(() => currentTheme.value === 'dark')

  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', currentTheme.value)
    updateDocumentTheme()
  }

  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
    localStorage.setItem('theme', theme)
    updateDocumentTheme()
  }

  const updateDocumentTheme = () => {
    const root = document.documentElement
    if (isDark.value) {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
  }

  const initializeTheme = () => {
    // Check system preference
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      systemPrefersDark.value = mediaQuery.matches

      mediaQuery.addEventListener('change', (e) => {
        systemPrefersDark.value = e.matches
      })
    }

    // Get saved theme from localStorage or use system preference
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      currentTheme.value = savedTheme
    } else {
      currentTheme.value = systemPrefersDark.value ? 'dark' : 'light'
    }

    updateDocumentTheme()
  }

  onMounted(() => {
    initializeTheme()
  })

  return {
    currentTheme: computed(() => currentTheme.value),
    isDark,
    systemPrefersDark: computed(() => systemPrefersDark.value),
    toggleTheme,
    setTheme
  }
}