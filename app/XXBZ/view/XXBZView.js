/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('XXBZ.view.XXBZView', {
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
                    id: "xxbz_xxbz_form",
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
                            id: 'xxbz_xxbz_org',
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
                            id: 'xxbz_xxbz_fromDate',
                            value: new Date(),
                            maxValue: new Date(),
                            emptyText: '请选择',
                            cls: "share_DateSelect",
                            name: 'start_date',
                            vtype: 'daterange',
                            toDateId: 'xxbz_xxbz_toDate'
                        },
                        {
                            xtype: 'datefield',
                            width: 135,
                            labelWidth: 15,
                            fieldLabel: '至',
                            editable: false,
                            format: 'Y-m-d',
                            labelSeparator: '',
                            id: 'xxbz_xxbz_toDate',
                            name: 'end_date',
                            emptyText: '请选择',
                            cls: "share_DateSelect",
                            value: new Date(),
                            maxValue: new Date(),
                            vtype: 'daterange',
                            fromDateId: 'xxbz_xxbz_fromDate'
                        },
                        {
                            xtype: 'button',
                            id: 'xxbz_xxbz_search_btn',
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
                    id: "xxbz_xxbz_search_grid",
                    editable: false,
                    store: Ext.create('XXBZ.store.XXBZStore'),
                    columns:[
                        {
                            width: 60,
                            minWidth: 60,
                            align: "center",
                            header: '序号',
                            xtype: 'rownumberer'
                        },
                        {
                            header: '部门',
                            menuDisabled: true,
                            dataIndex: 'dep_name',
                            align: 'center',
                            minWidth: 200,
                            width: 200
                        },
                        {
                            header: '警员名称(警号)',
                            menuDisabled: true,
                            align: 'center',
                            dataIndex: 'capture',
                            minWidth: 150,
                            width: 150
                        },
                        {
                            header: '文件时间(文件时长)',
                            menuDisabled: true,
                            align: 'center',
                            dataIndex: 'file_info',
                            minWidth: 250,
                            width: 250
                        },
                        {
                            header: '数据类型',
                            menuDisabled: true,
                            align: 'center',
                            dataIndex: 'SJLX',
                            minWidth: 100,
                            width: 100,
                            renderer: function (value) {
                                if (null == value || "" == value || "null" == value) {
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        },
                        {
                            header: '决定书号',
                            menuDisabled: true,
                            align: 'center',
                            dataIndex: 'SJDH',
                            minWidth: 200,
                            width: 200,
                            renderer: function (value) {
                                if (null == value || "" == value || "null" == value) {
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        },
                        {
                            header: '操作',
                            menuDisabled: true,
                            align: 'center',
                            dataIndex: 'KFQK',
                            minWidth: 220,
                            width: 220,
                            xtype: 'actiontextcolumn',
                            items: [
                                {
                                    text: '标注',
                                    tooltip: '标注',
                                    cls: 'actionText',
                                    getClass: function (v, meta, record) {
                                        record.disableValuing = false;
                                        var index = Ext.LoginInfo.info.priviledgeTable.XT_ZFJD_RCCC_PJDF
                                        if (Ext.LoginInfo.info.priviledges.substr(parseInt(index) - 1, 1) == 1)
                                            return "actionText";

                                        record.disableValuing = true;
                                        return "disablePlay";
                                    },
                                    handler: function (obj, rowIndex, colIndex) {
                                        var store = obj.getStore();
                                        var record = store.getAt(rowIndex);
                                        if (true == record.disableValuing)
                                            return;
                                        this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "valuing");
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


