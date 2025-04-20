const mongoose = require('mongoose');


const Admin = require('./Admin');
const Reservation = require('./Reservation');
const Room = require('./Room');
const RoomAvailability = require('./RoomAvailability');


module.exports = {
  Admin,
  Reservation,
  Room,
  RoomAvailability
}; 