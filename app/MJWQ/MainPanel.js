/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('MJWQ.MainPanel', {
    extend: 'Ext.app.Application',
    name: "MJWQ_MainPanel",
    myContainer: Ext.create('MJWQ.view.MainView'),

    appFolder : 'app/MJWQ',

    controllers: ['MJWQ.controller.MainFrame','MJWQ.controller.RCCCController',
        'MJWQ.controller.RCCCBaseInfoController','MJWQ.controller.RCCCPjdfController'/*,'MJWQ.controller.TESTController'*/],

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