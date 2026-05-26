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
      className={`world-card relative rounded-2xl border-2 ${world.borderColor} ${world.bgColor} p-4 cursor-pointer overflow-hidden`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      onClick={() => navigate(`/world/${world.id}`)}
    >
      {/* Decorative glow */}
      <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${world.color} opacity-20 blur-2xl`} />

      <div className="relative flex items-start gap-4">
        <span className="text-4xl leading-none flex-shrink-0">{world.emoji}</span>
        <div className="flex-1 min-w-0">
          <h3 className={`font-game text-lg ${world.textColor} leading-tight`}>{world.name}</h3>
          <p className="text-white/55 text-xs mt-0.5 mb-2 leading-relaxed line-clamp-2">{world.description}</p>
          <div className="flex items-center justify-between">
            <StarRating stars={Math.min(totalStars, 3)} size="sm" />
            <span className={`text-xs font-bold ${world.textColor}`}>{totalStars}/18 ⭐</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}