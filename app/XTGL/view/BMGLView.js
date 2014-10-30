/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('XTGL.view.BMGLView', {
    extend: 'Ext.container.Container',
    bodyBorder: false,
    defaults: {
        collapsible: false,
        split: false,
        bodyPadding: 0,
        border: 0
    },
    requires: ['Share.view.EditGrid', 'Share.view.ActionTextColumn', 'XTGL.view.BMGLTreeGrid'],
    layout: 'border',
    items: [
        {
            region: 'north',
            xtype: 'panel',
            items: [
                {
                    xtype: 'form',
                    id: "xtgl_bmgl_search_form",
                    cls: 'conditionPanel',
                    height: 42,
                    border: 0,
                    bodyBorder: false,
                    layout: 'hbox',
                    defaults: {
                        labelStyle: 'font-weight:bold',
                        margin: '0 10 0 0'
                    },
                    items:[
                        {
                            xtype: 'combo',
                            cls: "share_Combobox",
                            width: 200,
                            labelWidth: 60,
                            editable: false,
                            fieldLabel: '显示类型',
                            queryMode: 'local',
                            store: Ext.create('Ext.data.Store',{
                                fields: ['type', 'name'],
                                data: [
                                    {"type": 0, "name": "显示所有"},
                                    {"type": 1, "name": "不显示隐藏"}
                                ]
                            }),
                            displayField: 'name',
                            valueField: 'type',
                            name: 'type',
                            value: '',
                            listeners : {
                                afterRender : function(combo) {
                                    combo.setValue(0);
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            id:"xtgl_bmgl_search",
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
            cls: 'xtgl_bmyhgl_gridcls',
            items: {
                xtype: 'xtgl_bmgl_treegrid',
                id: 'xtgl_bmgl_treegrid',
                store: Ext.create('XTGL.store.BMGLStore'),
                columns: [{
                    xtype: 'treecolumn', //this is so we know which column will show the tree
                    text: '部门名称',
                    menuDisabled:true,
                    width: 400,
                    minWidth: 400,
                    sortable: true,
                    dataIndex: 'bmmc'
                },{
                    text: '部门编号',
                    align: 'center',
                    flex: 1,
                    minWidth: 140,
                    menuDisabled:true,
                    dataIndex: 'bmbh',
                    sortable: true,
                    renderer:function(value){
                        if(""  == value)
                            return "（无）";

                        return value;
                    }
                },{
                    text: '父部门编号',
                    align: 'center',
                    hidden: true,
                    minWidth: 140,
                    menuDisabled:true,
                    dataIndex: 'pid',
                    sortable: true
                },{
                    text: '部门序号',
                    align: 'center',
                    flex: 1,
                    minWidth: 140,
                    menuDisabled:true,
                    dataIndex: 'bmpx',
                    sortable: true,
                    renderer:function(value){
                        if(""  == value)
                            return "0";

                        return value;
                    }
                },{
                    text: '操作',
                    flex: 1,
                    minWidth: 240,
                    align: 'center',
                    menuDisabled:true,
                    sortable: true,
                    xtype: 'actiontextcolumn',
                    items: [
                        {
                            text: '增加子部门  ',
                            tooltip: '增加子部门',
                            cls: 'actionText',
                            handler: function (grid, rowIndex, colIndex) {
                                this.up("xtgl_bmgl_treegrid").fireEvent("actionItemClick", grid, rowIndex, colIndex, "add");
                            }
                        },
                        {
                            text: '编辑  ',
                            tooltip: '编辑',
                            cls: 'actionText',
                            handler: function (grid, rowIndex, colIndex) {
                                this.up("xtgl_bmgl_treegrid").fireEvent("actionItemClick", grid, rowIndex, colIndex, "edit");
                            }
                        },
                        {
                            text: '删除  ',
                            tooltip: '删除',
                            cls: 'actionText',
                            handler: function (grid, rowIndex, colIndex) {
                                this.up("xtgl_bmgl_treegrid").fireEvent("actionItemClick", grid, rowIndex, colIndex, "delete");
                            }
                        },
                        {
                           // cls: 'actionText',

                            getText: function(v, meta, rec){
                                if(!rec.raw.isHide){
                                    return "隐藏";
                                }
                                return "显示";
                            },
                            getClass: function (v, meta, record) {
                                record.disableDownload = false;
                                if (record.get("show") == undefined)
                                    return "actionText";

                                record.disableDownload = true;
                                return "disablePlay";
                            },
                            handler: function (obj, rowIndex, colIndex) {
                                var store = obj.getStore();
                                var record = store.getAt(rowIndex);
                                if (true == record.disableDownload)
                                    return;
                                this.up("xtgl_bmgl_treegrid").fireEvent("actionItemClick", obj, rowIndex, colIndex, "hide");
                            }

                        }
                    ]
                }]
            }
        }
    ]

});


