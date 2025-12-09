<script setup>
  import { motion } from 'motion-v'

  defineProps({
    visible: { type: Boolean, default: false },
    message: { type: String, default: '' },
  })
</script>

<template>
  <motion.div
    v-if="visible"
    :initial="{ opacity: 0, y: 40, scale: 0.9 }"
    :animate="{ opacity: 1, y: 0, scale: 1 }"
    :exit="{ opacity: 0, y: -20, scale: 0.9 }"
    :transition="{ type: 'spring', stiffness: 120, damping: 14 }"
    class="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
  >
    <div
      class="pointer-events-none inline-flex items-center justify-center rounded-2xl px-6 py-3 bg-teal-900/60 backdrop-blur-sm text-center font-bold text-[clamp(2.5rem,5vw,3.5rem)] text-rose-100 drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
    >
      {{ message }}
    </div>
  </motion.div>
</template>
