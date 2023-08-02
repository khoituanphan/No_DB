import { connectToDatabase } from '../../utils/mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const messages = await db.collection('messages').find({}).toArray();

  res.json(messages);
};
