<script setup>
  import { ref, watch } from 'vue'
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
  <div class="space-y-4">
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
      <AResetButton @click="resetGame" />
    </div>

    <div class="relative w-[80vmin] h-[80vmin] mx-auto pointer-events-none">
      <AGridBg />

      <!-- cells overlay -->
      <div class="grid grid-cols-3 grid-rows-3 w-full h-full">
        <button
          v-for="(cell, index) in board"
          :key="index"
          class="flex items-center justify-center aspect-square pointer-events-auto"
          @click="handleCellClick(index)"
        >
          <ACross v-if="cell === 'X'" />
          <ACircle v-else-if="cell === 'O'" />
        </button>
      </div>
    </div>
  </div>
</template>
