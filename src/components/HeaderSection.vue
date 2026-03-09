<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()

const scrollProgress = ref(0)
const activeSection = ref('intro')
const isScrolled = ref(false)

const sections = ['intro', 'skills', 'experience', 'history', 'contact']

const updateScroll = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
  isScrolled.value = scrollTop > 20

  // 현재 활성 섹션 감지
  for (const id of [...sections].reverse()) {
    const el = document.getElementById(id)
    if (el && scrollTop >= el.offsetTop - 120) {
      activeSection.value = id
      break
    }
  }
}

onMounted(() => window.addEventListener('scroll', updateScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', updateScroll))

const smoothScrollTo = (targetId: string) => {
  const target = document.getElementById(targetId)
  if (target) {
    const headerHeight = 80
    const targetPosition = target.offsetTop - headerHeight
    const currentPosition = window.pageYOffset
    const distance = targetPosition - currentPosition
    const duration = Math.min(Math.abs(distance) / 2, 800)

    let start: number | null = null

    const animateScroll = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
      window.scrollTo(0, currentPosition + distance * easeOutCubic(progress))
      if (progress < 1) requestAnimationFrame(animateScroll)
    }

    requestAnimationFrame(animateScroll)
  }
}

const handleNavClick = (event: Event, targetId: string) => {
  event.preventDefault()
  smoothScrollTo(targetId)
}
</script>

<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <div class="header__container">
      <div class="header__logo">
        <h1 class="logo__text">6eomDEV</h1>
      </div>

      <nav class="header__nav">
        <ul class="nav__list">
          <li v-for="item in [
            { id: 'intro', label: '소개' },
            { id: 'skills', label: '기술' },
            { id: 'experience', label: '경력' },
            { id: 'history', label: '히스토리' },
            { id: 'contact', label: '연락' },
          ]" :key="item.id" class="nav__item">
            <a
              :href="`#${item.id}`"
              class="nav__link"
              :class="{ active: activeSection === item.id }"
              @click="handleNavClick($event, item.id)"
            >
              {{ item.label }}
              <span v-if="activeSection === item.id" class="nav__indicator"></span>
            </a>
          </li>
        </ul>
      </nav>

      <div class="header__actions">
        <button
          @click="toggleTheme"
          class="theme-toggle"
          :aria-label="isDark ? '라이트 모드로 전환' : '다크 모드로 전환'"
        >
          <svg v-if="isDark" class="theme-icon" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3V5M12 19V21M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" />
          </svg>
          <svg v-else class="theme-icon" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- 스크롤 진행 바 -->
    <div class="header__progress">
      <div class="progress__bar" :style="{ width: scrollProgress + '%' }"></div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/mixin';

.header {
  @include mixin.position-fixed;
  z-index: 1000;
  padding: 1rem 0;
  transition:
    backdrop-filter 0.4s ease,
    background 0.4s ease,
    box-shadow 0.4s ease;
  background: var(--glass-bg-subtle);
  backdrop-filter: blur(var(--backdrop-blur-sm));
  -webkit-backdrop-filter: blur(var(--backdrop-blur-sm));
  border-bottom: 1px solid transparent;

  &.scrolled {
    background: var(--glass-bg-strong);
    backdrop-filter: blur(var(--backdrop-blur-lg)) saturate(180%);
    -webkit-backdrop-filter: blur(var(--backdrop-blur-lg)) saturate(180%);
    border-bottom-color: var(--glass-border);
    box-shadow:
      0 4px 24px var(--glass-shadow),
      inset 0 -1px 0 rgba(255, 255, 255, 0.05);
  }

  &__container {
    @include mixin.container();
    @include mixin.flex-between;
  }

  &__logo {
    .logo__text {
      @include mixin.gradient-text();
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
      letter-spacing: -0.02em;
    }
  }

  &__nav {
    .nav__list {
      @include mixin.flex-center;
      gap: 0.5rem;
      list-style: none;
      margin: 0;
      padding: 0;

      @include mixin.mobile {
        display: none;
      }
    }

    .nav__link {
      @include mixin.smooth-transition();
      position: relative;
      color: var(--text-secondary);
      text-decoration: none;
      font-weight: 500;
      font-size: 0.9rem;
      padding: 0.5rem 1rem;
      border-radius: 10px;

      &:hover {
        color: var(--text-primary);
        background: var(--glass-bg);
      }

      &.active {
        color: var(--accent-primary);
        background: rgba(59, 130, 246, 0.08);
      }

      .nav__indicator {
        position: absolute;
        bottom: 2px;
        left: 50%;
        transform: translateX(-50%);
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: var(--accent-primary);
        box-shadow: 0 0 6px var(--glow-primary);
        animation: indicatorPulse 2s ease-in-out infinite;
      }
    }
  }

  &__actions {
    @include mixin.flex-center;
    gap: 1rem;
  }

  &__progress {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--glass-bg);
  }
}

.progress__bar {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2, #06b6d4);
  border-radius: 0 2px 2px 0;
  transition: width 0.1s linear;
  box-shadow: 0 0 8px var(--glow-primary);
}

.theme-toggle {
  @include mixin.glass-morphism(var(--glass-bg), var(--glass-border), var(--backdrop-blur-sm));
  border-radius: 12px;
  padding: 0.6rem;
  @include mixin.smooth-transition();
  border: none;
  cursor: pointer;
  color: var(--text-primary);

  .theme-icon {
    width: 20px;
    height: 20px;
    display: block;
  }

  &:hover {
    background: var(--glass-bg-strong);
    box-shadow: 0 0 16px var(--glow-secondary), 0 4px 16px var(--glass-shadow);
    transform: translateY(-1px) rotate(10deg);
  }
}

@keyframes indicatorPulse {
  0%, 100% { opacity: 1; transform: translateX(-50%) scale(1); }
  50% { opacity: 0.6; transform: translateX(-50%) scale(1.5); }
}
</style>
