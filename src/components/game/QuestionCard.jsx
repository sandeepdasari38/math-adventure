import { motion, AnimatePresence } from 'framer-motion'
import ShapeVisual from './ShapeVisual'

export default function QuestionCard({ question, visual, questionNum }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={questionNum}
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center shadow-2xl"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <ShapeVisual visual={visual} />
        <p className="font-game text-2xl md:text-3xl text-white leading-relaxed">{question}</p>
      </motion.div>
    </AnimatePresence>
  )
}