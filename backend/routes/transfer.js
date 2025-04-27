import express from 'express';
import { transferOwnership } from '../controllers/transferOwnership.js';

const router = express.Router();

// Handle the POST request for transferring file ownership
router.post('/', async (req, res) => {
    const { fileId, newOwnerEmail } = req.body;

    if (!fileId || !newOwnerEmail) {
        return res.status(400).send('File ID and new owner email are required.');
    }

    try {
        const result = await transferOwnership(fileId, newOwnerEmail);
        res.send(`Ownership transferred successfully. Response: ${JSON.stringify(result)}`);
    } catch (error) {
        res.status(500).send(`Error transferring ownership: ${error.message}`);
    }
});

export default router;