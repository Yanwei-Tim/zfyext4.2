/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('MJWQ.view.MainView', {
    extend: 'Ext.container.Container',
    bodyBorder: false,
    defaults: {
        collapsible: false,
        split: false,
        bodyPadding: 0,
        border: 0
    },
    layout: 'border',
    items: [
        {
            region: 'north',
            cls: "navTitle",
            height: 49,
            layout: 'absolute',
            defaults: {
                border: 0,
                width: 102,
                height: 41,
                allowDepress: false,
                toggleGroup: "mjwq_nav_btn"
            },
            items: [
                {
                    xtype: 'button',
                    id: 'mjwq_mjwq_btn',
                    cls: 'navBtnSelected',
                    // text: '日常抽查',
                    x: 11,
                    y: 11
                }/*,
                {
                    xtype: 'button',
                    id: 'mjwq_test_btn',
                   // cls: 'navBtnSelected',
                    // text: '日常抽查',
                    x: 110,
                    y: 11
                }*/
            ]
        },
        {
            xtype: "panel",
            region: 'center',
            id: 'mjwq_center',
            layout: 'fit'
        }
    ]
});