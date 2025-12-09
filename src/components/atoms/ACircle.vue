<script setup>
  import { motion } from 'motion-v'

  const { dimmed } = defineProps({
    dimmed: {
      type: Boolean,
      default: false,
    },
  })

  const variants = {
    hidden: { pathLength: 0 },
    visible: (i) => {
      const delay = (i ?? 1) * 0.5
      return {
        pathLength: 1,
        transition: {
          pathLength: {
            delay,
            type: 'spring',
            duration: 0.4,
            bounce: 0,
          },
        },
      }
    },
  }
</script>

<template>
  <motion.svg
    viewBox="0 0 600 600"
    initial="hidden"
    animate="visible"
    class="w-[70%] h-[70%] focus:outline-none"
    :style="{
      opacity: dimmed ? 0.5 : 1,
      transition: 'opacity 0.5s ease',
    }"
  >
    <motion.circle
      cx="300"
      cy="300"
      r="240"
      :variants="variants"
      :custom="0"
      class="stroke-cyan-200 stroke-[40] [stroke-linecap:round] fill-transparent"
    />
  </motion.svg>
</template>
