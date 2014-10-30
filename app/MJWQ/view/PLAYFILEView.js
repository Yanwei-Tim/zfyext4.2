Ext.define('MJWQ.view.PLAYFILEView', {
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
            id:'mjwq_bfsp_rtmp',
            height:450,
            html: '<div id="mjwq_mediaspace"></div>'
        },
        {
            xtype: "panel",
            id:'mjwq_bfsp_win',
            height:450
        }
    ]

});


