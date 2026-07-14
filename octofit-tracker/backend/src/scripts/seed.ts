import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      { name: 'Avery Stone', email: 'avery@example.com', level: 'advanced' },
      { name: 'Jordan Lee', email: 'jordan@example.com', level: 'intermediate' },
      { name: 'Morgan Green', email: 'morgan@example.com', level: 'beginner' },
    ]);

    await Team.insertMany([
      { name: 'Velocity Crew', members: [users[0]._id.toString(), users[1]._id.toString()] },
      { name: 'Core Circuit', members: [users[2]._id.toString()] },
    ]);

    await Activity.insertMany([
      { userId: users[0]._id.toString(), type: 'run', duration: 35, calories: 320 },
      { userId: users[1]._id.toString(), type: 'strength', duration: 50, calories: 260 },
      { userId: users[2]._id.toString(), type: 'yoga', duration: 30, calories: 140 },
    ]);

    await LeaderboardEntry.insertMany([
      { rank: 1, userId: users[0]._id.toString(), score: 910 },
      { rank: 2, userId: users[1]._id.toString(), score: 835 },
      { rank: 3, userId: users[2]._id.toString(), score: 700 },
    ]);

    await Workout.insertMany([
      { title: 'HIIT Sprint', difficulty: 'advanced', duration: 25 },
      { title: 'Core Stability', difficulty: 'intermediate', duration: 30 },
      { title: 'Mobility Reset', difficulty: 'beginner', duration: 20 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
