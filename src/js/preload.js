const {contextBridge, ipcRenderer} = require("electron")

contextBridge.exposeInMainWorld('sessionUtils', {
    getSessionData: (event, data) => {
        ipcRenderer.send(event, data)
    },

    receiveSessionData: (event, func) => {
        ipcRenderer.on("receive-session-token", (event, ...args) => func(...args))
    }
})