/**
 * Created by yongzhi.zhan on 14-2-11.
 */
Ext.Loader.setPath('Ext.ux', 'app/Share/ux');
Ext.define('Share.view.TreeCombo', {
    extend: 'Ext.ux.TreeCombo',
    xtype: "TreeCombo",
    showPolice: false,
    rootVisible: false,
    org_val:null,
    width:180,
    treeWidth: 180,
    treeHeight: 200,
    allowBlank : false,
    emptyText : "请输入警员编号",
    initComponent: function () {
        this.callParent(arguments);
        var me = this;
        me.tree = Ext.create('Ext.tree.Panel', {
            alias: 'widget.assetstree',
            hidden: true,
            minHeight: 300,
            rootVisible: (typeof me.rootVisible != 'undefined') ? me.rootVisible : true,
            floating: true,
            useArrows: false,
            width: me.treeWidth,
            autoScroll: false,
            height: me.treeHeight,
            cls: "Share_OrgTree",
            singleExpand: true,
            store: Ext.create('Ext.data.TreeStore', {
                autoLoad: true,
                proxy: {
                    type: 'rest',
                    url: '/gmvcs/rest/orgSelect',
                    extraParams: {showPolice: me.showPolice}
                }
            }),

            listeners: {
                load: function (store, records) {
                    var tree = this;
                    /*设置默认值*/
                    me.org_val = records.firstChild;
                    me.val = me.org_val.getId();
                    me.setValue(me.org_val.getId());
                },
                itemclick: function (view, record, item, index, e, eOpts) {
                    me.org_val = record;
                    me.val = record.getId();
                    me.itemTreeClick(view, record, item, index, e, eOpts, me);
                    this.getSelectionModel().select(record, true);/*设置选中状态*/
                    me.collapse();
                }
                //tree.fireEvent('itemclick', tree, node.firstChild, 1, 0);
            }
        });
        me.on('expand', function (field, eOpts) {
            /*默认值选中状态*/
            me.tree.getSelectionModel().select(me.org_val, true);
        })
    }
});
