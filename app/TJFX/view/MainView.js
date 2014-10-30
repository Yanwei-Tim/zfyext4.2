/**
 * Created by hcxowe on 14-1-17.
 */
Ext.define('TJFX.view.MainView', {
    extend:     'Ext.container.Container',
    bodyBorder: false,
    defaults:
    {
        collapsible: false,
        split:       false,
        bodyPadding: 0,
        border:      0
    },

    layout: 'border',
    items:
    [
        {
            region: 'north',
            cls:    'navTitle',
            height:  49,
            layout: 'absolute',
            defaults:
            {
                border:       0,
                width:        102,
                height:       41,
                allowDepress: false,
                toggleGroup: 'tjfx_nav_btn'
            },

            items:
            [
                {
                    xtype:  'button',
                    id:     'tjfx_tjsj_btn',
                    cls:    'navBtnSelected',
                    //text: '统计数据',
                    x: 11,
                    y: 11
                },
                {
                    xtype:  'button',
                    id:     'tjfx_qst_btn',
                    cls:    'navBtnSelected',
                    hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_SJBD - 1) != 1),
                    //text: '趋势图',
                    x: 11 + 102 + 1,
                    y: 11
                },
                {
                xtype:  'button',
                id:     'tjfx_qsdbt_btn',
                cls:    'navBtnUnSelected',
                hidden: (Ext.LoginInfo.info.priviledges.charAt(Ext.LoginInfo.info.priviledgeTable.XT_SJBD - 1) != 1),
                //text: '趋势对比图',
                width:   112,
                x:       11 + 102 + 102 + 2,
                y:       11
                }
            ]
        },
        {
            xtype: "panel",
            region: 'center',
            id: 'tjfx_center',
            layout: 'fit'
        }
    ]
});