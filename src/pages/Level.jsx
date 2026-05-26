import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ReactConfetti from 'react-confetti'
import { useGameStore } from '../store/gameStore'
import { getWorld, getGradeData } from '../data/worlds'
import { generateQuestionSet } from '../utils/mathGenerator'
import QuestionCard from '../components/game/QuestionCard'
import AnswerOption from '../components/game/AnswerOption'
import StoryScene from '../components/game/StoryScene'
import HUD from '../components/ui/HUD'
import StarRating from '../components/common/StarRating'
import Button from '../components/common/Button'
import { useTimer } from '../hooks/useTimer'

const TOTAL_QUESTIONS = 10
const TIME_PER_QUESTION = 30

function starsForScore(correct, total) {
  const pct = correct / total
  if (pct >= 0.9) return 3
  if (pct >= 0.6) return 2
  if (pct >= 0.3) return 1
  return 0
}

export default function Level() {
  const { worldId, grade } = useParams()
  const navigate = useNavigate()
  const { character, saveResult } = useGameStore()
  const gradeNum = parseInt(grade)

  const world = getWorld(worldId)
  const gradeData = getGradeData(worldId, gradeNum)

  const [phase, setPhase] = useState('story') // story | playing | results
  const [questions] = useState(() => generateQuestionSet(worldId, gradeNum, TOTAL_QUESTIONS))
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correctAnswer, setCorrectAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [lives, setLives] = useState(3)
  const [fastAnswers, setFastAnswers] = useState(0)
  const [newBadges, setNewBadges] = useState([])
  const [earnedStars, setEarnedStars] = useState(0)
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  const { timeLeft, start: startTimer, stop: stopTimer, reset: resetTimer } = useTimer(TIME_PER_QUESTION, handleTimeUp)

  useEffect(() => {
    const onResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function handleTimeUp() {
    if (phase !== 'playing' || selected !== null) return
    setCorrectAnswer(questions[currentIdx].answer)
    setLives(l => l - 1)
    setTimeout(advanceQuestion, 1500)
  }

  function handleSelect(option) {
    if (selected !== null) return
    stopTimer()
    setSelected(option)
    const q = questions[currentIdx]
    const isCorrect = option === q.answer || String(option) === String(q.answer)

    if (isCorrect) {
      const points = 10 + Math.max(0, timeLeft) * 2
      setScore(s => s + points)
      setCorrectCount(c => c + 1)
      if (timeLeft >= 20) setFastAnswers(f => f + 1)
    } else {
      setCorrectAnswer(q.answer)
      setLives(l => l - 1)
    }

    setTimeout(advanceQuestion, 1400)
  }

  function advanceQuestion() {
    const next = currentIdx + 1
    if (next >= TOTAL_QUESTIONS || lives <= 1 && selected !== questions[currentIdx]?.answer) {
      finishLevel(next === TOTAL_QUESTIONS ? correctCount + (selected === questions[currentIdx]?.answer ? 1 : 0) : correctCount)
    } else {
      setCurrentIdx(next)
      setSelected(null)
      setCorrectAnswer(null)
      resetTimer()
      startTimer()
    }
  }

  function finishLevel(finalCorrect) {
    const stars = starsForScore(finalCorrect, TOTAL_QUESTIONS)
    const perfect = finalCorrect === TOTAL_QUESTIONS
    const badges = saveResult(worldId, gradeNum, stars, perfect, fastAnswers)
    setEarnedStars(stars)
    setNewBadges(badges)
    setPhase('results')
  }

  function startPlaying() {
    setPhase('playing')
    startTimer()
  }

  if (!world || !gradeData) return <div className="text-white p-8">Level not found.</div>

  const currentQ = questions[currentIdx]

  return (
    <div className="min-h-screen star-bg p-4 flex flex-col">
      {/* Story phase */}
      {phase === 'story' && (
        <div className="flex-1 flex items-center justify-center">
          <StoryScene
            character={character}
            storyText={gradeData.story}
            worldEmoji={world.emoji}
            onContinue={startPlaying}
          />
        </div>
      )}

      {/* Playing phase */}
      {phase === 'playing' && (
        <div className="flex-1 flex flex-col max-w-xl mx-auto w-full gap-6">
          {/* HUD */}
          <HUD
            current={currentIdx + 1}
            total={TOTAL_QUESTIONS}
            score={score}
            lives={lives}
            timeLeft={timeLeft}
          />

          {/* Question */}
          <QuestionCard
            question={currentQ.question}
            visual={currentQ.visual}
            questionNum={currentIdx}
          />

          {/* Answers */}
          <div className="grid grid-cols-1 gap-3">
            {currentQ.options.map((opt, i) => (
              <AnswerOption
                key={i}
                option={opt}
                index={i}
                selected={selected}
                correct={correctAnswer}
                onSelect={handleSelect}
                disabled={selected !== null}
              />
            ))}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {selected !== null && (
              <motion.div
                className={`text-center font-game text-2xl py-2 ${
                  selected === currentQ.answer || String(selected) === String(currentQ.answer)
                    ? 'text-emerald-400'
                    : 'text-red-400'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {selected === currentQ.answer || String(selected) === String(currentQ.answer)
                  ? ['Awesome! 🎉', 'Correct! ⭐', 'You rock! 🚀', 'Brilliant! 💡'][Math.floor(Math.random() * 4)]
                  : [`The answer was ${currentQ.answer} 💙`, 'Keep going! 💪'][Math.floor(Math.random() * 2)]
                }
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Results phase */}
      {phase === 'results' && (
        <>
          {earnedStars >= 2 && (
            <ReactConfetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={300}
              colors={['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6']}
            />
          )}
          <div className="flex-1 flex items-center justify-center p-4">
            <motion.div
              className="max-w-md w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="text-6xl mb-4">
                {earnedStars === 3 ? '🏆' : earnedStars === 2 ? '🎉' : earnedStars === 1 ? '💪' : '😢'}
              </div>
              <h2 className="font-game text-3xl text-white mb-2">
                {earnedStars >= 2 ? 'Amazing!' : earnedStars === 1 ? 'Good try!' : 'Keep practising!'}
              </h2>

              <div className="my-6">
                <StarRating stars={earnedStars} size="lg" />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 rounded-2xl p-3">
                  <p className="text-3xl font-game text-white">{correctCount}</p>
                  <p className="text-white/60 text-xs">Correct</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-3">
                  <p className="text-3xl font-game text-yellow-400">{score}</p>
                  <p className="text-white/60 text-xs">Score</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-3">
                  <p className="text-3xl font-game text-violet-400">{fastAnswers}</p>
                  <p className="text-white/60 text-xs">Fast!</p>
                </div>
              </div>

              {newBadges.length > 0 && (
                <motion.div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/40 rounded-2xl" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}>
                  <p className="font-game text-yellow-400 mb-2">New Badge{newBadges.length > 1 ? 's' : ''} Earned!</p>
                  <div className="flex justify-center gap-3">
                    {newBadges.map(id => <span key={id} className="text-3xl">🏅</span>)}
                  </div>
                </motion.div>
              )}

              <div className="flex flex-col gap-3">
                <Button onClick={() => navigate(`/level/${worldId}/${gradeNum}`)} variant="ghost">
                  Try Again 🔄
                </Button>
                {gradeNum < 6 && earnedStars >= 1 && (
                  <Button onClick={() => navigate(`/level/${worldId}/${gradeNum + 1}`)}>
                    Next Level →
                  </Button>
                )}
                <Button onClick={() => navigate(`/world/${worldId}`)} variant="ghost">
                  Back to {world.name}
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  )
}