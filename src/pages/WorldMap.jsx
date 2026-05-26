import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import WorldCard from '../components/ui/WorldCard'
import { WORLDS } from '../data/worlds'

const CHARACTER_EMOJI = { wizard: '🧙', explorer: '🧭', knight: '⚔️', astronaut: '🚀' }

export default function WorldMap() {
  const navigate = useNavigate()
  const { playerName, character, getTotalStars } = useGameStore()
  const totalStars = getTotalStars()

  return (
    <div className="min-h-screen star-bg p-4 md:p-6">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-5 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-3xl">{CHARACTER_EMOJI[character]}</span>
          <div>
            <p className="text-white/50 text-xs">Welcome back,</p>
            <p className="font-game text-white text-base">{playerName}</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-1.5 bg-yellow-500/20 border border-yellow-500/40 px-3 py-1.5 rounded-xl hover:bg-yellow-500/30 transition-colors"
        >
          <span className="text-yellow-400 font-game text-base">⭐ {totalStars}</span>
          <span className="text-white/50 text-xs">Profile</span>
        </button>
      </motion.div>

      {/* Title */}
      <motion.div
        className="text-center mb-6 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="font-game text-3xl md:text-4xl text-white mb-1">Choose Your World</h1>
        <p className="text-white/50 text-sm">Explore all 4 worlds and master every level!</p>
      </motion.div>

      {/* World grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {WORLDS.map((world, i) => (
          <WorldCard key={world.id} world={world} index={i} />
        ))}
      </div>

      {/* Footer hint */}
      <motion.p
        className="text-center text-white/30 text-xs mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Collect 3 stars in each level to unlock the next grade!
      </motion.p>
    </div>
  )
}