Ext.define('ZFJD.view.PLAYFILEView', {
    extend: 'Ext.container.Container',
    xtype:"PLAYFILEView",
    bodyBorder: false,
    defaults: {
        collapsible: false,
        split: false,
        bodyPadding: 0,
        border: 0
    },
    layout: 'fit',
    items: [
        {
            xtype: "panel",
            id:'bfsp_rtmp',
            height:450,
            html: '<div id="mediaspace"></div>'
        },
        {
            xtype: "panel",
            id:'bfsp_win',
            style:"text-align:center;line-height:450px",
            height:450
        }
    ]

});


