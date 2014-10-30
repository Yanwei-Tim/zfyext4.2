/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('Main.MainPanel', {
    extend: 'Ext.app.Application',
    name: "Main_MainPanel",
    myContainer: Ext.create('Main.view.MainView'),
    appFolder : 'app/Main',

    controllers: ['Main.controller.MainFrame'],

    launch: function() {
    },

    switchTo: function(){
    	Ext.util.CSS.swapStyleSheet('Base', this.appFolder + "/resource/css/MainView.css");
        Ext.util.CSS.refreshCache();
    },

    getPanel: function(){
    	return this.myContainer;
    }
});