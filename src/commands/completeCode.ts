import * as vscode from 'vscode';
import { ExtensionSettings } from '../models/ExtensionSettings';
import { getEditedCode } from '../clients/openai-client';

export const completeCodeCommand = (settings: ExtensionSettings) => async () => {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showWarningMessage('No active editor found for code completion.');
    return;
  }

  const document = editor.document;

  const fullRange = new vscode.Range(
    document.positionAt(0),
    document.positionAt(document.getText().length),
  );

  try {
    vscode.window.showInformationMessage(`Completing code and fixing bugs...`);

    const completedCode = await getEditedCode(
      document.getText(fullRange),
      settings.openAISecret as string,
      'Complete the code.',
      settings.temperature as number,
      settings.model as string,
    );

    if (!completedCode) {
      vscode.window.showErrorMessage('Error completing code.');
      return;
    }

    editor.edit((editBuilder) => {
      editBuilder.replace(fullRange, completedCode);
    });

    vscode.window.showInformationMessage('Completed code and fixed bugs.');
  } catch (error) {
    vscode.window.showErrorMessage(`Error completing code: ${error}`);
  }
};
