import { Configuration, OpenAIApi } from 'openai';
import { OpenAINoResponseError } from '../errors/OpenAINoResponseError';

export const getEditedCode = async (
  text: string,
  apiKey: string,
  instruction: string,
  temperature: number = 0,
  model: string = 'text-davinci-edit-001',
) => {
  const configuration = new Configuration({
    apiKey,
  });

  const openai = new OpenAIApi(configuration);

  const completion = await openai.createEdit({
    model,
    instruction,
    input: text,
    n: 1,
    temperature,
  });

  if (completion.data.choices.length === 0) {
    throw new OpenAINoResponseError('No choices returned from OpenAI.');
  }

  return completion.data.choices[0].text;
};
