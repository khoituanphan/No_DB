import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();  // Method not allowed
  }

  const db = await connectToDatabase(process.env.MONGODB_URI);

  // Insert the new message into the database
  const result = await db.collection('messages').insertOne({
      id: req.body.id,
      sender_username: req.body.sender_username,
      created: req.body.created,
      text: req.body.text
      });
  
  res.json({ message: 'Message saved', id: result.insertedId });
}