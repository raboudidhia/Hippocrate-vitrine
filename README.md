# 🧑‍⚕️ Hippocrate - Coworking Space Website

Hippocrate is a modern and responsive website designed for a coworking space.The project includes both user-facing pages and an admin panel for managing room reservations efficiently.

## 🌐 Features

- 🏠 **Landing Page** – Clean, informative introduction to the coworking space.
- 📋 **Services Page** – List of amenities and offerings.
- 📋 **Reservation Page**
- 📞 **Contact Page** – Easy-to-use form to reach out.
- 🔐 **Admin Dashboard** – Manage reservations and room availability.

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Node.js, Express 
- **Database:** MongoDB
- **Security:** JWT, bcrypt
- **DevOps:** Docker, Kubernetes, Jenkins

## 📚 Technical Documentation

- **[TECHNICAL_INTERVIEW_GUIDE.md](./TECHNICAL_INTERVIEW_GUIDE.md)** - Guide complet pour l'entretien technique (en français)
  - Définitions détaillées des technologies (Node.js, Express, MongoDB, React, Vite)
  - Documentation de toutes les APIs Express développées
  - Explication approfondie de JWT et de la sécurité de l'API
  - Architecture et communication frontend-backend
  - Comparaison React avec Vite vs sans Vite
  - 20+ questions techniques potentielles avec réponses détaillées
  
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Aide-mémoire rapide pour l'entretien
  - Définitions clés en 1 ligne
  - Tableaux récapitulatifs des APIs
  - Réponses rapides aux questions courantes
  - Chiffres clés du projet


## 📸 Screenshots

### Home Page

![Home Page](screenshots/image.png)
![Home Page](screenshots/home2.png)
![Home Page](screenshots/home3.png)
![Home Page](screenshots/home4.png)


### Services Page

![Services Page](screenshots/service1.png)
![Services Page](screenshots/service2.png)

### Reservation Page 

![Reservation Page](screenshots/reservation1.png)
![Reservation Page](screenshots/reservation2.png)

### Contact Page 
![Contact Page](screenshots/contact.png)
![Contact Page](screenshots/contact2.png)



### Admin Panel - Reservations

![Admin Panel](screenshots/admin.png)



## 🚀 Getting Started

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npm start  # or npm run dev for development
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

## 🧪 Running Tests

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd client
npm test
```

## 🔐 API Endpoints

### Public APIs
- `GET /api/rooms` - Get all rooms with availability
- `POST /api/reservations` - Create a new reservation

### Admin APIs (JWT Protected)
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/verify` - Verify JWT token
- `GET /api/admin/reservations` - Get reservations for a specific date
- `DELETE /api/admin/reservations/:id` - Delete a reservation
- `PATCH /api/admin/rooms/:id` - Update room capacity
- `PATCH /api/admin/rooms/:id/availability` - Update room availability for specific date

## 🔒 Security Features

- **JWT Authentication** - Stateless authentication with 24h expiration
- **bcrypt Password Hashing** - Secure password storage with salt
- **CORS Protection** - Whitelist of allowed origins
- **Input Validation** - All API inputs are validated
- **Environment Variables** - Sensitive data stored in .env files

## 🚢 CI/CD Pipeline

Automated builds, tests, and deployment via **Jenkins**.

Deployed to a local **Kubernetes** cluster using **KIND**.