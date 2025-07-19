# L'Hippocrate Backend

This is the backend server for L'Hippocrate coworking space reservation system.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
- Copy `.env.example` to `.env`
- Update the following variables in `.env`:
  - `MONGODB_URI`: Your MongoDB connection string
  - `EMAIL_USER`: Your Gmail address
  - `EMAIL_PASS`: Your Gmail app-specific password

3. Start MongoDB:
- Make sure MongoDB is installed and running on your system
- The default connection URL is: `mongodb://localhost:27017/hippocrate`

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### GET /api/rooms
Get all available rooms

### POST /api/reservations
Create a new reservation

Required fields:
- room (Room ID)
- date (YYYY-MM-DD)
- timeSlot (e.g., "09:00 - 10:00")
- firstName
- lastName
- email
- phone

## Email Configuration

The system uses Gmail SMTP for sending confirmation emails. To set this up:

1. Enable 2-factor authentication in your Gmail account
2. Generate an app-specific password
3. Use your Gmail address as EMAIL_USER
4. Use the app-specific password as EMAIL_PASS 