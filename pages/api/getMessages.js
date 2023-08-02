// pages/api/getMessages.js

import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  
  const messages = await db.collection("messages").find({}).toArray();
  
  res.json(messages);
}
