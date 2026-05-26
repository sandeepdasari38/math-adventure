import { motion } from 'framer-motion'

const CHARACTER_EMOJI = {
  wizard: '🧙',
  explorer: '🧭',
  knight: '⚔️',
  astronaut: '🚀',
}

export default function StoryScene({ character, storyText, worldEmoji, onContinue }) {
  const emoji = CHARACTER_EMOJI[character] || '🧙'

  return (
    <motion.div
      className="flex flex-col items-center gap-8 text-center max-w-lg mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* World and character */}
      <div className="flex items-end gap-4">
        <motion.div
          className="text-8xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {worldEmoji}
        </motion.div>
        <motion.div
          className="text-7xl"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          {emoji}
        </motion.div>
      </div>

      {/* Speech bubble */}
      <motion.div
        className="bg-white/10 border border-white/30 rounded-3xl p-6 relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white/30 text-2xl">▲</div>
        <p className="font-body text-white/90 text-lg leading-relaxed">{storyText}</p>
      </motion.div>

      <motion.button
        onClick={onContinue}
        className="font-game text-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-10 py-4 rounded-2xl shadow-lg shadow-orange-500/30"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: ['0 0 20px rgba(251,146,60,0.4)', '0 0 40px rgba(251,146,60,0.8)', '0 0 20px rgba(251,146,60,0.4)'] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Start Adventure! ✨
      </motion.button>
    </motion.div>
  )
}