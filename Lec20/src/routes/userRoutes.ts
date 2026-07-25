import { Router, Request, Response } from 'express';
import { User } from '../models/User';

const router = Router();

// Create
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Read All
router.get('/', async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
});

// Read One
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const user = await User.findById(req.params.id);
  if (!user) { res.status(404).json({ message: "User not found" }); return; }
  res.json(user);
});

// Update
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) { res.status(404).json({ message: "User not found" }); return; }
    res.json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Delete
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) { res.status(404).json({ message: "User not found" }); return; }
  res.json({ message: "User deleted successfully" });
});

export default router;