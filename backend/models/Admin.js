const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


adminSchema.pre('save', async function(next) {
  
  if (!this.isModified('password')) return next();
  
  try {
    
    const salt = await bcrypt.genSalt(10);
    
    const hashedPassword = await bcrypt.hash(this.password, salt);
    
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});


adminSchema.methods.comparePassword = async function(candidatePassword) {
  try {
  
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin; 