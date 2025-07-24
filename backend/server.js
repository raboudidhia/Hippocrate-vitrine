require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const adminRoutes = require('./routes/admin');
const { Room, Reservation, RoomAvailability } = require('./models');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',              
    'http://hippocrate-frontend-service', 
    'http://10.155.229.30:30646',        
    'http://192.168.100.218:30646'       
  ],
  credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Connect to MongoDB (only if not in test environment)
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hippocrate', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
}

// Admin routes
app.use('/api/admin', adminRoutes);

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Routes
app.get('/api/rooms', async (req, res) => {
  try {
    const { date } = req.query;
    const rooms = await Room.find();
    const formattedDate = date ? new Date(date).toISOString().split('T')[0] : null;

    const roomsWithAvailability = await Promise.all(
      rooms.map(async (room) => {
        let availablePlaces = room.availablePlaces; // Use the availablePlaces from the Room model
        if (formattedDate) {
          const availability = await RoomAvailability.findOne({
            room: room._id,
            date: new Date(formattedDate),
          });
          if (availability) {
            availablePlaces = availability.availablePlaces;
          }
        }
        return {
          ...room.toObject(),
          availablePlaces,
        };
      })
    );

    res.json(roomsWithAvailability);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms', error: error.message });
  }
});

app.post('/api/reservations', async (req, res) => {
  try {
    const { room: roomId, date, arrivalTime, firstName, lastName, email, phone } = req.body;

    // Validate room
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(400).json({ message: 'Room not found' });
    }

    // Check or initialize availability for the date
    const formattedDate = new Date(date).toISOString().split('T')[0];
    let availability = await RoomAvailability.findOne({
      room: roomId,
      date: new Date(formattedDate),
    });

    if (!availability) {
      availability = new RoomAvailability({
        room: roomId,
        date: new Date(formattedDate),
        availablePlaces: room.availablePlaces, // Use the room's current available places
      });
    }

    if (availability.availablePlaces <= 0) {
      return res.status(400).json({ message: 'No places available for this date' });
    }

    // Create reservation
    const reservation = new Reservation({
      room: roomId,
      date: new Date(date),
      arrivalTime,
      firstName,
      lastName,
      email,
      phone,
    });

    await reservation.save();

    // Decrease available places for the date
    availability.availablePlaces -= 1;
    await availability.save();

    // Send confirmation email
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

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      reservation: {
        room: room.name,
        date: new Date(date).toLocaleDateString('fr-FR'),
        arrivalTime,
        firstName,
        lastName,
        email,
        phone,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating reservation', error: error.message });
  }
});

// Initialize rooms if they don't exist
const initializeRooms = async () => {
  try {
    const count = await Room.countDocuments();
    if (count === 0) {
      await Room.create([
        {
          name: 'Salle Aphrodite',
          capacity: 30,
          availablePlaces: 30,
        },
        {
          name: 'Salle Athéna',
          capacity: 30,
          availablePlaces: 30,
        },
        {
          name: 'Salle Apollon',
          capacity: 30,
          availablePlaces: 30,
        },
      ]);
      console.log('Rooms initialized');
    }
  } catch (error) {
    console.error('Error initializing rooms:', error);
  }
};

// Routes
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Export the app for testing
module.exports = app;

// Start server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    initializeRooms();
  });
}