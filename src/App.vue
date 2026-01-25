<script setup>
  import TGame from './components/templates/TGame.vue'
  import AFooter from './components/atoms/AFooter.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col justify-center px-4 sm:px-6 lg:px-8">
    <div
      class="mx-auto flex max-w-7xl grow items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <TGame />
    </div>
    <AFooter
      footer-title="tic-tac-toe"
      footer-paragraph="Vue 3 with motion.dev & min-max algorithm"
    />
  </div>
</template>

<style scoped></style>
