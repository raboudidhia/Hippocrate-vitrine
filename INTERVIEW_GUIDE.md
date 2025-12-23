# 🎤 Guide d'entretien technique - Hippocrate

Ce document est un guide de référence rapide pour répondre aux questions techniques lors d'entretiens sur le projet Hippocrate.

---

## 📋 Réponses rapides aux questions courantes

### "Parle-moi de ton projet"

> J'ai développé **Hippocrate**, une application full-stack complète pour la gestion d'un espace de coworking. Le projet inclut un site vitrine avec réservation en ligne et un panneau d'administration.
>
> **Stack technique**:
> - Frontend: React 18 + Vite + Tailwind CSS
> - Backend: Node.js + Express
> - Database: MongoDB avec Mongoose
> - Déploiement: Docker + Kubernetes (KIND)
> - CI/CD: Jenkins
>
> L'application permet aux utilisateurs de consulter les services, réserver des salles avec vérification de disponibilité en temps réel, et recevoir des confirmations par email. Les admins peuvent gérer les réservations via un dashboard sécurisé avec authentification JWT.

---

### "Pourquoi as-tu choisi React?"

> **Avantages pour ce projet**:
> 1. **Composants réutilisables**: Navbar, Footer, ServiceCard utilisés dans plusieurs pages
> 2. **Écosystème riche**: React Router pour le routing, React Datepicker pour les réservations
> 3. **Performance**: Virtual DOM pour des mises à jour rapides de l'UI
> 4. **Context API**: Gestion simple de l'authentification admin sans Redux
> 5. **Grande communauté**: Nombreuses ressources et bibliothèques disponibles

---

### "Pourquoi Vite et pas Create React App?"

> **Vite est beaucoup plus rapide**:
> - **HMR instantané**: Hot Module Replacement en quelques millisecondes
> - **Build optimisé**: Utilise Rollup pour des bundles plus petits
> - **Configuration minimale**: Fonctionne out-of-the-box
> - **ES Modules natifs**: Pas de bundling en développement
> - **Meilleure DX**: Dev server démarre en <1 seconde vs 20-30s pour CRA

---

### "Explique ton architecture backend"

> **Architecture en 3 couches**:
> 
> 1. **Routes** (`/routes`):
>    - Définissent les endpoints API
>    - Appellent les fonctions de contrôle
> 
> 2. **Modèles** (`/models`):
>    - Schémas Mongoose (Room, Reservation, Admin, RoomAvailability)
>    - Validation des données
>    - Hooks (ex: hashage du password avant save)
> 
> 3. **Server** (`server.js`):
>    - Configuration Express
>    - Middleware (CORS, body-parser, logging)
>    - Connexion MongoDB
>    - Gestion d'erreurs
>
> **Séparation des concerns**: Chaque modèle a sa responsabilité, facile à tester et maintenir.

---

### "Comment fonctionne ton système de réservation?"

> **Système à deux niveaux pour gérer la disponibilité**:
>
> 1. **Room.availablePlaces**: Capacité par défaut de la salle (30 places)
> 
> 2. **RoomAvailability**: Override pour des dates spécifiques
>    - Si une disponibilité existe pour la date → utilise cette valeur
>    - Sinon → utilise `Room.availablePlaces`
>
> **Flux de réservation**:
> ```
> 1. User sélectionne date + salle + heure
> 2. Backend vérifie RoomAvailability pour cette date
> 3. Si places dispo > 0:
>    - Crée Reservation
>    - Décrémente availablePlaces
>    - Envoie email confirmation (Nodemailer)
> 4. Sinon: retourne erreur "Complet"
> ```
>
> **Avantage**: L'admin peut modifier la capacité pour un jour spécifique (ex: maintenance, événement spécial).

---

### "Comment sécurises-tu l'authentification admin?"

> **JWT (JSON Web Tokens) + bcryptjs**:
>
> 1. **Login**:
>    - Admin entre email/password
>    - Backend vérifie avec `bcrypt.compare()`
>    - Si OK: génère JWT signé (expiration 24h)
>    - Retourne token au client
>
> 2. **Stockage**:
>    - Token stocké dans localStorage côté client
>    - Automatiquement ajouté dans header `Authorization: Bearer <token>`
>
> 3. **Vérification**:
>    - Middleware `verifyAdminToken` sur toutes les routes admin
>    - Vérifie la signature JWT avec `JWT_SECRET`
>    - Décode le token → extrait `adminId`
>    - Autorise ou refuse l'accès
>
> 4. **Protection du mot de passe**:
>    - Hash bcrypt avec salt (10 rounds)
>    - Pre-save hook Mongoose pour hasher automatiquement
>    - Jamais stocké en clair
>
> **Stateless**: Pas de sessions serveur → scalable horizontalement.

---

### "Explique ton déploiement Kubernetes"

