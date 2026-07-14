import { Router } from 'express';
import Activity from '../models/Activity.js';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json({ message: 'Activities collection', count: activities.length, data: activities });
});

router.post('/', async (req, res) => {
  const payload = req.body ?? {};
  const activity = await Activity.create({
    userId: payload.userId ?? 'user-1',
    type: payload.type ?? 'run',
    duration: payload.duration ?? 0,
    calories: payload.calories ?? 0,
  });

  res.status(201).json(activity);
});

export default router;
