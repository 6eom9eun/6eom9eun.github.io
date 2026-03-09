<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import { usePortfolio } from '@/composables/usePortfolio'

const { workExperience } = usePortfolio()
const sectionRef = ref<HTMLElement>()
const expandedProjects = ref<Record<string, boolean>>({})
const projectRefs = ref<Record<string, HTMLElement>>({})

const toggleProject = async (projectTitle: string) => {
  const isExpanding = !expandedProjects.value[projectTitle]
  const contentEl = projectRefs.value[projectTitle]?.querySelector(
    '.project__content',
  ) as HTMLElement

  if (contentEl) {
    if (isExpanding) {
      // 확장 시: 실제 높이 측정
      expandedProjects.value[projectTitle] = true
      await nextTick()
      const scrollHeight = contentEl.scrollHeight
      contentEl.style.maxHeight = '0px'
      await nextTick()
      contentEl.style.maxHeight = scrollHeight + 'px'
    } else {
      // 축소 시: 현재 높이에서 0으로
      const currentHeight = contentEl.scrollHeight
      contentEl.style.maxHeight = currentHeight + 'px'
      await nextTick()
      contentEl.style.maxHeight = '0px'
      setTimeout(() => {
        expandedProjects.value[projectTitle] = false
      }, 300)
    }
  }
}

const setProjectRef = (projectTitle: string) => {
  return (el: Element | ComponentPublicInstance | null) => {
    if (el && el instanceof HTMLElement) {
      projectRefs.value[projectTitle] = el
    }
  }
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
  <section ref="sectionRef" id="experience" class="experience">
    <div class="experience__container">
      <div class="experience__header">
        <h2 class="section__title">
          <span class="title__text">경력</span>
        </h2>
        <p class="section__description">
          AI/LLM 기술과 백엔드 개발을 통해 실제 비즈니스 가치를 창출한 경험들입니다.
        </p>
      </div>

      <div class="experience__content">
        <!-- Work Experience -->
        <div class="content__section">
          <h3 class="section__subtitle">
            <span class="subtitle__icon">💼</span>
            <span class="subtitle__text">경력</span>
          </h3>
          <div class="timeline">
            <div
              v-for="(work, index) in workExperience"
              :key="work.company"
              class="timeline__item"
              :style="{ '--delay': index * 0.1 + 's' }"
            >
              <div class="timeline__marker"></div>
              <div class="timeline__content">
                <div class="work__card">
                  <div class="work__header">
                    <h4 class="work__company">{{ work.company }}</h4>
                    <span class="work__period">{{ work.period }}</span>
                  </div>
                  <div class="work__details">
                    <p class="work__department">{{ work.department }}</p>
                    <p class="work__team">{{ work.team }}</p>
                  </div>
                  <div class="work__projects">
                    <h5 class="projects__title">주요 프로젝트</h5>
                    <div class="projects__list">
                      <div
                        v-for="project in work.projects"
                        :key="project.title"
                        :ref="setProjectRef(project.title)"
                        class="project__item"
                        :class="{ expanded: expandedProjects[project.title] }"
                      >
                        <div
                          class="project__header"
                          @click="toggleProject(project.title)"
                          role="button"
                          tabindex="0"
                          @keydown.enter="toggleProject(project.title)"
                          @keydown.space.prevent="toggleProject(project.title)"
                        >
                          <div class="project__header-content">
                            <h6 class="project__title">{{ project.title }}</h6>
                            <span class="project__period">{{ project.period }}</span>
                          </div>
                          <div class="project__toggle">
                            <svg
                              class="toggle__icon"
                              :class="{ expanded: expandedProjects[project.title] }"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M6 9L12 15L18 9"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        <div
                          class="project__content"
                          :class="{ expanded: expandedProjects[project.title] }"
                        >
                          <p class="project__description">{{ project.description }}</p>
                          <div v-if="project.highlights" class="project__highlights">
                            <h6 class="highlights__title">주요 특징</h6>
                            <ul class="highlights__list">
                              <li
                                v-for="highlight in project.highlights"
                                :key="highlight"
                                class="highlight__item"
                              >
                                {{ highlight }}
                              </li>
                            </ul>
                          </div>
                          <div class="project__tech">
                            <span v-for="tech in project.techStack" :key="tech" class="tech__tag">
                              {{ tech }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

.experience {
  padding: 6rem 0 8rem 0;
  @include mixin.container();

  &__header {
    text-align: center;
    margin-bottom: 4rem;
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
  margin-bottom: 4rem;

  &:last-child {
    margin-bottom: 0;
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

.work__card {
  @include mixin.glass-card();
  background: var(--surface);
  @include mixin.smooth-transition();

  &:hover {
    background: var(--surface-hover);
    transform: translateY(-2px);
  }
}

.work__header {
  @include mixin.flex-between;
  align-items: flex-start;
  margin-bottom: 1rem;

  @include mixin.mobile {
    flex-direction: column;
    gap: 0.5rem;
  }
}

.work__company {
  font-size: 1.25rem;
  font-weight: 700;
  @include mixin.gradient-text();
  margin: 0;
}

.work__period {
  font-size: 0.9rem;
  color: var(--accent-primary);
  font-weight: 600;
  background: var(--glass-bg);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  white-space: nowrap;
}

.work__details {
  margin-bottom: 1.5rem;

  .work__department,
  .work__team {
    color: var(--text-secondary);
    margin: 0.25rem 0;
    font-size: 0.95rem;
  }
}

.work__projects {
  margin-bottom: 2rem;

  .projects__title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 1rem 0;
  }

  .projects__list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
}

.project__item {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--backdrop-blur-sm));
  -webkit-backdrop-filter: blur(var(--backdrop-blur-sm));
  border-radius: 12px;
  border: 1px solid var(--surface-border);
  overflow: hidden;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    background 0.3s ease;

  &:hover {
    border-color: var(--glass-border-strong);
    background: var(--glass-bg-strong);
  }

  &.expanded {
    border-color: var(--accent-primary);
    background: var(--glass-bg-strong);
    box-shadow:
      0 0 16px var(--glow-primary),
      0 8px 24px var(--glass-shadow);
  }
}

.project__header {
  @include mixin.flex-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  @include mixin.smooth-transition();

  &:hover {
    background: var(--surface-hover);
  }

  &:focus {
    outline: 2px solid var(--accent-primary);
    outline-offset: -2px;
  }
}

.project__header-content {
  flex: 1;

  @include mixin.mobile {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
}

.project__toggle {
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(59, 130, 246, 0.1);
  }

  .toggle__icon {
    width: 18px;
    height: 18px;
    color: var(--text-secondary);
    transition:
      transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
      color 0.2s ease;

    &.expanded {
      transform: rotate(180deg);
      color: var(--accent-primary);
    }
  }
}

.project__content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  > * {
    padding: 0 1rem 1rem 1rem;
    opacity: 0;
    transform: translateY(-8px);
    transition:
      opacity 0.3s ease 0.1s,
      transform 0.3s ease 0.1s;
  }

  &.expanded > * {
    opacity: 1;
    transform: translateY(0);
  }
}

.project__title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;

  @include mixin.mobile {
    margin: 0;
  }
}

