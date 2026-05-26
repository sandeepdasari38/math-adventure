import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useGameStore } from './store/gameStore'
import Home from './pages/Home'
import WorldMap from './pages/WorldMap'
import WorldDetail from './pages/WorldDetail'
import Level from './pages/Level'
import Profile from './pages/Profile'

function RequirePlayer({ children }) {
  const playerName = useGameStore(s => s.playerName)
  if (!playerName) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<RequirePlayer><WorldMap /></RequirePlayer>} />
        <Route path="/world/:worldId" element={<RequirePlayer><WorldDetail /></RequirePlayer>} />
        <Route path="/level/:worldId/:grade" element={<RequirePlayer><Level /></RequirePlayer>} />
        <Route path="/profile" element={<RequirePlayer><Profile /></RequirePlayer>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
