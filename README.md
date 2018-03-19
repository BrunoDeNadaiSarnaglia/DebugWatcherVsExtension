# Livereload Debugger README

This extensions aims to restart debugger by listening to changes in some directory. This is especially helpful when your code flow already includes some kind of livereload behavior, for instance nodemon

## Requirements

You must have at least one debugger already configured inside ${workspace}/.vscode/launch.json

## How to use

Inside ${workspace}/.vscode/debug-watch.json must be a json containing the following configuration

```js
{
    "debugTask": "Extension", // Name of the debugger you want to launch, this field should match with launch.json
    "watchFolders": [ // Path containing the folders it will listen for changes
        "src"
    ],
    "delay": 1000 // Delay to launch the debugger after the change event was triggered
},
```

## Compile

```js
npm run compile
```

## Install locally in ~/.vscode/extensions

```js
npm run install-local
```
