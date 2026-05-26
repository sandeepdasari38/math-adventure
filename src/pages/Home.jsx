import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import Button from '../components/common/Button'

const CHARACTERS = [
  { id: 'wizard',    emoji: '🧙', name: 'Wizard',    desc: 'Masters of magic math!' },
  { id: 'explorer',  emoji: '🧭', name: 'Explorer',  desc: 'Fearless number seekers!' },
  { id: 'knight',    emoji: '⚔️', name: 'Knight',    desc: 'Brave equation warriors!' },
  { id: 'astronaut', emoji: '🚀', name: 'Astronaut', desc: 'Cosmic calculation experts!' },
]

// Floating background emojis
const BG_EMOJIS = ['➕', '➖', '✖️', '➗', '🔢', '⭐', '💎', '🌟', '🎯', '🏆']

export default function Home() {
  const navigate = useNavigate()
  const { playerName, character, setPlayer } = useGameStore()
  const [name, setName] = useState(playerName || '')
  const [selectedChar, setSelectedChar] = useState(character || 'wizard')
  const [error, setError] = useState('')

  function handleStart() {
    if (!name.trim()) { setError('Please enter your name!'); return }
    setPlayer(name.trim(), selectedChar)
    navigate('/map')
  }

  return (
    <div className="min-h-screen star-bg relative overflow-x-hidden">
      {/* Floating background emojis — fixed so they don't affect layout */}
      {BG_EMOJIS.map((emoji, i) => (
        <motion.div
          key={i}
          className="fixed text-2xl opacity-10 pointer-events-none select-none"
          style={{ left: `${(i * 11) % 90}%`, top: `${(i * 17) % 80}%`, zIndex: 0 }}
          animate={{ y: [-8, 8, -8], rotate: [-5, 5, -5] }}
          transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Scrollable content wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen py-8 px-4">
        <motion.div
          className="flex flex-col items-center gap-5 w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* ── Title ── */}
          <div className="text-center">
            <motion.div
              className="text-5xl mb-1 inline-block"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              🌟
            </motion.div>
            <h1 className="font-game text-4xl md:text-5xl text-white leading-tight">
              Math
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Adventure</span>
            </h1>
            <p className="text-white/60 text-sm mt-1">The epic quest to master mathematics!</p>
          </div>

          {/* ── Form card ── */}
          <motion.div
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-5 shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {/* Name input */}
            <div className="mb-4">
              <label className="block font-game text-white/80 mb-1.5 text-base">
                Your Name, Hero!
              </label>
              <input
                type="text"
                value={name}
                onChange={e => { setName(e.target.value); setError('') }}
                onKeyDown={e => e.key === 'Enter' && handleStart()}
                placeholder="Enter your name..."
                maxLength={20}
                className="w-full bg-white/10 border-2 border-white/25 rounded-xl px-4 py-2.5 text-white text-base placeholder-white/40 focus:outline-none focus:border-violet-400 transition-colors"
              />
              {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
            </div>

            {/* Character selection */}
            <div className="mb-4">
              <label className="block font-game text-white/80 mb-2 text-base">
                Choose Your Hero!
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CHARACTERS.map(char => (
                  <motion.button
                    key={char.id}
                    onClick={() => setSelectedChar(char.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 text-left transition-all ${
                      selectedChar === char.id
                        ? 'border-violet-400 bg-violet-500/30 shadow-md shadow-violet-500/30'
                        : 'border-white/20 bg-white/5 hover:border-white/35 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-2xl leading-none">{char.emoji}</span>
                    <div className="min-w-0">
                      <div className="font-game text-white text-sm leading-tight">{char.name}</div>
                      <div className="text-white/55 text-xs leading-tight truncate">{char.desc}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <Button onClick={handleStart} size="md" className="w-full">
              Begin Quest! 🗺️
            </Button>
          </motion.div>

          <p className="text-white/35 text-xs">Grades 1–6 · 4 Worlds · 24 Levels</p>
        </motion.div>
      </div>
    </div>
  )
}