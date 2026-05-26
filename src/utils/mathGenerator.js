// Returns { question, answer, options, visual? }

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function wrongOptions(answer, count = 3, spread = 5) {
  const wrongs = new Set()
  while (wrongs.size < count) {
    const offset = rand(1, spread) * (Math.random() < 0.5 ? 1 : -1)
    const w = answer + offset
    if (w !== answer && w >= 0) wrongs.add(w)
  }
  return shuffle([answer, ...wrongs])
}

// ─── ARITHMETIC ────────────────────────────────────────────────────────────────

function arithmeticGrade1() {
  const a = rand(1, 10), b = rand(1, 10 - a)
  const ops = [
    { q: `${a} + ${b} = ?`, a: a + b },
    { q: `${a + b} - ${b} = ?`, a: a },
  ]
  const pick = ops[rand(0, 1)]
  return { question: pick.q, answer: pick.a, options: wrongOptions(pick.a, 3, 3) }
}

function arithmeticGrade2() {
  const a = rand(10, 50), b = rand(1, 30)
  const isAdd = Math.random() < 0.5
  const answer = isAdd ? a + b : a - b
  return {
    question: isAdd ? `${a} + ${b} = ?` : `${a} - ${b} = ?`,
    answer: Math.max(0, answer),
    options: wrongOptions(Math.max(0, answer), 3, 5),
  }
}

function arithmeticGrade3() {
  const tables = [2, 3, 4, 5]
  const t = tables[rand(0, 3)]
  const n = rand(2, 9)
  return {
    question: `${t} × ${n} = ?`,
    answer: t * n,
    options: wrongOptions(t * n, 3, 6),
  }
}

function arithmeticGrade4() {
  const choice = rand(0, 2)
  if (choice === 0) {
    const a = rand(6, 12), b = rand(6, 12)
    return { question: `${a} × ${b} = ?`, answer: a * b, options: wrongOptions(a * b, 3, 10) }
  } else if (choice === 1) {
    const b = rand(2, 9), a = b * rand(2, 9)
    return { question: `${a} ÷ ${b} = ?`, answer: a / b, options: wrongOptions(a / b, 3, 4) }
  } else {
    const a = rand(100, 500), b = rand(10, 100)
    return { question: `${a} + ${b} = ?`, answer: a + b, options: wrongOptions(a + b, 3, 15) }
  }
}

function arithmeticGrade5() {
  const choice = rand(0, 1)
  if (choice === 0) {
    const a = rand(11, 25), b = rand(11, 25)
    return { question: `${a} × ${b} = ?`, answer: a * b, options: wrongOptions(a * b, 3, 20) }
  } else {
    const b = rand(3, 12), a = b * rand(10, 20)
    return { question: `${a} ÷ ${b} = ?`, answer: a / b, options: wrongOptions(a / b, 3, 5) }
  }
}

function arithmeticGrade6() {
  const choice = rand(0, 2)
  if (choice === 0) {
    const bases = [2, 3, 4, 5]
    const base = bases[rand(0, 3)]
    const exp = rand(2, 4)
    return { question: `${base}^${exp} = ?`, answer: Math.pow(base, exp), options: wrongOptions(Math.pow(base, exp), 3, 10) }
  } else if (choice === 1) {
    const a = rand(50, 200), b = rand(5, 20)
    return { question: `${a} × ${b} = ?`, answer: a * b, options: wrongOptions(a * b, 3, 50) }
  } else {
    const a = rand(100, 999), b = rand(1, 9)
    const rem = a % b, q = Math.floor(a / b)
    return {
      question: `What is the remainder of ${a} ÷ ${b}?`,
      answer: rem,
      options: wrongOptions(rem, 3, 3),
    }
  }
}

// ─── FRACTIONS ─────────────────────────────────────────────────────────────────

function fractionsGrade1() {
  const halves = [{ q: 'Half of 8 =', a: 4 }, { q: 'Half of 10 =', a: 5 }, { q: 'Half of 6 =', a: 3 }]
  const p = halves[rand(0, 2)]
  return { question: p.q + ' ?', answer: p.a, options: wrongOptions(p.a, 3, 2) }
}

