/**
 * Created by hansen on 14-2-11.
 */
Ext.define('RZSJ.view.WSUserView', {
    extend: 'Ext.container.Container',
    bodyBorder: false,
    defaults: {
        collapsible: false,
        split: false,
        bodyPadding: 0,
        border: 0
    },
    requires: ['Share.view.EditGrid',"Go.form.field.DateTime"],   //需要的类列表（数组） 实例化类之前必须加载的类列表
    layout: 'border',
    items: [
        {
            region: 'north',
            xtype: 'panel',
            items: [
                {
                    xtype: 'form',
                    id: "rzsj_wu_czlx_form",
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
                            id: 'rzsj_wu_czlx_org',
                            showPolice:true,
                            editable:true
                        }),
                        {
                            id: 'rzsj_wu_czlx_btn',
                            xtype: 'combo',
                            width: 180,
                            labelWidth: 60,
                            fieldLabel: '操作类型',
                            store: Ext.create('RZSJ.store.YHWSCZLXStore'),
                            displayField: 'name',
                            valueField: 'type',
                            name: 'operation',
                            allowBlank: false,
                            editable: false,
                            value: ''

                        },
                        {
                            xtype: 'datetimefield',
                            width: 200,
                            labelWidth: 40,
                            fieldLabel: '日期',
                            editable: false,
                            format: 'Y-m-d H:i:s',
                            id: 'rzsj_wu_fromDate',
                            value: new Date(),
                            maxValue: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 1), 'Y-m-d H:i:s'),
                            emptyText: '请选择',
                            cls: "share_DateSelect",
                            name: 'start_date',
                            vtype: 'daterange',
                            toDateId: 'rzsj_wu_toDate'
                        },
                        {
                            xtype: 'datetimefield',
                            width: 175,
                            labelWidth: 15,
                            fieldLabel: '至',
                            editable: false,
                            format: 'Y-m-d H:i:s',
                            labelSeparator: '',
                            id: 'rzsj_wu_toDate',
                            name: 'end_date',
                            emptyText: '请选择',
                            cls: "share_DateSelect",
                            value: new Date(),
                            maxValue: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 1), 'Y-m-d H:i:s'),
                            vtype: 'daterange',
                            fromDateId: 'rzsj_wu_fromDate'
                        },
                        {
                            xtype: 'button',
                            id: 'rzsj_wu_search_btn',
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
                    id: "rzsj_wu_search_grid",
                    editable: false,
                    store: Ext.create('RZSJ.store.YHWSRZStore'),
                    columns: [
                        {
                            header: '工作站ID',
                            dataIndex: 'sn',
                            minWidth: 120,
                            width: 120,
                            menuDisabled: true,
                            align: 'center'
                        },
                        {
                            header: '警员姓名（警号）',
                            dataIndex: 'userinfo',
                            minWidth: 200,
                            width: 200,
                            menuDisabled: true,
                            align: 'center'
                        },
                        {
                            header: '所属部门',
                            align: 'center',
                            dataIndex: 'dep_name',
                            minWidth: 200,
                            width: 200,
                            menuDisabled: true
                        },
                        {
                            header: '操作类型',
                            dataIndex: 'operation',
                            minWidth: 120,
                            width: 120,
                            menuDisabled: true,
                            align: 'center'
                        },
                        {
                            header: '操作时间',
                            dataIndex: 'time',
                            minWidth: 170,
                            width: 170,
                            menuDisabled: true,
                            align: 'center'
                        },
                        {
                            header: '描述',
                            dataIndex: 'descript',
                            minWidth: 300,
                            width: 300,
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


