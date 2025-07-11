# Guida Commit GitHub Desktop

## 1. Scarica il File Aggiornato
- Scarica `betting-app-railway-ready.zip` da Replit
- Estrai il contenuto in una cartella temporanea

## 2. GitHub Desktop - Sostituisci i File
1. Apri GitHub Desktop
2. Seleziona il repository `betting-app`
3. Vai alla cartella locale del progetto
4. **SOSTITUISCI** tutti i file con quelli estratti dallo ZIP
5. Copia e incolla tutti i file dalla cartella temporanea

## 3. Verifica Modifiche
In GitHub Desktop vedrai:
- File modificati (arancione)
- File nuovi (verde)
- File eliminati (rosso)

## 4. Commit
1. Scrivi messaggio commit: `"Fix Railway deployment - admin endpoint error resolved"`
2. Descrizione: `"Fixed authentication middleware, added nixpacks.toml, updated railway.json"`
3. Clicca **"Commit to main"**

## 5. Push
1. Clicca **"Push origin"** per inviare a GitHub
2. Aspetta il completamento

## 6. Railway Redeploy
- Railway rileverà automaticamente le modifiche
- Farà il redeploy con la nuova configurazione
- Aspetta 2-3 minuti per il completamento

## 7. Aggiungi Variabili Ambiente
Nel dashboard Railway:
- `SESSION_SECRET`: `railway-secret-key-12345`
- `NODE_ENV`: `production`

## File Principali Modificati
- `server/routes.ts` - Autenticazione corretta
- `nixpacks.toml` - Configurazione Railway
- `railway.json` - Comandi deployment
- `RAILWAY_FIX_GUIDE.md` - Documentazione

Dopo il push, l'URL Railway dovrebbe funzionare senza errori 404.