import * as vscode from 'vscode';
import { completeCodeCommand } from './commands/completeCode';
import { ExtensionSettings } from './models/ExtensionSettings';
import { SettingsManager } from './settings-manager';
import { InvalidSettingError } from './errors/InvalidSettingError';

export function activate(context: vscode.ExtensionContext) {
  const extensionName = 'procoder';
  const config = vscode.workspace.getConfiguration(extensionName);
  const settings: ExtensionSettings = SettingsManager.getSettings(config);

  try {
    SettingsManager.validateSettings(settings);
  } catch (error) {
    if (error instanceof InvalidSettingError) {
      vscode.window.showErrorMessage(error.message);
    } else {
      vscode.window.showErrorMessage(
        'Unknown error when validating settings. Please make sure you have values selected for each setting.',
      );
    }
  }

  const completeCode = vscode.commands.registerCommand(
    `${extensionName}.completeCode`,
    completeCodeCommand(settings),
  );

  context.subscriptions.push(completeCode);
}

export function deactivate() {}
