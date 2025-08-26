# CREATOR-EBOOK-AI

**CRIADOR E EDITOR DE EBOOKS E STORY BOOK COM IA. CRIADOR DE IMAGENS IA, ROTEIROS E VOZEZ IA**

## Descrizione

CREATOR-EBOOK-AI è uno strumento open-source che permette di creare e modificare eBook e storybook tramite Intelligenza Artificiale.  
Include funzionalità per la generazione automatica di immagini, testi, scenari e voci sintetiche grazie all'integrazione con modelli AI come Grok, Veo3 ed ElevenLabs.

## Funzionalità principali

- **Creazione automatica di eBook e storybook**
- **Generazione di immagini tramite AI (Veo 3)**
- **Generazione di testo e scenari con AI (Grok)**
- **Sintesi vocale con ElevenLabs**
- **Creazione di video da testo o immagini**
- **Workflow automatizzati con GitHub Actions**

> Veo 3 Fast è la modalità accelerata di Google Veo 3. Può produrre video di alta qualità con audio sincronizzato in meno di 1 minuto, il 30% più veloce del modello Veo 3 standard.

## Come iniziare

### Prerequisiti

- Node.js (versione 18 o superiore)
- npm o yarn
- Account API per i servizi AI utilizzati (ElevenLabs, Grok, Veo3)

### Installazione

1. **Clona il repository**
   ```bash
   git clone https://github.com/jemoatan1-alt/CREATOR-EBOOK-AI.git
   cd CREATOR-EBOOK-AI
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Configura le variabili d'ambiente**
   ```bash
   cp .env.example .env
   ```
   Modifica il file `.env` con le tue chiavi API.

4. **Avvia l'applicazione**
   ```bash
   npm start
   ```

## Configurazione

Crea un file `.env` nella radice del progetto con le seguenti variabili:

```env
# ElevenLabs API
ELEVENLABS_API_KEY=your_elevenlabs_api_key

# Grok API
GROK_API_KEY=your_grok_api_key

# Veo3 API
VEO3_API_KEY=your_veo3_api_key

# App Configuration
PORT=3000
NODE_ENV=development
```

## Utilizzo

### Demo ElevenLabs

Esegui la demo per testare l'integrazione con ElevenLabs:

```bash
npm run demo:elevenlabs
```

### Creazione di un eBook

1. Avvia l'applicazione
2. Accedi all'interfaccia web su `http://localhost:3000`
3. Segui la procedura guidata per creare il tuo eBook

## Struttura del progetto

```
CREATOR-EBOOK-AI/
├── src/
│   ├── components/
│   ├── services/
│   ├── utils/
│   └── app.tsx
├── public/
├── demos/
│   └── ElevenLabsDemo.tsx
├── tests/
├── .env.example
├── package.json
└── README.md
```

## Contribuire

1. Fork del repository
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push del branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## Licenza

Questo progetto è distribuito sotto licenza MIT. Vedi il file `LICENSE` per maggiori dettagli.

## Supporto

Per supporto e domande, apri un issue su GitHub o contatta il team di sviluppo.