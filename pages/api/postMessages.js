// pages/api/postMessage.js

import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();  // Method not allowed
  }
  
  const { db } = await connectToDatabase();
  
  // Insert the new message into the database
  const result = await db.collection('messages').insertOne(req.body);
  
  res.json({ message: 'Message saved', id: result.insertedId });
}
