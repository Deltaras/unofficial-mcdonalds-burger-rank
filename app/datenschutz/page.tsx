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
      <h2>Vercel Analytics</h2>
      <p>
        Diese Website verwendet in der Produktionsversion Vercel Analytics zur Erstellung
        zusammengefasster Nutzungsstatistiken. Dabei können technische Informationen wie Seitenaufrufe,
        Referrer und ungefähre Geräte- oder Browserdaten verarbeitet werden. Anbieter ist Vercel Inc.,
        340 S Lemon Ave #4133, Walnut, CA 91789, USA. Weitere Informationen findest du in der
        Datenschutzerklärung von Vercel.
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
