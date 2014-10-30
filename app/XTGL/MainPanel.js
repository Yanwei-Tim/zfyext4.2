/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('XTGL.MainPanel', {
    extend: 'Ext.app.Application',
    name: "XTGL_MainPanel",
    myContainer: Ext.create('XTGL.view.MainView'),

    appFolder: 'app/XTGL',

    controllers: ['XTGL.controller.MainFrame', 'XTGL.controller.YHGLController', 'XTGL.controller.ZFJLYGLController',
        'XTGL.controller.CJGZZGLController','XTGL.controller.ZXWJGLController','XTGL.controller.CJGZZGLController',
        'XTGL.controller.BMGLController', 'XTGL.controller.JSGLController'],


    launch: function () {
    },

    switchTo: function () {
        //L(this.appFolder);
        Ext.util.CSS.swapStyleSheet('CurCss', this.appFolder + "/resource/css/MainView.css");
        Ext.util.CSS.refreshCache();
    },

    getPanel: function () {
        //this.myContainer = Ext.create('XTGL.view.MainView');
        return this.myContainer;
    }
});
