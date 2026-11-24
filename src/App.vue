<script setup lang="ts">
import { useAppRouter } from '@/routers'
import HomeView from '@/views/HomeView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ProjectDetailView from '@/views/ProjectDetailView.vue'

const { currentRoute } = useAppRouter()
</script>

<template>
  <ProjectDetailView v-if="currentRoute === 'project-detail'" />
  <ProjectsView v-else-if="currentRoute === 'projects'" />
  <HomeView v-else />
</template>
