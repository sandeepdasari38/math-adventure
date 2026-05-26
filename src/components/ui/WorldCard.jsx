import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import StarRating from '../common/StarRating'
import { useGameStore } from '../../store/gameStore'

export default function WorldCard({ world, index }) {
  const navigate = useNavigate()
  const progress = useGameStore(s => s.progress[world.id])
  const totalStars = Object.values(progress).reduce((a, b) => a + b, 0)

  return (
    <motion.div
      className={`world-card relative rounded-3xl border-2 ${world.borderColor} ${world.bgColor} p-6 cursor-pointer overflow-hidden`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate(`/world/${world.id}`)}
    >
      {/* Decorative glow */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${world.color} opacity-20 blur-2xl`} />

      <div className="relative">
        <div className="text-5xl mb-3">{world.emoji}</div>
        <h3 className={`font-game text-xl ${world.textColor} mb-1`}>{world.name}</h3>
        <p className="text-white/60 text-sm mb-4 leading-relaxed">{world.description}</p>

        <div className="flex items-center justify-between">
          <StarRating stars={Math.min(totalStars, 3)} size="sm" />
          <span className={`text-sm font-bold ${world.textColor}`}>{totalStars}/18 ⭐</span>
        </div>
      </div>
    </motion.div>
  )
}