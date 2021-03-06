//const {app , BrowserWindow} = require('electron');
import {app , BrowserWindow} from 'electron';
//const url = require('url');
import url from 'url';
//const path = require('path');
import path from 'path';

import electronReload from 'electron-reload';
electronReload(__dirname);

import Devtron from 'devtron';

import windowStateKeeper from 'electron-window-state';

app.on('ready', () => {
    Devtron.install();

    let mainWindowState = windowStateKeeper({
        defaultWidth : 1200,
        defaultHeight : 600
    });

    //let mainWin = new BrowserWindow({width:800,height:600,show : false});
    let mainWin = new BrowserWindow({
        width:mainWindowState.width,
        height:mainWindowState.height,
        x:mainWindowState.x,
        y:mainWindowState.y,
        show:false,
        //backgroundColor : '#27ae60'
    });

    mainWindowState.manage(mainWin);

    let splashScreen = new BrowserWindow({
        width:500,
        height:500,
        backgroundColor : '#d35400',
        //parent: mainWin,
        //transparent:true,
        frame: false
    });

    mainWin.on('closed',()=>{
        app.quit();
        mainWin =null;

    });
    mainWin.on('closed',()=>{
        splashScreen = null;
    });


    mainWin.on('ready-to-show',()=>{
        mainWin.show();
        splashScreen.close();
    });
   /* mainWin.loadURL(url.format({
        pathname : path.join(__dirname,'index.html'),
        protocol : 'file'
    }));*/
    //mainWin.loadURL('https://gosafir.com');
    mainWin.loadURL(`file://${__dirname}/index.html`);
    splashScreen.loadURL(`file://${__dirname}/splashScreen.html`);
    /*mainWin.once('ready-to-show',()=>{
        mainWin.show();
    })*/
    /*childwin.on('blur',()=>{
        console.log("blur");
    })*/


    let mainContent = mainWin.webContents;
    mainContent.on('did-finish-load',()=>{
        console.log('finish load');
    });
    mainContent.on('did-start-loading',()=>{
        console.log('start load');
    });
    mainContent.on('dom-ready',()=>{
        console.log('dom ready');
    });
    mainContent.on('new-window',(event,url)=>{
        event.preventDefault();
       let win = new BrowserWindow({width:1000,height:1000});
       win.once('ready-to-show',()=>win.show());
       win.loadURL(url);
       event.newGuest = win;
    });
    mainContent.on('will-navigate',(event,url)=>{
        console.log('will navigate');
    });
    mainContent.on('did-navigate',(event,url)=>{
        console.log('did navigate');
    });
});