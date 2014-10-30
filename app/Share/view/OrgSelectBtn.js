/**
 * Created by yongzhi.zhan on 14-2-11.
 */
Ext.define('Share.view.OrgSelectBtn', {
    extend: 'Ext.button.Button',
    alias: 'widget.orgSelectBtn',
    cls: "share_OrgSelectBtn",
    border:0,
    width: 139,
    height: 22,
    val:null,
    org_val:null,
    orgSelectMenu: null,
    showPolice: true,
    tree:null,
    initComponent: function () {
        this.callParent(arguments);
        this.initOrg();
    },

    //初始化机构
    initOrg: function(){
        var self = this;

        self.orgSelectMenu = Ext.create("Share.view.OrgSelectMenu", {showPolice: this.showPolice});

        //设置树信息
        var snode = null;
        this.tree = self.orgSelectMenu.items.first();
        var tree = this.tree;
        tree.on("itemclick", function(obj, node, index, eOpts){
            snode = node;
            self.setText(snode.get('text'));
            self.val = snode.getId();
            self.org_val = snode;
            self.fireEvent("onOrgSelect", self, snode, index, eOpts);
            self.orgSelectMenu.hide();
        });

        tree.on('load', function( obj, node, records, successful, eOpts ){
            if(!node.firstChild)
                return;

            tree.fireEvent('itemclick', tree, node.firstChild, 1, 0);
        });

        self.on('click', function(obj){
            self.orgSelectMenu.showAt(obj.getX(), obj.getY() + obj.getHeight() + 2);

            tree.getSelectionModel().select(snode,true);

        });
    }
});