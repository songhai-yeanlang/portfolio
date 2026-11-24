<script setup lang="ts">
import { useAppRouter } from '@/routers'
import HomeView from '@/views/HomeView.vue'
import ProjectsView from '@/views/ProjectsView.vue'

const { currentRoute } = useAppRouter()
</script>

<template>
  <ProjectsView v-if="currentRoute === 'projects'" />
  <HomeView v-else />
</template>
