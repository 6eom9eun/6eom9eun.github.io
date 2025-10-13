<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePortfolio } from '@/composables/usePortfolio'

const { profile, links } = usePortfolio()
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

const contactMethods = [
  {
    icon: '📧',
    label: '이메일',
    value: profile.value.email,
    link: `mailto:${profile.value.email}`,
    description: '프로젝트 제안 및 협업 문의',
  },
  {
    icon: '📞',
    label: '전화',
    value: profile.value.phone,
    link: `tel:${profile.value.phone.replace(/-/g, '')}`,
    description: '직접 통화를 원하시는 경우',
  },
  {
    icon: '💻',
    label: 'GitHub',
    value: 'github.com/6eom9eun',
    link: links.value.github,
    description: '코드와 프로젝트 확인',
  },
  {
    icon: '📝',
    label: 'Blog',
    value: '6eomdev.tistory.com',
    link: links.value.blog,
    description: '개발 관련 포스팅',
  },
]
</script>

<template>
  <section ref="sectionRef" id="contact" class="contact">
    <div class="contact__container">
      <div class="contact__header">
        <h2 class="section__title">
          <span class="title__text">연락처</span>
        </h2>
        <p class="section__description">
          새로운 기회와 협업에 항상 열려있습니다. 언제든 연락해주세요!
        </p>
      </div>

      <div class="contact__content">
        <div class="contact__info">
          <div class="info__card">
            <h3 class="card__title">함께 만들어 나가요</h3>
            <p class="card__description">
              AI/LLM 관련 기술과 백엔드 개발을 통해 실제 비즈니스 가치를 창출하는 혁신적인
              프로젝트를 함께 만들어나가고 싶습니다. 새로운 도전과 성장의 기회를 찾고 있다면 언제든
              연락해주세요.
            </p>

            <div class="card__stats">
              <div class="stat__item">
                <span class="stat__number">2+</span>
                <span class="stat__label">년차 개발</span>
              </div>
              <div class="stat__item">
                <span class="stat__number">10+</span>
                <span class="stat__label">프로젝트</span>
              </div>
              <div class="stat__item">
                <span class="stat__number">100%</span>
                <span class="stat__label">열정</span>
              </div>
            </div>
          </div>
        </div>

        <div class="contact__methods">
          <div class="methods__grid">
            <div
              v-for="(method, index) in contactMethods"
              :key="method.label"
              class="method__card"
              :style="{ '--delay': index * 0.1 + 's' }"
            >
              <a
                :href="method.link"
                :target="method.link.startsWith('http') ? '_blank' : undefined"
                :rel="method.link.startsWith('http') ? 'noopener noreferrer' : undefined"
                class="method__link"
              >
                <div class="method__icon">
                  {{ method.icon }}
                </div>
                <div class="method__content">
                  <h4 class="method__label">{{ method.label }}</h4>
                  <p class="method__value">{{ method.value }}</p>
                  <p class="method__description">{{ method.description }}</p>
                </div>
                <div class="method__arrow">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="contact__footer">
        <div class="footer__message">
          <p class="message__text">"함께 성장하며 의미 있는 가치를 만들어가고 싶습니다"</p>
          <div class="message__signature">
            <span class="signature__name">{{ profile.nameKorean }}</span>
            <span class="signature__role">AI/LLM & Backend Developer</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/mixin';

.contact {
  padding: 6rem 0;
  @include mixin.container();

  &__header {
    text-align: center;
    margin-bottom: 4rem;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    margin-bottom: 4rem;

    @include mixin.mobile {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  &__footer {
    text-align: center;
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

.info__card {
  @include mixin.glass-card();
  @include mixin.fade-in(0.6s, 0.1s);

  background: var(--surface);
  height: 100%;

  .card__title {
    font-size: 1.5rem;
    font-weight: 700;
    @include mixin.gradient-text();
    margin: 0 0 1rem 0;
  }

  .card__description {
    color: var(--text-secondary);
    line-height: 1.7;
    margin: 0 0 2rem 0;
  }

  .card__stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;

    .stat__item {
      text-align: center;
      padding: 1rem;
      background: var(--glass-bg);
      border-radius: 12px;
      @include mixin.smooth-transition();

      &:hover {
        background: var(--surface-hover);
        transform: translateY(-2px);
      }

      .stat__number {
        display: block;
        font-size: 1.5rem;
        font-weight: 800;
        @include mixin.gradient-text();
        margin-bottom: 0.25rem;
      }

      .stat__label {
        font-size: 0.875rem;
        color: var(--text-tertiary);
        font-weight: 500;
      }
    }
  }
}

.methods__grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.method__card {
  @include mixin.fade-in(0.6s, var(--delay));
}

.method__link {
  @include mixin.glass-card(12px, 1.5rem);
  @include mixin.smooth-transition();

  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--surface);
  text-decoration: none;
  color: inherit;

  &:hover {
    background: var(--surface-hover);
    transform: translateY(-4px);
    box-shadow: 0 12px 40px var(--glass-shadow);

    .method__arrow {
      transform: translateX(4px);
    }
  }

  .method__icon {
    font-size: 2rem;
    @include mixin.flex-center;
    width: 60px;
    height: 60px;
    background: var(--glass-bg);
    border-radius: 12px;
    flex-shrink: 0;
  }

  .method__content {
    flex: 1;

    .method__label {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 0.25rem 0;
    }

    .method__value {
      font-size: 0.9rem;
      color: var(--accent-primary);
      font-weight: 600;
      margin: 0 0 0.25rem 0;
    }

    .method__description {
      font-size: 0.875rem;
      color: var(--text-tertiary);
      margin: 0;
    }
  }

  .method__arrow {
    @include mixin.smooth-transition();
    color: var(--text-tertiary);
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
}

.footer__message {
  @include mixin.glass-card();
  background: var(--surface);
  max-width: 600px;
  margin: 0 auto;
  text-align: center;

  .message__text {
    font-size: 1.25rem;
    font-style: italic;
    color: var(--text-secondary);
    margin: 0 0 1.5rem 0;
    line-height: 1.6;

    &::before,
    &::after {
      content: '"';
      color: var(--accent-primary);
      font-size: 1.5em;
    }
  }

  .message__signature {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;

    .signature__name {
      font-size: 1.1rem;
      font-weight: 700;
      @include mixin.gradient-text();
    }

    .signature__role {
      font-size: 0.875rem;
      color: var(--text-tertiary);
    }
  }
}

.contact.animate {
  .info__card,
  .method__card {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
