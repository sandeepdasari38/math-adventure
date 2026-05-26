import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { WORLDS } from '../data/worlds'
import { BADGES } from '../store/gameStore'
import Badge from '../components/ui/Badge'
import StarRating from '../components/common/StarRating'
import Button from '../components/common/Button'

const CHARACTER_EMOJI = { wizard: '🧙', explorer: '🧭', knight: '⚔️', astronaut: '🚀' }

export default function Profile() {
  const navigate = useNavigate()
  const { playerName, character, progress, earnedBadges, totalCoins, getTotalStars, resetProgress } = useGameStore()
  const totalStars = getTotalStars()

  function handleReset() {
    if (window.confirm('Reset all progress? This cannot be undone!')) {
      resetProgress()
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen star-bg p-6">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <motion.button
          onClick={() => navigate('/map')}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ← Back to Map
        </motion.button>

        {/* Hero card */}
        <motion.div
          className="bg-gradient-to-br from-violet-900/60 to-purple-900/60 border-2 border-violet-500 rounded-3xl p-8 text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-7xl mb-3">{CHARACTER_EMOJI[character]}</div>
          <h1 className="font-game text-3xl text-white mb-1">{playerName}</h1>
          <p className="text-violet-300 mb-4">Math Adventure Hero</p>
          <div className="flex justify-center gap-8">
            <div>
              <p className="font-game text-3xl text-yellow-400">{totalStars}</p>
              <p className="text-white/60 text-sm">Total Stars</p>
            </div>
            <div>
              <p className="font-game text-3xl text-orange-400">{totalCoins}</p>
              <p className="text-white/60 text-sm">Coins</p>
            </div>
            <div>
              <p className="font-game text-3xl text-violet-400">{earnedBadges.length}</p>
              <p className="text-white/60 text-sm">Badges</p>
            </div>
          </div>
        </motion.div>

        {/* World progress */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-game text-2xl text-white mb-4">World Progress</h2>
          <div className="flex flex-col gap-3">
            {WORLDS.map((world, i) => {
              const worldStars = Object.values(progress[world.id]).reduce((a, b) => a + b, 0)
              return (
                <div
                  key={world.id}
                  className={`flex items-center gap-4 ${world.bgColor} border ${world.borderColor} rounded-2xl p-4`}
                >
                  <span className="text-3xl">{world.emoji}</span>
                  <div className="flex-1">
                    <p className={`font-game ${world.textColor}`}>{world.name}</p>
                    <div className="h-2 bg-white/10 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-400"
                        style={{ width: `${(worldStars / 18) * 100}%`, transition: 'width 1s ease' }}
                      />
                    </div>
                  </div>
                  <span className="text-yellow-400 font-game">{worldStars}/18 ⭐</span>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-game text-2xl text-white mb-4">Badges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BADGES.map((badge, i) => (
              <Badge
                key={badge.id}
                badge={badge}
                earned={earnedBadges.includes(badge.id)}
                index={i}
              />
            ))}
          </div>
        </motion.div>

        <Button variant="danger" onClick={handleReset} className="w-full">
          Reset Progress
        </Button>
      </div>
    </div>
  )
}