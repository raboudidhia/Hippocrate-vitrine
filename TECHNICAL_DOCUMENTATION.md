# 📚 Documentation Technique - Hippocrate Coworking Space

## 🎯 Vue d'ensemble du projet

**Hippocrate** est une application web full-stack moderne pour la gestion d'un espace de coworking. Le projet permet aux utilisateurs de consulter les services, réserver des salles, et contacter l'établissement. Un panneau d'administration sécurisé permet de gérer les réservations et la disponibilité des salles.

### Technologies utilisées

- **Frontend**: React 18.3.1, Vite 6.0.1, Tailwind CSS 3.4.15
- **Backend**: Node.js 18, Express 4.18.2
- **Base de données**: MongoDB 7.0.3 avec Mongoose
- **Authentification**: JWT (JSON Web Tokens) + bcryptjs
- **Email**: Nodemailer 6.9.1
- **Conteneurisation**: Docker
- **Orchestration**: Kubernetes (KIND - Kubernetes IN Docker)
- **CI/CD**: Jenkins
- **Tests**: Jest 30.0.4, Supertest 7.1.3, React Testing Library

---

## 🏗️ Architecture Globale

```
Hippocrate/
├── client/              # Application React (Frontend)
├── backend/             # API Node.js/Express (Backend)
├── k8s/                 # Fichiers de configuration Kubernetes
├── screenshots/         # Captures d'écran de l'application
├── Jenkinsfile          # Pipeline CI/CD
└── README.md
```

### Architecture Frontend-Backend

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Client    │ ──HTTP─→│   Backend   │ ──────→ │   MongoDB   │
│   (React)   │ ←─JSON──│  (Express)  │ ←──────  │             │
└─────────────┘         └─────────────┘         └─────────────┘
      │                        │
      │                        │
      ↓                        ↓
  Vite Build              Nodemailer
  Tailwind CSS           (Email Service)
```

---

## 🎨 Frontend - Application React

### Structure du projet client

```
client/
├── src/
│   ├── admin/              # Pages et composants admin
│   │   └── pages/
│   │       ├── AdminDashboard.jsx
│   │       └── AdminLogin.jsx
│   ├── assets/             # Images, icônes, ressources
│   ├── components/         # Composants réutilisables
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── CoworkingPreview.jsx
│   │   ├── ContactForm.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── ... (autres composants)
│   ├── context/            # Contextes React
│   │   └── AdminAuthContext.jsx
│   ├── pages/              # Pages principales
│   │   ├── acceuil.jsx
│   │   ├── Services.jsx
│   │   ├── Reservation.jsx
│   │   └── Contact.jsx
│   ├── App.jsx             # Composant racine
│   ├── index.jsx           # Point d'entrée
│   └── index.css           # Styles globaux
├── Dockerfile              # Configuration Docker
├── vite.config.js          # Configuration Vite
├── tailwind.config.cjs     # Configuration Tailwind
└── package.json
```

### Technologies Frontend détaillées

#### 1. **React 18.3.1**
- Utilisation des hooks modernes (`useState`, `useEffect`, `useContext`)
- Gestion de l'état global avec Context API (`AdminAuthContext`)
- Composants fonctionnels uniquement (pas de classes)

#### 2. **React Router DOM 7.0.2**
- Routing déclaratif avec `BrowserRouter`, `Routes`, `Route`
- Navigation entre les pages (Accueil, Services, Réservation, Contact, Admin)
- Route protégée pour le dashboard admin avec `ProtectedRoute`

```javascript
<Routes>
  <Route path="/" element={<Acceuil />} />
  <Route path="/services" element={<Services />} />
  <Route path="/Contact" element={<Contact />} />
  <Route path="/reservation" element={<Reservation />} />
  <Route path="/admin/login" element={<AdminLogin />} />
  <Route path="/admin/dashboard" element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  } />
</Routes>
```

#### 3. **Vite 6.0.1**
- Build tool ultra-rapide
- Hot Module Replacement (HMR) pour le développement
- Optimisation automatique des assets
- Configuration minimale:
```javascript
export default {
  build: {
    assetsDir: 'assets',
  },
  server: {
    fs: {
      strict: false,
    },
  },
}
```

#### 4. **Tailwind CSS 3.4.15**
- Framework CSS utility-first
- Mode JIT (Just-In-Time) pour des builds optimisés
- Configuration personnalisée:
  - Couleurs: `primary: #3D8287`, `hippoBlack: #282A2E`
  - Police: Poppins
  - Breakpoints personnalisés (xs: 320px, sm: 640px, md: 768px, lg: 1024px, xl: 1280px)

