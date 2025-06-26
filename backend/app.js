const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const newsRoutes = require('./routes/newsRoutes');
const ChatHistory = require('./models/chatHistory');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'https://health-lens-flame.vercel.app/',  // allow frontend origin
  credentials: true
}));
app.use(express.urlencoded({ extended: true })); 


// After middleware
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const chatRoutes = require('./routes/chatRoutes'); 
app.use('/api/chat', chatRoutes);                 


// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error(' MongoDB connection error:', err));

// Test route to check server
app.get('/', (req, res) => {
  res.send('HealthLens AI Backend is running');
});

app.post('/api/auth/test', (req, res) => {
  res.json({ message: 'Test successful', body: req.body });
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use('/api/news', newsRoutes);


// Server startup
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
