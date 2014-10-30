Ext.define('ZFJD.view.YCJDViewSFZLXCF', {
    extend: 'Share.view.EditGrid',
    editable: false,
    store: Ext.create('ZFJD.store.YCJDStore1'),
    columns: [
        {
            xtype: 'rownumberer',
            width: 60,
            minWidth: 60,
            header: '序号',
            align: "center",
            menuDisabled: true
        },
        {
            header: '警员名称(警号)',
            align: 'center',
            dataIndex: 'capture',
            width: 130,
            minWidth: 130,
            menuDisabled: true
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
            header: '第一单时间',
            align: 'center',
            dataIndex: 'DATE',
            width: 166,
            minWidth: 166,
            menuDisabled: true
        },
        {
            header: '数据编号',
            flex: 1,
            align: 'center',
            dataIndex: 'SJDHS',
            width: 245,
            minWidth: 245,
            menuDisabled: true
        },
        {
            header: '罚单数',
            align: 'center',
            dataIndex: 'SJDHNum',
            width: 72,
            minWidth: 72,
            menuDisabled: true
        },
        {
            header: '数据详情',
            align: 'center',
            dataIndex: 'SJDH',
            width: 108,
            minWidth: 108,
            menuDisabled: true,
            xtype: 'actiontextcolumn',
            items: [
                {
                    tooltip: '查看',
                    text: '查看 ',
                    cls: 'actionText',
                    handler: function (obj, rowIndex, colIndex) {
                        this.up("grid").fireEvent("actionItemClick", obj, rowIndex, colIndex, "look");
                    }
                }
            ]
        },
        {
            header: '播放视频',
            align: 'center',
            width: 108,
            minWidth: 108,
            menuDisabled: true,
            xtype: 'actiontextcolumn',
            items: [
                {
                    tooltip: '播放',
                    text: '播放',
                    getClass: function(v, meta, record) {
                        var SJDH = record.get('SJDH');
                        var WJIDCount = 0;
                        for(var i=0; i<SJDH.length; i++){
                            if(0 == SJDH[i].WJID)
                                continue;

                            WJIDCount++;
                        }

                        this.items[0].tooltip = '播放';
                        record.disablePlay = false;

                        if(0 != WJIDCount)
                            return "actionText";

                        this.items[0].tooltip = '';
                        record.disablePlay = true;
                        return "disablePlay";
                    },

                    handler: function (obj, rowIndex, colIndex) {
                        var store = obj.getStore();
                        var record = store.getAt(rowIndex);
                        if(true == record.disablePlay)
                            return;

                        this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "plays");
                    }
                }
            ]
        },
        {
            header: '扣分情况',
            align: 'center',
            dataIndex: 'KFQK',
            width: 108,
            minWidth: 108,
            menuDisabled: true
        },
        {
            header: '核查处理',
            align: 'center',
            dataIndex: 'HCCL',
            width: 108,
            minWidth: 108,
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