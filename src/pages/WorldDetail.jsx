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
          className={`rounded-2xl border-2 ${world.borderColor} ${world.bgColor} p-5 mb-5 text-center`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-5xl mb-2">{world.emoji}</div>
          <h1 className={`font-game text-2xl ${world.textColor} mb-1`}>{world.name}</h1>
          <p className="text-white/60 text-sm mb-3">{world.storyIntro}</p>
          <div className="flex justify-center">
            <StarRating stars={Math.min(Object.values(worldProgress).reduce((a,b)=>a+b,0), 3)} size="sm" />
          </div>
        </motion.div>

        {/* Grade levels */}
        <div className="flex flex-col gap-2.5">
          {world.grades.map((gradeData, i) => {
            const stars = worldProgress[gradeData.grade] || 0
            const unlocked = isLevelUnlocked(worldId, gradeData.grade)

            return (
              <motion.div
                key={gradeData.grade}
                className={`flex items-center gap-3 rounded-xl border-2 p-3.5 transition-all ${
                  unlocked
                    ? `${world.borderColor} ${world.bgColor} cursor-pointer hover:scale-[1.02]`
                    : 'border-white/10 bg-white/5 opacity-50'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => unlocked && navigate(`/level/${worldId}/${gradeData.grade}`)}
              >
                {/* Grade badge */}
                <div className={`w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center font-game text-base border-2 ${
                  unlocked ? `${world.borderColor} bg-white/10 text-white` : 'border-white/20 bg-white/5 text-white/40'
                }`}>
                  {unlocked ? gradeData.grade : '🔒'}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`font-game text-base leading-tight ${unlocked ? 'text-white' : 'text-white/40'}`}>
                    Grade {gradeData.grade}: {gradeData.title}
                  </p>
                  <p className="text-white/45 text-xs truncate">{gradeData.story}</p>
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