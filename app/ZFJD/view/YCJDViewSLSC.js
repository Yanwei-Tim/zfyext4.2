Ext.define('ZFJD.view.YCJDViewSLSC', {
    extend: 'Share.view.EditGrid',
    editable: false,
    store: Ext.create('ZFJD.store.YCJDStore2'),
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
            dataIndex: 'JGMC',
            align: 'center',
            width: 200,
            minWidth: 200,
            menuDisabled: true
        },
        {
            header: '警员名称(警号)',
            align: 'center',
            width: 130,
            minWidth: 130,
            dataIndex: 'capture',
            menuDisabled: true
        },
        {
            header: '日期',
            align: 'center',
            width: 120,
            minWidth: 120,
            dataIndex: 'RIQI',
            menuDisabled: true
        },
        {
            header: '上岗时长(小时)',
            align: 'center',
            width: 120,
            minWidth: 120,
            dataIndex: 'CQSJ',
            menuDisabled: true
        },
        {
            header: '上下岗记录',
            align: 'center',
            width: 88,
            minWidth: 88,
            menuDisabled: true,
            xtype: 'actiontextcolumn',
            items: [
                {
                    tooltip: '上下岗情况',
                    text: '上下岗情况',
                    cls: 'actionText',
                    handler: function (obj, rowIndex, colIndex) {
                        this.up("grid").fireEvent("actionItemClick", obj, rowIndex, colIndex, "SXGQK");
                    }
                }
            ]
        },
        {
            header: '摄录时长(小时)',
            align: 'center',
            width: 115,
            minWidth: 115,
            dataIndex: 'SLSC',
            menuDisabled: true
        },
        {
            header: '摄录比例',
            align: 'center',
            width: 100,
            minWidth: 100,
            dataIndex: 'CQBL',
            menuDisabled: true
        },
        {
            header: '扣分情况',
            align: 'center',
            width: 100,
            minWidth: 100,
            dataIndex: 'KFQK',
            menuDisabled: true
        },
        {
            header: '核查处理',
            align: 'center',
            width: 88,
            minWidth: 88,
            flex: 1,
            menuDisabled: true,
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