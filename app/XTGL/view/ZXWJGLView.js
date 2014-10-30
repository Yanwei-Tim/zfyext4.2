/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('XTGL.view.ZXWJGLView', {
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
                            id:"xtgl_zxwjgl_addzxwj",
                            text: '添加服务器',
                            margin: '0 0 0 6'
                        },
                        {
                            xtype: 'button',
                            align: 'right',
                            id:"xtgl_zxwjgl_freshzxwj",
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
                    id: 'xtgl_zxwjgl_grid',
                    store: Ext.create('XTGL.store.ZXWJGLStore'),
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
                        },
                        {
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
                            flex     : 1,
                            text     : '在线状态',
                            sortable : true,
                            minWidth: 150,
                            menuDisabled:true,
                            dataIndex: 'line_status',
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else if("离线" == value){
                                    return "<div style='color: red'>" + value + "</div>";
                                }else {
                                    return  value;
                                }
                            }
                        },{
                            align: 'center',
                            flex     : 2,
                            text     : '服务器状态',
                            sortable : true,
                            minWidth: 150,
                            menuDisabled:true,
                            dataIndex: 'status',
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else if(0 == value || "0" == value){
                                    return "空闲";
                                } else if(1 == value || "1" == value){
                                    return "忙碌";
                                }
                            }
                        },{
                            align: 'center',
                            flex     : 1,
                            text     : '最大传输速度（MB/S）',
                            sortable : true,
                            minWidth: 200,
                            menuDisabled:true,
                            dataIndex: 'max_speed',
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
                            text     : '工作开始时间',
                            sortable : true,
                            minWidth: 150,
                            menuDisabled:true,
                            dataIndex: 'worktime_begin',
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
                            text     : '工作结束时间',
                            sortable : true,
                            minWidth: 150,
                            menuDisabled:true,
                            dataIndex: 'worktime_end',
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        },{
                            align: 'center',
                            width     : 200,
                            text     : '操作',
                            sortable : true,
                            minWidth: 200,
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
                                    tooltip: '状态显示', //设备刚接入时为禁用状态，有启用按钮，改成启用状态后，有禁用按钮
                                    text: '状态显示  ',
                                    cls: 'actionText',
                                    handler: function (obj, rowIndex, colIndex) {
                                        //this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "showStatus");
                                    }
                                },{
                                    tooltip: '分配工作站', //设备刚接入时为禁用状态，有启用按钮，改成启用状态后，有禁用按钮
                                    text: '分配工作站',
                                    cls: 'actionText',
                                    handler: function (obj, rowIndex, colIndex) {
                                        this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "assignWs");
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


