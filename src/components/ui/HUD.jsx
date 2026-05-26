import ProgressBar from '../common/ProgressBar'

export default function HUD({ current, total, score, lives = 3, timeLeft, worldColor }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} className={`text-2xl transition-all ${i < lives ? '' : 'opacity-20'}`}>❤️</span>
          ))}
        </div>
        <div className="font-game text-yellow-400 text-xl flex items-center gap-1">
          <span>⭐</span><span>{score}</span>
        </div>
        {timeLeft !== undefined && (
          <div className={`font-game text-xl px-3 py-1 rounded-xl border ${timeLeft <= 10 ? 'text-red-400 border-red-500 animate-pulse' : 'text-white border-white/30'}`}>
            ⏱ {timeLeft}s
          </div>
        )}
      </div>
      <ProgressBar current={current} total={total} label={`Question ${current} of ${total}`} />
    </div>
  )
}