import Link from "next/link"

export default function ImpressumPage() {
  return (
    <main className="legal-page">
      <p className="kicker">Rechtliche Informationen</p>
      <h1>Impressum</h1>
      <h2>Anbieter</h2>
      <p>
        Tim Kirchner
        <br />
        Birckholtsweg 15
        <br />
        22159 Hamburg
      </p>
      <h2>Kontakt</h2>
      <p>
        <a href="mailto:der_schmolch@gmx.net">der_schmolch@gmx.net</a>
      </p>
      <h2>Hinweis zur Unabhängigkeit</h2>
      <p>
        Dies ist ein inoffizielles Fanprojekt und steht in keiner Verbindung zu McDonald&apos;s. Die
        verwendeten Marken- und Produktnamen gehören ihren jeweiligen Inhabern.
      </p>
      <Link className="back-link" href="/">
        Zurück zur Tier List
      </Link>
    </main>
  )
}
