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
    <div className="min-h-screen star-bg">
      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <span className="text-4xl">{CHARACTER_EMOJI[character]}</span>
            <div>
              <p className="text-white/50 text-xs">Welcome back,</p>
              <p className="font-game text-white text-lg">{playerName}</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/40 px-4 py-2 rounded-xl hover:bg-yellow-500/30 transition-colors"
          >
            <span className="text-yellow-400 font-game text-base">⭐ {totalStars}</span>
            <span className="text-white/50 text-sm">Profile</span>
          </button>
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="font-game text-4xl text-white mb-2">Choose Your World</h1>
          <p className="text-white/50 text-sm">Explore all 4 worlds and master every level!</p>
        </motion.div>

        {/* World grid — single column on mobile, 2 cols on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {WORLDS.map((world, i) => (
            <WorldCard key={world.id} world={world} index={i} />
          ))}
        </div>

        {/* Footer hint */}
        <motion.p
          className="text-center text-white/30 text-xs mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Collect ⭐ stars in each level to unlock the next grade!
        </motion.p>

      </div>
    </div>
  )
}