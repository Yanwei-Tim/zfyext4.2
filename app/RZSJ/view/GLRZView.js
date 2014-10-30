/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('RZSJ.view.GLRZView', {
    extend: 'Ext.container.Container',
    bodyBorder: false,
    defaults: {
        collapsible: false,
        split: false,
        bodyPadding: 0,
        border: 0
    },
    requires: ['Share.view.EditGrid',"Go.form.field.DateTime"],
    layout: 'border',
    items: [
        {
            region: 'north',
            xtype: 'panel',
            items: [
                {
                    xtype: 'form',
                    cls: 'conditionPanel',
                    height: 42,
                    border: 0,
                    id: 'rzsj_glrz_czlx_form',
                    bodyBorder: false,
                    layout: 'hbox',
                    defaults: {
                        labelStyle: 'font-weight:bold',
                        margin: '0 10 0 0'
                    },
                    items: [
                        {
                            id: 'rzsj_webrzlx_btn2',
                            xtype: 'combo',
                            width: 160,
                            labelWidth: 60,
                            fieldLabel: '日志类型',
                            store: Ext.create('RZSJ.store.RZLXWEBStore'),
                            displayField: 'name',
                            valueField: 'type',
                            allowBlank: false,
                            editable: false,
                            value: '2'
                        },
                        {
                            xtype: 'label',
                            cls: 'condition_label',
                            text: '单位：'

                        },
                        Ext.create('Share.view.TreeCombo', {
                            id: 'rzsj_glrz_org',
                            showPolice:true,
                            editable:true
                        }),
                        {
                            xtype : 'combo',
                            id: 'rzsj_glrz_czlx_btn',
                            width : 180,
                            labelWidth : 60,
                            fieldLabel : '操作类型',
                            store : Ext.create('RZSJ.store.GLCZLXStore'),
                            displayField : 'name',
                            valueField : 'type',
                            name:'operation',
                            allowBlank : false,
                            editable:false,
                            value : ''

                        },
                        {
                            xtype: 'datetimefield',
                            width: 200,
                            labelWidth: 40,
                            fieldLabel: '日期',
                            editable:false,
                            format: 'Y-m-d H:i:s',
                            id: 'rzsj_glrz_fromDate',
                            value: new Date(),
                            maxValue: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 1), 'Y-m-d H:i:s'),
                            emptyText: '请选择',
                            cls: "share_DateSelect",
                            name: 'start_date',
                            vtype: 'daterange',
                            toDateId: 'rzsj_glrz_toDate'
                        },
                        {
                            xtype: 'datetimefield',
                            width: 175,
                            labelWidth: 15,
                            fieldLabel: '至',
                            editable:false,
                            format: 'Y-m-d H:i:s',
                            labelSeparator: '',
                            id: 'rzsj_glrz_toDate',
                            name: 'end_date',
                            emptyText: '请选择',
                            cls: "share_DateSelect",
                            value: new Date(),
                            maxValue: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 1), 'Y-m-d H:i:s'),
                            vtype: 'daterange',
                            fromDateId: 'rzsj_glrz_fromDate'
                        },
                        {
                            xtype: 'button',
                            id: 'rzsj_glrz_search_btn',
                            width: 70,
                            text: '查询',
                            margin: '0 0 0 10'
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
                    editable: false,
                    id: 'rzsj_glrz_grid',
                    store: Ext.create('RZSJ.store.GLRZStore'),
                    columns: [
                        {
                            header: '管理员姓名（警号）',
                            dataIndex: 'userinfo',
                            minWidth: 200,
                            width: 200,
                            menuDisabled: true,
                            align: 'center'
                        },
                        {
                            header: '所属部门',
                            align: 'center',
                            dataIndex: 'orgname',
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