function fractionsGrade2() {
  const n = rand(1, 3), d = rand(2, 4), total = d * rand(2, 4)
  const pieces = (n / d) * total
  return {
    question: `${n}/${d} of ${total} = ?`,
    answer: pieces,
    options: wrongOptions(pieces, 3, 3),
  }
}

function fractionsGrade3() {
  const d = rand(2, 8)
  const n1 = rand(1, d - 1), n2 = rand(1, d - n1)
  return {
    question: `${n1}/${d} + ${n2}/${d} = ?/${d}`,
    answer: n1 + n2,
    options: wrongOptions(n1 + n2, 3, 2),
  }
}

function fractionsGrade4() {
  const d = rand(2, 6)
  const n1 = rand(1, d), n2 = rand(1, d)
  const answer = n1 + n2
  return {
    question: `${n1}/${d} + ${n2}/${d} = ?/${d}`,
    answer,
    options: wrongOptions(answer, 3, 2),
  }
}

function fractionsGrade5() {
  const d = rand(2, 6)
  const n = rand(1, d - 1)
  const dec = parseFloat((n / d).toFixed(2))
  return {
    question: `${n}/${d} as a decimal = ?`,
    answer: dec,
    options: shuffle([dec, parseFloat((dec + 0.1).toFixed(2)), parseFloat((dec - 0.1).toFixed(2)), parseFloat((dec + 0.25).toFixed(2))].filter(x => x > 0)),
  }
}

function fractionsGrade6() {
  const d1 = rand(2, 6), d2 = rand(2, 6)
  const n1 = rand(1, d1), n2 = rand(1, d2)
  const lcd = (d1 * d2) / gcd(d1, d2)
  const sum = n1 * (lcd / d1) + n2 * (lcd / d2)
  return {
    question: `${n1}/${d1} + ${n2}/${d2} = ?/${lcd}`,
    answer: sum,
    options: wrongOptions(sum, 3, 3),
  }
}

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b) }

// ─── GEOMETRY ──────────────────────────────────────────────────────────────────

const SHAPES = ['triangle', 'square', 'circle', 'rectangle', 'pentagon', 'hexagon']

function geometryGrade1() {
  const sides = { triangle: 3, square: 4, pentagon: 5, hexagon: 6 }
  const shape = ['triangle', 'square', 'pentagon', 'hexagon'][rand(0, 3)]
  return {
    question: `How many sides does a ${shape} have?`,
    answer: sides[shape],
    options: wrongOptions(sides[shape], 3, 2),
    visual: { type: 'shape', shape },
  }
}

function geometryGrade2() {
  const shape = ['triangle', 'square', 'rectangle'][rand(0, 2)]
  const sides = { triangle: 3, square: 4, rectangle: 4 }
  return {
    question: `How many corners does a ${shape} have?`,
    answer: sides[shape],
    options: wrongOptions(sides[shape], 3, 2),
    visual: { type: 'shape', shape },
  }
}

function geometryGrade3() {
  const s = rand(2, 9)
  return {
    question: `Perimeter of a square with side ${s} cm = ?`,
    answer: 4 * s,
    options: wrongOptions(4 * s, 3, 4),
    visual: { type: 'square', size: s },
  }
}

function geometryGrade4() {
  const l = rand(3, 10), w = rand(2, 8)
  const choice = rand(0, 1)
  if (choice === 0) {
    return {
      question: `Area of a rectangle: length ${l}, width ${w} = ?`,
      answer: l * w,
      options: wrongOptions(l * w, 3, 8),
      visual: { type: 'rectangle', l, w },
    }
  } else {
    return {
      question: `Perimeter of rectangle: length ${l}, width ${w} = ?`,
      answer: 2 * (l + w),
      options: wrongOptions(2 * (l + w), 3, 6),
      visual: { type: 'rectangle', l, w },
    }
  }
}

function geometryGrade5() {
  const b = rand(3, 10), h = rand(2, 8)
  return {
    question: `Area of a triangle: base ${b}, height ${h} = ?`,
    answer: (b * h) / 2,
    options: shuffle([(b * h) / 2, b * h, b + h, (b + h) * 2]),
    visual: { type: 'triangle', b, h },
  }
}

