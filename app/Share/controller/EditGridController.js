/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('Share.controller.EditGridController', {
    extend: 'Ext.app.Controller',
    gridId: '',

    //初始化
    onGridReady: function(obj, width, height, eOpts){
        //L("grid ready");
    },

    initAddModel: function(model, callback){},

    //添加按钮
    onAddClick: function(){
        var Grid = Ext.getCmp(this.gridId);
        var rowEdit = Grid.plugins[0];

        var panelStore = Grid.getStore();
        var panelModel = Grid.getSelectionModel();

        this.initAddModel(panelModel, function(){
            rowEdit.cancelEdit();
            panelStore.insert(0,panelModel);
            panelStore.sync({callback: function(){panelStore.load();}});
        });
    },

    //编辑
    onEditRow: function(evtData){
        var Grid = Ext.getCmp(this.gridId);
        var rowEdit = Grid.plugins[0];

        var record = Grid.getStore().getAt(evtData.rowIndex);
        if(record) {
            rowEdit.startEdit(record, 0);
            var panelStore = RYGL_Grid.getStore();
            panelStore.sync();
        }
    },

    doDeleteRow: function(evtData){
        var Grid = Ext.getCmp(this.gridId);
        var rowEdit = Grid.plugins[0];
        rowEdit.cancelEdit();

        var panelStore = Grid.getStore();
        var record = panelStore.getAt(evtData.rowIndex);
        if(record) {
            panelStore.remove(record);
            panelStore.sync({callback: function(){panelStore.load();}});
        }
    },

    //删除提示
    onDeleteRow: function(evtData){
        myself = this;
        Ext.Msg.show({
            title:'提示',
            msg: '您确定删除当前选中行吗?',
            buttonText: {ok: '确定',cancel: '取消'},
            icon: Ext.Msg.QUESTION,
            fn: function(buttonId, text, opt){
                //L(buttonId);
                if('ok' == buttonId)
                    myself.doDeleteRow(evtData);
            }
        });
    },

    //编辑
    onEdit: function(){
        var Grid = Ext.getCmp(this.gridId);
        var rowEdit = Grid.plugins[0];
        rowEdit.cancelEdit();

        var panelStore = Grid.getStore();
        panelStore.sync();
    }
});