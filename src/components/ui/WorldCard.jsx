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
      className={`world-card relative rounded-2xl border-2 ${world.borderColor} ${world.bgColor} p-6 cursor-pointer overflow-hidden text-center`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate(`/world/${world.id}`)}
    >
      {/* Decorative glow */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${world.color} opacity-20 blur-2xl pointer-events-none`} />

      <div className="relative flex flex-col items-center gap-3">
        <span className="text-5xl leading-none">{world.emoji}</span>
        <div>
          <h3 className={`font-game text-xl ${world.textColor} mb-1`}>{world.name}</h3>
          <p className="text-white/60 text-sm leading-relaxed">{world.description}</p>
        </div>
        <div className="flex items-center justify-center gap-3 mt-1">
          <StarRating stars={Math.min(totalStars, 3)} size="sm" />
          <span className={`text-sm font-bold ${world.textColor}`}>{totalStars}/18 ⭐</span>
        </div>
      </div>
    </motion.div>
  )
}