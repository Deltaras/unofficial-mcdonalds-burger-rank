"use client"

import { useEffect, useMemo, useState } from "react"
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useDroppable,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import Link from "next/link"
import { Download, RotateCcw, GripVertical, Utensils } from "lucide-react"
import { toPng } from "html-to-image"
import {
  BoardState,
  burgerById,
  burgers,
  cleanBoard,
  defaultBoard,
  getTier,
  tiers,
} from "@/lib/burgers"

function BurgerCard({
  id,
  compact = false,
  isDragging = false,
}: {
  id: string
  compact?: boolean
  isDragging?: boolean
}) {
  const burger = burgerById[id]
  return (
    <article
      style={{ opacity: isDragging ? 0 : 1 }}
      className={`burger-card ${compact ? "compact" : ""}`}
    >
      <img src={burger.image} alt={burger.name} />
      <div className="burger-card-copy">
        <strong>{burger.name}</strong>
        {!compact && <span>{burger.subtitle}</span>}
      </div>
      {!compact && <GripVertical aria-hidden="true" className="grip" size={15} />}
    </article>
  )
}

function Card({ id, compact = false }: { id: string; compact?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id })
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ transform: CSS.Translate.toString(transform) }}
    >
      <BurgerCard id={id} compact={compact} isDragging={isDragging} />
    </div>
  )
}

function DropZone({
  id,
  children,
  className = "",
}: {
  id: string
  children: React.ReactNode
  className?: string
}) {
  const { setNodeRef, isOver } = useDroppable({ id })
  return (
    <div ref={setNodeRef} className={`${className} ${isOver ? "is-over" : ""}`}>
      {children}
    </div>
  )
}

export default function TierListApp() {
  const [board, setBoard] = useState<BoardState>(defaultBoard)
  const [active, setActive] = useState<string | null>(null)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))
  const activeBurger = active ? burgerById[active] : null
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mcd-burger-tierlist-v1")
      if (saved) setBoard(cleanBoard(JSON.parse(saved)))
    } catch {}
  }, [])
  useEffect(() => {
    localStorage.setItem("mcd-burger-tierlist-v1", JSON.stringify(board))
  }, [board])
  const byId = useMemo(() => burgerById, [])

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActive(null)
    if (!over) return
    const from = getTier(String(active.id), board)
    let to = String(over.id) as keyof BoardState
    if (!board[to]) to = getTier(String(over.id), board)
    if (!board[to] || from === to) return
    setBoard((current) => {
      const next = { ...current, [from]: current[from].filter((id) => id !== active.id) }
      const target = [...next[to]]
      const overIndex = target.indexOf(String(over.id))
      target.splice(overIndex >= 0 ? overIndex : target.length, 0, String(active.id))
      return { ...next, [to]: target }
    })
  }
  async function exportPng() {
    const node = document.getElementById("tier-board")
    if (!node) return
    try {
      const data = await toPng(node, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#171717",
        skipFonts: true,
      })
      const link = document.createElement("a")
      link.download = "mein-mcdonalds-tier-list.png"
      link.href = data
      link.click()
    } catch (error) {
      console.error("Der Tier-List-Export ist fehlgeschlagen.", error)
    }
  }
  return (
    <main className="app-shell">
      <header className="hero">
        <div className="brand-mark">
          <Utensils size={23} />
        </div>
        <div>
          <p className="eyebrow">McDonald&apos;s Deutschland</p>
          <h1>
            BURGER <em>TIER LIST</em>
          </h1>
        </div>
        <div className="hero-badge">
          DEIN RANKING
          <br />
          <b>2026</b>
        </div>
      </header>
      <section className="intro">
        <div>
          <p className="kicker">Dein Geschmack. Deine Regeln.</p>
          <h2>Wie rankst du sie?</h2>
          <p>
            Zieh jeden Burger in seine verdiente Kategorie. Von absoluter Spitze bis „nie wieder“.
          </p>
        </div>
        <div className="actions">
          <button className="button secondary" onClick={() => setBoard(defaultBoard)}>
            <RotateCcw size={16} /> Zurücksetzen
          </button>
          <button className="button primary" onClick={exportPng}>
            <Download size={16} /> Als PNG
          </button>
        </div>
      </section>
      <DndContext
        id="tier-list-dnd"
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={({ active }) => setActive(String(active.id))}
        onDragCancel={() => setActive(null)}
        onDragEnd={handleDragEnd}
      >
        <section id="tier-board" className="tier-board">
          {tiers.map((tier) => (
            <div className="tier-row" key={tier.id}>
              <div className="tier-label" style={{ background: tier.color }}>
                {tier.label}
              </div>
              <DropZone id={tier.id} className="tier-content">
                {board[tier.id].map((id) => (
                  <Card key={id} id={id} compact />
                ))}
                {board[tier.id].length === 0 && (
                  <span className="empty-label">Burger hier ablegen</span>
                )}
              </DropZone>
            </div>
          ))}
        </section>
        <DragOverlay>{activeBurger ? <BurgerCard id={activeBurger.id} /> : null}</DragOverlay>
        <section className="pool-section">
          <div className="section-heading">
            <div>
              <p className="kicker">Noch nicht gerankt</p>
              <h2>Deine Burger-Auswahl</h2>
            </div>
            <span>{board.pool.length} offen</span>
          </div>
          <DropZone id="pool" className="burger-pool">
            {board.pool.map((id) => (
              <Card key={id} id={id} />
            ))}
            {board.pool.length === 0 && (
              <p className="empty-pool">Alle Burger sind gerankt. Stark!</p>
            )}
          </DropZone>
        </section>
      </DndContext>
      <footer>
        <span>Inoffizielles Fanprojekt · Nicht mit McDonald&apos;s verbunden</span>
        <nav aria-label="Rechtliche Informationen">
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
        </nav>
      </footer>
    </main>
  )
}
