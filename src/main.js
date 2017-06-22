const { app } = require('electron');
const PlayerWindow = require('./window/controller/player');

class ElectronXiami {

    // constructor.
    constructor() {
        this.playerWindow = null;
        this.tray = null;
    }

    // init method, the entry point of the app.
    init() {
        if (this.isRunning()) {
            app.quit();
        } else {
            this.initApp();
        }
    }

    // check if the app is already running. return true if already launched, otherwise return false.
    isRunning() {
        return app.makeSingleInstance(() => {
            if (this.playerWindow) this.playerWindow.show();
        });
    }

    // init the main app.
    initApp() {
        // This method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // Some APIs can only be used after this event occurs.
        app.on('ready', () => {
            this.createPlayerWindow();
        });

        // Quit when all windows are closed.
        app.on('window-all-closed', () => {
            // On OS X it is common for applications and their menu bar
            // to stay active until the user quits explicitly with Cmd + Q
            if (process.platform !== 'darwin') {
                app.quit()
            }
        });

        app.on('activate', () => {
            // On OS X it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (this.playerWindow === null) {
                this.createPlayerWindow();
            } else {
                this.playerWindow.show();
            }
        });
    }

    createPlayerWindow() {
        this.playerWindow = new PlayerWindow();
    }
}

new ElectronXiami().init();