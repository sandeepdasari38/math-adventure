export default function ProgressBar({ current, total, label }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-sm text-white/70 mb-1">
          <span>{label}</span>
          <span>{current}/{total}</span>
        </div>
      )}
      <div className="h-4 bg-white/10 rounded-full overflow-hidden border border-white/20">
        <div
          className="progress-fill h-full rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}