const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronApi', {
  saveFile: (fileName) => ipcRenderer.invoke('dialog:saveFile', fileName),
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})
