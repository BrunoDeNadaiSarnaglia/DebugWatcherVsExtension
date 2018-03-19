'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    if(!vscode.workspace.workspaceFolders) return;
    let isEnabled = false;
    const workspaceFolder = vscode.workspace.workspaceFolders[0];
    const workspaceFolderPath = workspaceFolder.uri.path;
    const debugConfigs = JSON.parse(fs.readFileSync(`${workspaceFolderPath}/.vscode/launch.json`, 'utf8'));
    const debugWatchConfig = JSON.parse(fs.readFileSync(`${workspaceFolderPath}/.vscode/debug-watch.json`, 'utf8'));
    const debugConfig = debugConfigs.configurations.find((dc : any) => dc.name === debugWatchConfig.debugTask);

    debugWatchConfig.watchFolders.map((watchFolder : any) => {
        fs.watch(`${workspaceFolderPath}/${watchFolder}`, {recursive: true}, () => {
            setTimeout(() => !isEnabled || vscode.debug.startDebugging(workspaceFolder, debugConfig), debugWatchConfig.delay);
        });
    });
    let disposable = vscode.commands.registerCommand('extension.debug.watch', () => {
        isEnabled = !isEnabled;
        if(isEnabled) {
            vscode.window.showInformationMessage('Debug watch enabled');
            vscode.debug.startDebugging(workspaceFolder, debugConfig);
        } else {
            vscode.window.showInformationMessage('Debug watch disabled');
        }
    });

    context.subscriptions.push(disposable);
}
export function deactivate() {
}
