# Railway Deploy Guide - Money Management Pro

## 🚨 Errore Nixpacks: App directory vuota

Il problema è che Railway non trova i file del progetto. Ecco come risolverlo:

## ✅ Soluzione Step-by-Step

### 1. Verifica Repository GitHub
- Assicurati che tutti i file siano stati caricati correttamente
- La directory deve contenere: `package.json`, `server/`, `client/`, `shared/`
- NON deve essere vuota o contenere solo `.gitattributes`

### 2. Upload Corretto su GitHub

**Metodo A - Upload Web (Consigliato)**
1. Scarica `money-management-github-fixed.zip`
2. Estrai TUTTI i file in una cartella locale
3. GitHub.com → "New repository" → `money-management-pro`
4. "Upload files" → Seleziona TUTTI i file estratti (non lo ZIP)
5. Commit: "Initial commit - Money Management Pro"

**Metodo B - GitHub Desktop**
1. Estrai `money-management-github-fixed.zip`
2. Apri GitHub Desktop
3. "Add Local Repository" → Seleziona cartella estratta
4. "Publish repository"

### 3. Connessione Railway

**Dopo GitHub Upload:**
1. Railway.app → "New Project"
2. "Deploy from GitHub repo"
3. Seleziona `money-management-pro`
4. **Importante**: Verifica che Railway veda i file

### 4. Configurazione Railway

**Services da aggiungere:**
- PostgreSQL Database
- Web Service (auto-rilevato)

**Environment Variables:**
```bash
SESSION_SECRET=railway-secret-key-12345
NODE_ENV=production
DATABASE_URL=postgresql://... (auto-generato)
```

### 5. Build Configuration

Se continua a fallire, aggiungi file `nixpacks.toml`:
```toml
[phases.build]
cmds = ["npm ci", "npm run build"]

[phases.start]
cmd = "npm start"

[variables]
NODE_ENV = "production"
```

## 🔧 Troubleshooting

**Errore: "No package.json found"**
- Verifica che `package.json` sia nella root del repository
- Non deve essere in una sottocartella

**Errore: "Build failed"**
- Aggiungi `package.railway.json` (incluso nel ZIP)
- Verifica che tutte le dipendenze siano presenti

**Errore: "App directory empty"**
- Cancella e ricrea il repository GitHub
- Assicurati di estrarre tutti i file dallo ZIP

## 📋 Checklist Pre-Deploy

- [ ] Repository GitHub ha tutti i file
- [ ] `package.json` è nella root
- [ ] Cartelle `server/`, `client/`, `shared/` presenti
- [ ] Railway riconosce il progetto Node.js
- [ ] PostgreSQL service aggiunto
- [ ] Environment variables configurate

## 🚀 Deploy Automatico

Una volta configurato correttamente:
1. Railway detecta automaticamente Node.js
2. Installa dipendenze con `npm ci`
3. Esegue `npm run build`
4. Avvia con `npm start`
5. App disponibile su URL Railway

**Tempo stimato: 3-5 minuti**