Ext.define('ZFJD.view.YCJDViewZFWSP', {
    extend: 'Share.view.EditGrid',
    editable: false,
    store: Ext.create('ZFJD.store.YCJDStore3'),
    columns: [
        {
            width: 60,
            minWidth: 60,
            align: "center",
            header: '序号',
            xtype: 'rownumberer'
        },
        {
            header: '单位',
            width: 160,
            minWidth: 160,
            dataIndex: 'JGMC',
            align: 'center',
            menuDisabled: true
        },
        {
            header: '警员名称(警号)',
            align: 'center',
            width: 144,
            minWidth: 144,
            dataIndex: 'capture',
            menuDisabled: true
        },
        {
            header: '数据编号',
            align: 'center',
            width: 160,
            minWidth: 160,
            dataIndex: 'SJDH',
            menuDisabled: true
        },
        {
            header: '数据详情',
            align: 'center',
            width: 88,
            minWidth: 88,
            dataIndex: 'dataDetial',
            menuDisabled: true,
            xtype: 'actiontextcolumn',
            items: [
                {
                    tooltip: '查看',
                    text: '查看',
                    cls: 'actionText',
                    handler: function (obj, rowIndex, colIndex) {
                        this.up("grid").fireEvent("actionItemClick", obj, rowIndex, colIndex, "look");
                    }
                }
            ]
        },
        {
            header: '违法时间',
            align: 'center',
            width: 171,
            minWidth: 171,
            dataIndex: 'WFSJ',
            menuDisabled: true
        },
        {
            header: '当事人',
            align: 'center',
            width: 88,
            minWidth: 88,
            dataIndex: 'DSR',
            menuDisabled: true
        },
        {
            header: '号牌号码',
            align: 'center',
            width: 110,
            minWidth: 110,
            dataIndex: 'HPHM',
            menuDisabled: true
        },
        {
            header: '违法地点',
            align: 'center',
            width: 130,
            minWidth: 130,
            dataIndex: 'WFDD',
            menuDisabled: true
        },
        {
            header: '扣分情况',
            align: 'center',
            width: 88,
            minWidth: 88,
            dataIndex: 'KFQK',
            menuDisabled: true
        },
        {
            header: '核查处理',
            align: 'center',
            width: 100,
            minWidth: 100,
            menuDisabled: true,
            flex: 1,
            xtype: 'actiontextcolumn',
            items: [
                {
                    tooltip: '核查处理',
                    text: '核查处理',
                    cls: 'actionText',
                    handler: function (obj, rowIndex, colIndex) {
                        this.up("grid").fireEvent("actionItemClick", obj, rowIndex, colIndex, "check");
                    }
                }
            ]
        }
    ]
});