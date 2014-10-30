Ext.define('Main.view.MainUpdatePwdView', {
    extend: 'Share.view.PopupWindow',
    width: 370,
    height: 250,
    resizable: false,
    defaults: {
        border: false
    },
    layout: "fit",
    cls: 'main_updatepwd_window',
    items: [
        {
            xtype: 'form',
            id: 'main_updatepwd_form',
            margin: "20 20 0 20",
            layout: "border",
            defaults: {
                border: false,
                xtype: "textfield",
                width: 350,
                allowBlank: false
            },
            items: [
                {
                    region: 'north',
                    xtype: 'panel',
                    border: false,
                    width: 320,
                    height: 50,
                    html:'<div style="line-height: 50px">提示：请输入旧密码与新密码，点击【保存】修改密码</div>'
                },
                {
                    region: 'center',
                    layout: 'vbox',
                    xtype: 'panel',
                    cls: 'update_pwd_center',
                    defaults: {
                        border: false,
                        xtype: "textfield",
                        labelWidth: 80
                    },
                    width: 350,
                    items:[
                        {
                            name: 'oldpwd',
                            id: 'oldpwd',
                            fieldLabel: '旧密码',
                            allowBlank: false,
                            inputType: 'password',
                            validator: function(value){
                                if(value==null||value==''){
                                    return true;
                                }
                                var reg = /(^[A-Za-z0-9]+$)/;
                                if(value.match(reg)==null){
                                    return '密码由数字、字母组成';
                                }else{
                                    return true;
                                }
                            },
                            listeners:{
                                change:function (field) {
                                    var $ = function(id){
                                        return document.getElementById(id);
                                    }
                                    $(field.getId()+"-inputEl").setAttribute("maxLength",20);
                                }
                            }
                        },
                        {
                            name: 'newpwd',
                            id: 'newpwd',
                            fieldLabel: '新密码',
                            allowBlank: false,
                            inputType: 'password',
                            validator: function(value){
                                if(value==null||value==''){
                                    return true;
                                }
                                var reg = /(^[A-Za-z0-9]+$)/;
                                if(value.match(reg)==null){
                                    return '密码由数字、字母组成';
                                }else{
                                    return true;
                                }
                            },
                            listeners:{
                                change:function (field) {
                                    var $ = function(id){
                                        return document.getElementById(id);
                                    }
                                    $(field.getId()+"-inputEl").setAttribute("maxLength",20);
                                }
                            }

                        },
                        {
                            name: 'newpwd2',
                            id: 'newpwd2',
                            fieldLabel: '密码确认',
                            allowBlank: false,
                            inputType: 'password',
                            validator: function(value){
                                if(value==null||value==''){
                                    return true;
                                }
                                var reg = /(^[A-Za-z0-9]+$)/;
                                if(value.match(reg)==null){
                                    return '密码由数字、字母组成';
                                }else{
                                    return true;
                                }
                            },
                            listeners:{
                                change:function (field) {
                                    var $ = function(id){
                                        return document.getElementById(id);
                                    }
                                    $(field.getId()+"-inputEl").setAttribute("maxLength",20);
                                }
                            }

                        }
                    ]
                }

            ],
            buttons: ['->', {
                id: 'main_updatepwdsave_btn',
                text: '保存'
            }]

        }
    ]

});


