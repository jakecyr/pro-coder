import * as vscode from 'vscode';
import { SettingsManager } from '../settings-manager';
import { ExtensionSettings } from '../models/ExtensionSettings';
import { createCompletion, createChatCompletion } from '../clients/openai-client';

export const completeCodeCommand = (extensionName: string) => async () => {
  const settings: ExtensionSettings = SettingsManager.getSettings(extensionName);

  if (!settings.openAISecret) {
    vscode.window.showErrorMessage('Missing OpenAI secret key. Please update in settings.');
    return;
  }

  if (!settings.maxTokens) {
    vscode.window.showErrorMessage('Missing value for max tokens. Please update in settings.');
    return;
  }

  if (!settings.model) {
    vscode.window.showErrorMessage('Missing model value. Please update in settings.');
    return;
  }

  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showInformationMessage('No activate editor found.');
    return;
  }

  const document = editor.document;
  const selection = editor.selection;
  const cursorLineNumber = selection.active;
  const text = document.getText();
  const linesPrior = text.split('\n').slice(0, cursorLineNumber.line);

  vscode.window.showInformationMessage('Thinking...');

  const startOfCurrentLine = new vscode.Position(cursorLineNumber.line, 0);
  const workspaceEditor = new vscode.WorkspaceEdit();

  try {
    const completionFunction =
      (settings.completionType as string) === 'Text Completion'
        ? createCompletion
        : createChatCompletion;

    const completedCode = await completionFunction(
      linesPrior.join('\n'),
      settings.openAISecret as string,
      settings.maxTokens as number,
      settings.model as string,
    );

    if (!completedCode) {
      vscode.window.showErrorMessage('Error completing code.');
      return;
    }

    const textEdit = new vscode.TextEdit(
      new vscode.Range(startOfCurrentLine, cursorLineNumber),
      completedCode,
    );

    workspaceEditor.set(document.uri, [textEdit]);

    await vscode.workspace.applyEdit(workspaceEditor);

    vscode.window.showInformationMessage('Completed code.');
  } catch (error) {
    vscode.window.showErrorMessage(`Error completing code: ${error}`);
  }
};
