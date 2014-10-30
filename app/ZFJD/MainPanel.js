/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('ZFJD.MainPanel', {
    extend: 'Ext.app.Application',
    name: "ZFJD_MainPanel",
    myContainer: Ext.create('ZFJD.view.MainView'),

    appFolder: 'app/ZFJD',

    controllers: ['ZFJD.controller.MainFrame', 'ZFJD.controller.YCJDController', 'ZFJD.controller.RCCCController',
        'ZFJD.controller.JDKPController', 'ZFJD.controller.RCCCBaseInfoController', 'ZFJD.controller.RCCCPjdfController'],

    launch: function () {


    },

    switchTo: function () {
        //L(this.appFolder);
        Ext.util.CSS.swapStyleSheet('CurCss', this.appFolder + "/resource/css/MainView.css");
        Ext.util.CSS.refreshCache();
    },

    getPanel: function () {
        //this.myContainer = Ext.create('ZFJD.view.MainView');
        return this.myContainer;
    },

    delPanel: function(){
        this.myContainer = null;
    }
});