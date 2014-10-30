/**
 * Created by hcxowe on 14-2-11.
 */
Ext.define('ZFHC.MainPanel', {
    extend: 'Ext.app.Application',
    name: "ZFHC_MainPanel",
    myContainer: Ext.create('ZFHC.view.MainView'),

    appFolder : 'app/ZFHC',

    controllers: ['ZFHC.controller.MainFrame','ZFHC.controller.ZFHCController'],

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
