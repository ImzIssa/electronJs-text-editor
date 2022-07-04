const { app, BrowserWindow, ipcMain, nativeTheme, dialog, Menu } = require('electron')
const path = require('path')
const fs = require('fs')

/*
TO DO: 
implement darkmode
implement save and save as 

*/


let currFilePath

function createAboutModal(){
  const modal = new BrowserWindow({
    width: 400,
    height: 200,
    backgroundColor: '#2e2c29',
    title: 'Text Editor',
    modal: true,
    show: true,
    alwaysOnTop: true
  })
  modal.loadFile('./about.html')
}

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    backgroundColor: '#2e2c29',
    title: 'Text Editor',
  })

  const menu = Menu.buildFromTemplate([
    {
      label: '&File',
      submenu: [
        {label: 'New File',  accelerator: 'Ctrl+N'},
        {label: 'Open File', accelerator: 'Ctrl+O'},
        {label: 'Open Recent'},
        {label: 'Save', accelerator: 'Ctrl+S'},
        {label: 'Save As..', accelerator: 'Ctrl+Shift+S'},
        {type: 'separator'},
        {role: 'quit'}
      ]
    },
    {
      label: '&Edit',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'delete'},
        {type: 'separator'},
        {role: 'selectAll'}
      ]
    },
    {
      label: '&View',
      submenu: [
        {role: 'zoomIn'},
        {role: 'zoomOut'},
        {role: 'resetZoom'},
        {type: 'separator'},
        {role: 'togglefullscreen'}
      ]
    },
    {
      label: '&Tools',
      submenu:[
        {role: 'minimize'},
        {role: 'zoom'}
      ]
    },
    {
      label: '&About',
      submenu:[
        {role: 'about'},
        {
          label: 'About',
          click: ()=> {
            createAboutModal()
          }
        }
      ]
    }
  ])

  Menu.setApplicationMenu(menu)
  win.loadFile('./index.html')
}

app.whenReady().then(() => {
  createWindow()
  console.log('displayed')

  ipcMain.handle('dialog:saveFile', (event, text) => {
    console.log(`currFilePath: ${currFilePath}`)
    if(currFilePath){
      fs.writeFileSync(currFilePath, text, 'utf-8')
    } else{
      currFilePath = dialog.showSaveDialogSync({title:"Save File", defaultPath:"Tester.txt"})
      if (currFilePath){
        fs.writeFileSync(currFilePath, text, 'utf-8')
        const fname = path.basename(currFilePath)
        console.log(`BaseDir: ${fname}`)
        return fname
      }
    }
  })

  ipcMain.handle('dialog:openFile', () => {
    const filePaths = dialog.showOpenDialogSync({properties: ['openFile']})
    console.log(filePaths[0])
    currFilePath = filePaths[0]
    return {
      'name': path.basename(filePaths[0]),
      'data': fs.readFileSync(filePaths[0], 'utf-8')
    }
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function writeToFile(text){
  fs.writeFile(currFilePath, text, 'utf-8', (error)=>{
    if(error) {
      console.log(`Error Writing To File\n ${error}`)
      return
    }
    console.log(`BaseDir: ${path.basename(currFilePath)}`)
    return path.basename(currFilePath)
  })
}