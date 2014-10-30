/**
 * Created by qinwen on 14-2-13.
 */
Ext.define('YJYP.view.YJYPkqycmsgView', {
    extend: 'Ext.container.Container',
    width: 805,
    height: 350,
    bodyBorder: false,
    id: 'yjyp_window_kqyc_message',
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
                id: "yjyp_window_kqyc_xxxx",
                text: "详细信息"
            }]
        },{
            region:'west',
            border: 0,
            xtype: 'panel',
            width: 795,
            collapsible: false,
            layout: 'fit',
            items: [
                {
                    xtype: 'editgrid',
                    id:'yjyp_yjyp_kqyc_grid',
                    editable: false,
                    border: 0,
                    columnLines: true,
                    store: Ext.create('YJYP.store.YJYPKqycMsgStore'),
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
                            minWidth: 120,
                            menuDisabled:true,
                            dataIndex : 'RIQI',
                            flex : 2
                        }, {
                            header : '出勤时间',
                            align : 'center',
                            minWidth: 120,
                            menuDisabled:true,
                            dataIndex : 'CQSJ',
                            flex : 2,
                            renderer: function(value){
                                var hourValue = parseInt(value/3600);
                                var minuteValue = parseInt((value%3600)/60);
                                return hourValue + "小时 " + minuteValue + "分钟";
                            }
                        },{
                            header : '视频时长',
                            align : 'center',
                            minWidth: 110,
                            menuDisabled:true,
                            dataIndex : 'SPSC',
                            flex : 1,
                            renderer: function(value){
                                var hourValue = parseInt(value/3600);
                                var minuteValue = parseInt((value%3600)/60);
                                var secondValue = parseInt((value%3600)%60)
                                return hourValue + "时 " + minuteValue + "分" + secondValue + "秒";
                            }
                        }, {
                            header : '出勤比例',
                            align : 'center',
                            minWidth: 70,
                            menuDisabled:true,
                            dataIndex : 'CQBL',
                            flex : 1,
                            renderer: function(value){
                                return value.toFixed(2);
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