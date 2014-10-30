/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('Login.MainPanel', {
    extend: 'Ext.app.Application',
    name: "Login_MainPanel",
    myContainer: Ext.create('Login.view.MainView'),
    appFolder : 'app/Login',
    callback: null,

    controllers: ['Login.controller.MainFrame'],

    launch: function() {
    },

    switchTo: function(){
    	Ext.util.CSS.swapStyleSheet('Base', this.appFolder + "/resource/css/MainView.css");
        Ext.util.CSS.refreshCache();

        controller = this.getController('Login.controller.MainFrame');
        controller.loginCallback = this.callback;
    },

    getPanel: function(){
    	return this.myContainer;
    }
});