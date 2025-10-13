<script setup>
import { onMounted } from 'vue'
import HeaderSection from '@/components/HeaderSection.vue'
import FooterSection from '@/components/FooterSection.vue'
import IntroSection from '@/components/IntroSection.vue'
import SkillSection from '@/components/SkillSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import HistorySection from '@/components/HistorySection.vue'
import ContactSection from '@/components/ContactSection.vue'
import SkipSection from '@/components/SkipSection.vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useTheme } from '@/composables/useTheme'

// Initialize scroll animation and theme
useScrollAnimation()
const { initializeTheme } = useTheme()

onMounted(() => {
  // Add any additional initialization here
})
</script>

<template>
  <SkipSection />
  <HeaderSection />
  <main id="main" role="main">
    <IntroSection />
    <SkillSection />
    <ExperienceSection />
    <HistorySection />
    <ContactSection />
  </main>
  <FooterSection />
</template>
