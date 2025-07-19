require('dotenv').config();
const mongoose = require('mongoose');
const { Admin } = require('../models');

const resetAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hippocrate', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Delete existing admin if exists
    await Admin.deleteMany({ email: 'admin@hippocrate.com' });
    console.log('Cleaned up existing admin users');

    // Create new admin - let the model handle password hashing
    const admin = new Admin({
      email: 'admin@hippocrate.com',
      password: 'admin123' // This will be hashed by the pre-save middleware
    });

    await admin.save();
    console.log('Created new admin user');

    // Verify password works
    const verifyAdmin = await Admin.findOne({ email: 'admin@hippocrate.com' });
    const isMatch = await verifyAdmin.comparePassword('admin123');
    
    console.log({
      adminCreated: !!admin,
      passwordVerified: isMatch,
      adminId: admin._id,
      email: admin.email
    });

    if (!isMatch) {
      throw new Error('Password verification failed');
    }

    console.log('Admin reset successful - you can now log in with:');
    console.log('Email: admin@hippocrate.com');
    console.log('Password: admin123');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

resetAdmin(); 