require('dotenv').config();
const mongoose = require('mongoose');
const Chapter = require('../models/Chapter');
const User = require('../models/User');
const chaptersData = require('../data/chapters');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Chapter.deleteMany({});
  await Chapter.insertMany(chaptersData);
  console.log(`Seeded ${chaptersData.length} chapters`);

  const existing = await User.findOne({ email: 'student@accounting.com' });
  if (!existing) {
    await User.create({ name: 'Demo Student', email: 'student@accounting.com', password: 'student123' });
    console.log('Demo user: student@accounting.com / student123');
  }
  process.exit(0);
}
seed().catch((e) => { console.error(e); process.exit(1); });
