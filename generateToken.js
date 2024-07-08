const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const app = express();

const CLIENT_ID = '';
const CLIENT_SECRET = '';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

const oauth2Client = new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  
  const scopes = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];
  
  app.get('/auth', (req, res) => {
    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
    res.redirect(authorizationUrl);
  });
  
  app.get('/oauth2callback', async (req, res) => {
    const code = req.query.code;
    try {
      const { tokens } = await oauth2Client.getToken(code);
      console.log('Tokens:', tokens);
      res.send(`Refresh Token: ${tokens.refresh_token}`);
    } catch (error) {
      console.error('Erro ao obter o refresh token:', error);
      res.status(500).send('Erro ao obter o refresh token');
    }
  });
  
  app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
    console.log('Visite http://localhost:3000/auth para iniciar o processo de autenticação');
  });