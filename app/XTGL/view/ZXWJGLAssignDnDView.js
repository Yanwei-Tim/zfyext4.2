/**
 * Created by qinwen on 14-3-5.
 */
Ext.define('XTGL.model.dd.Simple', {
    extend: 'Ext.data.Model',
    fields: ['name', 'sid']
});
Ext.define('XTGL.view.ZXWJGLAssignDnDView', {
    extend: 'Ext.container.Container',

    requires: [
        'Ext.grid.*',
        'Ext.layout.container.HBox'
    ],
    xtype: 'dd-grid-to-grid',

    width: 650,
    height: 300,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function(){
        var group1 = this.id + 'group1',
            group2 = this.id + 'group2',
            columns1 = [
                {
                    text: '已分配工作站sid',
                    flex: 1,
                    sortable: true,
                    menuDisabled:true,
                    fixed :true,
                    dataIndex:'sid'
                },
                {
                    text: '名称',
                    flex: 1,
                    sortable: true,
                    menuDisabled:true,
                    fixed :true,
                    dataIndex: 'name'
                }
            ],
            columns2 = [
                {
                    text: '未分配工作站sid',
                    flex: 1,
                    sortable: true,
                    menuDisabled:true,
                    fixed :true,
                    dataIndex:'sid'
                },
                {
                    text: '名称',
                    flex: 1,
                    sortable: true,
                    menuDisabled:true,
                    fixed :true,
                    dataIndex: 'name'
                }
            ];

        this.items = [{
            itemId: 'zxwjgl_assigned_grid',
            flex: 1,
            xtype: 'grid',
            header:false,
            border: 1,
            multiSelect: true,
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: group1,
                    dropGroup: group2
                },
                listeners: {
                    drop: function(node, data, dropRec, dropPosition) {
                        var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' 空';
                        //Ext.Msg.alert('提示', '从空闲到分配 ' + data.records[0].get('name') + dropOn);
                    }
                }
            },
            store: Ext.create('XTGL.store.ZXWJGLWsStore'),
            columns: columns1,
            stripeRows: true,
            margins: '0 0 0 0'
        }, {
            itemId: 'zxwjgl_unassign_grid',
            flex: 1,
            xtype: 'grid',
            header: false,
            border: 1,
            multiSelect: true,
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: group2,
                    dropGroup: group1
                },
                listeners: {
                    drop: function(node, data, dropRec, dropPosition) {
                        var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' 空';
                        //Ext.Msg.alert('提示', '从空闲到分配 ' + data.records[0].get('name') + dropOn);
                    }
                }
            },
            store: Ext.create('XTGL.store.CJGZZGLStore'),
            columns: columns2,
            stripeRows: true
        }];

        this.callParent();
    }
});