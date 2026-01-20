require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();

// Konfigurasi agar bisa diakses dari mana saja
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());

const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) 
  : null;

app.get('/', (req, res) => {
  res.send('Server AI is Running');
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
    if (!openai) {
      return res.json({
        reply: "Mode Simulasi (Vercel): " + message
      });
    }
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo",
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// KHUSUS VERCEL: Export app, jangan app.listen di global scope
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server berjalan di http://localhost:${PORT}`);
    });
}

module.exports = app;