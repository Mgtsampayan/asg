import express from 'express';
import oauth2Client from '../config/oauth2.js';

const router = express.Router();

const SCOPES = ['https://www.googleapis.com/auth/drive'];

// Initiate the OAuth flow and redirect to Google's consent screen
router.get('/login', (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent'
    });
    res.redirect(authUrl);
});

// OAuth callback route for handling token exchange
router.get('/auth/callback', async (req, res) => {
    const { code } = req.query;
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        // In production, store tokens securely (e.g., in the session or a database)
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error while retrieving tokens', error);
        res.status(500).send('Authentication error');
    }
});

export default router;