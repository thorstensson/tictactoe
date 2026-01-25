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
    class="h-[70%] w-[70%] focus:outline-none"
    :style="{
      opacity: dimmed ? 0.5 : 1,
      transition: 'opacity 0.5s ease',
    }"
  >
    <motion.line
      x1="110"
      y1="110"
      x2="490"
      y2="490"
      :variants="variants"
      :custom="0"
      class="stroke-pink-400 stroke-[40] [stroke-linecap:round]"
    />
    <motion.line
      x1="110"
      y1="490"
      x2="490"
      y2="110"
      :variants="variants"
      :custom="0.5"
      class="stroke-pink-400 stroke-[40] [stroke-linecap:round]"
      focusable="false"
      pointer-events="none"
    />
  </motion.svg>
</template>
