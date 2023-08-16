import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req, res) {
<<<<<<< Updated upstream
	const config = new Configuration({
		apiKey: process.env.OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(config);

	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		temperature: 0,
		max_tokens: 2000,
		prompt: 'Generate a bog post about dog',
	});
	console.log('response: ', response);

	res.status(200).json({ post: response.data.choices });
=======
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { chatId, numMessages, projectID, userName, userSecret } = req.body;
    console.log("Received data:", req.body);

    if (!chatId || !numMessages) {
        return res.status(400).json({ error: "chatId and numMessages are required" });
    }

    // Fetch the messages from ChatEngine's API using received credentials
    const responseCE = await fetch(`https://api.chatengine.io/chats/${chatId}/messages/`, {
        method: 'GET',
        headers: {
            'Project-ID': projectID,
            'User-Name': userName,
            'User-Secret': userSecret,
        },
    });
    const messages = await responseCE.json();

    // Extract last `numMessages` messages, and join them
    const latestMessages = messages.slice(-numMessages).map(msg => msg.text).join(' ');
    const chatContent = latestMessages;

    // Craft the prompt for OpenAI
    const promptContent = `Summarize the following chat content and show everything in it:\n\n${chatContent}\n`;

    const config = new Configuration({
        apiKey: process.env.OPENAI_KEY,
    });

    const openai = new OpenAIApi(config);

    const responseOA = await openai.createCompletion({
        model: 'text-davinci-003',
        temperature: 0,
        max_tokens: 2000,
        prompt: promptContent,
    });

    // Send back the chat ID and the generated summary
    res.status(200).json({
        chatId: chatId,
        summary: responseOA.data.choices[0].text.trim()
    });
>>>>>>> Stashed changes
}
