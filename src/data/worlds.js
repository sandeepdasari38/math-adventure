export const WORLDS = [
  {
    id: 'arithmetic',
    name: 'Arithmetic Kingdom',
    emoji: '🔢',
    color: 'from-violet-600 to-purple-800',
    bgColor: 'bg-violet-900/30',
    borderColor: 'border-violet-500',
    textColor: 'text-violet-300',
    description: 'Master the magic of numbers! Add, subtract, multiply and divide your way through the enchanted kingdom.',
    storyIntro: 'The Arithmetic Kingdom is under a dark spell! Numbers have gone haywire and the King needs your help to restore order.',
    grades: [
      { grade: 1, title: 'Number Village', story: 'The villagers need help counting their harvest. Can you help them add and subtract?' },
      { grade: 2, title: 'Count Castle', story: 'The castle guards are confused by big numbers. Show them the way!' },
      { grade: 3, title: 'Multiplication Meadow', story: 'The fairies need to multiply their magic dust. Times tables to the rescue!' },
      { grade: 4, title: 'Division Dungeon', story: 'Treasure in the dungeon must be shared equally among the heroes.' },
      { grade: 5, title: 'Big Number Bazaar', story: 'The market sells hundreds of items. Help the merchants with large calculations!' },
      { grade: 6, title: 'Power Tower', story: 'Climb the tower by mastering powers and advanced arithmetic. The kingdom depends on you!' },
    ],
  },
  {
    id: 'fractions',
    name: 'Fraction Forest',
    emoji: '🌿',
    color: 'from-emerald-600 to-green-800',
    bgColor: 'bg-emerald-900/30',
    borderColor: 'border-emerald-500',
    textColor: 'text-emerald-300',
    description: 'Journey through an enchanted forest where everything is split into pieces. Learn fractions and decimals!',
    storyIntro: 'The ancient trees of Fraction Forest are splitting apart! Only a fraction master can piece them back together.',
    grades: [
      { grade: 1, title: 'Half Way Hollow', story: 'The gnomes share their food in halves. Help them split things equally!' },
      { grade: 2, title: 'Quarter Quarry', story: 'Miners found gems that need to be divided into equal shares.' },
      { grade: 3, title: 'Same Slice Swamp', story: 'Add fractions with the same denominator to drain the swamp!' },
      { grade: 4, title: 'Fraction Falls', story: 'Water flows in fractions. Navigate the falls using fraction addition.' },
      { grade: 5, title: 'Decimal Dale', story: 'Fractions turn into decimals in this magical dale. Convert to cross!' },
      { grade: 6, title: 'LCD Lagoon', story: 'Find the LCD to add unlike fractions and calm the lagoon\'s waters.' },
    ],
  },
  {
    id: 'geometry',
    name: 'Geometry Galaxy',
    emoji: '🔷',
    color: 'from-blue-600 to-cyan-800',
    bgColor: 'bg-blue-900/30',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-300',
    description: 'Explore a galaxy made of shapes! Discover sides, angles, area and perimeter across the cosmos.',
    storyIntro: 'The Geometry Galaxy is collapsing — its planets are losing their shapes! Only a shape expert can restore them.',
    grades: [
      { grade: 1, title: 'Shape Nebula', story: 'Identify the shapes of the planets before they drift apart!' },
      { grade: 2, title: 'Corner Crater', story: 'Count the corners on each asteroid to map the galaxy.' },
      { grade: 3, title: 'Perimeter Planet', story: 'Build fences around the square planets using perimeter.' },
      { grade: 4, title: 'Area Asteroid', story: 'Calculate how much space each planet has — find the area!' },
      { grade: 5, title: 'Triangle Trail', story: 'Chart a course through triangular space stations using triangle area.' },
      { grade: 6, title: 'Circle Star', story: 'Measure the circular stars using π. The galaxy\'s fate depends on it!' },
    ],
  },
  {
    id: 'wordproblems',
    name: 'Word Problem Wilderness',
    emoji: '📖',
    color: 'from-orange-600 to-red-800',
    bgColor: 'bg-orange-900/30',
    borderColor: 'border-orange-500',
    textColor: 'text-orange-300',
    description: 'Decode real-world story puzzles! Read carefully and use math to survive the wilderness.',
    storyIntro: 'The Wilderness is full of mysteries that can only be solved with your math and reading skills together!',
    grades: [
      { grade: 1, title: 'Berry Berry Trail', story: 'Animals are collecting berries. Help them count up what they find!' },
      { grade: 2, title: 'Market Meadow', story: 'Visit the market and solve shopping problems for the villagers.' },
      { grade: 3, title: 'Farm Fair', story: 'The farmer needs help with multiplication at the annual fair.' },
      { grade: 4, title: 'Sharing Springs', story: 'Friends share treasures equally at the springs. Use division!' },
      { grade: 5, title: 'Budget Bayou', story: 'Navigate the bayou by calculating prices, change and totals.' },
      { grade: 6, title: 'Speed Savanna', story: 'Animals race across the savanna — calculate speed, time and distance!' },
    ],
  },
]

export function getWorld(id) {
  return WORLDS.find(w => w.id === id)
}

export function getGradeData(worldId, grade) {
  const world = getWorld(worldId)
  return world?.grades.find(g => g.grade === grade)
}