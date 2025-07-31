const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const { message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'suportemanualdojovem@gmail.com',
      pass: 'suporteMDJ123'
    }
  });

  try {
    await transporter.sendMail({
      from: 'suportemanualdojovem@gmail.com',
      to: 'suportemanualdojovem@gmail.com',
      subject: 'Feedback do Usuário',
      text: message
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(4001, () => console.log('Servidor de e-mail rodando na porta 4001'));