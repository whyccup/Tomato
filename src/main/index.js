'use strict'

import { app, BrowserWindow, ipcMain, Tray, Menu } from 'electron'
// 引入node api
const path = require('path')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let tray = null
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  // 安装vue-devtools 只用执行一次就好 不是程序代码
  // BrowserWindow.addDevToolsExtension('/home/whyccup/.config/google-chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/3.1.4_0')
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 230,
    width: 280,
    minHeight: 230,
    minWidth: 280,
    // 总在屏幕最上方 linux无效
    // alwaysOnTop: true,
    // 是否使用web网页的size
    useContentSize: true,
    // 是否允许用户改变窗口size
    resizable: false,
    show: false,
    // 设置窗口图标
    icon: path.join(__static, '/OT.png'),
    // 无边框
    frame: false,
    // 不能最大化
    maximizable: false
  })

  mainWindow.loadURL(winURL)

  // 优雅的显示，当页面完成加载时显示窗口
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 定位让窗口生成在固定位置
  const Positioner = require('electron-positioner')
  const positioner = new Positioner(mainWindow)
  // Moves the window top right on the screen.
  positioner.move('topLeft', 'trayBottomCenter')
  // Returns `{x,y}`
  // positioner.calculate('trayCenter', trayBounds)
  // Note, `trayBounds` is only required with the positions that starts with `tray`.

  // 让程序显示在托盘栏
  tray = new Tray(path.join(__static, '/MB.png'))
  // 制作托盘图标的菜单
  const contextMenu = Menu.buildFromTemplate([
    {label: '退出程序', type: 'normal', role: 'quit'},
    {label: '关闭当前窗口', type: 'normal', role: 'close'},
    // 这个下面要有子菜单
    {
      label: '夫级菜单',
      role: 'help',
      submenu: [
        {role: 'windowMenu'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall', enabled: 'false'},
        {
          label: '二级父菜单',
          submenu: [
            {role: 'reload'},
            {role: 'forcereload'},
            {role: 'toggledevtools'},
            {type: 'separator'},
            {role: 'resetzoom'},
            {role: 'zoomin'},
            {role: 'zoomout'},
            {type: 'separator'},
            {role: 'togglefullscreen'}
          ]
        }
      ]
    },
    {label: '开发者模式', type: 'normal', role: 'toggledevtools'},
    {label: '菜单5', type: 'radio'}
  ])
  // 托盘栏icon使用菜单
  tray.setContextMenu(contextMenu)
  tray.setToolTip('This is my application.')
  // 给托盘栏icon绑定事件
  tray.on('click', () => {
    if (mainWindow.isVisible() === true) {
      mainWindow.hide()
    } else {
      mainWindow.show()
    }
  })
}

// 给app绑定事件
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

// 与渲染进程通讯
ipcMain.on('changeSize', (event, arg) => {
  let winSize = mainWindow.getSize()
  mainWindow.setSize(winSize[0], winSize[1] + arg)
})

ipcMain.on('reSize', (event, arg) => {
  let winSize = mainWindow.getSize()
  mainWindow.setSize(winSize[0], arg)
})
