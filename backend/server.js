import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import oauthRoutes from './routes/oauth.js';
import dashboardRoutes from './routes/dashboard.js';
import transferRoutes from './routes/transfer.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the Google Drive Ownership Transfer API!');
});

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded)

app.use('/', oauthRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/transfer', transferRoutes);

// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});