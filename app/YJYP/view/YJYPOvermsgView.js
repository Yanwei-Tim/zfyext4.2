/**
 * Created by qinwen on 14-2-13.
 */
Ext.define('YJYP.view.YJYPOvermsgView', {
    extend: 'Ext.container.Container',
    width: 805,
    height: 350,
    bodyBorder: false,
    id: 'yjyp_window_over_message',
    defaults: {
        collapsible: false,
        split: false,
        bodyPadding: 0,
        border: 0
    },
    layout: 'border',
    items: [{
        region:'center',
        border: 0,
        layout: 'border',
        items: [{
            region: 'north',
            border: 0,
            height:40,
            items: [{
                xtype: "label",
                style: 'background:#fff;font: 14px Arial;line-height:40px;margin-left:10px',
                id: "yjyp_window_over_xxxx",
                text: "详细信息"
            }]
        },{
            region:'west',
            border: 0,
            xtype: 'panel',
            width: 790,
            collapsible: false,
            layout: 'fit',
            items: [
                {
                    xtype: 'editgrid',
                    id:'yjyp_yjyp_over_grid',
                    editable: false,
                    border: 0,
                    columnLines: true,
                    store: Ext.create('YJYP.store.YJYPOverMsgStore'),
                    columns: [
                        {
                            width: 60,
                            header: '序号',
                            align: 'center',
                            minWidth: 60,
                            menuDisabled:true,
                            xtype: 'rownumberer'
                        },
                        {
                            header : 'id',
                            dataIndex : 'id',
                            align : 'center',
                            hidden:true
                        }, {
                            header : '民警部门',
                            align : 'center',
                            minWidth: 140,
                            menuDisabled:true,
                            dataIndex : 'JGMC',
                            flex : 2
                        }, {
                            header : '民警姓名',
                            dataIndex : 'MJMC',
                            align : 'center',
                            minWidth: 70,
                            menuDisabled:true,
                            flex : 1
                        }, {
                            header : '民警警号',
                            align : 'center',
                            minWidth: 70,
                            menuDisabled:true,
                            dataIndex : 'MJJH',
                            flex : 1
                        },{
                            header : '日期',
                            align : 'center',
                            minWidth: 140,
                            menuDisabled:true,
                            dataIndex : 'DATE',
                            flex : 2
                        }, {
                            header : '数据单号',
                            align : 'center',
                            minWidth: 140,
                            menuDisabled:true,
                            dataIndex : 'SJDH',
                            flex : 2,
                            renderer: function(value){
                                return value;
                            }
                        }
                    ],
                    listeners: {
                        single: true
                    }
            }]
        }]
    }]

});