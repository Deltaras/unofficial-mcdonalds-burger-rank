import Link from "next/link"

export default function DatenschutzPage() {
  return (
    <main className="legal-page">
      <p className="kicker">Rechtliche Informationen</p>
      <h1>Datenschutz</h1>
      <h2>Verantwortlicher</h2>
      <p>
        Verantwortlich für diese Website ist der im <Link href="/impressum">Impressum</Link>
        genannte Anbieter.
      </p>
      <h2>Lokale Speicherung</h2>
      <p>
        Deine Tier-Liste wird ausschließlich lokal in deinem Browser im localStorage gespeichert.
        Die Daten werden nicht an den Betreiber übertragen. Du kannst die gespeicherte Liste durch
        das Zurücksetzen der Liste oder durch Löschen der Browserdaten entfernen.
      </p>
      <h2>Externe Inhalte</h2>
      <p>
        Die Burger-Bilder werden von dieser Website selbst ausgeliefert. Es werden keine externen
        Schriftarten eingebunden.
      </p>
      <Link className="back-link" href="/">
        Zurück zur Tier List
      </Link>
    </main>
  )
}
