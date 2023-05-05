import * as vscode from 'vscode';

import { ExtensionSettings } from './models/ExtensionSettings';

export class SettingsManager {
  public static getSettings(extensionName: string): ExtensionSettings {
    const config = vscode.workspace.getConfiguration(extensionName);

    const settings: ExtensionSettings = {
      openAISecret: config.openAISecret,
      maxTokens: config.maxTokens,
      model: config.model,
      completionType: config.completionType,
    };

    return settings;
  }
}
