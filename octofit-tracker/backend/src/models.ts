import mongoose, { Schema, model, Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  role: string;
}

export interface ITeam {
  name: string;
  sport: string;
  members: number;
}

export interface IActivity {
  type: string;
  durationMinutes: number;
  date: Date;
  userId: string;
}

export interface ILeaderboardEntry {
  user: string;
  score: number;
  rank: number;
}

export interface IWorkout {
  title: string;
  focus: string;
  durationMinutes: number;
  difficulty: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  members: { type: Number, required: true },
});

const activitySchema = new Schema<IActivity>({
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  userId: { type: String, required: true },
});

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: String, required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
});

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  focus: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
});

export const User = model<IUser>('User', userSchema);
export const Team = model<ITeam>('Team', teamSchema);
export const Activity = model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const Workout = model<IWorkout>('Workout', workoutSchema);

export const connectToDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
  await mongoose.connect(mongoUri);
};