#### 5. **Bibliothèques supplémentaires**
- **Axios 1.8.4**: Client HTTP pour les appels API
- **React Icons 5.4.0**: Bibliothèque d'icônes
- **React Datepicker 8.3.0**: Sélecteur de date pour les réservations
- **Swiper 11.1.15**: Carrousel d'images responsive
- **EmailJS 3.2.0**: Service d'envoi d'emails côté client
- **date-fns 4.1.0**: Manipulation et formatage de dates

### Composants clés

#### AdminAuthContext
Gestion de l'authentification admin avec Context API:
- Stockage du token JWT dans localStorage
- Vérification automatique du token au chargement
- Fonctions `login()` et `logout()`
- Propagation de l'état d'authentification dans toute l'application

#### ProtectedRoute
Composant HOC (Higher Order Component) pour protéger les routes admin:
- Vérifie si l'utilisateur est authentifié
- Redirige vers `/admin/login` si non authentifié
- Affiche le contenu protégé si authentifié

### Build et Déploiement Frontend

**Développement**:
```bash
npm run dev  # Lance Vite dev server sur port 3000
```

**Production**:
```bash
npm run build  # Build optimisé dans /dist
npm run preview  # Prévisualisation du build
```

**Docker**:
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npx", "serve", "-s", "dist"]
```

---

## ⚙️ Backend - API Node.js/Express

### Structure du projet backend

```
backend/
├── models/              # Modèles Mongoose
│   ├── Admin.js
│   ├── Room.js
│   ├── Reservation.js
│   ├── RoomAvailability.js
│   └── index.js
├── routes/              # Routes API
│   └── admin.js
├── scripts/             # Scripts utilitaires
│   └── initialize.js
├── tests/               # Tests Jest
│   └── reservation.test.js
├── server.js            # Point d'entrée du serveur
├── Dockerfile
├── .env.example         # Template des variables d'environnement
└── package.json
```

### Technologies Backend détaillées

#### 1. **Express 4.18.2**
Framework web minimaliste et flexible:
- Middleware pour CORS, body-parser, logging
- Routes RESTful pour les salles et réservations
- Gestion d'erreurs centralisée

#### 2. **Mongoose 7.0.3**
ODM (Object Document Mapper) pour MongoDB:
- Définition de schémas stricts
- Validation des données
- Hooks (middleware Mongoose)
- Méthodes personnalisées sur les modèles

#### 3. **Architecture du serveur**

```javascript
// server.js - Structure principale

// 1. Configuration et middleware
app.use(cors({...}))
app.use(express.json())
app.use(bodyParser.json())

// 2. Connexion MongoDB
mongoose.connect(MONGODB_URI)

// 3. Routes
app.use('/api/admin', adminRoutes)
app.get('/api/rooms', ...)
app.post('/api/reservations', ...)

