import fetch from 'node-fetch';

export async function sendToTrilium(summaryText) {
    const TRILIUM_API_ENDPOINT = process.env.TRILIUM_API_ENDPOINT;
    const TRILIUM_API_TOKEN = process.env.TRILIUM_API_TOKEN;

    // Convert the username and token to a Basic Auth format
    const basicAuthToken = Buffer.from(`etapi:${TRILIUM_API_TOKEN}`).toString('base64');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${basicAuthToken}`
    };

    // Convert your summaryText into a list format
    const list = summaryText.split('\n').map(line => line.replace(' | ', ' - ')).join('\n');

    const payload = {
        secret: 'secret-password',
        title: 'Summary Task',
        rawContent: list
    };
    

    try {
        const response = await fetch(TRILIUM_API_ENDPOINT, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`Error sending data to Trilium: ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
}
