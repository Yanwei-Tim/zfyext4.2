/**
 * Created by yongzhi.zhan on 14-2-11.
 */
Ext.define('Share.view.OrgSelectMenu', {
    extend: 'Ext.menu.Menu',
    cls: "share_OrgSelectMenu",
    xtype: "OrgSelectMenu",
    plain: true,
    border: 0,
    layout: 'fit',
    showPolice: true,
    showHideOrg: false,

    initComponent: function () {
        var self = this;
        this.items = [
            Ext.create("Ext.tree.Panel", {
                width: 200,
                height: 340,
                cls: "Share_OrgTree",
                singleExpand: true,
                store: Ext.create('Ext.data.TreeStore', {
                    autoLoad: true,
                    proxy: {
                        type: 'rest',
                        url: '/gmvcs/rest/orgSelect',
                        extraParams: {showPolice: self.showPolice,showHideOrg: self.showHideOrg}
                    }
                }),
                rootVisible: false
            })
        ];

        this.callParent(arguments);
    }
});
