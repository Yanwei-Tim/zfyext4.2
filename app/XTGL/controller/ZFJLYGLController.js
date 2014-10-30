    /**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('XTGL.controller.ZFJLYGLController', {
    extend: 'Ext.app.Controller',
    pages: {},

    init: function () {
        this.control({
            '#xtgl_zfjlygl_search_btn': {
                click: this.onSearch
            },
            '#xtgl_zfjlygl_tree': {
                itemclick: this.onOrgTreeClick
            },
            '#xtgl_zfjlygl_grid': {
                //boxready: this.onGridReady,
                itemClick: this.onItemClick
            }
        });
    },

    onSearch: function(){
        var tempForm = Ext.getCmp('xtgl_zfjlygl_search_form').getForm();
        if (tempForm.isValid()) {
            var getForm = Ext.getCmp("xtgl_zfjlygl_search_form").getValues();
            var orgmsg = Ext.getCmp("xtgl_zfjlygl_org").org_val.data;
            var store = Ext.getCmp("xtgl_zfjlygl_grid").getStore();

            var objcode = orgmsg.id;
            var objtype = 0
            if("tree_user" == orgmsg.iconCls){
                objtype = 1;
            }
            Ext.apply(store.proxy.extraParams,
                {
                    obj_code: objcode,
                    obj_type: objtype,
                    manufacturer: getForm.manufacturer,
                    start_time: getForm.start_date,
                    end_time: getForm.end_date
                }
            );

            store.loadPage(1);
        }
    },
    onOrgTreeClick: function (obj, record, item, index, e, eOpts) {
        var store = Ext.getCmp('xtgl_zfjlygl_grid').getStore();
        var pData = {};
        pData.org_id = record.data.id;
        Ext.apply(store.proxy.extraParams, {pData: Ext.JSON.encode(pData)});
        store.loadPage(1);
    },
    /*onGridReady: function () {
        var store = Ext.getCmp('xtgl_zfjlygl_grid').getStore();
        var pData = {};
        pData.org_id = 0;
        Ext.apply(store.proxy.extraParams, {pData: Ext.JSON.encode(pData)});
        store.loadPage(1);
    },*/
    onItemClick: function (obj, rowIndex, colIndex, action) {
        var record = Ext.getCmp("xtgl_zfjlygl_grid").getStore().getAt(rowIndex);
        var self = this;
        var pData = {};
        L(record)
        pData.guid = record.data.guid;
        var sn = record.data.sn;

        L(record.data);
        if (action == "delete_zfjly") {
            Ext.MessageBox.confirm('提示信息', '您确定要删除该设备吗?', function (btn) {
                L(btn)
                if('yes' == btn){
                    Ext.Ajax.request({
                        url: '/gmvcs/rest/deldevice',
                        method: 'POST',
                        jsonData: pData,
                        callback: function (options, success, response) {
                            L(response)
                            var jsonResult = Ext.JSON.decode(response.responseText);
                            if (false == jsonResult.ret) {
                                Ext.Msg.alert('提示信息', '删除设备失败，请刷新后重试！');
                                return;
                            }
                            Ext.getCmp("xtgl_zfjlygl_grid").getStore().loadPage(1);

                            // 记录日志
                            var descript = "删除执法记录仪: " + "(" + sn+ ")";
                            //Ext.create('Share.view.LogHandle').LogHandle(2, "328", pData.guid, descript);
                        }
                    });
                }

            });
        }
    }
})