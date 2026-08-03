import mongoose from 'mongoose';
import { connectToDatabase, User, Team, Activity, LeaderboardEntry, Workout } from '../models';

/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase() {
  try {
    await connectToDatabase();
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ava Chen', email: 'ava@example.com', role: 'runner' },
      { name: 'Noah Patel', email: 'noah@example.com', role: 'cyclist' },
      { name: 'Mina Alvarez', email: 'mina@example.com', role: 'swimmer' },
    ]);

    await Team.insertMany([
      { name: 'Velocity', sport: 'running', members: 5 },
      { name: 'Trail Blazers', sport: 'cycling', members: 4 },
      { name: 'Wave Riders', sport: 'swimming', members: 3 },
    ]);

    await Activity.insertMany([
      { type: 'run', durationMinutes: 30, date: new Date('2026-07-29T06:00:00Z'), userId: users[0]._id.toString() },
      { type: 'cycle', durationMinutes: 45, date: new Date('2026-07-28T07:30:00Z'), userId: users[1]._id.toString() },
      { type: 'swim', durationMinutes: 25, date: new Date('2026-07-27T05:45:00Z'), userId: users[2]._id.toString() },
    ]);

    await LeaderboardEntry.insertMany([
      { user: 'Ava Chen', score: 1320, rank: 1 },
      { user: 'Noah Patel', score: 1280, rank: 2 },
      { user: 'Mina Alvarez', score: 1210, rank: 3 },
    ]);

    await Workout.insertMany([
      { title: 'HIIT Cardio', focus: 'endurance', durationMinutes: 35, difficulty: 'intermediate' },
      { title: 'Power Cycle', focus: 'strength', durationMinutes: 40, difficulty: 'advanced' },
      { title: 'Core Flow', focus: 'mobility', durationMinutes: 20, difficulty: 'beginner' },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
