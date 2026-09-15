export type Burger = { id: string; name: string; subtitle: string; image: string }

export const burgers: Burger[] = [
  ["der-m", "Der M", "Groß, kräftig & klassisch", "der-m.png"],
  ["der-m-bacon", "Der M Bacon", "Mit extra Bacon", "der-m-bacon.png"],
  [
    "big-tasty-pepper-bacon",
    "Big Tasty Pepper Bacon",
    "Pfeffrig & rauchig",
    "big-tasty-pepper-bacon.png",
  ],
  ["big-tasty-bacon", "Big Tasty Bacon", "Rauchig & kräftig", "big-tasty-bacon.png"],
  ["big-mac", "Big Mac", "Der Klassiker", "big-mac.png"],
  ["big-roesti", "Big Rösti", "Winter-Klassiker", "big-roesti.png"],
  [
    "mccrispy-pepper-delight",
    "McCrispy Pepper Delight",
    "Knusprig & pfeffrig",
    "mccrispy-pepper-delight.png",
  ],
  ["mccrispy", "McCrispy", "Knuspriges Hähnchen", "mccrispy.png"],
  [
    "double-royal-ts",
    "Double Hamburger Royal TS",
    "Doppelt mit Tomate & Salat",
    "double-royal-ts.png",
  ],
  [
    "double-royal-kaese",
    "Double Hamburger Royal Cheese",
    "Doppelt extra cheesy",
    "double-royal-kaese.png",
  ],
  ["royal-ts", "Hamburger Royal TS", "Mit Tomate & Salat", "royal-ts.png"],
  ["royal-kaese", "Hamburger Royal Käse", "Extra cheesy", "royal-kaese.png"],
  ["mcveggie-ts", "McVeggie TS", "Vegetarisch mit Tomate & Salat", "mcveggie-ts.png"],
  ["mcchicken", "McChicken Classic", "Der Chicken-Klassiker", "mcchicken.png"],
  ["double-beef-classic", "Double Beef Classic", "Doppelt & klassisch", "double-beef-classic.png"],
  ["mcrib", "McRib", "BBQ & Zwiebeln", "mcrib.png"],
  ["filet-o-fish", "Filet-o-Fish", "Fisch & Käse", "filet-o-fish.png"],
  [
    "mcdouble-chili-cheese",
    "McDouble Chili Cheese",
    "Doppelt mit Chili-Käse",
    "mcdouble-chili-cheese.png",
  ],
  ["double-cheeseburger", "Double Cheeseburger", "Doppelt cheesy", "double-cheeseburger.png"],
  ["cheeseburger", "Cheeseburger", "Klein aber fein", "cheeseburger.png"],
  ["hamburger", "Hamburger", "Pur & klassisch", "hamburger.png"],
  [
    "double-chickenburger",
    "Double Chickenburger",
    "Doppelt knuspriges Hähnchen",
    "chickenburger.png",
  ],
  ["chickenburger", "Chickenburger", "Knusprig & unkompliziert", "chickenburger.png"],
].map(([id, name, subtitle, image]) => ({ id, name, subtitle, image: `/burgers/${image}` }))

export const tiers = [
  { id: "S", label: "S", color: "#f4c430" },
  { id: "A", label: "A", color: "#f06a3f" },
  { id: "B", label: "B", color: "#e9a23b" },
  { id: "C", label: "C", color: "#6eb5a1" },
  { id: "D", label: "D", color: "#5b8bb8" },
] as const

export type TierId = (typeof tiers)[number]["id"]
export type BoardState = Record<TierId | "pool", string[]>

export const defaultBoard: BoardState = {
  pool: burgers.map((b) => b.id),
  S: [],
  A: [],
  B: [],
  C: [],
  D: [],
}
export const burgerById = Object.fromEntries(burgers.map((b) => [b.id, b]))

export function getTier(id: string, board: BoardState) {
  return (
    (Object.keys(board) as (keyof BoardState)[]).find((tier) => board[tier].includes(id)) ?? "pool"
  )
}

export function cleanBoard(value: unknown): BoardState {
  if (!value || typeof value !== "object") return defaultBoard

  const raw = value as Partial<BoardState>
  const valid = new Set(burgers.map((b) => b.id))
  const result = { pool: [], S: [], A: [], B: [], C: [], D: [] } as BoardState
  const used = new Set<string>()

  for (const tier of Object.keys(result) as (keyof BoardState)[]) {
    for (const id of Array.isArray(raw[tier]) ? raw[tier] : []) {
      if (typeof id === "string" && valid.has(id) && !used.has(id)) {
        result[tier].push(id)
        used.add(id)
      }
    }
  }
  result.pool.push(...burgers.map((b) => b.id).filter((id) => !used.has(id)))
  return result
}
