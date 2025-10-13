# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (includes type checking)
- `npm run preview` - Preview production build locally

### Code Quality

- `npm run lint` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run Vue TypeScript type checking

### Testing

- `npm run test:unit` - Run unit tests with Vitest
- `npm run test:e2e` - Run end-to-end tests with Playwright
- `npx playwright install` - Install browsers for E2E tests (first run)

## Project Architecture

This is a Vue 3 + TypeScript portfolio website built with Vite. The project follows a section-based single-page application architecture.

### Core Structure

- **Single Route App**: Currently uses only the home route (`/`) in Vue Router
- **Section-Based Layout**: Main content is organized into distinct sections (Intro, Skills, Sites, Portfolio, Contact)
- **Component Architecture**: Each section is a separate Vue component imported into `HomeView.vue`

### Key Technical Stack

- **Frontend**: Vue 3 with Composition API and `<script setup>` syntax
- **Build Tool**: Vite with Vue plugin and JSX support
- **Styling**: SCSS with modular architecture + Tailwind CSS
- **Animations**: GSAP for animations, Lenis for smooth scrolling
- **Type Safety**: TypeScript with Vue SFC support via vue-tsc

### Import Patterns

- Uses `@/` alias for `src/` directory (configured in vite.config.ts)
- Example: `import HeaderSection from '@/components/HeaderSection.vue'`

### SCSS Architecture

The styling system uses SCSS modules with `@use` syntax:

- `style.scss` - Main entry point that imports all modules
- `_fonts.scss` - Font definitions
- `_vars.scss` - CSS custom properties and SCSS variables
- `_reset.scss` - CSS reset/normalize
- `_mixin.scss` - Reusable SCSS mixins

### Component Structure

All main content sections are individual Vue components:

- `HeaderSection.vue` - Site header/navigation
- `IntroSection.vue` - Hero/introduction section
- `SkillSection.vue` - Skills showcase
- `PortSection.vue` - Portfolio projects
- `ContactSection.vue` - Contact information
- `FooterSection.vue` - Site footer
- `SkipSection.vue` - Accessibility skip links

These components are composed together in `HomeView.vue` to create the complete page layout.

### Language and Content

- Primary language: Korean (lang="ko" in HTML)
- Content focus: Portfolio showcasing the same site built with different frameworks (React, Vue, Next.js)
