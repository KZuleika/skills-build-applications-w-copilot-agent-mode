import { Router } from 'express';
import Workout from '../models/Workout.js';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json({ message: 'Workouts collection', count: workouts.length, data: workouts });
});

router.post('/', async (req, res) => {
  const payload = req.body ?? {};
  const workout = await Workout.create({
    title: payload.title ?? 'New Workout',
    difficulty: payload.difficulty ?? 'beginner',
    duration: payload.duration ?? 0,
  });

  res.status(201).json(workout);
});

export default router;
