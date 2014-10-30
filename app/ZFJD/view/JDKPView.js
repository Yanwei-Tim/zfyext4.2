Ext.define('ZFJD.view.JDKPView', {
    extend: 'Ext.container.Container',
    bodyBorder: false,
    defaults: {
        collapsible: false,
        split: false,
        bodyPadding: 0,
        border: 0
    },
    requires: ['Share.view.EditGrid'],
    layout: 'border',
    items: [
        {
            region: 'north',
            xtype: 'panel',
            items: [
                {
                    xtype: 'form',
                    cls: 'conditionPanel',
                    id: 'zfjd_jdkp_search_form',
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
                            id: 'zfjd_jdkp_org',
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
                            id: 'zfjd_jdkp_fromDate',
                            value: new Date(),
                            maxValue: new Date(),
                            emptyText: '请选择',
                            cls: "share_DateSelect",
                            name: 'startTime',
                            vtype: 'daterange',
                            toDateId: 'zfjd_jdkp_toDate'
                        },
                        {
                            xtype: 'datefield',
                            width: 135,
                            labelWidth: 15,
                            fieldLabel: '至',
                            format: 'Y-m-d',
                            editable: false,
                            labelSeparator: '',
                            id: 'zfjd_jdkp_toDate',
                            name: 'endTime',
                            emptyText: '请选择',
                            cls: "share_DateSelect",
                            value: new Date(),
                            maxValue: new Date(),
                            vtype: 'daterange',
                            fromDateId: 'zfjd_jdkp_fromDate'

                        },
                        {
                            xtype: 'button',
                            id: 'zfjd_jdkp_search_btn',
                            width: 70,
                            text: '查询',
                            margin: '0 0 0 6'
                        },
                        { xtype: 'tbfill' },
                        {
                            xtype: 'button',
                            id: 'zfjd_jdkp_export_btn',
                            width: 70,
                            text: '导出',
                            margin: '0 10 0 6'
                        }
                    ]
                }
            ]
        },
        {
            region: 'center',
            xtype: 'panel',
            layout: 'fit',
            items: [
                {
                    xtype: 'editgrid',
                    id: 'zfjd_jdkp_grid',
                    //page: false,
                    editable: false,
                    store: Ext.create('ZFJD.store.JDKPStore'),
                    columns: [
                        {
                            width: 60,
                            minWidth: 60,
                            align: "center",
                            header: '序号',
                            xtype: 'rownumberer'
                        },
                        {
                            header: '考核对象',
                            align: 'center',
                            menuDisabled: true,
                            dataIndex: 'name',
                            minWidth: 100,
                            width: 100
                        },
                        {
                            header: '日常抽查扣分',
                            dataIndex: 'RCCC',
                            menuDisabled: true,
                            align: 'center',
                            minWidth: 150,
                            width: 150
                        },
                        {
                            header: '摄录时长低于90%扣分',
                            align: 'center',
                            menuDisabled: true,
                            dataIndex: 'DY90',
                            minWidth: 150,
                            width: 150
                        },
                        {
                            header: '执法无视频扣分',
                            align: 'center',
                            menuDisabled: true,
                            dataIndex: 'ZFWSP',
                            minWidth: 150,
                            width: 150
                        },
                        /*{
                         header: '连续五天出现异常数据扣分',
                         align: 'center',
                         menuDisabled: true,
                         dataIndex: 'LXWT',
                         minWidth:180,
                         width: 180
                         },
                         {
                         header: '连续十天出现异常数据扣分',
                         align: 'center',
                         menuDisabled: true,
                         dataIndex: 'LXST',
                         minWidth:180,
                         width: 180
                         },*/
                        {
                            header: '总分',
                            menuDisabled: true,
                            align: 'center',
                            dataIndex: 'TOT',
                            minWidth: 100,
                            width: 100
                        }
                    ]

                }
            ]
        }
    ]

});


