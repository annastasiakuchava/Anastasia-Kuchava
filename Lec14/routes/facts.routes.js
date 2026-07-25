import { Router } from 'express';
import { randomBlocker } from '../middlewares/rate.middleware.js';

const router = Router();

const facts = [
  "Node.js პირველად 2009 წელს გამოვიდა.",
  "ჯავასკრიპტი სულ რაღაც 10 დღეში შეიქმნა.",
  "პირველი კომპიუტერული ბაგი ნამდვილი ჩრჩილი იყო."
];

router.get('/random-fact', randomBlocker, (req, res) => {
  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  res.json({ fact: randomFact });
});

export default router;