const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Admin, Reservation, Room, RoomAvailability } = require('../models');

// Middleware to verify admin token
const verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify admin token
router.get('/verify', verifyAdminToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select('-password');
    res.json({ admin });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all reservations for a specific date
router.get('/reservations', verifyAdminToken, async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({ message: 'Date parameter is required' });
    }

    // Create start and end date for the selected date (full day)
    const startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setUTCHours(23, 59, 59, 999);

    // Find reservations for the specific date
    const reservations = await Reservation.find({
      date: {
        $gte: startDate,
        $lte: endDate
      }
    })
    .populate('room')
    .sort({ arrivalTime: 1 });

    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Error fetching reservations' });
  }
});

// Delete reservation
router.delete('/reservations/:id', verifyAdminToken, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    await reservation.deleteOne();
    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).json({ message: 'Error deleting reservation' });
  }
});

// Update room capacity
router.patch('/rooms/:id', verifyAdminToken, async (req, res) => {
  try {
    const { availablePlaces } = req.body;
    
    // Input validation
    if (availablePlaces === undefined || availablePlaces === null) {
      return res.status(400).json({ message: 'Available places must be provided' });
    }

    const numAvailablePlaces = parseInt(availablePlaces);
    if (isNaN(numAvailablePlaces)) {
      return res.status(400).json({ message: 'Available places must be a number' });
    }

    // Find room
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Validate capacity
    if (numAvailablePlaces < 0 || numAvailablePlaces > room.capacity) {
      return res.status(400).json({ 
        message: `Available places must be between 0 and ${room.capacity}` 
      });
    }

    // Update room's available places
    room.availablePlaces = numAvailablePlaces;
    await room.save();

    // Update future room availabilities
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Update all future availabilities
    const result = await RoomAvailability.updateMany(
      {
        room: room._id,
        date: { $gte: today }
      },
      { $set: { availablePlaces: numAvailablePlaces } }
    );
    
    // Send success response
    res.json({
      room,
      updatedAvailabilities: result.modifiedCount,
      message: 'Room capacity updated successfully'
    });

  } catch (error) {
    console.error('Error updating room capacity:', error);
    res.status(500).json({ 
      message: 'Error updating room capacity',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Update room availability for a specific date
router.patch('/rooms/:id/availability', verifyAdminToken, async (req, res) => {
  try {
    const { availablePlaces, date } = req.body;
    
    // Input validation
    if (!date) {
      return res.status(400).json({ message: 'Date must be provided' });
    }

    if (availablePlaces === undefined || availablePlaces === null) {
      return res.status(400).json({ message: 'Available places must be provided' });
    }

    const numAvailablePlaces = parseInt(availablePlaces);
    if (isNaN(numAvailablePlaces)) {
      return res.status(400).json({ message: 'Available places must be a number' });
    }

    // Find room
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Validate capacity
    if (numAvailablePlaces < 0 || numAvailablePlaces > room.capacity) {
      return res.status(400).json({ 
        message: `Available places must be between 0 and ${room.capacity}` 
      });
    }

    // Convert date string to Date object with time set to midnight UTC
    const targetDate = new Date(date);
    targetDate.setUTCHours(0, 0, 0, 0);

    // Find or create room availability for the specific date
    let availability = await RoomAvailability.findOneAndUpdate(
      {
        room: room._id,
        date: targetDate
      },
      {
        $set: {
          availablePlaces: numAvailablePlaces
        }
      },
      {
        new: true,
        upsert: true // Create if it doesn't exist
      }
    );

    // If the date is today, also update the room's base availability
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    if (today.getTime() === targetDate.getTime()) {
      room.availablePlaces = numAvailablePlaces;
      await room.save();
    }
    
    // Send success response
    res.json({
      success: true,
      room,
      availability,
      message: 'Room availability updated successfully'
    });

  } catch (error) {
    console.error('Error updating room availability:', error);
    res.status(500).json({ 
      message: 'Error updating room availability',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router; 