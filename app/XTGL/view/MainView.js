/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('XTGL.view.MainView', {
    extend: 'Ext.container.Container',
    bodyBorder: false,
    defaults: {
        collapsible: false,
        split: false,
        bodyPadding: 0,
        border:0
    },
    layout: 'border',
    items: [{
        region: 'north',
        cls: "navTitle",
        height: 49,
        type:   'panel',
        id:     'xtgl_mainpanel',
        layout: 'absolute',
        defaults: {
            border:0,
            width:142,
            height: 41,
            allowDepress: false,
            toggleGroup: "xtgl_nav_btn"
        },
        items:[{
            xtype: 'button',
            id: 'xtgl_bmgl_btn',
            cls: 'navBtnSelected',
            hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_XTGL_BMGL - 1) != 1),
           // text: '部门管理',
            x: 11,
            y: 11
        },{
            xtype: 'button',
            id: 'xtgl_yhgl_btn',
            cls: 'navBtnUnSelected',
            hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_XTGL_YHGL - 1) != 1),
          //  text: '用户管理',
            x: 11 + 102 + 1,
            y: 11
        },{
            xtype: 'button',
            id: 'xtgl_zfjlygl_btn',
            cls: 'navBtnUnSelected',
            hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_XTGL_ZFJL - 1) != 1),
         //   text: '执法记录仪管理',
            x: 11 + 102 + 102 + 1,
            y: 11
        },{
            xtype: 'button',
            id: 'xtgl_cjzzzgl_btn',
            cls: 'navBtnUnSelected',
            hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_XTGL_GZZG - 1) != 1),
          //  text: '采集工作站管理',
            x: 11 + 102 + 102 + 142 + 1,
            y: 11
        },{
            xtype: 'button',
            id: 'xtgl_jsgl_btn',
            cls: 'navBtnUnSelected',
            hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_XTGL_JSGL - 1) != 1),
            //text: '角色管理',
            x: 11 + 102 + 102 + 142 + 142 + 1,
            y: 11
        },{
            xtype: 'button',
            id: 'xtgl_zxwjgl_btn',
            cls: 'navBtnUnSelected',
            hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_XTGL_ZXWJ - 1) != 1),
            //  text: '中心文件管理',
            x: 11 + 102 + 102 + 142 + 142 + 102 + 1,
            y: 11
        }
        ]
    },{
        xtype: "panel",
        region: 'center',
        id: 'xtgl_center',
        layout: 'fit'
    }]
});