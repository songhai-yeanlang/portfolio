<script setup lang="ts">
import { ref } from 'vue'
import { portfolioData, type ProjectItem } from '@/stores/portfolioData'
import { useTheme } from '@/composables/useTheme'
import { useAppRouter } from '@/routers'
import PortfolioLayout from '@/layouts/PortfolioLayout.vue'
import BioIntro from '@/components/portfolio/BioIntro.vue'
import SkillsSection from '@/components/portfolio/SkillsSection.vue'
import StackedProjectsSection from '@/components/portfolio/StackedProjectsSection.vue'
import ExperienceLedger from '@/components/portfolio/ExperienceLedger.vue'
import ProjectDetailModal from '@/components/portfolio/ProjectDetailModal.vue'

const { isDark, toggleTheme } = useTheme()
const { navigateTo } = useAppRouter()
const activeProject = ref<ProjectItem | null>(null)
</script>

<template>
  <PortfolioLayout
    :handle="portfolioData.handle"
    :github-url="portfolioData.githubUrl"
    :telegram-url="portfolioData.telegramUrl"
    :is-dark="isDark"
    @toggle-theme="toggleTheme"
  >
    <BioIntro
      :full-name="portfolioData.fullName"
      :bio="portfolioData.bio"
      :avatar-url="portfolioData.avatarUrl"
    />

    <SkillsSection :skill-groups="portfolioData.skillGroups" />

    <StackedProjectsSection
      :projects="portfolioData.projects"
      :limit="6"
      @select-project="activeProject = $event"
      @view-all="navigateTo('projects')"
    />

    <ExperienceLedger
      :experience="portfolioData.experience"
      :email="portfolioData.email"
      :github-url="portfolioData.githubUrl"
      :telegram-url="portfolioData.telegramUrl"
    />

    <ProjectDetailModal :project="activeProject" @close="activeProject = null" />
  </PortfolioLayout>
</template>
