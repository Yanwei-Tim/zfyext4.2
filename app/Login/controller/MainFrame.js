/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('Login.controller.MainFrame', {
    extend: 'Ext.app.Controller',
    pages: {},
    loginCallback: null,

    init: function() {
        this.control({
            "#Login_SubmitField":{
                'click': this.onLogin
            },
            '#Login_username':{
                keyup: this.onTextFiledEnter
            },

            '#Login_password':{
                keyup: this.onTextFiledEnter
            }
        });
    },

    onTextFiledEnter: function(obj, e, eOpts){
        if(e.getKey() != Ext.EventObject.ENTER)
            return;

        this.onLogin(Ext.getCmp('Login_SubmitField'));
    },

    onLogin: function(obj){
        var self = this;
        var form = obj.up('form').getForm();
        var msgField = Ext.getCmp('Login_LabelField');

        var usernameObj = Ext.getCmp('Login_username');
        var passwordObj = Ext.getCmp('Login_password');
        if(0 == usernameObj.getValue().length){
            msgField.setText("用户名不能为空");
            usernameObj.focus();
            msgField.show();
            return;
        }
        if(0 == passwordObj.getValue().length){
            msgField.setText("密码不能为空");
            passwordObj.focus();
            msgField.show();
            return;
        }

        msgField.setText("正在登录...");
        msgField.show();

        Ext.Ajax.request({
            url:'/gmvcs/rest/login_handle/login',
            method: 'POST',
            jsonData:form.getValues(),
            callback: function (options, success, response) {
                var jsonResult = Ext.JSON.decode(response.responseText);
                if(false == jsonResult.ret){
                    msgField.setText(jsonResult.msg);
                    return;
                }

                Ext.LoginInfo = {
                    info:{
                        username: jsonResult.body.user_name,
                        org_name: jsonResult.body.dep_name,
                        org_id: jsonResult.body.dep_code,
                        role_name: jsonResult.body.role_name,
                        role_sid: jsonResult.body.role_sid,
                        user_id: jsonResult.body.user_id,
                        priviledgeTable: jsonResult.body.priviledgeTable,
                        priviledges: jsonResult.body.priviledges
                    }
                };

                L(Ext.LoginInfo);

                // 记录日志
                /*if(Ext.LoginInfo.info.role_sid == "1111-1111-1111-1111-1111")
                    Ext.create('Share.view.LogHandle').LogHandle(2, "305", "", "用户登录");
                else
                    Ext.create('Share.view.LogHandle').LogHandle(1, "206", "", "用户登录");*/

                msgField.hide();
                self.loginCallback();
            }
        });
    }
});