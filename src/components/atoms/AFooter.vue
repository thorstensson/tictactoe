<script setup>
  defineProps({
    footerTitle: {
      type: String,
      required: true,
      default: 'Footer Text',
    },
    footerParagraph: {
      type: String,
      required: true,
      default: 'Footer Paragraph',
    },
  })
</script>

<template>
  <footer class="mb-4 flex flex-col justify-end font-sans text-white">
    <div class="font-display text-[clamp(1.5rem,5vw,2rem)] font-bold">
      {{ footerTitle }}
    </div>
    <div class="font-sans text-[clamp(0.75rem,0.4vw+0.65rem,0.875rem)]">
      {{ footerParagraph }}
    </div>
  </footer>
</template>
