import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { chatId, numMessages, projectID, userName, userSecret } = req.body;
  console.log("Received data:", req.body);

  if (!chatId || !numMessages) {
    return res
      .status(400)
      .json({ error: "chatId and numMessages are required" });
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

  // Craft the prompt for OpenAI
  const promptContent = `Summarize the following chat content:\n\n${chatContent}\n`;

  const config = new Configuration({
    apiKey: process.env.OPENAI_KEY,
  });

  const openai = new OpenAIApi(config);

  try {
    const responseOA = await openai.createCompletion({
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 8000,
      prompt: promptContent,
    });

    res.status(200).json({
      chatId: chatId,
      summary: responseOA.data.choices[0].text.trim(),
    });
  } catch (error) {
    console.error("Error calling OpenAI:", error.message);
    res.status(500).json({ error: "Error generating summary." });
  }
}
