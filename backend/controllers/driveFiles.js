import { google } from "googleapis";
import oauth2CLient from "../config/oauth2.js";

const drive = google.drive({ version: "v3", auth: oauth2CLient });

export async function listUserFiles() {
    try {
        const response = await drive.files.list({
            // Filter to list owned by user and of type Google type Google Docs
            q: "'me' in owners and mimeType='application/vnd.google-apps.document'",
            fields: "files(id, name, mimeType)",
        });
        return response.data.files;
    } catch (error) {
        console.error("Error listing files:", error);
        throw new Error("Failed to list files");
    }
}