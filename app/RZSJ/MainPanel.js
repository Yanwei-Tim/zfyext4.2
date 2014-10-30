/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('RZSJ.MainPanel', {
    extend: 'Ext.app.Application',
    name: "RZSJ_MainPanel",
    myContainer: Ext.create('RZSJ.view.MainView'),

    appFolder : 'app/RZSJ',

    controllers: ['RZSJ.controller.MainFrame','RZSJ.controller.YHRZController','RZSJ.controller.GLRZController','RZSJ.controller.WSDeviceController','RZSJ.controller.WSUserController'],

    launch: function() {
    },

    switchTo: function(){
        //L(this.appFolder);
        Ext.util.CSS.swapStyleSheet('CurCss', this.appFolder + "/resource/css/MainView.css");
        Ext.util.CSS.refreshCache();
    },

    getPanel: function(){
       // this.myContainer = Ext.create('RZSJ.view.MainView');
        return this.myContainer;
    }
});