// 4. Démarrage serveur
app.listen(PORT)
```

### Modèles de données

#### 1. **Room** (Salle)
```javascript
{
  name: String,           // "Salle Aphrodite", "Salle Athéna", etc.
  capacity: Number,       // Capacité maximale (30)
  availablePlaces: Number,// Places disponibles (0-30)
  description: String,    // Description optionnelle
  createdAt: Date         // Date de création
}
```

#### 2. **Reservation** (Réservation)
```javascript
{
  room: ObjectId,         // Référence à Room
  date: Date,             // Date de réservation
  arrivalTime: String,    // Heure d'arrivée ("09:00", "14:00", etc.)
  firstName: String,      // Prénom du réservant
  lastName: String,       // Nom du réservant
  email: String,          // Email pour confirmation
  phone: String,          // Téléphone
  createdAt: Date         // Date de création
}
```

#### 3. **RoomAvailability** (Disponibilité par date)
```javascript
{
  room: ObjectId,         // Référence à Room
  date: Date,             // Date spécifique
  availablePlaces: Number // Places disponibles ce jour-là
}
```
**Logique**: Permet de gérer la disponibilité par date. Si aucune entrée n'existe pour une date, on utilise `room.availablePlaces` par défaut.

#### 4. **Admin** (Administrateur)
```javascript
{
  email: String,          // Email unique (lowercase)
  password: String,       // Hash bcrypt du mot de passe
  createdAt: Date
}
```

**Sécurité**:
- Password hashé avec bcryptjs (salt rounds: 10)
- Méthode `comparePassword()` pour vérifier le mot de passe
- Pre-save hook pour hasher automatiquement

```javascript
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
```

### API Endpoints

#### Routes Publiques

**1. GET /api/rooms**
- Récupère toutes les salles avec leur disponibilité
- Query params: `?date=2024-01-15` (optionnel)
- Retourne les salles avec `availablePlaces` mis à jour selon la date

**2. POST /api/reservations**
- Crée une nouvelle réservation
- Body:
```json
{
  "room": "room_id",
  "date": "2024-01-15",
  "arrivalTime": "09:00",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "0612345678"
}
```
- Actions:
  1. Vérifie que la salle existe
  2. Vérifie la disponibilité pour la date
  3. Crée la réservation
  4. Décrémente les places disponibles
  5. Envoie un email de confirmation

#### Routes Admin (JWT protégées)

**3. POST /api/admin/login**
- Authentifie un admin
- Body: `{ email, password }`
- Retourne: `{ token, admin: { id, email } }`

**4. GET /api/admin/verify**
- Vérifie la validité du token JWT
- Header: `Authorization: Bearer <token>`
- Retourne: `{ admin: { id, email } }`

**5. GET /api/admin/reservations?date=2024-01-15**
- Liste les réservations pour une date donnée
- Retourne les réservations avec les infos de salle (`.populate('room')`)
- Triées par heure d'arrivée

**6. DELETE /api/admin/reservations/:id**
- Supprime une réservation
- Retourne: `{ message: 'Reservation deleted successfully' }`

**7. PATCH /api/admin/rooms/:id**
- Met à jour la capacité par défaut d'une salle
- Body: `{ availablePlaces: 25 }`
- Met aussi à jour toutes les disponibilités futures

**8. PATCH /api/admin/rooms/:id/availability**
- Met à jour la disponibilité pour une date spécifique
- Body: `{ availablePlaces: 20, date: '2024-01-15' }`
- Crée ou met à jour l'entrée `RoomAvailability`

### Middleware de sécurité

#### CORS Configuration
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',              // Dev local
    'http://hippocrate-frontend-service', // Service Kubernetes
    'http://10.155.229.30:30646',        // NodePort K8s
    'http://192.168.1.9:30646'           // IP locale K8s
  ],
  credentials: true
}));
```

#### JWT Verification
```javascript
const verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

### Email Service (Nodemailer)

Configuration Gmail SMTP:
```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,  // App-specific password
  },
});
```

Email de confirmation envoyé après chaque réservation:
```javascript
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: email,
  subject: "Confirmation de réservation - L'Hippocrate",
  html: `
    <h1>Confirmation de réservation</h1>
    <p>Bonjour ${firstName} ${lastName},</p>
    <p>Votre réservation a été confirmée:</p>
    <ul>
      <li>Salle: ${room.name}</li>
      <li>Date: ${new Date(date).toLocaleDateString('fr-FR')}</li>
      <li>Heure d'arrivée: ${arrivalTime}</li>
    </ul>
    <p>Merci d'avoir choisi L'Hippocrate!</p>
  `,
};
```

### Variables d'environnement

Fichier `.env.example`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hippocrate
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
JWT_SECRET=your-secret-key
```

### Initialisation des données

Script `initialize.js` pour créer les 3 salles par défaut:
```javascript
await Room.create([
  { name: 'Salle Aphrodite', capacity: 30, availablePlaces: 30 },
  { name: 'Salle Athéna', capacity: 30, availablePlaces: 30 },
  { name: 'Salle Apollon', capacity: 30, availablePlaces: 30 },
]);
```

---

## 🐳 Dockerisation

### Backend Dockerfile

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

**Construction**:
```bash
docker build -t hippocrate-backend:latest .
```

