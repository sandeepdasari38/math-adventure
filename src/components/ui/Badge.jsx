import { motion } from 'framer-motion'

export default function Badge({ badge, earned = false, index = 0 }) {
  return (
    <motion.div
      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
        earned
          ? 'border-yellow-500 bg-yellow-500/20 shadow-lg shadow-yellow-500/20'
          : 'border-white/10 bg-white/5 opacity-50'
      }`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: earned ? 1 : 0.5, scale: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <span className={`text-4xl ${earned ? '' : 'grayscale'}`}>{badge.icon}</span>
      <span className="text-xs text-center text-white/80 font-bold">{badge.label}</span>
      {earned && <span className="text-xs text-yellow-400">Earned!</span>}
    </motion.div>
  )
}