import { Router } from 'express';
import User from '../models/User.js';
const router = Router();
router.get('/', async (_req, res) => {
    const users = await User.find({}).lean();
    res.json({ message: 'Users collection', count: users.length, data: users });
});
router.post('/', async (req, res) => {
    const payload = req.body ?? {};
    const user = await User.create({
        name: payload.name ?? 'New User',
        email: payload.email ?? 'new-user@example.com',
        level: payload.level ?? 'beginner',
    });
    res.status(201).json(user);
});
export default router;
