require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/validate', async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).send('Access Token é necessário');
  }

  try {
    const userInfoResponse = await axios.get('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userInfo = userInfoResponse.data;

    console.log('Informações do usuário:', userInfo);
    res.status(200).json(userInfo);
  } catch (error) {
    console.error('Erro ao validar o Access Token ou obter informações do usuário:', error);
    res.status(400).send('Access Token inválido ou erro ao obter informações do usuário');
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
