import clientPromise from '../../src/client';

export default async (req, res) => {
	try {
		const client = await clientPromise;
		const db = await client.db();
		const result = await db.collection('messages').insertOne({
			id: 12344567,
			sender_username: 'test_user_01',
			created: 1692132839,
			text: 'I am trying to connect with this thing',
		});
		console.log('db logged successfully!');
		res.json({ message: 'Message saved', id: result.insertedId });
	} catch (error) {
		res.json({ message: 'Error', error });
	}
};
