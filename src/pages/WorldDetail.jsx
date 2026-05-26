import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { getWorld } from '../data/worlds'
import StarRating from '../components/common/StarRating'
import Button from '../components/common/Button'

export default function WorldDetail() {
  const { worldId } = useParams()
  const navigate = useNavigate()
  const { progress, isLevelUnlocked } = useGameStore()
  const world = getWorld(worldId)

  if (!world) return <div className="text-white p-8">World not found.</div>

  const worldProgress = progress[worldId]

  return (
    <div className="min-h-screen star-bg p-6">
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <motion.button
          onClick={() => navigate('/map')}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          ← Back to Map
        </motion.button>

        {/* World header */}
        <motion.div
          className={`rounded-3xl border-2 ${world.borderColor} ${world.bgColor} p-8 mb-8 text-center`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-7xl mb-4">{world.emoji}</div>
          <h1 className={`font-game text-3xl ${world.textColor} mb-2`}>{world.name}</h1>
          <p className="text-white/70 mb-4">{world.storyIntro}</p>
          <div className="flex justify-center">
            <StarRating stars={Math.min(Object.values(worldProgress).reduce((a,b)=>a+b,0), 3)} />
          </div>
        </motion.div>

        {/* Grade levels */}
        <div className="flex flex-col gap-4">
          {world.grades.map((gradeData, i) => {
            const stars = worldProgress[gradeData.grade] || 0
            const unlocked = isLevelUnlocked(worldId, gradeData.grade)

            return (
              <motion.div
                key={gradeData.grade}
                className={`flex items-center gap-4 rounded-2xl border-2 p-5 transition-all ${
                  unlocked
                    ? `${world.borderColor} ${world.bgColor} cursor-pointer hover:scale-[1.02]`
                    : 'border-white/10 bg-white/5 opacity-60'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => unlocked && navigate(`/level/${worldId}/${gradeData.grade}`)}
              >
                {/* Grade badge */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-game text-xl border-2 ${
                  unlocked ? `${world.borderColor} bg-white/10 text-white` : 'border-white/20 bg-white/5 text-white/40'
                }`}>
                  {unlocked ? gradeData.grade : '🔒'}
                </div>

                <div className="flex-1">
                  <p className={`font-game text-lg ${unlocked ? 'text-white' : 'text-white/40'}`}>
                    Grade {gradeData.grade}: {gradeData.title}
                  </p>
                  <p className="text-white/50 text-sm truncate">{gradeData.story}</p>
                </div>

                <StarRating stars={stars} size="sm" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}