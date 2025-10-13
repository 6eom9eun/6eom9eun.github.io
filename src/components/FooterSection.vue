<script setup lang="ts">
import { usePortfolio } from '@/composables/usePortfolio'

const { profile, links } = usePortfolio()
const currentYear = new Date().getFullYear()

const socialLinks = [
  {
    name: 'GitHub',
    url: links.value.github,
    icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z',
  },
  {
    name: 'Blog',
    url: links.value.blog,
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7a.996.996 0 0 1 0-1.41L9.29 7.7c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L7.83 12l2.88 2.88c.39.39.39 1.02 0 1.41-.39.39-1.03.39-1.42 0zm5.42 0c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L16.17 12l-2.87-2.88c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l3.59 3.59c.39.39.39 1.02 0 1.41L14.71 16.29z',
  },
]

const quickLinks = [
  { name: '소개', href: '#intro' },
  { name: '기술', href: '#skills' },
  { name: '경력', href: '#experience' },
  { name: '히스토리', href: '#history' },
  { name: '연락', href: '#contact' },
]
</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__content">
        <div class="footer__main">
          <div class="footer__brand">
            <h3 class="brand__logo">6eomDEV</h3>
            <p class="brand__description">
              AI/LLM 기술과 백엔드 개발로 비즈니스 가치를 창출하는 솔루션을 만들어가는 개발자
            </p>
            <div class="brand__contact">
              <p class="contact__item">
                <span class="contact__icon">📧</span>
                <span class="contact__text">{{ profile.email }}</span>
              </p>
              <p class="contact__item">
                <span class="contact__icon">📞</span>
                <span class="contact__text">{{ profile.phone }}</span>
              </p>
            </div>
          </div>

          <div class="footer__links">
            <div class="links__section">
              <h4 class="section__title">빠른 링크</h4>
              <ul class="section__list">
                <li v-for="link in quickLinks" :key="link.name" class="list__item">
                  <a :href="link.href" class="list__link">{{ link.name }}</a>
                </li>
              </ul>
            </div>

            <div class="links__section">
              <h4 class="section__title">소셜 미디어</h4>
              <ul class="section__list">
                <li v-for="social in socialLinks" :key="social.name" class="list__item">
                  <a
                    :href="social.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="list__link"
                  >
                    {{ social.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="footer__social">
          <div class="social__links">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social__link"
              :aria-label="social.name"
            >
              <svg class="social__icon" viewBox="0 0 24 24" fill="currentColor">
                <path :d="social.icon" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <div class="bottom__content">
          <div class="bottom__left">
            <p class="copyright">
              © {{ currentYear }} {{ profile.nameKorean }}. All rights reserved.
            </p>
          </div>
          <div class="bottom__right">
            <p class="made-with">Vue.js & TypeScript</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/mixin';

.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--surface-border);
  margin-top: 4rem;

  &__container {
    @include mixin.container();
    padding-top: 4rem;
    padding-bottom: 2rem;
  }

  &__content {
    margin-bottom: 3rem;
  }

  &__main {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 4rem;
    margin-bottom: 3rem;

    @include mixin.mobile {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  &__brand {
    .brand__logo {
      @include mixin.gradient-text();
      font-size: 1.5rem;
      font-weight: 800;
      margin: 0 0 1rem 0;
    }

    .brand__description {
      color: var(--text-secondary);
      line-height: 1.6;
      margin: 0 0 1.5rem 0;
    }

    .brand__contact {
      .contact__item {
        @include mixin.flex-center;
        justify-content: flex-start;
        gap: 0.5rem;
        margin: 0.5rem 0;
        color: var(--text-secondary);
        font-size: 0.9rem;

        .contact__icon {
          font-size: 1rem;
        }
      }
    }
  }

  &__links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    @include mixin.mobile {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .links__section {
      .section__title {
        color: var(--text-primary);
        font-size: 1rem;
        font-weight: 700;
        margin: 0 0 1rem 0;
      }

      .section__list {
        list-style: none;
        padding: 0;
        margin: 0;

        .list__item {
          margin-bottom: 0.5rem;

          .list__link {
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.9rem;
            @include mixin.smooth-transition();

            &:hover {
              color: var(--accent-primary);
            }
          }
        }
      }

      .tech__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;

        .tech__tag {
          padding: 0.25rem 0.75rem;
          background: var(--glass-bg);
          border: 1px solid var(--surface-border);
          border-radius: 16px;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-tertiary);
          @include mixin.smooth-transition();

          &:hover {
            background: var(--surface-hover);
            color: var(--accent-primary);
          }
        }
      }
    }
  }

  &__social {
    @include mixin.flex-center;
    padding: 2rem 0;
    border-top: 1px solid var(--surface-border);
    border-bottom: 1px solid var(--surface-border);

    .social__links {
      @include mixin.flex-center;
      gap: 1rem;

      .social__link {
        @include mixin.glass-card(12px, 0.75rem);
        @include mixin.smooth-transition();

        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        background: var(--surface);
        text-decoration: none;
        color: var(--text-secondary);

        &:hover {
          background: var(--surface-hover);
          color: var(--accent-primary);
          transform: translateY(-2px);
        }

        .social__icon {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  &__bottom {
    .bottom__content {
      @include mixin.flex-between;
      padding-top: 2rem;
      border-top: 1px solid var(--surface-border);

      @include mixin.mobile {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }

      .bottom__left,
      .bottom__right {
        .copyright,
        .made-with {
          color: var(--text-tertiary);
          font-size: 0.875rem;
          margin: 0;
        }
      }
    }
  }
}
</style>
