/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('XTGL.view.CJGZZGLView', {
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
                    xtype: 'panel',
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
                            xtype: 'button',
                            id:"xtgl_cjgzzgl_addgzz",
                            text: '添加工作站',
                            margin: '0 0 0 6'
                        },
                        {
                            xtype: 'button',
                            align: 'right',
                            id:"xtgl_cjgzzgl_freshgzz",
                            text: '刷新状态',
                            margin: '0 6 0 6'
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
                    id: 'xtgl_cjgzzgl_grid',
                    store: Ext.create('XTGL.store.CJGZZGLStore'),
                    columns: [
                        {
                            align: 'center',
                            flex     : 2,
                            text     : '编号',
                            sortable : true,
                            minWidth: 150,
                            menuDisabled:true,
                            dataIndex: 'sid',
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        },{
                            align: 'center',
                            flex     : 2,
                            text     : '名称',
                            sortable : true,
                            minWidth: 150,
                            menuDisabled:true,
                            dataIndex: 'name',
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
                            text     : '所属单位',
                            hidden: true,
                            sortable : true,
                            minWidth: 190,
                            menuDisabled:true,
                            dataIndex: 'dep_code',
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
                            text     : '所属单位',
                            sortable : true,
                            minWidth: 190,
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
                            flex     : 2,
                            text     : 'IP地址',
                            sortable : true,
                            minWidth: 150,
                            menuDisabled:true,
                            dataIndex: 'ip',
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        },{
                            align: 'center',
                            flex     : 2,
                            text     : '在线状态',
                            sortable : true,
                            minWidth: 80,
                            menuDisabled:true,
                            dataIndex: 'line_status',
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else if("离线" == value){
                                    return "<div style='color: red'>" + value + "</div>";
                                } else {
                                    return  value;
                                }
                            }
                        },{
                            align: 'center',
                            flex     : 2,
                            text     : 'CPU使用(%)',
                            sortable : true,
                            minWidth: 80,
                            menuDisabled:true,
                            dataIndex: 'cpu',
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        },{
                            align: 'center',
                            flex     : 2,
                            text     : '内存占用(%)',
                            sortable : true,
                            minWidth: 90,
                            menuDisabled:true,
                            dataIndex: 'ram',
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        },{
                            align: 'center',
                            flex     : 2,
                            text     : '磁盘容量(GB)',
                            sortable : true,
                            minWidth: 90,
                            menuDisabled:true,
                            dataIndex: 'total_disk',
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        },{
                            align: 'center',
                            flex     : 2,
                            text     : '剩余空间(GB)',
                            sortable : true,
                            minWidth: 90,
                            menuDisabled:true,
                            dataIndex: 'used_disk',
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        },{
                            align: 'center',
                            flex     : 2,
                            text     : '网络(bps)',
                            sortable : true,
                            minWidth: 80,
                            menuDisabled:true,
                            dataIndex: 'network',
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
                            text     : '负责人',
                            sortable : true,
                            minWidth: 80,
                            menuDisabled:true,
                            dataIndex: 'admin',
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
                            text     : '联系电话',
                            sortable : true,
                            minWidth: 80,
                            menuDisabled:true,
                            dataIndex: 'phone',
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
                            text     : '工作站地址',
                            sortable : true,
                            minWidth: 150,
                            menuDisabled:true,
                            dataIndex: 'address',
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
                            text     : '客服电话',
                            sortable : true,
                            minWidth: 80,
                            menuDisabled:true,
                            dataIndex: 'service_phone',
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        },{
                            align: 'center',
                            width     : 180,
                            text     : '操作',
                            sortable : true,
                            minWidth: 180,
                            menuDisabled:true,
                            dataIndex: 'operate',
                            xtype: 'actiontextcolumn',
                            items: [
                                {
                                    tooltip: '编辑', //设备刚接入时为禁用状态，有启用按钮，改成启用状态后，有禁用按钮
                                    text: '编辑  ',
                                    cls: 'actionText',
                                    handler: function (obj, rowIndex, colIndex) {
                                        this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "edit");
                                    }
                                },{
                                    tooltip: '删除', //设备刚接入时为禁用状态，有启用按钮，改成启用状态后，有禁用按钮
                                    text: '删除  ',
                                    cls: 'actionText',
                                    handler: function (obj, rowIndex, colIndex) {
                                        this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "delete");
                                    }
                                },{
                                    tooltip: '策略配置', //设备刚接入时为禁用状态，有启用按钮，改成启用状态后，有禁用按钮
                                    text: '策略配置  ',
                                    cls: 'actionText',
                                    handler: function (obj, rowIndex, colIndex) {
                                        this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "config");
                                    }
                                },{
                                    tooltip: '状态显示', //设备刚接入时为禁用状态，有启用按钮，改成启用状态后，有禁用按钮
                                    text: '状态显示',
                                    cls: 'actionText',
                                    handler: function (obj, rowIndex, colIndex) {
                                        //this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "showStatus");
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


