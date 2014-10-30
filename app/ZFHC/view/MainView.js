/**
 * Created by hcxowe on 14-2-11.
 */
Ext.define('ZFHC.view.MainView', {
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
            toggleGroup: "zfhc_nav_btn"
        },
        items:[{
            xtype: 'button',
            id: 'zfhc_zfhc_btn',
            cls: 'navBtnSelected',
            x: 11,
            y: 11
        }
        ]
    },{
        xtype: "panel",
        region: 'center',
        id: 'zfhc_center',
        layout: 'fit'
    }]
});