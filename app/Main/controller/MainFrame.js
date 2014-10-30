/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('Main.controller.MainFrame', {
    extend: 'Ext.app.Controller',
    pages: {},
    updatePwdWindow: Ext.create('Main.view.MainUpdatePwdView'),

    init: function() {
        this.control({
            '#main_switch_zfjd_btn': {
                toggle: this.onBtnToggle("ZFJD.MainPanel")
            },
            '#main_switch_qwgl_btn': {
                toggle: this.onBtnToggle("QWGL.MainPanel")
            },
            '#main_switch_yjyp_btn': {
                toggle: this.onBtnToggle("YJYP.MainPanel")
            },
            '#main_switch_mjwq_btn': {
                toggle: this.onBtnToggle("MJWQ.MainPanel")
            },
            '#main_switch_rzsj_btn': {
                toggle: this.onBtnToggle("RZSJ.MainPanel")
            },
            '#main_switch_xtgl_btn': {
                toggle: this.onBtnToggle("XTGL.MainPanel")
            },
            '#main_switch_tjfx_btn': {
                toggle: this.onBtnToggle("TJFX.MainPanel")
            },
            '#main_UpdatePwd': {
                click: this.onUpdatePwdShow
            },
            '#main_updatepwdsave_btn': {
                click: this.onUpdatePwd
            },
            '#main_Logout': {
                click: this.onLogout
            },
            '#main_menu':{
                boxready: this.onInitMainView
            },
            '#main_switch_xxbz_btn': {
                toggle: this.onBtnToggle("XXBZ.MainPanel")
            },
            '#main_switch_zfhc_btn': {
                toggle: this.onBtnToggle("ZFHC.MainPanel")
            },
            '#main_switch_fxclr_btn': {
                toggle: this.onBtnToggle("FXCLR.MainPanel")
            }
        });
    },

    onUpdatePwdShow: function(obj){

        var form = this.updatePwdWindow.down("form").getForm();
        form.reset();
        this.updatePwdWindow.setTitle('修改密码');
        this.updatePwdWindow.show();
    },

    onUpdatePwd: function(obj){
        var self = this;
        var tempForm = Ext.getCmp('main_updatepwd_form').getForm();

        var validateForm = Ext.getCmp("main_updatepwd_form").getValues();
        var validateData = {};
        validateData.oldpwd = validateForm.oldpwd;
        validateData.newpwd = validateForm.newpwd;
        validateData.newpwd2 = validateForm.newpwd2;
        if(undefined == validateData.oldpwd || null == validateData.oldpwd || "" == validateData.oldpwd){
            Ext.Msg.alert('提示信息', '旧密码不能为空，请输入旧密码！',function(){
                Ext.getCmp('oldpwd').focus(false, 100);
            });
            return;
        }
        if(undefined == validateData.newpwd || null == validateData.newpwd || "" == validateData.newpwd){
            Ext.Msg.alert('提示信息', '新密码不能为空，请输入新密码！',function(){
                Ext.getCmp('newpwd').focus(false, 100);
            });
            return;
        }
        if(undefined == validateData.newpwd2 || null == validateData.newpwd2 || "" == validateData.newpwd2){
            Ext.Msg.alert('提示信息', '确认密码不能为空，请输入确认密码！',function(){
                Ext.getCmp('newpwd2').focus(false, 100);
            });
            return;
        }

        var pData = {};
        if (tempForm.isValid()) {
            var getForm = Ext.getCmp("main_updatepwd_form").getValues();
            pData.police_id = Ext.LoginInfo.info.user_id;
            pData.oldpwd = getForm.oldpwd;
            pData.newpwd = getForm.newpwd;
            pData.newpwd2 = getForm.newpwd2;
        }
        if(pData.newpwd != pData.newpwd2){
            Ext.Msg.alert('提示信息', '您输入两次新密码不一致，请重新输入！');
            return;
        }

        Ext.Ajax.request({
            url:'/gmvcs/rest/login_handle/updatePwd',
            method: 'POST',
            jsonData: pData,
            callback: function (options, success, response) {
                var jsonResult = Ext.JSON.decode(response.responseText);L(jsonResult)
                if(false == jsonResult.ret){
                    if("oldpwderror" == jsonResult.msg){
                        Ext.MessageBox.alert("提示信息", "修改密码失败，旧密码输入错误");
                        return;
                    }
                    Ext.MessageBox.alert("提示信息", "修改密码失败，请重试");
                    return;
                }

                // 记录日志
                /*if(Ext.LoginInfo.info.role_sid == "1111-1111-1111-1111-1111")
                    Ext.create('Share.view.LogHandle').LogHandle(2, "310", "", "修改密码");
                else
                    Ext.create('Share.view.LogHandle').LogHandle(1, "208", "", "修改密码");*/

                self.updatePwdWindow.hide();
                Ext.MessageBox.alert("提示信息", "修改密码成功");
            }
        });
    },

    onLogout: function(obj){
        Ext.Ajax.request({
            url:'/gmvcs/rest/login_handle/logout',
            method: 'POST',
            callback: function (options, success, response) {
                var jsonResult = Ext.JSON.decode(response.responseText);
                if(false == jsonResult.success){
                    Ext.MessageBox.alert("提示", "退出系统失败，可能服务器无响应");
                    window.location.reload();
                    return;
                }

                window.location.reload();
            }
        });
    },

    onInitMainView: function(obj, width, height, eOpts){
        if(Ext.LoginInfo == undefined)
            return ;

        Ext.getCmp("MainLoginInfo").setText("当前用户:"
                                                + Ext.LoginInfo.info.username + "|单位:"
                                                + Ext.LoginInfo.info.org_name + "|角色:"
                                                + Ext.LoginInfo.info.role_name);

        //计算显示那个模块
        var obj_default = null;
        if(Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_ZFJD - 1) == 1){
            obj_default = Ext.getCmp("main_switch_zfjd_btn");
        }else if(Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_YJYP - 1) == 1){
            obj_default = Ext.getCmp("main_switch_yjyp_btn");
        }else if(Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_TJFX - 1) == 1){
            obj_default = Ext.getCmp("main_switch_tjfx_btn");
        }else if(Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_RZSJ - 1) == 1){
            obj_default = Ext.getCmp("main_switch_rzsj_btn");
        }else if(Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_XTGL - 1) == 1){
            obj_default = Ext.getCmp("main_switch_xtgl_btn");
        }
        //obj_default = Ext.getCmp("main_switch_xtgl_btn");
        obj_default.toggle(true);
    },

    switchPanel: function(name){
        centerPanel = Ext.getCmp("center");
        centerPanel.removeAll(false);

       if('undefined' == typeof (this.pages[name]))
            this.pages[name] = Ext.create(name);

        this.pages[name].switchTo();
        centerPanel.add(this.pages[name].getPanel());
    },

    onBtnToggle: function(moduleName) {
        var self = this;
        return function(obj, pressed, eOpts){
            L(moduleName);
            if(true == pressed)
                self.switchPanel(moduleName);
        }
    }
});