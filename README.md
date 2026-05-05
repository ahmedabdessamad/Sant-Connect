# SantéConnect 🏥

**Plateforme sécurisée de communication médecin-patient**

> Messagerie chiffrée · Gestion des rendez-vous · Suivi des traitements

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20-green)](https://nodejs.org)
[![NestJS](https://img.shields.io/badge/NestJS-10-red)](https://nestjs.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)](https://postgresql.org)

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | Next.js 14 + TypeScript + Tailwind CSS |
| Backend | NestJS 10 + TypeScript |
| Base de données | PostgreSQL 16 + TypeORM |
| Cache / Queues | Redis 7 + BullMQ |
| Auth | Keycloak (OAuth2 / OIDC + 2FA) |
| Reverse proxy | Nginx |
| Conteneurs | Docker + Kubernetes |

---

## Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) ≥ 24
- [Node.js](https://nodejs.org) ≥ 20 (optionnel, pour développement sans Docker)
- [Git](https://git-scm.com)

---

## Démarrage rapide

### 1. Cloner le dépôt

```bash
git clone https://github.com/ahmedabdessamad/Sant-Connect.git
cd Sant-Connect
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Éditer `.env` et renseigner au minimum :
- `POSTGRES_PASSWORD` — mot de passe PostgreSQL
- `REDIS_PASSWORD` — mot de passe Redis
- `JWT_SECRET` — clé secrète JWT (min. 32 caractères)

### 3. Lancer l'environnement de développement

```bash
# Mode développement (hot-reload activé)
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

✅ L'application est disponible sur :

| Service | URL |
|---------|-----|
| Frontend (Next.js) | http://localhost:3000 |
| Backend API (NestJS) | http://localhost:3001/api/v1 |
| Documentation Swagger | http://localhost:3001/api/docs |
| Adminer (PostgreSQL UI) | http://localhost:8080 |
| Redis Commander | http://localhost:8081 |

### 4. Lancer l'environnement de production

```bash
docker compose up --build -d
```

---

## Structure du projet

```
sant-connect/
├── backend/                  # API NestJS
│   ├── src/
│   │   ├── main.ts           # Point d'entrée
│   │   ├── app.module.ts     # Module racine
│   │   ├── modules/
│   │   │   ├── auth/         # Sprint 1 — Authentification
│   │   │   ├── users/        # Sprint 1 — Utilisateurs
│   │   │   ├── messages/     # Sprint 2 — Messagerie
│   │   │   ├── appointments/ # Sprint 3 — Rendez-vous
│   │   │   ├── health-logs/  # Sprint 4 — Suivi santé
│   │   │   └── prescriptions/# Sprint 4 — Prescriptions
│   │   ├── common/           # Guards, pipes, decorators
│   │   └── database/         # Migrations TypeORM
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                 # Application Next.js
│   ├── src/
│   │   ├── app/              # App Router Next.js 14
│   │   ├── components/       # Composants réutilisables
│   │   ├── hooks/            # Hooks personnalisés
│   │   ├── lib/              # Axios, Socket.io client
│   │   └── types/            # Types TypeScript partagés
│   ├── Dockerfile
│   ├── next.config.ts
│   └── package.json
│
├── nginx/
│   └── nginx.conf            # Reverse proxy + sécurité
│
├── scripts/
│   └── init-db.sql           # Initialisation PostgreSQL
│
├── docker-compose.yml        # Production
├── docker-compose.dev.yml    # Développement (override)
├── .env.example              # Template variables d'env
└── .gitignore
```

---

## Commandes utiles

```bash
# Logs en temps réel
docker compose logs -f backend
docker compose logs -f frontend

# Accéder au shell du backend
docker compose exec backend sh

# Exécuter les migrations
docker compose exec backend npm run migration:run

# Relancer uniquement un service
docker compose restart backend

# Stopper et supprimer les volumes (reset complet)
docker compose down -v
```

---

## Conformité & Sécurité

- 🔒 **HDS** — Hébergement sur OVHcloud certifié Hébergeur de Données de Santé
- 🇪🇺 **RGPD** — Registre CNIL, droit à l'effacement, portabilité des données
- 🔐 **Chiffrement** — AES-256 au repos, TLS 1.3 en transit
- 🛡️ **Auth** — OAuth 2.0 + OpenID Connect + 2FA obligatoire
- 📋 **Audit** — pgaudit PostgreSQL pour la traçabilité complète

---

## Sprints (Jira KAN)

| Sprint | Epic | Statut |
|--------|------|--------|
| Sprint 1 | Infrastructure & Authentification | 🔄 En cours |
| Sprint 2 | Messagerie Sécurisée | ⏳ À venir |
| Sprint 3 | Gestion des Rendez-vous | ⏳ À venir |
| Sprint 4 | Suivi des Traitements | ⏳ À venir |
| Sprint 5 | Tests, Déploiement & Conformité | ⏳ À venir |

---

## Licence

MIT © 2026 SantéConnect
