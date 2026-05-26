export default function ShapeVisual({ visual }) {
  if (!visual) return null

  const { type, shape, size, l, w, b, h, r } = visual

  const svgProps = {
    viewBox: '0 0 100 100',
    className: 'w-32 h-32 mx-auto my-2',
  }

  if (type === 'shape' || shape) {
    const s = shape || type
    if (s === 'triangle') return (
      <svg {...svgProps}><polygon points="50,10 90,90 10,90" fill="#8b5cf6" stroke="#c4b5fd" strokeWidth="2" /></svg>
    )
    if (s === 'square') return (
      <svg {...svgProps}><rect x="15" y="15" width="70" height="70" fill="#8b5cf6" stroke="#c4b5fd" strokeWidth="2" /></svg>
    )
    if (s === 'rectangle') return (
      <svg {...svgProps}><rect x="5" y="25" width="90" height="50" fill="#8b5cf6" stroke="#c4b5fd" strokeWidth="2" /></svg>
    )
    if (s === 'circle') return (
      <svg {...svgProps}><circle cx="50" cy="50" r="40" fill="#8b5cf6" stroke="#c4b5fd" strokeWidth="2" /></svg>
    )
    if (s === 'pentagon') return (
      <svg {...svgProps}><polygon points="50,10 90,38 75,85 25,85 10,38" fill="#8b5cf6" stroke="#c4b5fd" strokeWidth="2" /></svg>
    )
    if (s === 'hexagon') return (
      <svg {...svgProps}><polygon points="50,5 90,27 90,73 50,95 10,73 10,27" fill="#8b5cf6" stroke="#c4b5fd" strokeWidth="2" /></svg>
    )
  }

  if (type === 'circle') return (
    <svg {...svgProps}>
      <circle cx="50" cy="50" r="40" fill="#3b82f6" stroke="#93c5fd" strokeWidth="2" />
      <line x1="50" y1="50" x2="90" y2="50" stroke="white" strokeWidth="2" strokeDasharray="4" />
      <text x="68" y="45" fill="white" fontSize="10">r={r}</text>
    </svg>
  )

  if (type === 'rectangle') return (
    <svg {...svgProps}>
      <rect x="10" y="25" width="80" height="50" fill="#3b82f6" stroke="#93c5fd" strokeWidth="2" />
      <text x="40" y="18" fill="white" fontSize="10">{l}</text>
      <text x="88" y="52" fill="white" fontSize="10">{w}</text>
    </svg>
  )

  if (type === 'square') return (
    <svg {...svgProps}>
      <rect x="15" y="15" width="70" height="70" fill="#8b5cf6" stroke="#c4b5fd" strokeWidth="2" />
      <text x="45" y="8" fill="white" fontSize="10">{size}</text>
    </svg>
  )

  return null
}