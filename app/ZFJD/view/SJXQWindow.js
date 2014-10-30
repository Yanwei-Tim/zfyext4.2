Ext.define('ZFJD.view.SJXQWindow', {
    extend: 'Share.view.PopupWindow',
    width: 745,
    height: 500,
    title: "数据详情",
    requires: ['Share.view.EditGrid'],                  //加载统一表格
    layout: "fit",
    items:[
        {
            xtype: "editgrid",
            id:"zfjd_ycjd_sjxq_grid",
            editable: false,
            store: Ext.create('ZFJD.store.SJXQStore'),
            columns: [
                {
                    xtype: 'rownumberer',
                    width: 60,
                    minWidth: 60,
                    header: '序号',
                    align: "center",
                    menuDisabled: true
                },{
                    header: '数据单号',
                    align: 'center',
                    dataIndex: 'SJDH',
                    width: 160,
                    minWidth: 160,
                    menuDisabled: true
                },{
                    header: '数据类型',
                    align: 'center',
                    dataIndex: 'SJLX',
                    width: 95,
                    minWidth: 95,
                    menuDisabled: true
                },{
                    header: '违法时间',
                    align: 'center',
                    dataIndex: 'WFSJ',
                    width: 180,
                    minWidth: 180,
                    menuDisabled: true
                },{
                    header: '违法地点',
                    align: 'center',
                    dataIndex: 'WFDD',
                    width: 150,
                    minWidth: 150,
                    menuDisabled: true
                },{
                    header: '当事人',
                    align: 'center',
                    dataIndex: 'DSR',
                    width: 95,
                    minWidth: 95,
                    menuDisabled: true
                },{
                    header: '驾驶证号',
                    align: 'center',
                    dataIndex: 'JSZH',
                    width: 150,
                    minWidth: 150,
                    menuDisabled: true
                },{
                    header: '号牌号码',
                    align: 'center',
                    dataIndex: 'HPHM',
                    width: 100,
                    minWidth: 100,
                    menuDisabled: true
                },{
                    header: '违法类型',
                    align: 'center',
                    dataIndex: 'WFLX',
                    width: 100,
                    minWidth: 100,
                    menuDisabled: true
                },{
                    header: '处罚情况',
                    align: 'center',
                    dataIndex: 'CFQK',
                    width: 100,
                    minWidth: 100,
                    menuDisabled: true
                }
            ]
        }
    ]
});