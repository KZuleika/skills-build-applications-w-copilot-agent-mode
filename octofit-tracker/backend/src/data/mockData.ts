export const users = [
  { id: 'user-1', name: 'Avery Stone', email: 'avery@example.com', level: 'advanced' },
  { id: 'user-2', name: 'Jordan Lee', email: 'jordan@example.com', level: 'intermediate' },
  { id: 'user-3', name: 'Morgan Green', email: 'morgan@example.com', level: 'beginner' },
];

export const teams = [
  { id: 'team-1', name: 'Velocity Crew', members: ['user-1', 'user-2'] },
  { id: 'team-2', name: 'Core Circuit', members: ['user-3'] },
];

export const activities = [
  { id: 'activity-1', userId: 'user-1', type: 'run', duration: 35, calories: 320 },
  { id: 'activity-2', userId: 'user-2', type: 'strength', duration: 50, calories: 260 },
  { id: 'activity-3', userId: 'user-3', type: 'yoga', duration: 30, calories: 140 },
];

export const leaderboard = [
  { rank: 1, userId: 'user-1', score: 910 },
  { rank: 2, userId: 'user-2', score: 835 },
  { rank: 3, userId: 'user-3', score: 700 },
];

export const workouts = [
  { id: 'workout-1', title: 'HIIT Sprint', difficulty: 'advanced', duration: 25 },
  { id: 'workout-2', title: 'Core Stability', difficulty: 'intermediate', duration: 30 },
  { id: 'workout-3', title: 'Mobility Reset', difficulty: 'beginner', duration: 20 },
];
