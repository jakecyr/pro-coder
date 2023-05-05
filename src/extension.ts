import * as vscode from 'vscode';
import { completeCodeCommand } from './commands/completeCode';

export function activate(context: vscode.ExtensionContext) {
  const extensionName = 'procoder';

  const disposable = vscode.commands.registerCommand(
    `${extensionName}.completeCode`,
    completeCodeCommand(extensionName),
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
