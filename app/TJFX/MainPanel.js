/**
 * Created by hcxowe on 14-2-12..
 */
Ext.define('TJFX.MainPanel', {
    extend: 'Ext.app.Application',
    name: "TJFX_MainPanel",
    myContainer: Ext.create('TJFX.view.MainView'),

    appFolder : 'app/TJFX',

    controllers: ['TJFX.controller.MainFrame', 'TJFX.controller.TJSJController', 'TJFX.controller.QSTController', 'TJFX.controller.QSDBTController'],

    launch: function() {
    },

    switchTo: function(){
        //L(this.appFolder);
        Ext.util.CSS.swapStyleSheet('CurCss', this.appFolder + "/resource/css/MainView.css");
        Ext.util.CSS.refreshCache();
    },

    getPanel: function(){
        //this.myContainer = Ext.create('TJFX.view.MainView');
        return this.myContainer;
    }
});