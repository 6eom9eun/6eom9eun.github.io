<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()

const smoothScrollTo = (targetId: string) => {
  const target = document.getElementById(targetId)
  if (target) {
    const headerHeight = 80 // 헤더의 높이
    const targetPosition = target.offsetTop - headerHeight
    const currentPosition = window.pageYOffset
    const distance = targetPosition - currentPosition
    const duration = Math.min(Math.abs(distance) / 2, 800) // 최대 800ms, 거리에 따라 조정

    let start: number | null = null

    const animateScroll = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)

      // easeOutCubic 함수 적용
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
      const easedProgress = easeOutCubic(progress)

      window.scrollTo(0, currentPosition + distance * easedProgress)

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
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
  <header class="header">
    <div class="header__container">
      <div class="header__logo">
        <h1 class="logo__text">6eomDEV</h1>
      </div>

      <nav class="header__nav">
        <ul class="nav__list">
          <li class="nav__item">
            <a href="#intro" class="nav__link" @click="handleNavClick($event, 'intro')">소개</a>
          </li>
          <li class="nav__item">
            <a href="#skills" class="nav__link" @click="handleNavClick($event, 'skills')">기술</a>
          </li>
          <li class="nav__item">
            <a href="#experience" class="nav__link" @click="handleNavClick($event, 'experience')"
              >경력</a
            >
          </li>
          <li class="nav__item">
            <a href="#history" class="nav__link" @click="handleNavClick($event, 'history')"
              >히스토리</a
            >
          </li>
          <li class="nav__item">
            <a href="#contact" class="nav__link" @click="handleNavClick($event, 'contact')">연락</a>
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
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/mixin';

.header {
  @include mixin.position-fixed;
  @include mixin.glass-morphism();
  z-index: 1000;
  padding: 1rem 0;

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
    }
  }

  &__nav {
    .nav__list {
      @include mixin.flex-center;
      gap: 2rem;
      list-style: none;
      margin: 0;
      padding: 0;

      @include mixin.mobile {
        display: none;
      }
    }

    .nav__link {
      @include mixin.smooth-transition();
      color: var(--text-secondary);
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 8px;

      &:hover {
        color: var(--accent-primary);
        background: var(--glass-bg);
      }
    }
  }

  &__actions {
    @include mixin.flex-center;
    gap: 1rem;
  }
}

.theme-toggle {
  @include mixin.glass-card(12px, 0.75rem);
  @include mixin.smooth-transition();

  background: var(--glass-bg);
  border: none;
  cursor: pointer;
  color: var(--text-primary);

  .theme-icon {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: var(--surface-hover);
    transform: translateY(-2px) rotate(10deg);
  }
}
</style>
