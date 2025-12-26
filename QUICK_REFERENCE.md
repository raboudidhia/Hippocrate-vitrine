# 📋 Aide-Mémoire Technique - Entretien Rapide

> Guide de référence rapide pour l'entretien technique du projet Hippocrate

---

## 🎯 Elevator Pitch (30 secondes)

**Hippocrate** est une application web fullstack pour un espace de coworking avec:
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Sécurité**: JWT + bcrypt
- **DevOps**: Docker + Kubernetes + Jenkins CI/CD

L'application permet aux utilisateurs de réserver des salles et aux admins de gérer les réservations via un dashboard sécurisé.

---

## 🔑 Définitions Clés (1 ligne chacune)

| Technologie | Définition |
|-------------|-----------|
| **Node.js** | Environnement d'exécution JavaScript côté serveur basé sur V8 |
| **Express** | Framework web minimaliste pour Node.js qui simplifie la création d'APIs REST |
| **MongoDB** | Base de données NoSQL orientée documents, stockage JSON-like (BSON) |
| **Mongoose** | ODM (Object Data Modeling) pour MongoDB, ajoute schémas et validation |
| **React** | Bibliothèque JavaScript pour construire des interfaces utilisateur (Facebook) |
| **Vite** | Outil de build moderne avec démarrage instantané et HMR ultra-rapide |
| **JWT** | JSON Web Token - Standard pour créer des tokens d'authentification stateless |
| **bcrypt** | Algorithme de hashage pour sécuriser les mots de passe |
| **CORS** | Cross-Origin Resource Sharing - Permet communication frontend/backend |
| **REST** | Representational State Transfer - Style d'architecture pour APIs web |

---

## 📡 APIs Développées

### APIs Publiques

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/rooms` | Récupère toutes les salles avec disponibilité |
| POST | `/api/reservations` | Crée une nouvelle réservation |

### APIs Admin (Protégées JWT)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/admin/login` | Authentification admin → retourne JWT |
| GET | `/api/admin/verify` | Vérifie validité du token JWT |
| GET | `/api/admin/reservations` | Liste réservations pour une date |
| DELETE | `/api/admin/reservations/:id` | Supprime une réservation |
| PATCH | `/api/admin/rooms/:id` | Modifie capacité globale d'une salle |
| PATCH | `/api/admin/rooms/:id/availability` | Modifie disponibilité pour date spécifique |

---

## 🔐 Sécurité JWT - 5 Points Clés

1. **Génération**: `jwt.sign({ adminId }, JWT_SECRET, { expiresIn: '24h' })`
2. **Structure**: `Header.Payload.Signature` (3 parties encodées en Base64)
3. **Stockage**: Client stocke dans `localStorage`
4. **Envoi**: Header `Authorization: Bearer <token>`
5. **Vérification**: Middleware `jwt.verify(token, JWT_SECRET)` avant chaque route protégée

### Middleware de Sécurité
```javascript
const verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

---

## 🏗️ Architecture

```
CLIENT (React + Vite)
      ↓ HTTP/Axios
SERVER (Express + Node.js)
      ↓ Mongoose
