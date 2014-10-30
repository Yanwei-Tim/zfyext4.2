/**
 * Created by hcxowe on 14-2-11.
 */
Ext.define('ZFHC.view.ZFHCView', {
    extend: 'Ext.container.Container',
    bodyBorder: false,
    defaults: {
        collapsible: false,
        split: false,
        bodyPadding: 0,
        border: 0
    },
    requires: ['Share.view.EditGrid'],   //需要的类列表（数组） 实例化类之前必须加载的类列表
    layout: 'border',
    items: [
        {
            region: 'north',
            xtype: 'panel',
            items: [
                {
                    xtype: 'form',
                    id: "zfhc_zfhc_form",
                    cls: 'conditionPanel',
                    height: 42,
                    border: 0,
                    bodyBorder: false,
                    layout: 'hbox',
                    defaults: {
                        labelStyle: 'font-weight:bold',
                        margin: '0 10 0 0'
                    },
                    items: [  //组件
                        {
                            xtype: 'label',
                            cls: 'condition_label',
                            text: '单位:'

                        },
                        Ext.create('Share.view.TreeCombo', {
                            id: 'zfhc_zfhc_org',
                            showPolice:true,
                            editable:true
                        }),
                        {
                            xtype: 'textfield',
                            width: 205,
                            name: 'SJDH',
                            labelWidth: 60,
                            fieldLabel: '决定书号'
                        },
                        {
                            xtype: 'datefield',
                            width: 160,
                            labelWidth: 40,
                            fieldLabel: '日期',
                            editable: false,
                            format: 'Y-m-d',
                            id: 'zfhc_zfhc_fromDate',
                            value: new Date(),
                            maxValue: new Date(),
                            emptyText: '请选择',
                            cls: "share_DateSelect",
                            name: 'start_date',
                            vtype: 'daterange',
                            toDateId: 'zfhc_zfhc_toDate'
                        },
                        {
                            xtype: 'datefield',
                            width: 135,
                            labelWidth: 15,
                            fieldLabel: '至',
                            editable: false,
                            format: 'Y-m-d',
                            labelSeparator: '',
                            id: 'zfhc_zfhc_toDate',
                            name: 'end_date',
                            emptyText: '请选择',
                            cls: "share_DateSelect",
                            value: new Date(),
                            maxValue: new Date(),
                            vtype: 'daterange',
                            fromDateId: 'zfhc_zfhc_fromDate'
                        },
                        {
                            xtype: 'button',
                            id: 'zfhc_zfhc_search_btn',
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
            xtype: 'panel',
            layout: 'fit',
            items: [
                {
                    xtype: 'editgrid',
                    id: "zfhc_zfhc_search_grid",
                    editable: false,
                    store: Ext.create('ZFHC.store.ZFHCStore'),
                    columns: [
                        {
                            header:         '序号',
                            width:          80,
                            minWidth:       60,
                            menuDisabled:   true,
                            align:          'center',
                            xtype:          'rownumberer'
                        },
                        {
                            header: '警员姓名(警号)',
                            dataIndex: 'police_id',
                            minWidth: 150,
                            menuDisabled: true,
                            align: 'center'
                        },
                        {
                            header: '民警机构',
                            align: 'center',
                            dataIndex: 'depName',
                            minWidth: 300,
                            menuDisabled: true,
                            flex: 1
                        },
                        {
                            header: '决定书号',
                            align: 'center',
                            dataIndex: 'JDSH',
                            minWidth: 100,
                            menuDisabled: true,
                            flex: 1
                        },
                        {
                            header: '投诉人',
                            align: 'center',
                            dataIndex: 'TSR',
                            minWidth: 100,
                            menuDisabled: true,
                            flex: 1
                        },
                        {
                            header: '投诉时间',
                            align: 'center',
                            dataIndex: 'time',
                            minWidth: 100,
                            menuDisabled: true,
                            flex: 1
                        },
                        {
                            header: '处理结果',
                            align: 'center',
                            dataIndex: 'CLJG',
                            minWidth: 100,
                            menuDisabled: true,
                            flex: 1
                        },
                        {
                            menuDisabled:   true,
                            header:         '操作',
                            align:          'center',
                            fixed:          true,
                            sortable:       false,
                            dataIndex:      'operate',
                            width:          150,
                            xtype:          'actiontextcolumn',
                            items:
                            [
                                {
                                    text: '编辑  ',
                                    tooltip: '编辑',
                                    cls: 'actionText',
                                    handler: function (grid, rowIndex, colIndex)
                                    {
                                        //this.up("grid").fireEvent("itemClick", grid, rowIndex, colIndex, "edit");
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

});


