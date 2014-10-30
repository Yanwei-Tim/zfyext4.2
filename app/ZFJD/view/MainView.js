/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('ZFJD.view.MainView', {
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
        id:     'zfjd_mainpanel',
        cls: "navTitle",
        height: 49,
        layout: 'absolute',
        defaults: {
          border:0,
          width:102,
          height: 41,
          allowDepress: false,
          toggleGroup: "zfjd_nav_btn"
        },
        items:[{
                xtype: 'button',
                id: 'zfjd_rccc_btn',
                cls: 'navBtnSelected',
               // text: '日常抽查',
                x: 11,
                y: 11,
                hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_ZFJD_RCCC - 1) != 1)
            },{
                xtype: 'button',
                id: 'zfjd_ycjd_btn',
                cls: 'navBtnUnSelected',
                //text: '异常监督',
                x: 11 + 102 + 1,
                y: 11,
                hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_ZFJD_YCJD - 1) != 1)
            },{
                xtype: 'button',
                id: 'zfjd_jdkp_btn',
                cls: 'navBtnUnSelected',
                //text: '监督考评',
                x: 11 + 102 + 102 + 1,
                y: 11,
                hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_ZFJD_JDKP - 1) != 1)
            }
        ]
    },{
        xtype: "panel",
        region: 'center',
        id: 'zfjd_center',
        layout: 'fit'
    }]
});