import { google } from "googleapis";
import oauth2CLient from "../config/oauth2.js";

const drive = google.drive({ version: "v3", auth: oauth2CLient });

export async function transferOwnership(fileId, newOwnerEmail) {
    try {
        const response = await drive.permissions.create({
            fileId: fileId,
            transferOwnership: true,
            requestBody: {
                role: "owner",
                type: "user",
                emailAddress: newOwnerEmail,
            }
        })
        return response.data;
    } catch (error) {
        console.error("Error transferring ownership:", error);
        throw error;
    }
}
// Second option approach

// export async function transferOwnership(fileId, newOwnerEmail) {
//     try {
//         // Get the file metadata to find the current owner
//         const fileMetadata = await drive.files.get({
//             fileId: fileId,
//             fields: "owners",
//         });

//         const currentOwner = fileMetadata.data.owners[0].emailAddress;

//         // Transfer ownership
//         await drive.permissions.update({
//             fileId: fileId,
//             permissionId: currentOwner,
//             transferOwnership: true,
//             requestBody: {
//                 role: "owner",
//                 type: "user",
//                 emailAddress: newOwnerEmail,
//             },
//         });

//         console.log(`Ownership of file ${fileId} transferred from ${currentOwner} to ${newOwnerEmail}`);
//     } catch (error) {
//         console.error("Error transferring ownership:", error);
//     }
// }