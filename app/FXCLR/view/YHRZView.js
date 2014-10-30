/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('FXCLR.view.YHRZView', {
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
                    id: "fxclr_yhrz_czlx_form",
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
                            id: 'fxclr_yhrz_czlx_org',
                            showPolice:true,
                            editable:true
                        }),
                        {
                            id: 'fxclr_yhrz_czlx_btn',
                            fieldLabel:"决定书号",
                            width:165,
                            labelWidth:60,
                            xtype: 'textfield'
                        },
                        {
                            xtype: 'datefield',
                            width: 160,
                            labelWidth: 40,
                            fieldLabel: '日期',
                            editable: false,
                            format: 'Y-m-d',
                            id: 'fxclr_yhrz_fromDate',
                            value: new Date(),
                            maxValue: new Date(),
                            emptyText: '请选择',
                            cls: "share_DateSelect",
                            name: 'start_date',
                            vtype: 'daterange',
                            toDateId: 'fxclr_yhrz_toDate'
                        },
                        {
                            xtype: 'datefield',
                            width: 135,
                            labelWidth: 15,
                            fieldLabel: '至',
                            editable: false,
                            format: 'Y-m-d',
                            labelSeparator: '',
                            id: 'fxclr_yhrz_toDate',
                            name: 'end_date',
                            emptyText: '请选择',
                            cls: "share_DateSelect",
                            value: new Date(),
                            maxValue: new Date(),
                            vtype: 'daterange',
                            fromDateId: 'fxclr_yhrz_fromDate'
                        },
                        {
                            xtype: 'button',
                            id: 'fxclr_yhrz_search_btn',
                            width: 70,
                            text: '查询',
                            margin: '0 0 0 6'
                        },
                        {
                            xtype:"tbfill"
                        },
                        {
                            xtype: 'button',
                            width: 70,
                            text: '录入',
                            margin: '0 25 0 6'
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
                    id: "fxclr_yhrz_search_grid",
                    editable: false,
                    store: Ext.create('FXCLR.store.YHRZStore'),
                    columns: [
                        {
                            width: 60,
                            minWidth: 60,
                            align: "center",
                            header: '序号',
                            xtype: 'rownumberer'
                        },
                        {
                            header: '警员姓名',
                            dataIndex: 'a1',
                            minWidth: 100,
                            menuDisabled: true,
                            align: 'center'
                        },
                        {
                            header: '警员警号',
                            align: 'center',
                            dataIndex: 'a2',
                            minWidth: 100,
                            menuDisabled: true,
                            flex: 1
                        },
                        {
                            header: '所属部门',
                            align: 'center',
                            dataIndex: 'a3',
                            minWidth: 100,
                            menuDisabled: true,
                            flex: 1
                        },
                        {
                            header: '违法类型',
                            dataIndex: 'a4',
                            minWidth: 100,
                            menuDisabled: true,
                            align: 'center',
                            flex: 1
                        },
                        {
                            header: '违法时间',
                            dataIndex: 'a5',
                            minWidth: 200,
                            menuDisabled: true,
                            align: 'center',
                            flex: 1
                        },
                        {
                            header: '当事人',
                            dataIndex: 'a6',
                            minWidth: 100,
                            menuDisabled: true,
                            align: 'center',
                            flex: 1
                        },
                        {
                            header: '驾驶证号',
                            dataIndex: 'a7',
                            minWidth: 100,
                            menuDisabled: true,
                            align: 'center',
                            flex: 1
                        },
                        {
                            header: '号牌号码',
                            dataIndex: 'a8',
                            minWidth: 100,
                            menuDisabled: true,
                            align: 'center',
                            flex: 1
                        },
                        {
                            header: '违法地点',
                            dataIndex: 'a9',
                            minWidth: 150,
                            menuDisabled: true,
                            align: 'center',
                            flex: 1
                        },
                        {
                            header: '数据类型',
                            dataIndex: 'a10',
                            minWidth: 100,
                            menuDisabled: true,
                            align: 'center',
                            flex: 1
                        },
                        {
                            header: '事故处理',
                            dataIndex: 'a11',
                            minWidth: 100,
                            menuDisabled: true,
                            align: 'center',
                            flex: 1
                        },
                        {
                            header: '事故处理时间',
                            dataIndex: 'a12',
                            minWidth: 200,
                            menuDisabled: true,
                            align: 'center',
                            flex: 1
                        },
                        {
                            header: '入库时间',
                            dataIndex: 'a13',
                            minWidth: 200,
                            menuDisabled: true,
                            align: 'center',
                            flex: 1
                        },
                        {
                            header: '决定书号',
                            dataIndex: 'a14',
                            minWidth: 100,
                            menuDisabled: true,
                            align: 'center',
                            flex: 1
                        }
                    ]

                }
            ]
        }
    ]

});


