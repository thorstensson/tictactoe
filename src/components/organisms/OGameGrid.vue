<script setup>
  import { ref, watch } from 'vue'
  import { motion } from 'motion-v'
  import ACross from '../atoms/ACross.vue'
  import ACircle from '../atoms/ACircle.vue'
  import AGridBg from '../atoms/AGridBg.vue'
  import AWinMessage from '../atoms/AWinMessage.vue'
  import AResetButton from '../atoms/AResetButton.vue'
  import { useTicTacToe } from '../../composables/useTicTacToe'

  const {
    HUMAN,
    board,
    currentPlayer,
    winner,
    isDraw,
    handleCellClick,
    resetGame,
    winningLine,
  } = useTicTacToe()

  const winMessages = ['You got lucky!', 'You win!', "Cats don't lose!"]
  const winMessage = ref('')

  watch(
    winner,
    (val) => {
      if (val) {
        const i = Math.floor(Math.random() * winMessages.length)
        winMessage.value = winMessages[i]
      } else {
        winMessage.value = ''
      }
    },
    { immediate: true }
  )
</script>

<template>
  <div class="flex flex-col gap-10">
    <AWinMessage :visible="winner && winner === HUMAN" :message="winMessage" />
    <div class="flex items-center justify-between text-sm font-medium">
      <div>
        <span v-if="winner">{{
          winner === HUMAN ? 'You (X) win!' : 'AI (O) wins!'
        }}</span>
        <span v-else-if="isDraw">It's a draw.</span>
        <span v-else>
          {{ currentPlayer === HUMAN ? 'Your turn (X)' : 'AI thinking (O)…' }}
        </span>
      </div>
      <AResetButton @click="resetGame">PLAY AGAIN</AResetButton>
    </div>

    <motion.div
      :initial="{ opacity: 0, y: 24, scale: 0.96 }"
      :animate="{ opacity: 1, y: 0, scale: 1 }"
      :transition="{ type: 'spring', stiffness: 90, damping: 18 }"
    >
      <div class="pointer-events-none relative mx-auto h-[80vmin] w-[80vmin]">
        <AGridBg />

        <!-- cells overlay -->
        <div class="grid h-full w-full grid-cols-3 grid-rows-3">
          <button
            v-for="(cell, index) in board"
            :key="index"
            class="pointer-events-auto flex aspect-square items-center justify-center border-none focus:ring-0 focus:outline-none focus-visible:outline-none"
            @click="handleCellClick(index)"
          >
            <ACross
              v-if="cell === 'X'"
              :dimmed="winner && winningLine && !winningLine.includes(index)"
            />
            <ACircle
              v-else-if="cell === 'O'"
              :dimmed="winner && winningLine && !winningLine.includes(index)"
            />
          </button>
        </div>
      </div>
    </motion.div>
  </div>
</template>
