import { ref } from 'vue'

export function useTicTacToe() {
  const HUMAN = 'X'
  const AI = 'O'

  const board = ref(Array(9).fill(null)) // each cell: null | 'X' | 'O'
  const currentPlayer = ref(HUMAN) // starts as human
  const winner = ref(null) // 'X' | 'O' | null
  const isDraw = ref(false)

  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  function checkWinner(b) {
    for (const [a, c, d] of winningLines) {
      if (b[a] && b[a] === b[c] && b[a] === b[d]) {
        return b[a]
      }
    }
    return null
  }

  function isMovesLeft(b) {
    return b.some((cell) => cell === null)
  }

  function evaluate(b) {
    const w = checkWinner(b)
    if (w === AI) return 10
    if (w === HUMAN) return -10
    return 0
  }

  function minimax(b, depth, isMaximizing) {
    const score = evaluate(b)

    if (score === 10) return score - depth // prefer faster AI wins
    if (score === -10) return score + depth // prefer slower human wins
    if (!isMovesLeft(b)) return 0

    if (isMaximizing) {
      let best = -Infinity
      for (let i = 0; i < 9; i++) {
        if (b[i] === null) {
          b[i] = AI
          best = Math.max(best, minimax(b, depth + 1, false))
          b[i] = null
        }
      }
      return best
    } else {
      let best = Infinity
      for (let i = 0; i < 9; i++) {
        if (b[i] === null) {
          b[i] = HUMAN
          best = Math.min(best, minimax(b, depth + 1, true))
          b[i] = null
        }
      }
      return best
    }
  }

  function findBestMove(b) {
    let bestVal = -Infinity
    let bestMove = -1

    for (let i = 0; i < 9; i++) {
      if (b[i] === null) {
        b[i] = AI
        const moveVal = minimax(b, 0, false)
        b[i] = null

        if (moveVal > bestVal) {
          bestVal = moveVal
          bestMove = i
        }
      }
    }

    return bestMove
  }

  function updateGameState() {
    const w = checkWinner(board.value)
    if (w) {
      winner.value = w
      return
    }
    if (!isMovesLeft(board.value)) {
      isDraw.value = true
    }
  }

  function aiMove() {
    if (winner.value || isDraw.value) return

    const move = findBestMove(board.value)
    if (move === -1) return

    board.value[move] = AI
    currentPlayer.value = HUMAN
    updateGameState()
  }

  function handleCellClick(index) {
    if (winner.value || isDraw.value) return
    if (currentPlayer.value !== HUMAN) return
    if (board.value[index] !== null) return

    board.value[index] = HUMAN
    updateGameState()

    if (!winner.value && !isDraw.value) {
      currentPlayer.value = AI
      // wait a bit longer than the SVG animation duration (0.5s)
      setTimeout(aiMove, 600)
    }
  }

  function resetGame() {
    board.value = Array(9).fill(null)
    winner.value = null
    isDraw.value = false
    currentPlayer.value = HUMAN
  }

  return {
    HUMAN,
    AI,
    board,
    currentPlayer,
    winner,
    isDraw,
    handleCellClick,
    resetGame,
  }
}
