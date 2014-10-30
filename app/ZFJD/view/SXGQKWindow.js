Ext.define('ZFJD.view.SXGQKWindow', {
    extend: 'Share.view.PopupWindow',
    width: 745,
    height: 500,
    title: "上下岗情况",
    requires: ['Share.view.EditGrid'],                  //加载统一表格
    layout: "fit",
    items:[
        {
            xtype: "editgrid",
            id:"zfjd_ycjd_sxgqk_grid",
            editable: false,
            store: Ext.create('ZFJD.store.SXGQKStore'),
            columns: [
                {
                    xtype: 'rownumberer',
                    width: 60,
                    minWidth: 60,
                    header: '序号',
                    align: "center",
                    menuDisabled: true
                },{
                    header: '民警警号',
                    align: 'center',
                    dataIndex: 'MJJH',
                    width: 100,
                    minWidth: 100,
                    menuDisabled: true
                },{
                    header: '民警名称',
                    align: 'center',
                    dataIndex: 'MJMC',
                    width: 100,
                    minWidth: 100,
                    menuDisabled: true
                },{
                    header: '机构名称',
                    align: 'center',
                    dataIndex: 'JGMC',
                    width: 100,
                    minWidth: 100,
                    menuDisabled: true
                },{
                    header: '时间',
                    align: 'center',
                    dataIndex: 'PSSJ',
                    width: 100,
                    minWidth: 100,
                    menuDisabled: true
                },{
                    header: '类型',
                    align: 'center',
                    dataIndex: 'ZPLX',
                    width: 100,
                    minWidth: 100,
                    menuDisabled: true
                }
            ]
        }
    ]
});