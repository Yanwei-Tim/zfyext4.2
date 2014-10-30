/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('FXCLR.MainPanel', {
    extend: 'Ext.app.Application',
    name: "FXCLR_MainPanel",
    myContainer: Ext.create('FXCLR.view.MainView'),

    appFolder : 'app/FXCLR',

    controllers: ['FXCLR.controller.MainFrame','FXCLR.controller.YHRZController'],

    launch: function() {
    },

    switchTo: function(){
        //L(this.appFolder);
        Ext.util.CSS.swapStyleSheet('CurCss', this.appFolder + "/resource/css/MainView.css");
        Ext.util.CSS.refreshCache();
    },

    getPanel: function(){
        return this.myContainer;
    }
});
