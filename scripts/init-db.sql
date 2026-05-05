-- ═══════════════════════════════════════════════════════════════
-- SantéConnect — Initialisation de la base de données
-- Ce script s'exécute automatiquement au premier démarrage
-- ═══════════════════════════════════════════════════════════════

-- Extension pgcrypto pour le chiffrement
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Extension pgaudit pour l'audit trail (HDS)
-- CREATE EXTENSION IF NOT EXISTS pgaudit;

-- Extension uuid-ossp pour les UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Schémas ────────────────────────────────────────────────
CREATE SCHEMA IF NOT EXISTS audit;

COMMENT ON DATABASE santeconnect_db IS 'SantéConnect - Plateforme sécurisée médecin-patient';
