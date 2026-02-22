# ISI Frontend — Application Angular

## Structure du projet

```
src/
├── app/
│   ├── components/
│   │   ├── login/          # Page de connexion
│   │   ├── dashboard/      # Tableau de bord
│   │   ├── secteurs/       # CRUD Secteurs
│   │   ├── classes/        # CRUD Classes
│   │   └── navbar/         # Barre de navigation
│   ├── models/             # Interfaces TypeScript
│   ├── services/           # API Service + Auth Service
│   ├── app.component.ts    # Composant racine
│   └── app.routes.ts       # Routage
├── environments/           # Config dev/prod
├── styles.css              # Styles globaux
└── main.ts                 # Point d'entrée
```

## Comptes de test
- Admin : admin / admin123
- User  : user / user123

## Lancement local
```bash
npm install
npm start
# → http://localhost:4200
```

## Build production
```bash
npm run build
# → dist/isi-frontend/
```

## Configuration API
Modifier `src/environments/environment.ts` :
```ts
export const environment = {
  apiUrl: 'http://192.168.56.11:8080'
};
```
