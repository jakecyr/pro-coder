# Pro Coder

## Features

- Completes full blocks of code using previous code as the context.
- Uses the most up-to-date models (GPT-4, etc.), configurable by you, the user.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

- `procoder.openAISecret`: Your OpenAI API key.
- `procoder.maxTokens`: The max number of tokens to use generating the response along with the context referenced.
- `procoder.model`: The OpenAI model to use.
- `procoder.completionType`: Whether to use a chat completion (ChatGPT) or a normal text completion.