### Frontend Dockerfile

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npx", "serve", "-s", "dist"]
```

**Construction**:
```bash
docker build -t hippocrate-frontend:latest .
```

### Docker Compose (local)

Bien que non présent dans le repo, on pourrait utiliser:
```yaml
version: '3.8'
services:
  mongo:
    image: mongo:4.4
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
  
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/hippocrate
    depends_on:
      - mongo
  
  frontend:
    build: ./client
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  mongo-data:
```

---

## ☸️ Déploiement Kubernetes

### Architecture Kubernetes

```
┌─────────────────────────────────────────────┐
│           Kubernetes Cluster (KIND)          │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │  Frontend Deployment (1 replica)     │  │
│  │  - Image: hippocrate-frontend:latest │  │
│  │  - Port: 3000                         │  │
│  └──────────────┬───────────────────────┘  │
│                 │                            │
│  ┌──────────────▼───────────────────────┐  │
│  │  Frontend Service (NodePort 30646)   │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │  Backend Deployment (1 replica)      │  │
│  │  - Image: hippocrate-backend:latest  │  │
│  │  - Port: 5000                         │  │
│  └──────────────┬───────────────────────┘  │
│                 │                            │
│  ┌──────────────▼───────────────────────┐  │
│  │  Backend Service (ClusterIP)         │  │
│  └──────────────┬───────────────────────┘  │
│                 │                            │
│  ┌──────────────▼───────────────────────┐  │
│  │  MongoDB Deployment (1 replica)      │  │
│  │  - Image: mongo:4.4                   │  │
│  │  - Port: 27017                        │  │
│  │  - Volume: emptyDir                   │  │
│  └──────────────┬───────────────────────┘  │
│                 │                            │
│  ┌──────────────▼───────────────────────┐  │
│  │  Mongo Service (ClusterIP)           │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Fichiers de configuration K8s

#### 1. mongo-deployment.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongo
  template:
    metadata:
      labels:
        app: mongo
    spec:
      containers:
      - name: mongo
        image: mongo:4.4
        ports:
        - containerPort: 27017
        volumeMounts:
        - name: mongo-storage
          mountPath: /data/db
      volumes:
      - name: mongo-storage
        emptyDir: {}
```

#### 2. mongo-service.yaml
```yaml
apiVersion: v1
kind: Service
metadata:
  name: mongo
spec:
  selector:
    app: mongo
  ports:
  - port: 27017
    targetPort: 27017
  type: ClusterIP
```

#### 3. backend-deployment.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hippocrate-backend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hippocrate-backend
  template:
    metadata:
      labels:
        app: hippocrate-backend
    spec:
      containers:
      - name: hippocrate-backend
        image: hippocrate-backend:latest
        imagePullPolicy: Never  # Important pour KIND
        ports:
        - containerPort: 5000
        env:
        - name: MONGODB_URI
          value: "mongodb://mongo:27017/hippocrate"
        - name: EMAIL_USER
          value: "dhiaraboudi1@gmail.com"
        - name: EMAIL_PASS
          value: "tygv reqz jeif rfce"
        - name: JWT_SECRET
          value: "mySuperSecretKey123"
```

#### 4. backend-service.yaml
```yaml
apiVersion: v1
kind: Service
metadata:
  name: hippocrate-backend-service
spec:
  selector:
    app: hippocrate-backend
  ports:
  - port: 5000
    targetPort: 5000
  type: ClusterIP
```

#### 5. frontend-deployment.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hippocrate-frontend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hippocrate-frontend
  template:
    metadata:
      labels:
        app: hippocrate-frontend
    spec:
      containers:
      - name: hippocrate-frontend
        image: hippocrate-frontend:latest
        imagePullPolicy: Never
        ports:
        - containerPort: 3000
```

#### 6. frontend-service.yaml
```yaml
apiVersion: v1
kind: Service
metadata:
  name: hippocrate-frontend-service
spec:
  selector:
    app: hippocrate-frontend
  ports:
  - port: 80
    targetPort: 3000
    nodePort: 30646
  type: NodePort
