Ext.define('ZFJD.view.YCJDView', {
    extend: 'Ext.container.Container',
    bodyBorder: false,
    defaults: {
        collapsible: false,
        split: false,
        bodyPadding: 0,
        border: 0
    },
    requires: ['Share.view.EditGrid', 'Share.view.ActionTextColumn'],
    layout: 'border',
    items: [
        {
            region: 'north',
            xtype: 'panel',
            items: [
                {
                    xtype: 'form',
                    id:'zfjd_ycjd_search_form',
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
                            xtype: 'label',
                            cls: 'condition_label',
                            text: '单位：'
                        },
                        Ext.create('Share.view.TreeCombo', {
                            id: 'zfjd_ycjd_org',
                            editable:true,
                            showPolice:true
                        }),
                        {
                            xtype: 'datefield',
                            width: 160,
                            labelWidth: 40,
                            fieldLabel: '日期',
                            format: 'Y-m-d',
                            editable: false,
                            id: 'zfjd_ycjd_fromDate',
                            value: new Date(),
                            maxValue: new Date(),
                            emptyText: '请选择',
                            cls: "share_DateSelect",
                            name: 'start_time',
                            vtype: 'daterange',
                            toDateId: 'zfjd_ycjd_toDate'
                        },
                        {
                            xtype: 'datefield',
                            width: 135,
                            labelWidth: 15,
                            fieldLabel: '至',
                            format: 'Y-m-d',
                            editable: false,
                            labelSeparator: '',
                            id: 'zfjd_ycjd_toDate',
                            name: 'end_time',
                            emptyText: '请选择',
                            cls: "share_DateSelect",
                            value: new Date(),
                            maxValue: new Date(),
                            vtype: 'daterange',
                            fromDateId: 'zfjd_ycjd_fromDate'
                        },
                        {
                            xtype: 'combo',
                            cls:"share_Combobox",
                            id: 'zfjd_ycjd_yclx_btn',
                            width: 215,
                            labelWidth: 60,
                            editable: false,
                            fieldLabel: '异常类型',
                            queryMode: 'local',
                            store: Ext.create('ZFJD.store.YCLXStore'),
                            displayField: 'name',
                            valueField: 'type',
                            name: 'ExceptType',
                            value: '0'
                        },
                        {
                            xtype: 'button',
                            id: 'zfjd_ycjd_search_btn',
                            width: 70,
                            text: '查询',
                            margin: '0 0 0 6'
                        }
                    ]
                }
            ]
        },
        {
            region: 'center',
            id:"zfjd_ycjd_center",
            xtype: 'panel',
            layout: 'fit'
        }
    ]

});


