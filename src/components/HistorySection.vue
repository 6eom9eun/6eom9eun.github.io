<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePortfolio } from '@/composables/usePortfolio'

const { education, awards } = usePortfolio()
const sectionRef = ref<HTMLElement>()

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
  <section ref="sectionRef" id="history" class="history">
    <div class="history__container">
      <div class="history__header">
        <h2 class="section__title">
          <span class="title__text">히스토리</span>
        </h2>
        <p class="section__description">학습과 성장의 발자취, 그리고 인정받은 성과들입니다.</p>
      </div>

      <div class="history__content">
        <!-- Education -->
        <div class="content__section">
          <h3 class="section__subtitle">
            <span class="subtitle__icon">🎓</span>
            <span class="subtitle__text">히스토리</span>
          </h3>
          <div class="timeline">
            <div
              v-for="(edu, index) in education"
              :key="edu.title"
              class="timeline__item"
              :style="{ '--delay': index * 0.1 + 's' }"
            >
              <div class="timeline__marker"></div>
              <div class="timeline__content">
                <div class="edu__card">
                  <div class="edu__header">
                    <h4 class="edu__title">{{ edu.title }}</h4>
                    <span class="edu__period">{{ edu.period }}</span>
                  </div>
                  <p v-if="edu.description" class="edu__description">{{ edu.description }}</p>
                  <ul v-if="edu.details" class="edu__details">
                    <li v-for="detail in edu.details" :key="detail" class="detail__item">
                      {{ detail }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Awards -->
        <div class="content__section">
          <h3 class="section__subtitle">
            <span class="subtitle__icon">🏆</span>
            <span class="subtitle__text">수상</span>
          </h3>
          <div class="awards__grid">
            <div
              v-for="(award, index) in awards"
              :key="award.title"
              class="award__card"
              :style="{ '--delay': (index + education.length) * 0.1 + 's' }"
            >
              <div class="award__date">{{ award.date }}</div>
              <h4 class="award__title">{{ award.title }}</h4>
              <p v-if="award.organization" class="award__organization">{{ award.organization }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/mixin';

.history {
  padding: 10rem 0 8rem 0;
  @include mixin.container();
  margin-top: 4rem;

  &__container {
    margin-top: 4rem;
  }

  &__header {
    text-align: center;
    margin-bottom: 4rem;
    margin-top: 4rem;
  }

  &__content {
    max-width: 1000px;
    margin: 0 auto;
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

.content__section {
  margin-bottom: 6rem;

  &:last-child {
    margin-bottom: 4rem;
  }
}

.section__subtitle {
  @include mixin.flex-center;
  justify-content: flex-start;
  gap: 0.75rem;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 700;

  .subtitle__icon {
    font-size: 1.25rem;
  }

  .subtitle__text {
    @include mixin.gradient-text();
  }
}

.timeline {
  position: relative;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: 0.75rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--gradient-primary);
  }

  &__item {
    position: relative;
    margin-bottom: 2rem;
    @include mixin.fade-in(0.6s, var(--delay));

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__marker {
    position: absolute;
    left: -1.75rem;
    top: 0.5rem;
    width: 12px;
    height: 12px;
    background: var(--accent-primary);
    border: 3px solid var(--surface);
    border-radius: 50%;
    box-shadow: 0 0 0 3px var(--accent-primary);
  }

  &__content {
    margin-left: 1rem;
  }
}

.edu__card {
  @include mixin.glass-card();
  background: var(--surface);
  @include mixin.smooth-transition();

  &:hover {
    background: var(--surface-hover);
    transform: translateY(-2px);
  }
}

.edu__header {
  @include mixin.flex-between;
  align-items: flex-start;
  margin-bottom: 1rem;

  @include mixin.mobile {
    flex-direction: column;
    gap: 0.5rem;
  }
}

.edu__title {
  font-size: 1.25rem;
  font-weight: 700;
  @include mixin.gradient-text();
  margin: 0;
}

.edu__period {
  font-size: 0.9rem;
  color: var(--accent-primary);
  font-weight: 600;
  background: var(--glass-bg);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  white-space: nowrap;
}

.edu__description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.edu__details {
  list-style: none;
  padding: 0;
  margin: 0;

  .detail__item {
    position: relative;
    padding-left: 1.25rem;
    margin-bottom: 0.5rem;
    color: var(--text-secondary);
    font-size: 0.9rem;

    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: var(--accent-primary);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.awards__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.award__card {
  @include mixin.glass-card();
  @include mixin.fade-in(0.6s, var(--delay));
  @include mixin.smooth-transition();

  background: var(--surface);
  text-align: center;

  &:hover {
    background: var(--surface-hover);
    transform: translateY(-4px);
  }

  .award__date {
    font-size: 0.9rem;
    color: var(--accent-primary);
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .award__title {
    font-size: 1.1rem;
    font-weight: 700;
    @include mixin.gradient-text();
    margin: 0 0 0.5rem 0;
    line-height: 1.4;
  }

  .award__organization {
    color: var(--text-secondary);
    font-size: 0.85rem;
    margin: 0;
  }
}

.history.animate {
  .timeline__item,
  .award__card {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
