const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/edssentials');
    console.log('\n✅ MongoDB Connected\n');

    // Get all users
    const users = await User.find({}, '-password').lean();
    
    console.log('📊 TOTAL USERS:', users.length);
    console.log('\n' + '='.repeat(80));
    
    if (users.length === 0) {
      console.log('❌ No users found in database. Register a user first at http://localhost:3000');
    } else {
      users.forEach((user, index) => {
        console.log(`\n👤 User ${index + 1}:`);
        console.log(`   ID: ${user._id}`);
        console.log(`   Name: ${user.firstName} ${user.lastName}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Active: ${user.isActive}`);
        console.log(`   Created: ${user.createdAt}`);
      });
    }
    
    console.log('\n' + '='.repeat(80) + '\n');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

connectDB();
