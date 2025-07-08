# Money Management Pro

Un'applicazione avanzata per la gestione del bankroll nelle scommesse sportive con strategie algoritmiche intelligenti.

## Caratteristiche Principali

- **Strategie Multiple**: D'Alembert, Kelly Criterion, Masaniello, Beat the Delay
- **Calcoli Automatici**: Gestione stake automatica e ottimizzazione bankroll
- **Analytics Avanzate**: Grafici in tempo reale e metriche di performance
- **Sistema Premium**: Abbonamenti con accesso multi-dispositivo
- **Design Responsive**: Ottimizzato per desktop, tablet e mobile

## Deployment Rapido

### Railway (Consigliato)
1. Connetti questo repository a Railway
2. Aggiungi servizio PostgreSQL
3. Configura variabili ambiente:
   ```
   SESSION_SECRET=your-random-secret-key
   NODE_ENV=production
   ```
4. Deploy automatico

### Google Cloud Run
1. Build Docker: `docker build -t betting-app .`
2. Push a Container Registry
3. Deploy su Cloud Run

### Replit
1. Importa progetto su Replit
2. Configura secrets necessari
3. Avvia con `npm run dev`

## Sviluppo Locale

```bash
# Installa dipendenze
npm install

# Avvia server development
npm run dev

# Build produzione
npm run build
npm start
```

## Variabili Ambiente

```env
DATABASE_URL=postgresql://...
SESSION_SECRET=your-secret-key
NODE_ENV=production
STRIPE_SECRET_KEY=sk_test_... (opzionale)
VITE_STRIPE_PUBLIC_KEY=pk_test_... (opzionale)
```

## Tecnologie

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + Drizzle ORM
- **Database**: PostgreSQL
- **Payments**: Stripe (opzionale)
- **Auth**: Replit Auth / Session-based

## Licenza

MIT License - Progetto open source per scopi educativi.