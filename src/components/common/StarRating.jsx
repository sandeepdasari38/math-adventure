import { motion } from 'framer-motion'

export default function StarRating({ stars = 0, max = 3, size = 'md' }) {
  const sizes = { sm: 'text-xl', md: 'text-3xl', lg: 'text-5xl' }

  return (
    <div className="flex gap-1 justify-center">
      {Array.from({ length: max }, (_, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.2, type: 'spring', stiffness: 200 }}
          className={`${sizes[size]} ${i < stars ? 'drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]' : 'opacity-30'}`}
        >
          ⭐
        </motion.span>
      ))}
    </div>
  )
}