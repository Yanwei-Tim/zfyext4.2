Ext.define('ZFJD.view.RCCCKZXXView', {
    extend: 'Ext.container.Container',
    alias: "widget.RCCCKZXXView",
    border: false,
    items: [
        {
            defaults: {
                margin: "5 0 0 10",
                cls: "zfjd_cksp_kzxx_displayfield",
                width: 230,
                labelWidth: 65,
                renderer: function (value) {
                    return  '<span title="' + value + '">' + value + '</span>';
                }
            },
            border: false,
            items: [
                {
                    xtype: "label",
                    text: "关联数据",
                    margin: "15 0 5 10",
                    cls: 'rccc_pupowindow_glsj'
                },
                {
                    xtype: 'combo',
                    margin: "10 0 0 10",
                    id: "rccc_pupowindow_sjbh",
                    cls: "share_Combobox",
                    editable: false,
                    fieldLabel: '数据编号',
                    queryMode: 'local',
                    store: null,
                    displayField: 'name',
                    valueField: 'type',
                    name: 'SJLX',
                    value: ''
                }

            ]
        },
        {
            xtype: "form",
            id: "zfjd_cksp_center_kzxxform_1",
            defaults: {
                margin: "0 0 0 10",
                cls: "zfjd_cksp_kzxx_displayfield",
                width: 230,
                labelWidth: 65,
                overflowX: "hidden",
                renderer: function (value) {
                    return  '<span title="' + value + '">' + value + '</span>';
                }
            },
            border: false,
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: '数据类型',
                    name: 'SJLX',
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '违法时间',
                    name: 'WFSJ',
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '违法地点',
                    name: "WFDD",
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '当事人',
                    name: "DSR",
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '驾驶证号',
                    name: "JSZH",
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '号牌号码',
                    name: "HPHM",
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '违法类型',
                    name: "WFLX",
                    value: ''
                },
                {
                    xtype:"panel",
                    border:false,
                    name:"ZYKSSJ1",
                    layout:"hbox",
                    items:[
                        {
                            width:195,
                            labelWidth: 65,
                            overflowX: "hidden",
                            xtype: 'displayfield',
                            fieldLabel: '开始时间',
                            name: "ZYKSSJ",
                            value: ''
                        },
                        {
                            xtype:"button",
                            width:35,
                            name:"ZYKSSJ2",
                            text:"播"
                        }
                    ]

                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '结束时间',
                    name: "ZYJSSJ",
                    value: ''
                }
            ]
        },
        {
            xtype: "form",
            id: "zfjd_cksp_center_kzxxform_2",
            defaults: {
                margin: "0 0 0 10",
                cls: "zfjd_cksp_kzxx_displayfield",
                width: 230,
                labelWidth: 110,
                renderer: function (value) {
                    return  '<span title="' + value + '">' + value + '</span>';
                }
            },
            border: false,
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: '数据类型',
                    name: "SJLX",
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '报警人',
                    name: "BJR",
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '报警时间',
                    name: "BJDHSJ",
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '报警内容',
                    name: "BJNR",
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '事发地点',
                    name: "SFDD",
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '报警人联系电话',
                    name: "LXDH",
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '处警民警警号',
                    name: "MJJH",
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '处警民警名称',
                    name: "MJMC",
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '处警民警机构名称',
                    name: "MJJG",
                    value: ''
                },
                {
                    xtype:"panel",
                    border:false,
                    name:"ZYKSSJ1",
                    layout:"hbox",
                    items:[
                        {
                            width:195,
                            labelWidth: 65,
                            overflowX: "hidden",
                            xtype: 'displayfield',
                            fieldLabel: '开始时间',
                            name: "ZYKSSJ",
                            value: ''
                        },
                        {
                            xtype:"button",
                            width:35,
                            name:"ZYKSSJ2",
                            text:"播"
                        }
                    ]

                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '结束时间',
                    name: "ZYJSSJ",
                    value: ''
                }
            ]
        },
        {
            xtype: "form",
            id: "zfjd_cksp_center_kzxxform_3",
            defaults: {
                margin: "0 0 0 10",
                cls: "zfjd_cksp_kzxx_displayfield",
                width: 230,
                labelWidth: 90,
                renderer: function (value) {
                    return  '<span title="' + value + '">' + value + '</span>';

                }
            },
            border: false,
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: '数据类型',
                    name: "SJLX",
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '民警警号',
                    name: "MJJH",
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '民警名称',
                    name: "MJMC",
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '民警机构名称',
                    name: "MJJG",
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '事故地点',
                    name: "SGDD",
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '处理时间',
                    name: "CLSJ",
                    value: ''
                },
                {
                    xtype:"panel",
                    border:false,
                    name:"ZYKSSJ1",
                    layout:"hbox",
                    items:[
                        {
                            width:195,
                            labelWidth: 65,
                            overflowX: "hidden",
                            xtype: 'displayfield',
                            fieldLabel: '开始时间',
                            name: "ZYKSSJ",
                            value: ''
                        },
                        {
                            xtype:"button",
                            width:35,
                            name:"ZYKSSJ2",
                            text:"播"
                        }
                    ]

                },
                {
                    xtype: 'displayfield',
                    fieldLabel: '结束时间',
                    name: "ZYJSSJ",
                    value: ''
                }
            ]
        }


    ]

});


