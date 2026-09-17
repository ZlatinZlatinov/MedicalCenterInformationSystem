const { BlobServiceClient } = require('@azure/storage-blob'); 

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || 'medical-documents';

if (!connectionString) {
    throw new Error('AZURE_STORAGE_CONNECTION_STRING is not set in environment variables');
}

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

/**
 * Uploads a file buffer to Azure Blob Storage.
 * @param {Buffer} buffer - File contents
 * @param {string} blobName - Path/key inside the container (e.g. `${ownerId}/${documentId}-${filename}`)
 * @param {string} mimeType - Content type to store as blob metadata
 * @returns {Promise<string>} the blobName (used as documentPath)
 */
async function uploadBlob(buffer, blobName, mimeType) {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(buffer, {
        blobHTTPHeaders: { blobContentType: mimeType },
    });
    return blobName;
}

/**
 * Downloads a blob's contents into a Buffer.
 * @param {string} blobName
 * @returns {Promise<Buffer>}
 */
async function downloadBlob(blobName) {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const downloadResponse = await blockBlobClient.downloadToBuffer();
    return downloadResponse;
}

/**
 * Permanently deletes a blob. Only call this for hard deletes /
 * retention-policy cleanup — normal document deletion should be
 * a soft delete at the DB level (status: 'deleted' / paranoid destroy).
 * @param {string} blobName
 */
async function deleteBlob(blobName) {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.deleteIfExists();
}

/**
 * Checks a blob exists (useful for validation/debugging).
 * @param {string} blobName
 */
async function blobExists(blobName) {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    return blockBlobClient.exists();
}

module.exports = {
    uploadBlob,
    downloadBlob,
    deleteBlob,
    blobExists,
};