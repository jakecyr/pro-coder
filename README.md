# Pro Coder

A Visual Studio Code extension that uses OpenAI GPT models to fix bugs in your code and complete any missing blocks.

## Installation

Install from the VSCode extensions menu by searching for "Pro Coder" or install from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=JakeCyr.pro-coder).

## Usage

Below are two methods to run the extension on your code. Make sure the editor is active before running either:

- Run the command from the VSCode command palette: "Complete Code and Fix Bugs"
- Run using the keyboard shortcut Cmd+Enter or Ctrl+Enter.

## Examples

### Fixing Bugs

Some bad code:

```python
def sum(a: str, b:int) -> int:

```

After running the keyboard shortcut, the code was edited to the following:

```python
def sum(a: int, b:int) -> int:
    return a + b
```

### Completing Code

After running the code completion command, the following code:

```javascript
const encryptString = (stringToEncrypt: string) => {};
```

Was updated to the following:

```javascript
const encryptString = (stringToEncrypt) => {
  const stringToEncryptArray = stringToEncrypt.split('');
  const encryptedStringArray = stringToEncryptArray.map((char) => {
    const charCode = char.charCodeAt(0);
    const encryptedCharCode = charCode + 1;
    const encryptedChar = String.fromCharCode(encryptedCharCode);
    return encryptedChar;
  });
  const encryptedString = encryptedStringArray.join('');
  return encryptedString;
};
```

And using the function generated:

```javascript
console.log(encryptString('Fix my code!')); // Gjy!nz!dpef"
```

## Extension Settings

This extension contributes the following settings:

- `procoder.openAISecret`: Your OpenAI API key.
- `procoder.model`: The OpenAI model to use. **Make sure the model name you enter is compatible with the completion type selected, otherwise a 404 error will be returned.**
- `procoder.temperature`: The creativity of the model edits.
