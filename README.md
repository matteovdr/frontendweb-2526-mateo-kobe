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
cd front-end
pnpm install
docker compose up
```

Hierna kan je naar [http://localhost](http://localhost) navigeren om de front-end te bekijken.

### .env bestand

maak een .env bestand aan in de front-end map met volgende inhoud:

```env
VITE_API_URL='http://localhost:3000/api'
```

### Testen

```bash
cd front-end
pnpm exec cypress run
```

## Back-end

### Opstarten

```bash
git clone https://github.com/HOGENT-frontendweb/frontendweb-2526-mateo-kobe.git
git pull origin main
cd api
pnpm install
(Maak nu het .env bestand aan zoals hieronder beschreven)
docker compose -f docker-compose-backend.yml up
```

### .env bestand

maak een .env bestand aan in de api map met volgende inhoud:

```env
NODE_ENV=development
PORT=3000
CORS_ORIGINS=["http://localhost"]
CORS_MAX_AGE=10800
AUTH_JWT_SECRET=<JE_EIGEN_SECRET_HIER>
DATABASE_URL=mysql://301886kv:tk10z5DKcAZomai09PzwIa38Dfsun7vq@vichogent.be:41260/301886kv
LOG_LEVELS=["log","error","warn","debug"]
```

### Testen

maak een .env.test bestand aan in de api map met volgende inhoud:

```env
# .env.test
# General configuration
NODE_ENV=testing
PORT=3000

# CORS configuration
CORS_ORIGINS=["http://localhost:5173", "http://localhost"]
CORS_MAX_AGE=10800

# Database configuration
DATABASE_URL=mysql://301886kv:tk10z5DKcAZomai09PzwIa38Dfsun7vq@vichogent.be:41260/301886kv

# Auth configuration
AUTH_JWT_SECRET=eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked
AUTH_JWT_AUDIENCE=budget.hogent.be
AUTH_JWT_ISSUER=budget.hogent.be
AUTH_HASH_LENGTH=32
AUTH_HASH_TIME_COST=6
AUTH_HASH_MEMORY_COST=65536
AUTH_MAX_DELAY=2000

# Logging configuration
LOG_DISABLED=true
```

```bash
cd api
docker compose -f docker-compose-test.yml up -d
pnpm test:e2e
```