> **3 services déployés sur Kubernetes (KIND)**:
>
> 1. **MongoDB**:
>    - Deployment: 1 replica, image mongo:4.4
>    - Service: ClusterIP (interne uniquement)
>    - Volume: emptyDir (données temporaires)
>
> 2. **Backend**:
>    - Deployment: 1 replica, image custom
>    - Service: ClusterIP
>    - Variables d'environnement (MONGODB_URI, JWT_SECRET, etc.)
>    - Connecté à MongoDB via service name
>
> 3. **Frontend**:
>    - Deployment: 1 replica, build Vite servi avec `serve`
>    - Service: NodePort 30646 (exposé à l'extérieur)
>
> **Service Discovery**: Les services communiquent par leurs noms DNS Kubernetes (ex: `mongodb://mongo:27017`).
>
> **Workflow de déploiement**:
> ```bash
> 1. Build Docker images localement
> 2. Load images dans KIND: kind load docker-image
> 3. Apply manifests: kubectl apply -f k8s/
> 4. Vérifier: kubectl get pods, kubectl get svc
> 5. Accéder: http://localhost:30646
> ```

---

### "Qu'est-ce que KIND et pourquoi l'utiliser?"

> **KIND = Kubernetes IN Docker**
>
> **Avantages**:
> - **Léger**: Tourne dans des containers Docker (pas de VM)
> - **Rapide**: Cluster créé en quelques secondes
> - **Local**: Idéal pour développement et tests
> - **Kubernetes réel**: Pas une simulation, c'est du vrai K8s
>
> **Alternatives**:
> - Minikube (plus lourd, utilise une VM)
> - k3s (plus pour production)
> - Docker Desktop K8s (limité)
>
> **Cas d'usage**: Test de déploiements K8s avant production, CI/CD local, apprentissage.

---

### "Décris ton pipeline CI/CD Jenkins"

> **8 stages automatisées**:
>
> 1. **Checkout**: Clone le repo GitHub
> 2. **Install Backend Dependencies**: `npm install` dans `/backend`
> 3. **Install Frontend Dependencies**: `npm install` dans `/client`
> 4. **Test Backend**: Exécute Jest avec mongodb-memory-server
> 5. **Test Frontend**: Exécute tests React
> 6. **Build Backend Docker Image**: `docker build`
> 7. **Build Frontend Docker Image**: `docker build`
> 8. **Export Docker Images**: `docker save` pour déploiement
>
> **Configuration Jenkins**:
> - Plugin NodeJS installé
> - Credentials GitHub configurés
> - Utilise `bat` (Windows) au lieu de `sh` (Linux)
>
> **Déclenchement**: Automatique sur push (webhook) ou manuel.
>
> **Avantages**: Tests automatiques avant build, images Docker prêtes à déployer.

---

### "Comment gères-tu les tests?"

> **Backend (Jest + Supertest)**:
> - Tests d'API endpoints avec `supertest`
> - MongoDB en mémoire (`mongodb-memory-server`) pour isolation
> - Tests d'authentification, réservations, CRUD opérations
> - Coverage: endpoints critiques couverts
>
> **Frontend (Jest + React Testing Library)**:
> - Tests unitaires des composants
> - Tests d'intégration (formulaires, navigation)
> - Mock des appels API Axios
> - Tests du Context (AdminAuthContext)
>
> **Configuration**:
> - `testEnvironment: "node"` pour backend
> - `testEnvironment: "jsdom"` pour frontend
> - Setup files pour configuration globale
>
> **À améliorer**: Tests E2E (Cypress/Playwright), tests de charge.

---

### "Quelles sont les faiblesses/améliorations possibles?"

> **Sécurité**:
> - ✅ **Secrets en clair**: Actuellement dans K8s YAML → migrer vers Kubernetes Secrets
> - ✅ Ajouter rate limiting (express-rate-limit) contre DoS
> - ✅ Implémenter helmet.js pour headers HTTP sécurisés
> - ✅ HTTPS obligatoire en production
>
> **Scalabilité**:
> - ✅ MongoDB single instance → Replica Set pour haute disponibilité
> - ✅ Backend stateless mais 1 replica → scale horizontalement
> - ✅ Ajouter Redis pour cache (disponibilités, sessions)
>
> **Fonctionnalités**:
> - ✅ Pagination pour les réservations (actuellement toutes chargées)
> - ✅ Notifications push/websockets pour mises à jour temps réel
> - ✅ Dashboard admin plus riche (statistiques, graphiques)
> - ✅ Gestion des annulations avec remboursement
>
> **DevOps**:
> - ✅ Monitoring (Prometheus + Grafana)
> - ✅ Logging centralisé (ELK Stack)
> - ✅ Alerting automatique
> - ✅ Backup automatique MongoDB

---

### "Comment debuggues-tu en production?"

> **Logs Kubernetes**:
> ```bash
> # Logs d'un pod
> kubectl logs -f deployment/hippocrate-backend
> 
> # Logs précédents (si crash)
> kubectl logs --previous <pod-name>
> ```
>
> **Accès au container**:
> ```bash
> kubectl exec -it <pod-name> -- /bin/sh
> ```
>
> **Port forwarding pour debug local**:
> ```bash
> kubectl port-forward service/hippocrate-backend-service 5000:5000
> ```
>
> **Vérification de l'état**:
> ```bash
> kubectl get pods
> kubectl describe pod <pod-name>
> kubectl get events
> ```
>
> **Rollback en cas de problème**:
> ```bash
> kubectl rollout undo deployment/hippocrate-backend
> ```

---

### "Explique le choix de MongoDB vs SQL"

> **Pourquoi MongoDB pour ce projet**:
>
> 1. **Flexibilité du schéma**:
>    - Réservations peuvent avoir des champs optionnels variables
>    - Évolution facile sans migrations complexes
>
> 2. **Documents JSON**:
>    - Mapping naturel avec JavaScript/Node.js
>    - Pas de conversion ORM complexe
>
> 3. **Performance en lecture**:
>    - Embedded documents (populate) plus rapide que JOINs SQL
>    - Index efficaces sur `date`, `room`, `email`
>
> 4. **Scalabilité horizontale**:
>    - Sharding natif pour grande volumétrie
>    - Replica Sets pour haute disponibilité
>
> **SQL aurait été pertinent si**:
> - Nombreuses relations complexes (1-N, N-N)
> - Transactions ACID critiques (paiements)
> - Requêtes analytiques complexes (reporting)

---

### "Comment gères-tu l'envoi d'emails?"

> **Nodemailer + Gmail SMTP**:
>
> **Configuration**:
> ```javascript
> const transporter = nodemailer.createTransport({
>   service: 'gmail',
>   auth: {
>     user: process.env.EMAIL_USER,
>     pass: process.env.EMAIL_PASS  // App-specific password
>   }
> });
> ```
>
> **Email de confirmation envoyé après chaque réservation**:
> - Format HTML avec template personnalisé
> - Contient: nom de la salle, date, heure d'arrivée
> - Envoyé de manière asynchrone (n'attend pas la réponse)
>
> **Gestion des erreurs**:
> - Si l'email échoue, la réservation est quand même créée
> - Logs d'erreur pour investigation
>
> **Alternatives considérées**:
> - SendGrid (meilleure délivrabilité, templates)
> - AWS SES (moins cher à grande échelle)
> - EmailJS côté client (déjà utilisé pour le formulaire contact)

---

### "Qu'as-tu appris sur ce projet?"

> **Compétences techniques**:
> - Maîtrise complète du stack MERN (MongoDB, Express, React, Node)
> - Containerisation Docker multi-stage
> - Orchestration Kubernetes (deployments, services, secrets)
> - CI/CD avec Jenkins (pipelines as code)
> - Testing automatisé (Jest, Supertest)
>
> **Architecture**:
> - Séparation frontend/backend avec API REST
> - Gestion d'état avec Context API
> - Authentification JWT stateless
> - Design patterns (middleware, hooks)
>
> **DevOps**:
> - Infrastructure as Code (manifests K8s)
> - Pipelines automatisés
> - Debugging dans des containers
> - Service discovery et networking
>
> **Soft skills**:
> - Gestion de projet de A à Z
> - Prise de décisions techniques argumentées
> - Documentation complète du code

---

## 🎯 Questions pour montrer ton expertise

**À poser si l'occasion se présente**:

1. "Utilisez-vous Kubernetes en production? Quelle est votre stack d'orchestration?"
2. "Comment gérez-vous les secrets et la configuration sensible?"
3. "Quelle est votre stratégie de tests automatisés?"
4. "Utilisez-vous une approche microservices ou monolithique?"
5. "Comment assurez-vous la scalabilité et la haute disponibilité?"

---

## 📊 Métriques du projet

- **Lignes de code**: ~5000+ (backend + frontend)
- **Composants React**: 20+
- **API Endpoints**: 8
- **Tests**: 10+ (backend + frontend)
- **Docker images**: 2 (backend, frontend)
- **Services K8s**: 6 (3 deployments + 3 services)
- **Pipeline stages**: 8
- **Technologies**: 15+

---

## 💡 Conseils pour l'entretien

1. **Sois précis**: Donne des exemples de code ou commandes
2. **Justifie tes choix**: Explique POURQUOI tu as choisi X plutôt que Y
3. **Admets les limitations**: Montre que tu identifies les points d'amélioration
4. **Montre la progression**: Évoque ce que tu ferais différemment maintenant
5. **Parle en termes métier**: Relie la technique aux besoins utilisateur

---

📚 **Pour plus de détails**: Consulte [TECHNICAL_DOCUMENTATION.md](./TECHNICAL_DOCUMENTATION.md)
