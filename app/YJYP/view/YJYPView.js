/**
 * Created by qinwen on 14-2-13.
 */
Ext.define('YJYP.view.YJYPView', {
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
                    id: 'yjyp_yjyp_form',
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
                            id: 'yjyp_yjyp_org',
                            editable:true,
                            showPolice:true
                        }),
                        {
                            xtype: 'datefield',
                            width: 160,
                            labelWidth: 40,
                            fieldLabel: '日期',
                            editable:false,
                            format: 'Y-m-d',
                            id: 'yjyp_yjyp_fromDate',
                            value: getMonthFirstDate(),
                            maxValue: new Date(),
                            emptyText: '请选择',
                            cls: "share_DateSelect",
                            name: 'start_date',
                            vtype: 'daterange',
                            toDateId: 'yjyp_yjyp_toDate'
                        },
                        {
                            xtype: 'datefield',
                            width: 135,
                            labelWidth: 15,
                            fieldLabel: '至',
                            editable:false,
                            format: 'Y-m-d',
                            labelSeparator: '',
                            id: 'yjyp_yjyp_toDate',
                            name: 'end_date',
                            emptyText: '请选择',
                            cls: "share_DateSelect",
                            value: new Date(),
                            maxValue: new Date(),
                            vtype: 'daterange',
                            fromDateId: 'yjyp_yjyp_fromDate'

                        },
                        {
                            xtype: 'button',
                            width: 70,
                            id: 'yjyp_yjyp_searchbtn',
                            text: '查询',
                            margin: '0 0 0 6',
                            listeners:{

                            }
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
                    id:'yjyp_yjyp_grid',
                    menuDisabled: true,
                    editable: false,
                    columnLines: true,
                    store: Ext.create('YJYP.store.YJYPStore'),
                    columns: [
                        {
                            width: 60,
                            header: '序号',
                            align: 'center',
                            menuDisabled:true,
                            xtype: 'rownumberer',
                            minWidth: 60
                        },
                        {
                            header : 'id',
                            dataIndex : 'id',
                            align : 'center',
                            menuDisabled:true,
                            hidden:true
                        }, {
                            header : '部门/警员名称',
                            align : 'center',
                            menuDisabled:true,
                            minWidth: 195,
                            dataIndex : 'OBJMC',
                            flex : 1
                        }, {
                            header : '异常总数',
                            dataIndex : 'exceptionNum',
                            align : 'center',
                            minWidth: 195,
                            menuDisabled:true,
                            flex : 1
                        }, {
                            header : '摄录时长低于90%',
                            align : 'center',
                            minWidth: 195,
                            menuDisabled:true,
                            dataIndex : 'KQYC',
                            flex : 1
                        },{
                            header : '执法无视频',
                            align : 'center',
                            menuDisabled:true,
                            minWidth: 195,
                            dataIndex : 'noMediaCutStore',
                            flex : 1
                        }, {
                            header : '十分钟内连续处罚',
                            align : 'center',
                            minWidth: 195,
                            menuDisabled:true,
                            dataIndex : 'OVER3',
                            flex : 1
                        },{
                            header : '连续五天出现异常数据',
                            align : 'center',
                            minWidth: 195,
                            menuDisabled:true,
                            dataIndex : 'fiveCutStore',
                            flex : 1,
                            renderer: function(value){
                                return '<img src="app/YJYP/resource/imgs/yellow.png" />';
                            }
                        }, {
                            header : '连续十天出现异常数据',
                            align : 'center',
                            minWidth: 195,
                            menuDisabled:true,
                            dataIndex : 'tenCutStore',
                            flex : 1,
                            renderer: function(value){
                                return '<img src="app/YJYP/resource/imgs/red.png" />';
                            }
                        }
                    ]

                }
            ]
        }
    ]

});


