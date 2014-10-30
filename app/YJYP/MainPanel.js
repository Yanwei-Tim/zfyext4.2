/**
 * Created by qinwen on 14-2-13.
 */
Ext.define('YJYP.MainPanel', {
    extend: 'Ext.app.Application',
    name: "YJYP_MainPanel",
    myContainer: Ext.create('YJYP.view.MainView'),
    appFolder : 'app/YJYP',
    controllers: ['YJYP.controller.MainFrame','YJYP.controller.WindowController'],
    launch: function() {
    },
    switchTo: function(){
        //L(this.appFolder);
    	Ext.util.CSS.swapStyleSheet('CurCss', this.appFolder + "/resource/css/MainView.css");
        Ext.util.CSS.refreshCache();
    },
    getPanel: function(){
        //this.myContainer = Ext.create('YJYP.view.MainView');
    	return this.myContainer;
    }
});