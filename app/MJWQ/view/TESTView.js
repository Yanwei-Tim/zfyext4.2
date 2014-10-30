Ext.define('MJWQ.view.TESTView', {
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
            xtype: 'panel',
            items: [
                {
                    xtype: 'form',
                    id: 'mjwq_test_search_form1',
                    cls: 'conditionPanel',
                    height: 42,
                    border: 0,
                    bodyBorder: false,
                    layout: 'hbox',
                    defaults: {
                        labelStyle: 'font-weight:bold',
                        margin: '0 10 0 0'
                    },
                    items: [
                        {
                            xtype: 'button',
                            id: 'mjwq_test_search_btn',
                            width: 70,
                            text: '查询',
                            margin: '0 0 0 6'
                        },
                        {
                            xtype: 'button',
                            id: 'mjwq_test_redraw_btn',
                            width: 70,
                            text: '重绘',
                            margin: '0 0 0 6'
                        }
                    ]
                }
            ]
        },
        {
            region: 'center',
            id:'test_linechar_center',
            xtype: 'panel',
            layout: 'fit'
        }
    ],
    initComponent: function () {
        this.callParent(arguments);

    }
})
;


