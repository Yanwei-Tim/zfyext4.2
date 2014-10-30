Ext.define('MJWQ.view.RCCCView', {
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
                    id: 'mjwq_rccc_search_form1',
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
                        Ext.create('Share.view.OrgSelectBtn', {
                            id: 'mjwq_rccc_org'
                        }),
                        {
                            xtype: 'datefield',
                            width: 160,
                            labelWidth: 40,
                            fieldLabel: '日期',
                            editable: false,
                            format: 'Y-m-d',
                            id: 'mjwq_rccc_fromDate',
                            value: new Date(),
                            emptyText: '请选择',
                            maxValue: new Date(),
                            cls: "share_DateSelect",
                            name: 'start_date',
                            vtype: 'daterange',
                            toDateId: 'mjwq_rccc_toDate'
                        },
                        {
                            xtype: 'datefield',
                            width: 135,
                            labelWidth: 15,
                            fieldLabel: '至',
                            editable: false,
                            format: 'Y-m-d',
                            labelSeparator: '',
                            id: 'mjwq_rccc_toDate',
                            name: 'end_date',
                            emptyText: '请选择',
                            maxValue: new Date(),
                            cls: "share_DateSelect",
                            value: new Date(),
                            vtype: 'daterange',
                            fromDateId: 'mjwq_rccc_fromDate'
                        },
                        {
                            xtype: 'combo',
                            cls: "share_Combobox",
                            width: 155,
                            labelWidth: 60,
                            editable: false,
                            fieldLabel: '媒体类型',
                            queryMode: 'local',
                            store: Ext.create('MJWQ.store.MTLXStore'),
                            displayField: 'name',
                            valueField: 'type',
                            name: 'mediatype',
                            value: ''
                        },
                        {
                            xtype: 'button',
                            id: 'mjwq_rccc_search_btn',
                            width: 70,
                            text: '查询',
                            margin: '0 0 0 6'
                        }
                    ]
                },
                {
                    xtype: 'form',
                    id: 'mjwq_rccc_search_form2',
                    cls: 'conditionPanel',
                    style: 'margin-top:-10px',
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
                            xtype: 'textfield',
                            width: 205,
                            name: 'SJDH',
                            labelWidth: 60,
                            fieldLabel: '数据编号'
                        },
                        {
                            xtype: 'combo',
                            cls: "share_Combobox",
                            width: 155,
                            labelWidth: 60,
                            editable: false,
                            fieldLabel: '比对结果',
                            queryMode: 'local',
                            store: Ext.create('MJWQ.store.BDJGStore'),
                            displayField: 'name',
                            valueField: 'type',
                            name: 'compared',
                            value: ''
                        },
                        {
                            xtype: 'combo',
                            cls: "share_Combobox",
                            width: 155,
                            labelWidth: 60,
                            editable: false,
                            fieldLabel: '数据类型',
                            queryMode: 'local',
                            store: Ext.create('MJWQ.store.SJLXStore'),
                            displayField: 'name',
                            valueField: 'type',
                            name: 'SJLX',
                            value: ''
                        },
                        {
                            xtype: 'combo',
                            cls: "share_Combobox",
                            width: 155,
                            labelWidth: 60,
                            editable: false,
                            fieldLabel: '视频质量',
                            queryMode: 'local',
                            store: Ext.create('MJWQ.store.SPZLStore'),
                            displayField: 'name',
                            valueField: 'type',
                            name: 'media_quality',
                            value: ''
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
                    id: 'mjwq_rccc_grid',
                    store: Ext.create('MJWQ.store.RCCCStore'),
                    columns: [
                        {
                            width: 60,
                            minWidth: 60,
                            align: "center",
                            header: '序号',
                            xtype: 'rownumberer'
                        },
                        {
                            header: '缩略图',
                            menuDisabled: true,
                            dataIndex: 'file_thumbnail',
                            align: 'center',
                            width: 200,
                            minWidth: 200,
                            renderer: this.renderImg
                            /*renderer: function(value){
                             return '<img src="' + value + '" width="150" height="100"/> '
                             }*/
                        },
                        {
                            header: '部门',
                            menuDisabled: true,
                            dataIndex: 'capture_unit',
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
                            header: '数据编号',
                            menuDisabled: true,
                            align: 'center',
                            dataIndex: 'SJDH',
                            minWidth: 120,
                            width: 120
                        },
                        {
                            header: '数据类型',
                            menuDisabled: true,
                            align: 'center',
                            dataIndex: 'SJLX',
                            minWidth: 100,
                            width: 100
                        },
                        {
                            header: '采集设备',
                            menuDisabled: true,
                            align: 'center',
                            dataIndex: 'capture_device',
                            minWidth: 100,
                            width: 100
                        },
                        {
                            header: '扣分情况',
                            menuDisabled: true,
                            align: 'center',
                            dataIndex: 'KFQK',
                            minWidth: 100,
                            width: 100
                        },
                        {
                            header: '操作',
                            menuDisabled: true,
                            align: 'center',
                            dataIndex: 'KFQK',
                            minWidth: 200,
                            width: 200,
                            xtype: 'actiontextcolumn',
                            items: [
                                {
                                    tooltip: '查看',
                                    text: '查看  ',
                                    cls: 'actionText',
                                    handler: function (obj, rowIndex, colIndex) {
                                        this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "play");
                                    }
                                },
                                {
                                    text: '下载  ',
                                    tooltip: '下载',
                                    cls: 'actionText',
                                    handler: function (grid, rowIndex, colIndex) {
                                        this.up("grid").fireEvent("itemClick", grid, rowIndex, colIndex, "donwload");
                                    }
                                },
                                {
                                    text: '证据保存  ',
                                    tooltip: '证据保存',
                                    cls: 'actionText',
                                    handler: function (grid, rowIndex, colIndex) {
                                        this.up("grid").fireEvent("itemClick", grid, rowIndex, colIndex, "save");
                                    }
                                },
                                {
                                    text: '评价打分',
                                    tooltip: '评价打分',
                                    cls: 'actionText',
                                    handler: function (grid, rowIndex, colIndex) {
                                        this.up("grid").fireEvent("itemClick", grid, rowIndex, colIndex, "valuing");
                                    }
                                }
                            ]
                        },
                        {
                            header: '视频质量',
                            menuDisabled: true,
                            align: 'center',
                            dataIndex: 'media_quality',
                            minWidth: 100,
                            width: 100
                        },
                        {
                            header: '比对结果',
                            menuDisabled: true,
                            align: 'center',
                            dataIndex: 'BDJG',
                            width: 100
                        },
                        {
                            header: '媒体类型',
                            menuDisabled: true,
                            align: 'center',
                            dataIndex: 'file_type',
                            flex: 1,
                            minWidth: 200,
                            width: 200
                        }
                    ]

                }
            ]
        }
    ],
    initComponent: function () {
        this.items[1].items[0].columns[1].renderer = this.renderImg
        this.callParent(arguments);

    },
    renderImg: function (value, metaData, record, rowIndex, colIndexview) {
        value = "app/MJWQ/resource/imgs/demo.jpg?rand=" + Math.random();

        var imgID = "imgID_" + rowIndex;

        setTimeout(function(){
            var img = new Image(); //创建一个Image对象，实现图片的预下载

            img.onerror = function () {
                var obj = document.getElementById(imgID);
                obj.setAttribute("src", "app/MJWQ/resource/imgs/error.gif");
            }

            img.onload = function () { //图片下载完毕时异步调用callback函数。
                var obj = document.getElementById(imgID);
                obj.setAttribute("src", value);
            }

            img.src = value;
        }, 1000);

        return '<img id="' + imgID + '" src="app/MJWQ/resource/imgs/loading.gif"/> '
    }
})
;


