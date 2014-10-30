/**
 * Created by qinwen on 14-2-13.
 */
Ext.define('YJYP.view.MainView', {
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
        layout: 'absolute',
        defaults: {
          border:0,
          width:102,
          height: 41,
          allowDepress: false,
          toggleGroup: "yjyp_nav_btn"
        },
        items:[{
                xtype: 'button',
                id: 'yjyp_yjyp_btn',
                cls: 'navBtnSelected',
                x: 11,
                y: 11
            }
        ]
    },{
        xtype: "panel",
        region: 'center',
        id: 'yjyp_center',
        layout: 'fit'
    }]
});