function geometryGrade6() {
  const r = rand(2, 8)
  const area = parseFloat((Math.PI * r * r).toFixed(1))
  return {
    question: `Area of circle with radius ${r} (use π≈3.14) = ?`,
    answer: parseFloat((3.14 * r * r).toFixed(1)),
    options: shuffle([
      parseFloat((3.14 * r * r).toFixed(1)),
      parseFloat((2 * 3.14 * r).toFixed(1)),
      parseFloat((3.14 * r).toFixed(1)),
      parseFloat((3.14 * r * r * 2).toFixed(1)),
    ]),
    visual: { type: 'circle', r },
  }
}

// ─── WORD PROBLEMS ─────────────────────────────────────────────────────────────

const NAMES = ['Aria', 'Ben', 'Luna', 'Kira', 'Max', 'Zoe', 'Leo', 'Maya']
const ITEMS = ['apples', 'cookies', 'books', 'stars', 'coins', 'gems', 'flowers', 'stickers']
name => NAMES[rand(0, NAMES.length - 1)]
function rName() { return NAMES[rand(0, NAMES.length - 1)] }
function rItem() { return ITEMS[rand(0, ITEMS.length - 1)] }

function wordGrade1() {
  const name = rName(), item = rItem()
  const a = rand(1, 8), b = rand(1, 8 - a)
  return {
    question: `${name} had ${a} ${item}. She found ${b} more. How many does she have now?`,
    answer: a + b,
    options: wrongOptions(a + b, 3, 3),
  }
}

function wordGrade2() {
  const name = rName(), item = rItem()
  const total = rand(10, 20), gave = rand(1, total - 1)
  return {
    question: `${name} had ${total} ${item} and gave away ${gave}. How many are left?`,
    answer: total - gave,
    options: wrongOptions(total - gave, 3, 4),
  }
}

function wordGrade3() {
  const name = rName(), item = rItem()
  const bags = rand(2, 6), each = rand(3, 8)
  return {
    question: `${name} packed ${bags} bags with ${each} ${item} each. How many total?`,
    answer: bags * each,
    options: wrongOptions(bags * each, 3, 5),
  }
}

function wordGrade4() {
  const name = rName(), item = rItem()
  const total = rand(24, 72), groups = rand(3, 8)
  const each = Math.floor(total / groups) * groups
  return {
    question: `${each} ${item} are shared equally among ${groups} friends. How many each?`,
    answer: each / groups,
    options: wrongOptions(each / groups, 3, 3),
  }
}

function wordGrade5() {
  const name = rName()
  const price = rand(2, 9), qty = rand(3, 8), budget = price * qty + rand(1, 10)
  const cost = price * qty
  return {
    question: `${name} buys ${qty} items at $${price} each. She pays $${budget}. How much change?`,
    answer: budget - cost,
    options: wrongOptions(budget - cost, 3, 3),
  }
}

function wordGrade6() {
  const speed = rand(40, 80), time = rand(2, 5)
  return {
    question: `A train travels at ${speed} km/h for ${time} hours. How far does it travel?`,
    answer: speed * time,
    options: wrongOptions(speed * time, 3, 20),
  }
}

// ─── REGISTRY ──────────────────────────────────────────────────────────────────

const GENERATORS = {
  arithmetic:   [arithmeticGrade1, arithmeticGrade2, arithmeticGrade3, arithmeticGrade4, arithmeticGrade5, arithmeticGrade6],
  fractions:    [fractionsGrade1,  fractionsGrade2,  fractionsGrade3,  fractionsGrade4,  fractionsGrade5,  fractionsGrade6],
  geometry:     [geometryGrade1,   geometryGrade2,   geometryGrade3,   geometryGrade4,   geometryGrade5,   geometryGrade6],
  wordproblems: [wordGrade1,       wordGrade2,       wordGrade3,       wordGrade4,       wordGrade5,       wordGrade6],
}

export function generateQuestion(world, grade) {
  const fn = GENERATORS[world]?.[grade - 1]
  if (!fn) throw new Error(`No generator for ${world} grade ${grade}`)
  return fn()
}

export function generateQuestionSet(world, grade, count = 10) {
  return Array.from({ length: count }, () => generateQuestion(world, grade))
}