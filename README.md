# Examenopdracht Front-end Web Development & Web Services

> Schrap hierboven eventueel wat niet past

- Student: Kobe Vlieghe
- Studentennummer: 202301886
- E-mailadres: <kobe.vlieghe@student.hogent.be>

- Student: Matteo van droogenbroeck
- Studentennummer: 202406598
- E-mailadres: <matteo.van.droogenbroeck@student.hogent.be>

## Vereisten

> Vul de vereisten eventueel aan

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [pnpm](https://pnpm.io)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

> Je kan ook een aparte README per project (in de respectievelijke map) voorzien. Verwijs er dan hier naar.

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
VITE_GOOGLE_CLIENT_ID=283896268475-7kd3er7l6lfu5k2q5155p7ct117j9jm0.apps.googleusercontent.com
```

> Schrijf hier hoe we de applicatie starten (.env bestanden aanmaken, commando's om uit te voeren...)

### Testen

> Schrijf hier hoe we de testen uitvoeren (.env bestanden aanmaken, commando's om uit te voeren...)

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
CORS_ORIGIN=http://localhost:5173
CORS_MAX_AGE=10800
DATABASE_URL=mysql://devusr:devpwd@localhost:3306/ksa
```

> Schrijf hier hoe we de applicatie starten (.env bestanden aanmaken, commando's om uit te voeren...)

### Testen

> Schrijf hier hoe we de testen uitvoeren (.env bestanden aanmaken, commando's om uit te voeren...)
