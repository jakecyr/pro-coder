import * as vscode from 'vscode';
import { ExtensionSettings } from '../models/ExtensionSettings';
import { createCompletion, createChatCompletion } from '../clients/openai-client';

export const completeCodeCommand = (settings: ExtensionSettings) => async () => {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showWarningMessage('No activate editor found for code completion.');
    return;
  }

  const document = editor.document;
  const selection = editor.selection;
  const cursorLineNumber = selection.active;
  const text = document.getText();
  const linesPrior = text.split('\n').slice(0, cursorLineNumber.line);

  const startOfCurrentLine = new vscode.Position(cursorLineNumber.line, 0);
  const workspaceEditor = new vscode.WorkspaceEdit();

  try {
    const useTextCompletion = (settings.completionType as string) === 'Text Completion';
    const completionFunction = useTextCompletion ? createCompletion : createChatCompletion;

    vscode.window.showInformationMessage(
      `Generating code with ${useTextCompletion ? 'text' : 'chat'} completion...`,
    );

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
