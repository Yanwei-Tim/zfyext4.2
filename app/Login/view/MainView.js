/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('Login.view.MainView', {
    extend: 'Ext.container.Container',
    cls: "Login_MainView",
    bodyBorder: false,
    items: [
        {
            xtype:"form",
            border: false,
            cls: "Login_Pic",
            width: 1000,
            height: 528,
            layout:"absolute",
            items:[
                {
                    xtype: "textfield",
                    name: "user_id",
                    cls: "Login_TextField",
                    id: "Login_username",
                    enableKeyEvents: true,
                    value: "",
                    border: false,
                    x:252,
                    y:394,
                    width: 148,
                    height: 24
                },
                {
                    xtype: "textfield",
                    name: "pwd",
                    inputType: 'password',
                    cls: "Login_TextField",
                    id: "Login_password",
                    enableKeyEvents: true,
                    value: "",
                    border: false,
                    x:467,
                    y:394,
                    width: 148,
                    height: 24
                },
                {
                    xtype: "button",
                    cls: "Login_SubmitField",
                    id: "Login_SubmitField",
                    border: false,
                    x:648,
                    y:392,
                    width: 74,
                    height: 28
                },
                {
                    xtype: "label",
                    cls: "Login_LabelField",
                    id: "Login_LabelField",
                    text: "登录账号/密码错误",
                    hidden: true,
                    x:748,
                    y:392,
                    width: 374,
                    height: 28
                },
                {
                    xtype: "label",
                    style: "text-align: center; color:rgb(33,109,159);font-size: 18px;",
                    text: "公安部交通管理科学研究所研制",
                    x:0,
                    y: 500,
                    width: 910,
                    height: 40
                }
            ]
        }
    ]
});