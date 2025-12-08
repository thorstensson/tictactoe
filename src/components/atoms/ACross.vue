<script setup>
  import { motion } from 'motion-v'

  const variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = (i ?? 1) * 0.5
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: 'spring', duration: 0.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
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
  >
    <motion.line
      x1="110"
      y1="110"
      x2="490"
      y2="490"
      :variants="variants"
      :custom="0"
      class="stroke-rose-300 stroke-[20] [stroke-linecap:round]"
    />
    <motion.line
      x1="110"
      y1="490"
      x2="490"
      y2="110"
      :variants="variants"
      :custom="0.5"
      class="stroke-rose-300 stroke-[20] [stroke-linecap:round]"
    />
  </motion.svg>
</template>