DATABASE (MongoDB)
```

### Communication Frontend-Backend
1. **CORS configuré** pour autoriser origines spécifiques
2. **Axios** envoie requêtes HTTP avec headers (JWT si protégé)
3. **Express** traite, valide, et route vers handlers
4. **Mongoose** interagit avec MongoDB
5. **Réponse JSON** retournée au client

---

## ⚡ Vite vs Create React App

| Aspect | Create React App | Vite |
|--------|-----------------|------|
| **Démarrage** | 30-60s | <1s |
| **HMR** | 2-5s | <100ms |
| **Build Tool Dev** | Webpack (bundle tout) | ES Modules natifs |
| **Build Tool Prod** | Webpack | Rollup |
| **Productivité** | Lent | **73 min/jour économisées** |

**Pourquoi Vite?**
- Démarrage instantané (pas de bundling en dev)
- HMR ultra-rapide (WebSocket)
- Build optimisé (tree-shaking, code splitting)
- Configuration simple

---

## 🗄️ Modèles de Données

### Room (Salle)
```javascript
{
  name: "Salle Aphrodite",
  capacity: 30,
  availablePlaces: 30
}
```

### Reservation
```javascript
{
  room: ObjectId,
  date: Date,
  arrivalTime: "14:00",
  firstName: "Ahmed",
  lastName: "Ben Ali",
  email: "ahmed@example.com",
  phone: "+216 12 345 678"
}
```

### Admin
```javascript
{
  email: "admin@hippocrate.com",
  password: "<hashed with bcrypt>"
}
```

### RoomAvailability
```javascript
{
  room: ObjectId,
  date: Date,
  availablePlaces: 25
}
```

---

## 🔒 Mesures de Sécurité

1. ✅ **JWT stateless** pour authentification (expire 24h)
2. ✅ **bcrypt** pour hasher mots de passe (salt + 10 rounds)
3. ✅ **Variables d'environnement** (.env) pour secrets
4. ✅ **CORS restrictif** (liste blanche des origines)
5. ✅ **Validation des entrées** sur toutes les routes
6. ✅ **HTTPS** en production
7. ✅ **Middleware de vérification** sur routes admin
8. ✅ **Pas de données sensibles** dans tokens ou logs

---

## 🎨 Stack Frontend

### React Hooks Utilisés
- `useState`: État local des composants
- `useEffect`: Effets de bord (fetch data)
- `useContext`: État global (AdminAuthContext)

### Routing
- `react-router-dom`: Navigation SPA
- `ProtectedRoute`: HOC pour protéger routes admin

### Styling
- `Tailwind CSS`: Utility-first CSS framework
- `Swiper`: Carousels d'images

---

## 🛠️ DevOps

### Docker
- **Containerisation** frontend + backend + MongoDB
- **Multi-stage builds** pour optimisation
- **Isolation** et portabilité

### Kubernetes (KIND)
- **Services**: frontend, backend, MongoDB
- **Ingress**: Routing des requêtes
- **ConfigMaps/Secrets**: Configuration

### CI/CD (Jenkins)
- **Build** automatique sur push
- **Tests** automatiques
- **Déploiement** sur Kubernetes

---

## 💬 Réponses Rapides aux Questions Courantes

### "Pourquoi Node.js?"
> JavaScript partout (frontend + backend), async non-bloquant, écosystème npm riche, idéal pour temps réel.

### "Rôle d'Express?"
> Framework minimaliste qui simplifie création d'APIs REST, routing HTTP, middlewares, gestion d'erreurs.

### "Comment sécurisez-vous l'API?"
> JWT pour authentification stateless, bcrypt pour mots de passe, middleware de vérification, CORS restrictif, validation des entrées, secrets dans .env.

### "Frontend-Backend communication?"
> HTTP REST avec Axios, CORS configuré, échange JSON, JWT dans headers Authorization pour routes protégées.

### "Pourquoi JWT plutôt que sessions?"
> Stateless (pas de stockage serveur), scalable (plusieurs serveurs), mobile-friendly, auto-contenu.

### "Avantages de Vite?"
> 100x plus rapide que CRA : démarrage <1s vs 45s, HMR <100ms vs 3s, build optimisé avec Rollup.

### "Qu'est-ce qu'un JWT?"
> Token en 3 parties (Header.Payload.Signature) signé avec clé secrète, permet authentification sans session serveur.

### "Différence PUT vs PATCH?"
> PUT = remplacement complet, PATCH = modification partielle. On utilise PATCH car on modifie uniquement la capacité.

### "MongoDB vs SQL?"
> MongoDB : schémas flexibles, JSON natif, intégration Node facile. SQL : relations complexes, transactions ACID.

---

## 📊 Chiffres Clés

| Métrique | Valeur |
|----------|--------|
| Temps démarrage dev | <1s (Vite) |
| HMR | ~50ms |
| Expiration JWT | 24h |
| Rounds bcrypt | 10 |
| Port backend | 5000 |
| Port frontend dev | 5173 |
| Port MongoDB | 27017 |
| Capacité salles | 30 places |
| Nombre d'APIs | 8 endpoints |

---

## ✨ Points Forts à Mettre en Avant

1. ✅ Architecture **fullstack complète** (frontend + backend + database)
2. ✅ **Sécurité robuste** (JWT + bcrypt + validation)
3. ✅ Technologies **modernes** (Vite, React Hooks, async/await)
4. ✅ **CI/CD complet** (Jenkins + Docker + Kubernetes)
5. ✅ **Tests automatisés** (Jest backend + frontend)
6. ✅ **Documentation complète** (README + guides techniques)
7. ✅ **Bonnes pratiques** (séparation responsabilités, gestion erreurs)
8. ✅ **Performance** (Vite, MongoDB indexes, async)

---

## 🚀 Améliorations Possibles

Si demandé "Que pourriez-vous améliorer?":

1. **Sécurité**: Rate limiting, refresh tokens, 2FA
2. **Performance**: Caching Redis, CDN, pagination
3. **Features**: WebSockets temps réel, export Excel, analytics
4. **Testing**: E2E Cypress, coverage >80%, tests de charge
5. **Monitoring**: Prometheus/Grafana, logs centralisés ELK

---

## 🎯 Structure de Réponse Idéale

1. **Définition courte** (1 phrase)
2. **Rôle dans le projet** (exemple concret)
3. **Avantages** (2-3 points)
4. **Alternative** (si pertinent)

**Exemple**:
> "MongoDB est une base NoSQL orientée documents. Dans notre projet, elle stocke les salles, réservations et admins via Mongoose. Avantages : schémas flexibles, performance, intégration facile avec Node. Pour des relations complexes, PostgreSQL serait plus adapté."

---

## 📚 Ressources

- **Guide complet**: `TECHNICAL_INTERVIEW_GUIDE.md` (documentation exhaustive)
- **README**: Vue d'ensemble et instructions setup
- **Code**: `backend/server.js` et `backend/routes/admin.js` pour APIs

---

**Astuce finale**: Sois confiant, honnête si tu ne sais pas, et montre ta passion! 🚀
