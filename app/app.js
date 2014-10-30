/**
 * Created by yongzhi.zhan on 14-2-10.
 */
Ext.Loader.setConfig({
    enabled: true,
    paths: {				//'类名前缀':'对应路径'
        'Main': 'app/Main',
        'Share': 'app/Share',
        'ZFJD': 'app/ZFJD',
        'YJYP': 'app/YJYP',
        'TJFX': 'app/TJFX',
        'MJWQ': 'app/MJWQ',
        'RZSJ': 'app/RZSJ',
        'XTGL': 'app/XTGL',
        'Login': 'app/Login',
        'FXCLR': 'app/FXCLR',
        'XXBZ': 'app/XXBZ',
        'ZFHC': 'app/ZFHC'
    }
});

Ext.application({
    name: 'Application',
    appFolder: 'app',
    viewPort: null,
    debug: false,

    //加载主入口模块
    launch: function () {
        var self = this;
        this.viewPort = Ext.create('Ext.container.Viewport', {
            minWidth: 1152,
            cls: "a800",
            layout: 'fit'
        });
        if (this.debug) {
            self.onLoginSuccess();
        } else {
            self.checkLogin();
        }
    },

    startLoginForm: function () {
        var self = this;
        var Login = Ext.create('Login.MainPanel');
        Login.callback = function () {
            self.onLoginSuccess();
        }

        Login.switchTo();
        var LoginPanel = Login.getPanel();
        this.viewPort.add(LoginPanel);
    },

    checkLogin: function () {
        var self = this;
        Ext.Ajax.request({
            url: '/gmvcs/rest/login_handle/checklogin',
            method: 'GET',
            callback: function (options, success, response) {
                var jsonResult = Ext.JSON.decode(response.responseText);
                L(response.responseText);
                if (false == jsonResult.ret) {
                    self.startLoginForm();
                    return;
                }

                Ext.LoginInfo = {
                    info: {
                        username: jsonResult.user_name,
                        org_name: jsonResult.dep_name,
                        org_id: jsonResult.dep_code,
                        role_name: jsonResult.role_name,
                        role_sid: jsonResult.role_sid,
                        user_id: jsonResult.user_id,
                        priviledgeTable: jsonResult.priviledgeTable,
                        priviledges: jsonResult.priviledges
                    }
                };
                self.onLoginSuccess();
            }
        });
    },

    onLoginSuccess: function () {
        this.viewPort.removeAll();
        var Main = Ext.create('Main.MainPanel');
        var MainPanel = Main.getPanel();
        Main.switchTo();
        this.viewPort.add(MainPanel);
    }
});