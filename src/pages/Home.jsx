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
    <div className="min-h-screen star-bg flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Floating background */}
      {BG_EMOJIS.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl opacity-10 pointer-events-none select-none"
          style={{ left: `${(i * 11) % 90}%`, top: `${(i * 17) % 80}%` }}
          animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
          transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {emoji}
        </motion.div>
      ))}

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 max-w-lg w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Title */}
        <div className="text-center">
          <motion.div
            className="text-7xl mb-2"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >🌟</motion.div>
          <h1 className="font-game text-5xl md:text-6xl text-white drop-shadow-lg">
            Math
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Adventure</span>
          </h1>
          <p className="text-white/70 mt-2 text-lg">The epic quest to master mathematics!</p>
        </div>

        {/* Input card */}
        <motion.div
          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Name input */}
          <div className="mb-6">
            <label className="block font-game text-white/80 mb-2 text-lg">Your Name, Hero!</label>
            <input
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handleStart()}
              placeholder="Enter your name..."
              maxLength={20}
              className="w-full bg-white/10 border-2 border-white/30 rounded-2xl px-5 py-3 text-white text-lg font-body placeholder-white/40 focus:outline-none focus:border-violet-400 transition-colors"
            />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </div>

          {/* Character selection */}
          <div className="mb-6">
            <label className="block font-game text-white/80 mb-3 text-lg">Choose Your Hero!</label>
            <div className="grid grid-cols-2 gap-3">
              {CHARACTERS.map(char => (
                <motion.button
                  key={char.id}
                  onClick={() => setSelectedChar(char.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedChar === char.id
                      ? 'border-violet-400 bg-violet-500/30 shadow-lg shadow-violet-500/30'
                      : 'border-white/20 bg-white/5 hover:border-white/40'
                  }`}
                >
                  <div className="text-3xl mb-1">{char.emoji}</div>
                  <div className="font-game text-white">{char.name}</div>
                  <div className="text-white/60 text-xs">{char.desc}</div>
                </motion.button>
              ))}
            </div>
          </div>

          <Button onClick={handleStart} size="lg" className="w-full">
            Begin Quest! 🗺️
          </Button>
        </motion.div>

        <p className="text-white/40 text-sm">Grades 1–6 • 4 Worlds • 24 Levels</p>
      </motion.div>
    </div>
  )
}