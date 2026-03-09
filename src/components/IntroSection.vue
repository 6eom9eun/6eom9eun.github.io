<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePortfolio } from '@/composables/usePortfolio'

const { profile, introduction } = usePortfolio()
const sectionRef = ref<HTMLElement>()

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

onMounted(() => {
  if (sectionRef.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
          }
        })
      },
      { threshold: 0.3 },
    )
    observer.observe(sectionRef.value)
  }
})
</script>

<template>
  <section ref="sectionRef" id="intro" class="intro">
    <div class="intro__container">
      <div class="intro__content">
        <div class="intro__text">
          <h1 class="intro__title">
            <span class="title__greeting">안녕하세요 👋</span>
            <span class="title__name">{{ profile.nameKorean }}</span>
            <span class="title__role">AI/LLM & Backend Developer</span>
          </h1>

          <p class="intro__description">
            {{ introduction }}
          </p>

          <div class="intro__contact">
            <div class="contact__item">
              <span class="contact__label">📞</span>
              <span class="contact__value">{{ profile.phone }}</span>
            </div>
            <div class="contact__item">
              <span class="contact__label">📧</span>
              <span class="contact__value">{{ profile.email }}</span>
            </div>
          </div>

          <div class="intro__actions">
            <a
              href="#experience"
              class="btn btn--primary"
              @click="handleNavClick($event, 'experience')"
            >
              경력 보기
              <svg class="btn__icon" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            <a
              href="#contact"
              class="btn btn--secondary"
              @click="handleNavClick($event, 'contact')"
            >
              연락하기
            </a>
          </div>
        </div>

        <div class="intro__visual">
          <div class="visual__card">
            <div class="card__header">
              <div class="card__dots">
                <span class="dot dot--red"></span>
                <span class="dot dot--yellow"></span>
                <span class="dot dot--green"></span>
              </div>
            </div>
            <div class="card__content">
              <div class="code-line">
                <span class="code-keyword">const </span>
                <span class="code-variable">developer </span>
                <span class="code-operator">= </span>
                <span class="code-bracket">{</span>
              </div>
              <div class="code-line code-line--indent">
                <span class="code-property">name</span>
                <span class="code-operator">:</span>
                <span class="code-string">"{{ profile.nameKorean }}"</span>
                <span class="code-comma">,</span>
              </div>
              <div class="code-line code-line--indent">
                <span class="code-property">role</span>
                <span class="code-operator">:</span>
                <span class="code-string">"AI/LLM & Backend Developer"</span>
                <span class="code-comma">,</span>
              </div>
              <div class="code-line code-line--indent">
                <span class="code-property">passion</span>
                <span class="code-operator">:</span>
                <span class="code-string">"성장과 혁신"</span>
              </div>
              <div class="code-line">
                <span class="code-bracket">}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="intro__scroll">
        <div class="scroll__indicator">
          <span class="scroll__text">Scroll</span>
          <div class="scroll__line"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/mixin';

.intro {
  min-height: 100vh;
  @include mixin.flex-center;
  @include mixin.container();
  padding-top: 100px;

  &__container {
    width: 100%;
    position: relative;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;

    @include mixin.mobile {
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: center;
    }
  }

  &__text {
    @include mixin.fade-in(0.8s, 0.2s);
  }

  &__title {
    margin: 0 0 2rem 0;

    .title__greeting {
      display: block;
      font-size: 1.2rem;
      color: var(--text-secondary);
      margin-bottom: 0.5rem;
    }

    .title__name {
      display: block;
      font-size: 3rem;
      font-weight: 800;
      @include mixin.gradient-text();
      margin-bottom: 0.5rem;

      @include mixin.mobile {
        font-size: 2.5rem;
      }
    }

    .title__role {
      display: block;
      font-size: 1.5rem;
      color: var(--accent-primary);
      font-weight: 600;

      @include mixin.mobile {
        font-size: 1.2rem;
      }
    }
  }

  &__description {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }

  &__contact {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 2rem;

    .contact__item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-secondary);
    }
  }

  &__actions {
    display: flex;
    gap: 1rem;

    @include mixin.mobile {
      flex-direction: column;
      align-items: center;
    }
  }

  &__visual {
    @include mixin.fade-in(0.8s, 0.4s);
    @include mixin.floating();

    @include mixin.mobile {
      order: -1;
    }
  }

  &__scroll {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);

    @include mixin.mobile {
      display: none;
    }
  }
}

.visual__card {
  @include mixin.glass-morphism-deep();
  border-radius: 20px;
  padding: 1.5rem;
  background: var(--surface);
  max-width: 400px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  @include mixin.hover-glow(var(--glow-secondary));

  // 상단 하이라이트
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
    z-index: 1;
  }

  // 외부 glow 링
  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 22px;
    background: var(--gradient-border);
    z-index: -1;
    opacity: 0.6;
  }

  .card__header {
    display: flex;
    align-items: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--surface-border);
    margin-bottom: 1rem;

    .card__dots {
      display: flex;
      gap: 0.5rem;

      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;

        &--red {
          background: #ff5f57;
        }
        &--yellow {
          background: #ffbd2e;
        }
        &--green {
          background: #28ca42;
        }
      }
    }
  }

  .card__content {
    font-family: var(--mainNum-font);
    font-size: 0.9rem;
    line-height: 1.6;

    .code-line {
      margin-bottom: 0.25rem;

      &--indent {
        padding-left: 2rem;
      }
    }

    .code-keyword {
      color: var(--accent-secondary);
    }
    .code-variable {
      color: var(--accent-primary);
    }
    .code-operator {
      color: var(--text-secondary);
    }
    .code-bracket {
      color: var(--accent-tertiary);
    }
    .code-property {
      color: var(--text-primary);
    }
    .code-string {
      color: var(--accent-success);
    }
    .code-comma {
      color: var(--text-secondary);
    }
  }
}

.btn {
  @include mixin.modern-button();
  @include mixin.smooth-transition();

  text-decoration: none;
  font-weight: 600;
  gap: 0.5rem;

  &--primary {
    background: var(--gradient-primary);
    color: var(--text-inverse);
    border: none;
    box-shadow: 0 4px 20px var(--glow-primary);

    .btn__icon {
      width: 18px;
      height: 18px;
    }

    &:hover {
      box-shadow: 0 6px 30px var(--glow-secondary), 0 2px 8px rgba(0,0,0,0.2);
      transform: translateY(-3px);
    }
  }

  &--secondary {
    background: var(--glass-bg-strong);
    backdrop-filter: blur(var(--backdrop-blur));
    -webkit-backdrop-filter: blur(var(--backdrop-blur));
    color: var(--text-primary);
    border: 1px solid var(--glass-border-strong);

    &:hover {
      background: var(--surface-hover);
      box-shadow: 0 4px 20px var(--glass-shadow);
    }
  }
}

.scroll__indicator {
  @include mixin.flex-center;
  flex-direction: column;
  gap: 1rem;
  color: var(--text-tertiary);

  .scroll__text {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .scroll__line {
    width: 1px;
    height: 2rem;
    background: var(--text-tertiary);
    animation: scrollLine 2s ease-in-out infinite;
  }
}

@keyframes scrollLine {
  0%,
  100% {
    opacity: 0.3;
    transform: scaleY(1);
  }
  50% {
    opacity: 1;
    transform: scaleY(1.5);
  }
}

.intro.animate {
  .intro__text,
  .intro__visual {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
