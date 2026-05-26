import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const INITIAL_PROGRESS = {
  arithmetic: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
  fractions:  { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
  geometry:   { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
  wordproblems: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
}

const BADGES = [
  { id: 'first_star',    label: 'First Star!',      icon: '⭐', condition: (s) => totalStars(s) >= 1 },
  { id: 'speed_demon',  label: 'Speed Demon',       icon: '⚡', condition: (s) => s.fastAnswers >= 5 },
  { id: 'perfect_10',   label: 'Perfect 10',        icon: '💯', condition: (s) => s.perfectLevels >= 1 },
  { id: 'world_1_done', label: 'Arithmetic Master', icon: '🔢', condition: (s) => worldComplete(s, 'arithmetic') },
  { id: 'world_2_done', label: 'Fraction Wizard',   icon: '🧙', condition: (s) => worldComplete(s, 'fractions') },
  { id: 'world_3_done', label: 'Shape Shifter',     icon: '🔷', condition: (s) => worldComplete(s, 'geometry') },
  { id: 'world_4_done', label: 'Word Solver',       icon: '📖', condition: (s) => worldComplete(s, 'wordproblems') },
  { id: 'all_worlds',   label: 'Math Hero!',        icon: '🏆', condition: (s) => totalStars(s) >= 72 },
]

function totalStars(state) {
  return Object.values(state.progress).flatMap(Object.values).reduce((a, b) => a + b, 0)
}

function worldComplete(state, world) {
  return Object.values(state.progress[world]).every(s => s >= 1)
}

export const useGameStore = create(
  persist(
    (set, get) => ({
      playerName: '',
      character: 'wizard',
      progress: INITIAL_PROGRESS,
      earnedBadges: [],
      fastAnswers: 0,
      perfectLevels: 0,
      totalCoins: 0,

      setPlayer: (name, character) => set({ playerName: name, character }),

      saveResult: (world, grade, stars, perfect, fast) => {
        const state = get()
        const currentStars = state.progress[world][grade]
        const newProgress = {
          ...state.progress,
          [world]: { ...state.progress[world], [grade]: Math.max(currentStars, stars) },
        }
        const newFast = state.fastAnswers + (fast || 0)
        const newPerfect = state.perfectLevels + (perfect ? 1 : 0)
        const newCoins = state.totalCoins + stars * 10

        const nextState = {
          progress: newProgress,
          fastAnswers: newFast,
          perfectLevels: newPerfect,
          totalCoins: newCoins,
        }

        const newBadges = BADGES.filter(b =>
          !state.earnedBadges.includes(b.id) &&
          b.condition({ ...state, ...nextState })
        ).map(b => b.id)

        set({ ...nextState, earnedBadges: [...state.earnedBadges, ...newBadges] })
        return newBadges
      },

      isLevelUnlocked: (world, grade) => {
        if (grade === 1) return true
        const state = get()
        return state.progress[world][grade - 1] >= 1
      },

      getTotalStars: () => totalStars(get()),

      getEarnedBadges: () => {
        const state = get()
        return BADGES.filter(b => state.earnedBadges.includes(b.id))
      },

      resetProgress: () => set({
        progress: INITIAL_PROGRESS,
        earnedBadges: [],
        fastAnswers: 0,
        perfectLevels: 0,
        totalCoins: 0,
      }),
    }),
    { name: 'math-adventure-save' }
  )
)

export { BADGES, totalStars }