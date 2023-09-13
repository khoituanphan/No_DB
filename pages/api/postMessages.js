// pages/api/postMessage.js

import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();  // Method not allowed
  }
  
  const { db } = await connectToDatabase();
  
  // Insert the new message into the database
//   const result = await db.collection('messages').insertOne({
// 	id: 12344567,
// 	sender_username: 'test_user_01',
// 	created: 1692132839,
// 	text: 'I am trying to connect with this thing',
// });
  const result = await db.collection('messages').insertOne({
    id: req.body.id,
    sender: req.body.sender,
    created: req.body.created,
    attachments: req.body.attachments,
    sender_username: req.body.sender_username,
    text: req.body.text,
    custom_json: req.body.custom_json
  });
  
  res.json({ message: 'Message saved', id: result.insertedId });
}
