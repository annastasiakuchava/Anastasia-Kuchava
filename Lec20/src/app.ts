import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { seedDatabase } from './database/seed';
import userRoutes from './routes/userRoutes';
import { User } from './models/User';
import { Quiz } from './models/Quiz';

const app = express();
app.use(express.json());

// REST API Routes
app.use('/api/users', userRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// ბაზიდან ტოპ 10 იუზერის წამოღება ქულების მიხედვით
const getLeaderboard = async () => {
  return await User.find().sort({ score: -1 }).limit(10);
};

// ონლაინ იუზერების სათვალავი
let onlineUsersCount = 0;

io.on('connection', async (socket) => {
  // 5) ონლაინ შესული ადამიანების ევენთი
  onlineUsersCount++;
  io.emit('onlineUsers', { count: onlineUsersCount });
  console.log(`კლიენტი შეუერთდა. სულ ონლაინშია: ${onlineUsersCount}`);

  // 3) კავშირისას ეგრევე ვუგზავნით მიმდინარე ლიდერბორდს
  socket.emit('leaderboardUpdate', await getLeaderboard());

  // 4) პასუხის დასაბმითების ივენთი
  socket.on('submitAnswer', async (data: { userId: string, quizId: string, answer: string }) => {
    const { userId, quizId, answer } = data;
    
    const quiz = await Quiz.findById(quizId);
    if (quiz && quiz.correctAnswer === answer) {
      // თუ პასუხი სწორია, იუზერს ვუმატებთ 10 ქულას
      await User.findByIdAndUpdate(userId, { $inc: { score: 10 } });
    }

    // პასუხის შემდეგ ხელახლა ვავრცელებთ განახლებულ ლიდერბორდს ყველასთან
    const updatedLeaderboard = await getLeaderboard();
    io.emit('leaderboardUpdate', updatedLeaderboard);
  });

  // იუზერის გასვლა სისტემიდან
  socket.on('disconnect', () => {
    onlineUsersCount--;
    io.emit('onlineUsers', { count: onlineUsersCount });
    console.log(`კლიენტი გავიდა. სულ ონლაინშია: ${onlineUsersCount}`);
  });
});

// მონაცემთა ბაზასთან კავშირი
mongoose.connect('mongodb://localhost:27017/quiz-socket-db')
  .then(async () => {
    console.log('MongoDB დაკავშირებულია!');
    await seedDatabase(); // 1) 10 ქუიზის ჩაყრა ბაზაში
  })
  .catch(err => console.log('ბაზასთან კავშირის შეცდომა:', err));

export { server };