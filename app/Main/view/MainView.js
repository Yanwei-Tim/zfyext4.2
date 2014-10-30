/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('Main.view.MainView', {
    extend: 'Ext.container.Container',
    layout: 'border',
    id:'MainView',
    bodyBorder: false,

    defaults: {
        collapsible: false,
        split: false,
        bodyPadding: 0,
        border:0
    },
    items: [{
        region: 'north',
        cls: "banner",
        height: 62,
        items: [{
            cls: "logo",
            xtype: "panel",
            border: 0,
            height: 60,
            layout: "fit",
            items:[{
                xtype: "container",
                width: 475,
                align: "right",
                region:'east',
                layout: {
                    type: 'hbox',
                    pack: 'end',
                    align: 'middle'             //对齐方式 center、left、right：居中、左对齐、右对齐；stretch：延伸；stretchmax：以最大的元素为标准延伸
                },
                items:[{
                    xtype: "label",
                    cls: "loginInfo",
                    id: "MainLoginInfo",
                    width: 400,
                    text: "当前用户:支队领导|单位:苏州市交巡警支队|角色:支队领导"
                },{
                    xtype: "button",
                    cls: "main_UpdatePwd",
                    id: "main_UpdatePwd",
                    border:0,
                    width: 92,
                    height: 34,
                    margin: "0 0 0 10",
                    text: ""
                },{
                    xtype: "button",
                    cls: "main_Logout",
                    id: "main_Logout",
                    border:0,
                    width: 66,
                    height: 34,
                    margin: "0 10 0 10",
                    text: ""
                }]
            }]
        }]
    },{
        cls: "menu",
        id: "main_menu",
        region:'west',
        width: 168,
        layout: "vbox",
        defaults: {
          border:0,
          width: 150,
          height: 52,
          margin: '8 8 4 8',
          toggleGroup: "menu_btn",
          allowDepress: false
        },
        items:[
            {
                cls: "main_switch_btn",
                id: "main_switch_zfjd_btn",
                text: "",
                xtype: "button",
                hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_ZFJD - 1) != 1)
            },{
                cls: "main_switch_btn",
                id: "main_switch_yjyp_btn",
                text: "",
                xtype: "button",
                hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_YJYP - 1) != 1)
            },{
                cls: "main_switch_btn",
                id: "main_switch_tjfx_btn",
                text: "",
                xtype: "button",
                hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_TJFX - 1) != 1)
            },{
                cls: "main_switch_btn",
                id: "main_switch_mjwq_btn",
                text: "",
                xtype: "button",
                hidden: true
            },
            {
                cls: "main_switch_btn",
                id: "main_switch_rzsj_btn",
                text: "",
                xtype: "button",
                hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_RZSJ - 1) != 1)
            },
            {
                cls: "main_switch_btn",
                id: "main_switch_xtgl_btn",
                text: "",
                xtype: "button",
                hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_XTGL - 1) != 1)
            }/*,
            {
                cls: "main_switch_btn",
                id: "main_switch_fxclr_btn",
                text: "",
                xtype: "button"
                //hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_XTGL - 1) != 1)
            },
            {
                cls: "main_switch_btn",
                id: "main_switch_zfhc_btn",
                xtype: "button"*//*,
                hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_XTGL - 1) != 1)*//*
            },
            {
                cls: "main_switch_btn",
                id: "main_switch_xxbz_btn",
                xtype: "button"*//*,
                hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_XTGL - 1) != 1)*//*
            }*/
        ]
    },{
        region: 'center',
        xtype: "panel",
        layout: 'fit',
        id: "center"


    }]
});

/*
0000000000000000001000000000000000000000000000000100000000010000000001111111
0000000000000000001000000000000000000000000000000100000000010000000001111111*/
