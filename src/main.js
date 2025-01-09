const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require("fs")
const path = require("path")

// App config
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            devTools: false,
            preload: path.join(__dirname, 'js/preload.js')
        }
    })
    // window setup
    win.loadURL("http://localhost:8000")
}

// IPC
ipcMain.on('get-session-token', (event, session_file) => {
    try {
        const session_data = fs.readFileSync(path.join(__dirname, session_file), { encoding: 'utf8', flag: 'r' })
        event.reply("receive-session-token", session_data)
    } catch (error) {
        console.log("error reading session file!")
    }
})

// Start Application
app.whenReady().then(() => {
    createWindow()
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