/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('XTGL.view.ZFJLYGLView', {
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
                    id: 'xtgl_zfjlygl_search_form',
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
                        Ext.create('Share.view.TreeCombo',{
                            editable:false,
                            id: 'xtgl_zfjlygl_org'
                        }),
                        {
                            xtype: 'textfield',
                            width: 205,
                            name: 'manufacturer',
                            labelWidth: 60,
                            fieldLabel: '厂商'
                        },
                        {
                            xtype: 'datefield',
                            width: 200,
                            labelWidth: 80,
                            fieldLabel: '注册时间',
                            editable:false,
                            format: 'Y-m-d',
                            id: 'zfyfromDate',
                            value: new Date(),
                            maxValue: new Date(),
                            emptyText: '请选择',
                            cls: "share_DateSelect",
                            name: 'start_date',
                            vtype: 'daterange',
                            toDateId: 'zfytoDate'
                        },
                        {
                            xtype: 'datefield',
                            width: 135,
                            labelWidth: 15,
                            fieldLabel: '至',
                            editable:false,
                            format: 'Y-m-d',
                            labelSeparator: '',
                            id: 'zfytoDate',
                            name: 'end_date',
                            emptyText: '请选择',
                            cls: "share_DateSelect",
                            value: new Date(),
                            maxValue: new Date(),
                            vtype: 'daterange',
                            fromDateId: 'zfyfromDate'
                        },
                        {
                            xtype: 'button',
                            id: 'xtgl_zfjlygl_search_btn',
                            width: 70,
                            text: '查询',
                            margin: '0 0 0 26'
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
                    //cls: 'xtgl_zfjlygl_grid',
                    id: 'xtgl_zfjlygl_grid',
                    store: Ext.create('XTGL.store.ZFJLYGLStore'),
                    columns: [
                        {
                            align: 'center',
                            width     : 140,
                            text     : 'id',
                            hidden: true,
                            sortable : true,
                            minWidth: 140,
                            menuDisabled:true,
                            dataIndex: 'guid'
                        },
                        {
                            width: 60,
                            header: '序号',
                            align: 'center',
                            menuDisabled:true,
                            xtype: 'rownumberer',
                            minWidth: 60
                        },{
                            align: 'center',
                            width     : 150,
                            text     : '警员',
                            sortable : true,
                            minWidth: 150,
                            menuDisabled:true,
                            dataIndex: 'police_name',
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        },{
                            align: 'center',
                            width     : 150,
                            text     : '所属单位',
                            sortable : true,
                            minWidth: 150,
                            menuDisabled:true,
                            dataIndex: 'dep_name',
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        },{
                            align: 'center',
                            width     : 140,
                            text     : '硬件序列号',
                            sortable : true,
                            minWidth: 140,
                            menuDisabled:true,
                            dataIndex: 'sn',
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        },{
                            align: 'center',
                            width     : 140,
                            text     : '容量(MB)',
                            sortable : true,
                            minWidth: 140,
                            menuDisabled:true,
                            dataIndex: 'capacity',
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        },{
                            align: 'center',
                            flex     : 1,
                            text     : '厂商',
                            sortable : true,
                            minWidth: 230,
                            menuDisabled:true,
                            dataIndex: 'manufacturer',
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        },{
                            align: 'center',
                            flex     : 1,
                            text     : '产品名称',
                            sortable : true,
                            minWidth: 165,
                            menuDisabled:true,
                            dataIndex: 'product_id',
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        },/*{
                            align: 'center',
                            flex     : 1,
                            text     : '设备状态',
                            sortable : true,
                            minWidth: 165,
                            menuDisabled:true,
                            dataIndex: 'status'
                        },*/{
                            align: 'center',
                            flex     : 1,
                            text     : '上次使用时间',
                            sortable : true,
                            minWidth: 165,
                            menuDisabled:true,
                            dataIndex: 'last_use_time',
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        },{
                            align: 'center',
                            flex     : 1,
                            text     : '注册时间',
                            sortable : true,
                            minWidth: 165,
                            menuDisabled:true,
                            dataIndex: 'register_time',
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        },{
                            align: 'center',
                            flex     : 1,
                            text     : '接入次数',
                            sortable : true,
                            minWidth: 165,
                            menuDisabled:true,
                            dataIndex: 'import_times',
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        },{
                            align: 'center',
                            width     : 140,
                            text     : '操作',
                            //xtype: 'actioncolumn',
                            sortable : true,
                            minWidth: 140,
                            menuDisabled:true,
                            dataIndex: 'dev_sn',
                            id:'devOperate',
                            xtype: 'actiontextcolumn',
                            items: [{
                                tooltip: '删除',
                                text: '删除',
                                cls: 'actionText',
                                hidden: true,
                                id: 'teststs',
                                handler: function (obj, rowIndex, colIndex) {
                                    this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "delete_zfjly");
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


