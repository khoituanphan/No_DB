import { Configuration, OpenAIApi } from "openai";
import { sendToTrilium } from './sendToTrilium';

// Rough approximation to count tokens (words) in a string
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const { chatId, numMessages, projectID, userName, userSecret } = req.body;
    console.log("Received data:", req.body);

    if (!chatId || !numMessages) {
        return res.status(400).json({ error: "chatId and numMessages are required" });
    }

    // Fetch the messages from ChatEngine's API using received credentials
    const responseCE = await fetch(
        `https://api.chatengine.io/chats/${chatId}/messages/`,
        {
            method: "GET",
            headers: {
                "Project-ID": projectID,
                "User-Name": userName,
                "User-Secret": userSecret,
            },
        }
    );
    const messages = await responseCE.json();

  // Extract last `numMessages` messages, and join them
  const latestMessages = messages
    .slice(-numMessages)
    .map((msg) => msg.text)
    .join(" ");
  const chatContent = latestMessages;

    // Format the output
    const promptContent = `Summarize the following chat content, translate to english and list out what need to be done by whom according to this format :\nUser: \nWhat needed to be done: \nDeadline:\n\n${chatContent}\n`;


    const config = new Configuration({
        apiKey: process.env.OPENAI_KEY,
    });

    const openai = new OpenAIApi(config);

    try {
        const responseOA = await openai.createCompletion({
            model: "text-davinci-003",
            temperature: 0,
            max_tokens: 2000,
            prompt: promptContent,
        });

        const summary = responseOA.data.choices[0].text.trim();
        console.log(summary);

        try {
            const data = await sendToTrilium(summary);
            console.log(data);
            res.status(200).json({ message: 'Summary generated and sent to Trilium.' });
        } catch (error) {
            console.error("Error sending summary to Trilium:", error.message);
            res.status(500).json({ error: 'Failed to send summary to Trilium.' });
        }

    } catch (error) {
        console.error("Error calling OpenAI:", error.message);
        res.status(500).json({ error: "Error generating summary." });
    }
}