```

### Déploiement sur KIND

**1. Créer le cluster KIND**:
```bash
kind create cluster --name hippocrate-cluster
```

**2. Charger les images Docker**:
```bash
kind load docker-image hippocrate-backend:latest --name hippocrate-cluster
kind load docker-image hippocrate-frontend:latest --name hippocrate-cluster
```

**3. Déployer sur Kubernetes**:
```bash
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/mongo-service.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
```

**4. Vérifier les déploiements**:
```bash
kubectl get pods
kubectl get services
kubectl logs <pod-name>
```

**5. Accéder à l'application**:
```
http://localhost:30646  # Frontend
```

### Points importants Kubernetes

- **imagePullPolicy: Never**: Essentiel pour KIND car les images sont chargées localement
- **NodePort 30646**: Expose le frontend sur le port 30646 de la machine hôte
- **ClusterIP**: Backend et MongoDB ne sont accessibles qu'à l'intérieur du cluster
- **Service Discovery**: Le backend accède à MongoDB via `mongodb://mongo:27017`
- **emptyDir**: Volume temporaire pour MongoDB (données perdues au redémarrage du pod)

---

## 🔄 Pipeline CI/CD (Jenkins)

### Jenkinsfile

```groovy
pipeline {
    agent any
    tools {
        nodejs 'NodeJS'  // Doit correspondre au nom dans Global Tool Configuration
    }
    environment {
        BACKEND_IMAGE = 'hippocrate-backend:latest'
        FRONTEND_IMAGE = 'hippocrate-frontend:latest'
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/raboudidhia/Hippocrate-vitrine.git',
                    branch: 'main',
                    credentialsId: 'github-token'
            }
        }
        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }
        stage('Install Frontend Dependencies') {
            steps {
                dir('client') {
                    bat 'npm install'
                }
            }
        }
        stage('Test Backend') {
            steps {
                dir('backend') {
                    bat 'npm test'
                }
            }
        }
        stage('Test Frontend') {
            steps {
                dir('client') {
                    bat 'npm test'
                }
            }
        }
        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    bat 'docker build -t %BACKEND_IMAGE% .'
                }
            }
        }
        stage('Build Frontend Docker Image') {
            steps {
                dir('client') {
                    bat 'docker build -t %FRONTEND_IMAGE% .'
                }
            }
        }
        stage('Export Docker Images') {
            steps {
                bat 'docker save -o hippocrate-backend.tar %BACKEND_IMAGE%'
                bat 'docker save -o hippocrate-frontend.tar %FRONTEND_IMAGE%'
            }
        }
    }
}
```

### Étapes du pipeline

1. **Checkout**: Clone le repo GitHub (nécessite credentials)
2. **Install Dependencies**: Installation des dépendances npm pour backend et frontend
3. **Test Backend**: Exécution des tests Jest backend
4. **Test Frontend**: Exécution des tests Jest frontend
5. **Build Docker Images**: Construction des images Docker
6. **Export Images**: Export des images en fichiers `.tar` pour transfert

### Configuration Jenkins requise

- **Plugin NodeJS**: Pour installer Node.js
- **Plugin Docker**: Pour construire les images
- **Plugin Git**: Pour le checkout
- **Credentials GitHub**: Token d'accès personnel

### Commandes Windows (bat)

Le Jenkinsfile utilise `bat` au lieu de `sh` car Jenkins tourne sur Windows.

---

## 🧪 Tests

### Backend Tests (Jest + Supertest)

**Configuration Jest** (package.json):
```json
{
  "jest": {
    "testEnvironment": "node",
    "testTimeout": 30000,
    "detectOpenHandles": true
  }
}
```

**Fichier de test** (`tests/reservation.test.js`):
- Utilise `mongodb-memory-server` pour une base de données en mémoire
- Tests des endpoints API avec `supertest`
- Setup/teardown de la connexion MongoDB

**Exemple de test**:
```javascript
const request = require('supertest');
const app = require('../server');

describe('Reservation API', () => {
  it('should create a reservation', async () => {
    const res = await request(app)
      .post('/api/reservations')
      .send({
        room: roomId,
        date: '2024-01-15',
        arrivalTime: '09:00',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '0612345678'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
```

### Frontend Tests (Jest + React Testing Library)

**Configuration Jest** (package.json):
```json
{
  "jest": {
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": ["<rootDir>/src/setupTests.js"],
    "moduleNameMapper": {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    "transform": {
      "^.+\\.(js|jsx)$": "babel-jest"
    }
  }
}
```

**Setup file** (`src/setupTests.js`):
```javascript
import '@testing-library/jest-dom';
```

**Tests des composants**:
- Tests unitaires des composants React
- Tests d'intégration avec React Testing Library
- Mock des appels API avec Axios

### Exécution des tests

