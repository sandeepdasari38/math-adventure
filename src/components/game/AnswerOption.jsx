import { motion } from 'framer-motion'

const COLORS = [
  'from-violet-600 to-purple-700 border-violet-400',
  'from-blue-600 to-cyan-700 border-blue-400',
  'from-emerald-600 to-green-700 border-emerald-400',
  'from-orange-600 to-amber-700 border-orange-400',
]

export default function AnswerOption({ option, index, selected, correct, onSelect, disabled }) {
  const isSelected = selected === option
  const showCorrect = correct !== null && option === correct
  const showWrong = correct !== null && isSelected && option !== correct

  return (
    <motion.button
      onClick={() => !disabled && onSelect(option)}
      disabled={disabled}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      className={`
        answer-btn w-full p-4 rounded-2xl border-2 font-game text-xl text-white
        bg-gradient-to-r transition-all duration-200
        ${showCorrect ? 'correct from-emerald-500 to-green-600 border-emerald-400 shadow-lg shadow-emerald-500/50' :
          showWrong ? 'wrong from-red-500 to-rose-600 border-red-400' :
          isSelected ? `${COLORS[index]} scale-105 shadow-lg` :
          `${COLORS[index]} opacity-80`}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span className="mr-2">{'ABCD'[index]}.</span>
      {option}
    </motion.button>
  )
}