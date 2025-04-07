// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  getAppPath: () => ipcRenderer.invoke('get-app-path'),
});
