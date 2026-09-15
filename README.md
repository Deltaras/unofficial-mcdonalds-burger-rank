# unofficial-mcdonalds-burger-rank

## Deployment

Deployments werden nicht automatisch bei einem Push gestartet. Änderungen werden über
einen Pull Request nach `main` gebracht. Nach dem Merge kann das Deployment manuell gestartet werden:

1. GitHub öffnen und zum Tab **Actions** wechseln.
2. **Deploy Next.js site to Pages** auswählen.
3. **Run workflow** anklicken und den Lauf bestätigen.

Die GitHub-Pages-Konfiguration verwendet dafür die Quelle **GitHub Actions**.
