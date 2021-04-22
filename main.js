
const {app,BrowserWindow,} = require('electron');

function createWindow()
{
    const win = new BrowserWindow({
        height:800,
        width:1200,
        webPreferences:{
            nodeIntegration:true
        },
        icon:'assets/img/Icon.jpg'
    });

    win.loadFile("index.html");
    win.setMenu(null);
}

app.whenReady().then(createWindow);
