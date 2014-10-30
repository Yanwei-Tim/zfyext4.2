/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('XTGL.view.YHGLCKTREEView', {
    extend: 'Ext.tree.Panel',
    rootVisible: false,
    useArrows: true,
    width: 250,
    height: 300,
    initComponent: function(){
        var self = this;
        Ext.apply(this, {
            store: Ext.create('Ext.data.TreeStore',{
                autoLoad: true,
                proxy: {
                    type: 'rest',
                    url : '/gmvcs/rest/orgSelect',
                    extraParams: {showPolice: false}
                }
            })
        });
        var listenerCheck = function (node, checked) {

            // Ext.select("tr[data-recordid='320500000000'] span").addCls("abc");
            childHasChecked(node, checked);
            var parentNode = node.parentNode;
            if (parentNode != null) {
                parentCheck(parentNode, false);
            }
        };
        //级联选中父节点
        var parentCheck = function (node, checked) {
            var childNodes = node.childNodes;
            for (var i = 0; i < childNodes.length; i++) {
                if (childNodes[i].get('checked')) {
                    node.set('checked', checked);
                    continue;
                } else {
                    node.set('checked', false);
                    break;
                }
            }

            var parentNode = node.parentNode;
            if (parentNode != null) {
                parentCheck(parentNode, checked);
            }
        }
        //级联选择子节点
        var childHasChecked = function (node, checked) {
            node.cascadeBy(function (child) {
                child.set("checked", checked)
            });
        }
        this.on('checkchange',function(node, checked){
            listenerCheck(node, checked);
        })

        this.callParent();
    }


})

