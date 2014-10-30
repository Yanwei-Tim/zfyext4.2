Ext.define('ZFJD.view.RCCCTOOL', {
    extend: 'Ext.form.Panel',
    region: 'north',
    xtype: 'toolpanel',
    requires: [ "Share.view.TreeCombo","Go.form.field.DateTime"],
    id: 'zfjd_rccc_search_form1',
    initComponent: function () {
        var index = Ext.LoginInfo.info.priviledgeTable.XT_SJBD;
        var item1 =  {
            hidden:true
        }
        var item2 =  {
            hidden:true
        }
        var item3 =  {
            hidden:true
        }

        if (Ext.LoginInfo.info.priviledges.substr(parseInt(index) - 1, 1) == 1) {
            item1 = {
                xtype: 'textfield',
                    name: 'SJDH',
                fieldLabel: '数据编号'
            }
            item2 = {
                xtype: 'combo',
                cls: "share_Combobox",
                editable: false,
                fieldLabel: '比对结果',
                queryMode: 'local',
                store: Ext.create('ZFJD.store.BDJGStore'),
                displayField: 'name',
                valueField: 'type',
                name: 'compared',
                value: ''
            }
            item3 = {
                xtype: 'combo',
                cls: "share_Combobox",
                editable: false,
                fieldLabel: '数据类型',
                queryMode: 'local',
                store: Ext.create('ZFJD.store.SJLXStore'),
                displayField: 'SJMC',
                valueField: 'SJLX',
                name: 'SJLX',
                value: ''
            }
        }
        this.items = [
            {
                cls: 'conditionPanel',
                height: 140,
                xtype: 'fieldset',
                border: false,
                title: '收起搜索',
                collapsible: true,
                layout: {
                    type: 'table',
                    columns: 5,
                    tableAttrs: {
                        style: {
                            width: '100%'
                        }
                    }
                },
                defaults: {
                    labelStyle: 'font-weight:bold',
                    labelWidth: 65,
                    width: 225
                },
                items: [
                    {
                        xtype: 'TreeCombo',
                        id: 'zfjd_rccc_org',
                        cls: 'condition_label',
                        fieldLabel: '单位/警号'

                    },
                    {
                        xtype: 'datetimefield',
                        fieldLabel: '开始时间',
                        editable: false,
                        format: 'Y-m-d H:i:s',
                        id: 'zfjd_rccc_fromDate',
                        maxValue: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 1), 'Y-m-d H:i:s'),
                        emptyText: '请选择',
                        value: new Date(),
                        cls: "share_DateSelect",
                        name: 'start_date',
                        vtype: 'daterange',
                        toDateId: 'zfjd_rccc_toDate'
                    },
                    {
                        xtype: 'datetimefield',
                        fieldLabel: '结束时间',
                        editable: false,
                        format: 'Y-m-d H:i:s',
                        labelSeparator: '',
                        id: 'zfjd_rccc_toDate',
                        name: 'end_date',
                        emptyText: '请选择',
                        maxValue: Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.DAY, 1), 'Y-m-d H:i:s'),
                        cls: "share_DateSelect",
                        value: new Date(),
                        vtype: 'daterange',
                        fromDateId: 'zfjd_rccc_fromDate'
                    },
                    {
                        xtype: 'combo',
                        cls: "share_Combobox",
                        editable: false,
                        fieldLabel: '媒体类型',
                        queryMode: 'local',
                        store: Ext.create('ZFJD.store.MTLXStore'),
                        displayField: 'name',
                        valueField: 'type',
                        name: 'type',
                        value: ''
                    }
                    ,
                    {
                        xtype: 'button',
                        id: 'zfjd_rccc_search_btn',
                        width: 70,
                        rowspan: 3,
                        height: 70,
                        text: '查询'
                    },
                    item1,
                    item2,
                    item3,
                    {
                        xtype: 'combo',
                        cls: "share_Combobox",
                        editable: false,
                        fieldLabel: '视频质量',
                        queryMode: 'local',
                        store: Ext.create('ZFJD.store.SPZLStore'),
                        displayField: 'name',
                        valueField: 'type',
                        name: 'quality',
                        value: ''
                    },
                    {
                        xtype: 'textfield',
                        name: 'HPHM',
                        fieldLabel: '号牌号码'

                    },
                    {
                        xtype: 'textfield',
                        name: 'DSR',
                        fieldLabel: '当事人'

                    },
                    {
                        xtype: 'textfield',
                        name: 'GJZ',
                        fieldLabel: '关键字'

                    },
                    {
                        xtype: 'combo',
                        cls: "share_Combobox",
                        editable: false,
                        fieldLabel: '标注类型',
                        queryMode: 'local',
                        store: Ext.create('Ext.data.Store', {
                            fields: ["name", "type"],
                            data: [
                                {name: "不限", type: ""},
                                {name: "例行记录(保存3个月)", type: "00"},
                                {name: "执法不规范(永久保存)", type: "01"},
                                {name: "投诉不正确(永久保存)", type: "02"},
                                {name: "投诉存疑(保存6个月)", type: "03"},
                                {name: "执法存疑(保存6个月)", type: "04"},
                                {name: "无效数据(优先删除)", type: "05"}
                            ]
                        }),
                        displayField: 'name',
                        valueField: 'type',
                        name: 'BZLX',
                        value: ''
                    },
                    {
                        xtype: 'combo',
                        cls: "share_Combobox",
                        editable: false,
                        fieldLabel: '关键视频',
                        queryMode: 'local',
                        store: Ext.create('Ext.data.Store', {
                            fields: ["name", "type"],
                            data: [
                                {name: "不限", type: ""},
                                {name: "是", type: "1"},
                                {name: "否", type: "0"}
                            ]
                        }),
                        displayField: 'name',
                        valueField: 'type',
                        name: 'unusual',
                        value: ''
                    },
                    {
                        xtype: 'combo',
                        cls: "share_Combobox",
                        editable: false,
                        queryMode: 'local',
                        store: Ext.create('ZFJD.store.SHOWMODELStore'),
                        displayField: 'name',
                        valueField: 'type',
                        id: 'showModel',
                        value: 'pic'
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});


