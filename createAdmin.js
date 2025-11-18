const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/edssentials');
    console.log('✅ MongoDB Connected\n');

    // Check if admin already exists
    let admin = await User.findOne({ email: 'admin@edssentials.com' });
    
    if (admin) {
      console.log('✓ Admin user already exists');
      console.log(`  Email: ${admin.email}`);
      console.log(`  Name: ${admin.firstName} ${admin.lastName}`);
      console.log(`  Role: ${admin.role}`);
      process.exit(0);
    }

    // Create admin user
    admin = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@edssentials.com',
      password: 'admin@123', // Default password - user should change this
      role: 'admin',
      isActive: true
    });

    await admin.save();

    console.log('✅ Admin user created successfully!\n');
    console.log('📋 Admin Credentials:');
    console.log('   Email: admin@edssentials.com');
    console.log('   Password: admin@123');
    console.log('\n⚠️  Please change the password after first login!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createAdminUser();
