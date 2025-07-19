require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Admin, Room } = require('../models');

const initialize = async () => {
  try {
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hippocrate', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

   
    const adminExists = await Admin.findOne({ email: 'admin@hippocrate.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await Admin.create({
        email: 'admin@hippocrate.com',
        password: hashedPassword
      });
      console.log('Admin user created');
    }

    
    const rooms = [
      {
        name: 'Salle Aphrodite',
        capacity: 30,
        availablePlaces: 30,
        description: 'Salle de consultation principale'
      },
      {
        name: 'Salle Athéna',
        capacity: 30,
        availablePlaces: 30,
        description: 'Salle de consultation secondaire'
      },
      {
        name: 'Salle Apollon',
        capacity: 30,
        availablePlaces: 30,
        description: 'Salle de consultation privée'
      }
    ];

    for (const room of rooms) {
      const roomExists = await Room.findOne({ name: room.name });
      if (!roomExists) {
        await Room.create(room);
        console.log(`Room ${room.name} created`);
      }
    }

    console.log('Initialization completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Initialization failed:', error);
    process.exit(1);
  }
};

initialize(); 