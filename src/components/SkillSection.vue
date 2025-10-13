<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePortfolio } from '@/composables/usePortfolio'

const { skills } = usePortfolio()
const sectionRef = ref<HTMLElement>()

const getSkillColor = (level: number): string => {
  if (level >= 85) return '#10b981' // green
  if (level >= 70) return '#3b82f6' // blue
  if (level >= 50) return '#f59e0b' // orange
  return '#ef4444' // red
}

onMounted(() => {
  if (sectionRef.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
            // Animate progress bars with delay
            setTimeout(() => {
              const progressBars = entry.target.querySelectorAll('.skill__progress-fill')
              progressBars.forEach((bar: any, index: number) => {
                setTimeout(() => {
                  bar.style.width = bar.dataset.level + '%'
                }, index * 100)
              })
            }, 500)
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
  <section ref="sectionRef" id="skills" class="skills">
    <div class="skills__container">
      <div class="skills__header">
        <h2 class="section__title">
          <span class="title__text">기술 스택</span>
        </h2>
        <p class="section__description">
          AI/LLM 기술과 백엔드 개발을 통해 실제 비즈니스 가치를 창출하는 솔루션을 개발합니다
        </p>
      </div>

      <div class="skills__grid">
        <div
          v-for="(skillCategory, index) in skills"
          :key="skillCategory.category"
          class="skill__category"
          :style="{ '--delay': index * 0.1 + 's' }"
        >
          <div class="category__card">
            <h3 class="category__title">
              {{ skillCategory.category }}
            </h3>

            <div class="category__skills">
              <div v-for="skill in skillCategory.items" :key="skill.name" class="skill__item">
                <div class="skill__header">
                  <span class="skill__name">{{ skill.name }}</span>
                  <span class="skill__level">{{ skill.level }}%</span>
                </div>
                <div class="skill__progress">
                  <div
                    class="skill__progress-fill"
                    :data-level="skill.level"
                    :style="{ '--skill-color': getSkillColor(skill.level) }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/mixin';

.skills {
  padding: 6rem 0;
  @include mixin.container();

  &__header {
    text-align: center;
    margin-bottom: 4rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;

    @include mixin.mobile {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }

  &__summary {
    @include mixin.flex-center;
  }
}

.section__title {
  margin: 0 0 1rem 0;

  .title__label {
    display: block;
    font-size: 1rem;
    color: var(--accent-primary);
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .title__text {
    display: block;
    font-size: 2.5rem;
    font-weight: 800;
    @include mixin.gradient-text();

    @include mixin.mobile {
      font-size: 2rem;
    }
  }
}

.section__description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin: 0;
}

.skill__category {
  @include mixin.fade-in(0.6s, var(--delay));
}

.category__card {
  @include mixin.glass-card();
  height: 100%;
  background: var(--surface);

  &:hover {
    transform: translateY(-4px);
  }
}

.category__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1.5rem 0;
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--surface-border);
}

.category__skills {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.skill__item {
  .skill__header {
    @include mixin.flex-between;
    margin-bottom: 0.75rem;
  }

  .skill__name {
    font-weight: 600;
    color: var(--text-primary);
  }

  .skill__level {
    font-size: 0.875rem;
    color: var(--text-secondary);
    font-weight: 500;
  }

  .skill__progress {
    height: 8px;
    background: var(--bg-tertiary);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .skill__progress-fill {
    height: 100%;
    width: 0;
    background: var(--skill-color);
    border-radius: 4px;
    transition: width 1s ease-out;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 20px;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
      animation: shimmer 2s infinite;
    }
  }
}

.summary__card {
  @include mixin.glass-card();
  background: var(--surface);
  max-width: 600px;
  text-align: center;

  .summary__title {
    font-size: 1.5rem;
    font-weight: 700;
    @include mixin.gradient-text();
    margin: 0 0 2rem 0;
  }

  .summary__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;

    @include mixin.mobile {
      grid-template-columns: 1fr;
    }
  }

  .summary__item {
    @include mixin.flex-center;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: 12px;
    background: var(--glass-bg);
    @include mixin.smooth-transition();

    &:hover {
      background: var(--surface-hover);
      transform: translateY(-2px);
    }

    .item__icon {
      font-size: 1.5rem;
    }

    .item__text {
      font-weight: 500;
      color: var(--text-primary);
    }
  }
}

@function getSkillColor($level) {
  @if $level >= 85 {
    @return var(--accent-success);
  } @else if $level >= 70 {
    @return var(--accent-primary);
  } @else if $level >= 50 {
    @return var(--accent-warning);
  } @else {
    @return var(--accent-error);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-20px);
  }
  100% {
    transform: translateX(100%);
  }
}

.skills.animate {
  .skill__category {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
