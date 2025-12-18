const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const MONGO_URI = 'mongodb://mongo:27017/marvel-db';

mongoose.connect(MONGO_URI)
  .then(() => console.log('🛡️ S.H.I.E.L.D. Database Connected!'))
  .catch(err => console.error('❌ Connection Failed:', err));

const Hero = mongoose.model('Hero', new mongoose.Schema({
  codename: String, // e.g. Iron Man
  realName: String, // e.g. Tony Stark
  power: String     // e.g. Tech Suit
}));

// API Routes
app.get('/heroes', async (req, res) => {
  const heroes = await Hero.find();
  res.json(heroes);
});

app.post('/add', async (req, res) => {
  const newHero = new Hero(req.body);
  await newHero.save();
  res.json(newHero);
});

app.delete('/delete/:id', async (req, res) => {
  await Hero.findByIdAndDelete(req.params.id);
  res.json({ message: 'Target Eliminated' });
});

app.listen(3000, () => console.log('🤖 J.A.R.V.I.S. is online on port 3000'));