import { Configuration, OpenAIApi } from 'openai';
import { OpenAINoResponseError } from '../errors/OpenAINoResponseError';

export const createChatCompletion = async (
  text: string,
  apiKey: string,
  maxTokens: number = 500,
  model: string = 'gpt-3.5-turbo',
) => {
  const configuration = new Configuration({
    apiKey,
  });

  const openai = new OpenAIApi(configuration);
  const prompt = `Please complete the following text:\n\n${text}`;

  const completion = await openai.createChatCompletion({
    model,
    max_tokens: maxTokens,
    messages: [
      {
        role: 'user',
        content: 'You are running in a VSCode Extension. Please respond with code only.',
      },
      { role: 'assistant', content: 'Okay.' },
      { role: 'user', content: prompt },
    ],
  });

  if (completion.data.choices.length === 0) {
    throw new OpenAINoResponseError('No choices returned from OpenAI.');
  }

  return completion.data.choices[0].message?.content;
};

export const createCompletion = async (
  text: string,
  apiKey: string,
  maxTokens: number = 500,
  model: string = 'text-davinci-003',
) => {
  const configuration = new Configuration({
    apiKey,
  });

  const openai = new OpenAIApi(configuration);
  const prompt = `Please complete the following text:\n\n${text}`;

  const completion = await openai.createCompletion({
    model,
    max_tokens: maxTokens,
    prompt,
  });

  if (completion.data.choices.length === 0) {
    throw new OpenAINoResponseError('No choices returned from OpenAI.');
  }

  return completion.data.choices[0].text;
};
