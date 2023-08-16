import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req, res) {
	const config = new Configuration({
		apiKey: process.env.OPENAI_KEY,
	});
	const openai = new OpenAIApi(config);

	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		temperature: 0,
		max_tokens: 2000,
		prompt: 'Generate a blog post about dogs.',
	});

	// console.log('response: ', response);

	res.status(200).json(response.data.choices);
}