```bash
# Backend
cd backend && npm test

# Frontend
cd client && npm test

# Mode watch
npm run test:watch
```

---

## 🔐 Sécurité

### 1. Authentification Admin
- **JWT**: Tokens signés avec secret (expiration 24h)
- **bcryptjs**: Hash des mots de passe (salt rounds: 10)
- **Middleware**: Vérification du token sur toutes les routes admin

### 2. Validation des données
- Validation côté serveur avec Mongoose schemas
- Vérification des types et contraintes (min/max)
- Protection contre les injections NoSQL

### 3. CORS
- Liste blanche d'origines autorisées
- Credentials autorisés pour l'authentification

### 4. Variables d'environnement
- Secrets (JWT_SECRET, EMAIL_PASS) dans `.env`
- **⚠️ ATTENTION**: Le fichier `backend-deployment.yaml` contient des secrets en clair (à déplacer vers Kubernetes Secrets)

### 5. Recommandations de sécurité
- ✅ Utiliser Kubernetes Secrets au lieu de plaintext
- ✅ Ajouter rate limiting (ex: express-rate-limit)
- ✅ Ajouter helmet.js pour sécuriser les headers HTTP
- ✅ Valider les inputs côté client ET serveur
- ✅ Utiliser HTTPS en production

---

## 📊 Flux de données - Cas d'usage

### Cas 1: Réservation d'une salle

```
1. Utilisateur → Frontend (Reservation.jsx)
   - Sélectionne date, salle, heure
   - Remplit formulaire (nom, email, tel)

2. Frontend → Backend (POST /api/reservations)
   - Envoie les données de réservation
   
3. Backend → MongoDB
   - Vérifie disponibilité (RoomAvailability)
   - Crée Reservation
   - Décrémente availablePlaces
   
4. Backend → Nodemailer
   - Envoie email de confirmation
   
5. Backend → Frontend
   - Retourne { success: true, reservation: {...} }
   
6. Frontend → Utilisateur
   - Affiche confirmation
```

### Cas 2: Admin consulte les réservations

```
1. Admin → Frontend (AdminLogin.jsx)
   - Entre email/password
   
2. Frontend → Backend (POST /api/admin/login)
   - Authentification
   
3. Backend → MongoDB
   - Vérifie Admin avec comparePassword()
   - Génère JWT
   
4. Backend → Frontend
   - Retourne { token, admin }
   
5. Frontend
   - Stocke token dans localStorage
   - Redirige vers AdminDashboard
   
6. Admin → Frontend (AdminDashboard.jsx)
   - Sélectionne une date
   
7. Frontend → Backend (GET /api/admin/reservations?date=...)
   - Header: Authorization: Bearer <token>
   
8. Backend → MongoDB
   - Vérifie JWT
   - Récupère Reservations avec .populate('room')
   
9. Backend → Frontend
   - Retourne liste des réservations
   
10. Frontend → Admin
    - Affiche tableau des réservations
```

---

## 🚀 Guide de démarrage complet

### Prérequis
- Node.js 18+
- MongoDB 4.4+
- Docker & Docker Compose
- KIND (Kubernetes IN Docker)
- kubectl
- Jenkins (optionnel pour CI/CD)

### Installation locale

**1. Backend**:
```bash
cd backend
npm install
cp .env.example .env
# Éditer .env avec vos valeurs
npm run dev  # Mode développement avec nodemon
```

**2. Frontend**:
```bash
cd client
npm install
npm run dev  # Vite dev server
```

**3. MongoDB**:
```bash
# Option 1: Local
mongod --dbpath /data/db

# Option 2: Docker
docker run -d -p 27017:27017 --name mongo mongo:4.4
```

**4. Initialiser les données**:
```bash
cd backend
npm run initialize  # Crée les 3 salles
```

### Déploiement Kubernetes local

```bash
# 1. Créer cluster KIND
kind create cluster --name hippocrate-cluster

# 2. Build images Docker
cd backend && docker build -t hippocrate-backend:latest .
cd ../client && docker build -t hippocrate-frontend:latest .

# 3. Charger dans KIND
kind load docker-image hippocrate-backend:latest --name hippocrate-cluster
kind load docker-image hippocrate-frontend:latest --name hippocrate-cluster

# 4. Déployer
kubectl apply -f k8s/

# 5. Vérifier
kubectl get pods
kubectl get services

# 6. Accéder
# Frontend: http://localhost:30646
```

