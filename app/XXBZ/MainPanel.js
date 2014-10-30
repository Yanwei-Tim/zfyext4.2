/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('XXBZ.MainPanel', {
    extend: 'Ext.app.Application',
    name: "XXBZ_MainPanel",
    myContainer: Ext.create('XXBZ.view.MainView'),

    appFolder : 'app/XXBZ',

    controllers: ['XXBZ.controller.MainFrame','XXBZ.controller.XXBZController'],

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
