# Examenopdracht Front-end Web Development & Web Services

- Student: Kobe Vlieghe
- Studentennummer: 202301886
- E-mailadres: <kobe.vlieghe@student.hogent.be>

- Student: Matteo van droogenbroeck
- Studentennummer: 202406598
- E-mailadres: <matteo.van.droogenbroeck@student.hogent.be>

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [pnpm](https://pnpm.io)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

## Front-end

### Opstarten

```bash
git clone https://github.com/HOGENT-frontendweb/frontendweb-2526-mateo-kobe.git
git pull origin main
cd .\front-end\
pnpm install
pnpm dev
```

### .env bestand

maak een .env bestand aan in de front-end map met volgende inhoud:

```env
VITE_API_URL='http://localhost:3000/api'
```

### Testen

```bash
cd .\front-end\
pnpm test
```

Dan moet je op e2e testen klikken in de terminal, dan de browser die je wilt. En je kunt dan de testen laten runnen.

## Back-end

### Opstarten

```bash
git clone https://github.com/HOGENT-frontendweb/frontendweb-2526-mateo-kobe.git
git pull origin main
cd .\api\
pnpm install
pnpm db:migrate
pnpm db:seed
pnpm start:dev
```

### .env bestand

maak een .env bestand aan in de api map met volgende inhoud:

```env
NODE_ENV=development
PORT=3000
CORS_ORIGINS=["http://localhost:5173", "http://localhost"]
CORS_MAX_AGE=10800
AUTH_JWT_SECRET=<JE_EIGEN_SECRET_HIER>
DATABASE_URL=mysql://<user>:<wachtwoord>@<host>:<database_poort>/<database_naam>
LOG_LEVELS=["log","error","warn","debug"]
```

### Testen

```bash
cd .\api\
pnpm test:e2e
```

// TODO  NOG NAKIJKEN OF DIT JUIST IS