---

## 📝 Notes techniques supplémentaires

### Gestion des dates
- Toutes les dates sont stockées en UTC dans MongoDB
- Conversion en locale (fr-FR) pour l'affichage
- Utilisation de `date-fns` pour le formatage côté frontend

### Gestion de la disponibilité
- **Room.availablePlaces**: Capacité par défaut de la salle
- **RoomAvailability**: Override pour une date spécifique
- Si pas de `RoomAvailability` pour une date, on utilise `Room.availablePlaces`

### Optimisations possibles
- Ajouter un cache Redis pour les requêtes fréquentes
- Implémenter la pagination pour les réservations
- Ajouter des index MongoDB sur les champs fréquemment recherchés
- Utiliser un CDN pour les assets statiques

### Scalabilité
- Backend stateless → facile à scaler horizontalement
- MongoDB peut être remplacé par un cluster (Replica Set)
- Utiliser un LoadBalancer Kubernetes au lieu de NodePort
- Ajouter un Ingress Controller (nginx, traefik)

---

## 🎯 Résumé des choix techniques

| Aspect | Technologie | Justification |
|--------|-------------|---------------|
| **Frontend Framework** | React 18 | Composants réutilisables, écosystème riche, performance |
| **Build Tool** | Vite 6 | Ultra-rapide, HMR, config minimale |
| **CSS Framework** | Tailwind CSS 3 | Utility-first, customisable, JIT compiler |
| **Backend Framework** | Express 4 | Minimaliste, flexible, grande communauté |
| **Database** | MongoDB 7 | NoSQL, schéma flexible, facile à scaler |
| **ODM** | Mongoose 7 | Validation, hooks, méthodes personnalisées |
| **Authentication** | JWT + bcryptjs | Stateless, scalable, secure |
| **Email Service** | Nodemailer | Simple, support SMTP, templates HTML |
| **Containerization** | Docker | Isolation, portabilité, reproductibilité |
| **Orchestration** | Kubernetes (KIND) | Scalabilité, self-healing, declarative |
| **CI/CD** | Jenkins | Flexible, nombreux plugins, pipelines as code |
| **Testing** | Jest + Supertest | Standard JavaScript, mocking facile |

---

## 📞 Questions techniques fréquentes

**Q: Comment fonctionne l'authentification admin?**
R: JWT stocké dans localStorage → Envoyé dans header Authorization → Vérifié par middleware → Accès autorisé

**Q: Comment gérez-vous la disponibilité des salles?**
R: Système à deux niveaux: `Room.availablePlaces` (défaut) et `RoomAvailability` (override par date)

**Q: Pourquoi utiliser KIND plutôt que Minikube?**
R: KIND est plus léger, plus rapide, et utilise Docker (déjà installé pour le build)

**Q: Les tests sont-ils complets?**
R: Tests de base présents. À étendre: tests E2E, tests de charge, tests de sécurité

**Q: Comment faire un rollback en production?**
R: `kubectl rollout undo deployment/hippocrate-backend` ou redéployer une version antérieure

**Q: Les secrets sont-ils sécurisés?**
R: ⚠️ Non, actuellement en plaintext dans K8s. À migrer vers Kubernetes Secrets + external secret manager

---

## 🔧 Maintenance et monitoring

### Logs
```bash
# Backend
kubectl logs -f deployment/hippocrate-backend

# Frontend
kubectl logs -f deployment/hippocrate-frontend

# MongoDB
kubectl logs -f deployment/mongo
```

### Debugging
```bash
# Accéder au pod
kubectl exec -it <pod-name> -- /bin/sh

# Port forward pour accès direct
kubectl port-forward service/hippocrate-backend-service 5000:5000
```

### Mise à jour
```bash
# Rebuild images
docker build -t hippocrate-backend:v2 ./backend

# Reload dans KIND
kind load docker-image hippocrate-backend:v2 --name hippocrate-cluster

# Update deployment
kubectl set image deployment/hippocrate-backend hippocrate-backend=hippocrate-backend:v2

# Vérifier rollout
kubectl rollout status deployment/hippocrate-backend
```

---

**Document créé le**: [Date actuelle]  
**Version**: 1.0  
**Auteur**: Documentation technique du projet Hippocrate Coworking Space
