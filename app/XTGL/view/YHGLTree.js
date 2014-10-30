/**
 * Created by qinwen on 14-2-25.
 */

Ext.define('XTGL.view.YHGLTree', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.data.*',
        'Ext.tree.*'
    ],
    xtype: 'xtgl_yhgl_tree',
    border: false,
    height: 300,
    useArrows: true,
    rootVisible: false,
    showPolice: false,
    //singleExpand: true,
    store: Ext.create('XTGL.store.YHGLTREEStore'),

    initComponent: function () {
        var self = this;
        var store = this.getStore();
        if (store) {
            this.getStore().on("load", function (obj, node, records, successful, eOpts) {
                L(node);
                if (false == successful) {
                    L('加载数据错误');
                }
            }, this);
        }

        this.callParent(arguments);
    }

})

