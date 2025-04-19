const mongoose = require('mongoose');

const roomAvailabilitySchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  availablePlaces: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  collection: 'roomavailabilities' 
});


roomAvailabilitySchema.index({ room: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('RoomAvailability', roomAvailabilitySchema); 