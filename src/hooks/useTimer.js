import { useState, useEffect, useRef } from 'react'

export function useTimer(initialSeconds, onExpire) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)
  const [running, setRunning] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!running) return
    ref.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(ref.current)
          setRunning(false)
          onExpire?.()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(ref.current)
  }, [running])

  const start = () => { setTimeLeft(initialSeconds); setRunning(true) }
  const stop  = () => { clearInterval(ref.current); setRunning(false) }
  const reset = () => { stop(); setTimeLeft(initialSeconds) }

  return { timeLeft, start, stop, reset, running }
}