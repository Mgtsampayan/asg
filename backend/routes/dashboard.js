import express from 'express';
import { listUserFiles } from '../controllers/driveFiles.js';

const router = express.Router();

// Dashboard route displays the list of files and includes a form for ownership transfer
router.get('/', async (req, res) => {
    try {
        const files = await listUserFiles();
        let html = `<h1>Dashboard</h1>`;

        if (!files || files.length === 0) {
            html += `<p>No files available.</p>`;
        } else {
            html += `<ul>`;
            files.forEach(file => {
                html += `<li>${file.name} (ID: ${file.id})</li>`;
            });
            html += `</ul>`;
        }

        html += `
      <h2>Transfer File Ownership</h2>
      <form action="/transfer" method="POST">
        <label for="fileId">File ID:</label><br>
        <input type="text" id="fileId" name="fileId" required><br>
        <label for="newOwnerEmail">New Owner Email:</label><br>
        <input type="email" id="newOwnerEmail" name="newOwnerEmail" required><br>
        <button type="submit">Transfer Ownership</button>
      </form>
    `;
        res.send(html);
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).send('Failed to load dashboard');
    }
});

export default router;