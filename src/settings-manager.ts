import * as vscode from 'vscode';

import { ExtensionSettings } from './models/ExtensionSettings';
import { InvalidSettingError } from './errors/InvalidSettingError';

export class SettingsManager {
  public static getSettings(
    workspaceConfiguration: vscode.WorkspaceConfiguration,
  ): ExtensionSettings {
    const settings: ExtensionSettings = {
      openAISecret: workspaceConfiguration.openAISecret,
      maxTokens: workspaceConfiguration.maxTokens,
      model: workspaceConfiguration.model,
      completionType: workspaceConfiguration.completionType,
    };

    return settings;
  }

  public static validateSettings(settings: ExtensionSettings) {
    if (!settings.openAISecret) {
      throw new InvalidSettingError('Missing OpenAI secret key. Please update in settings.');
    }

    if (!settings.maxTokens) {
      throw new InvalidSettingError('Missing value for max tokens. Please update in settings.');
    }

    if (!settings.model) {
      throw new InvalidSettingError('Missing model value. Please update in settings.');
    }
  }
}
