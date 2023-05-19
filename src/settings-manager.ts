import * as vscode from 'vscode';

import { ExtensionSettings } from './models/ExtensionSettings';
import { InvalidSettingError } from './errors/InvalidSettingError';

export class SettingsManager {
  static getSettings(workspaceConfiguration: vscode.WorkspaceConfiguration): ExtensionSettings {
    return {
      openAISecret: workspaceConfiguration.openAISecret,
      model: workspaceConfiguration.model,
      temperature: workspaceConfiguration.temperature,
    };
  }

  static validateSettings(settings: ExtensionSettings) {
    if (!settings.openAISecret) {
      throw new InvalidSettingError('Missing OpenAI secret key. Please update in settings.');
    }

    if (settings.temperature < 0 || settings.temperature > 2) {
      throw new InvalidSettingError('Invalid value for temperature. Should be >=0 and <= 2.');
    }

    if (!settings.model) {
      throw new InvalidSettingError('Missing model value. Please update in settings.');
    }
  }
}