.project__period {
  font-size: 0.8rem;
  color: var(--text-tertiary);
  white-space: nowrap;
  font-weight: 500;
}

.project__description {
  color: var(--text-secondary);
  margin: 0 0 1rem 0;
  line-height: 1.6;
  font-size: 0.9rem;
}

.project__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0;

  .tech__tag {
    padding: 0.2rem 0.6rem;
    background: var(--glass-bg-strong);
    backdrop-filter: blur(var(--backdrop-blur-sm));
    -webkit-backdrop-filter: blur(var(--backdrop-blur-sm));
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--accent-primary);
    transition: all 0.2s ease;
    letter-spacing: 0.02em;

    &:hover {
      background: rgba(59, 130, 246, 0.12);
      border-color: var(--accent-primary);
      box-shadow: 0 0 8px var(--glow-primary);
      color: var(--accent-primary);
    }
  }
}

.project__highlights {
  margin-bottom: 1rem;

  .highlights__title {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--accent-primary);
    margin: 0 0 0.75rem 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .highlights__list {
    list-style: none;
    padding: 0;
    margin: 0;

    .highlight__item {
      position: relative;
      padding-left: 1.25rem;
      margin-bottom: 0.5rem;
      color: var(--text-secondary);
      font-size: 0.85rem;
      line-height: 1.5;

      &::before {
        content: '▸';
        position: absolute;
        left: 0;
        color: var(--accent-primary);
        font-size: 0.8rem;
        font-weight: bold;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.experience.animate {
  .timeline__item {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
