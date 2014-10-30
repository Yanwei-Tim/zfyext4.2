Ext.define('ZFJD.view.RCCCView', {
    extend: 'Ext.container.Container',
    bodyBorder: false,
    defaults: {
        collapsible: false,
        split: false,
        bodyPadding: 0,
        border: 0
    },
    requires: ['Share.view.EditGrid', 'Share.view.ActionTextColumn','ZFJD.view.RCCCTOOL','ZFJD.view.RCCCGIRD'],
    layout: 'border',
    items: [
        {
            xtype:'toolpanel'
        },
        {
            xtype:'gridpanel'
        }
    ],
    initComponent: function () {
        this.callParent(arguments);

    }

})



