/**
 * Created by hansen on 14-2-11.
 */
Ext.define('RZSJ.controller.WSDeviceController', {
    extend: 'Ext.app.Controller',
    pages: {},

    init: function () {
        this.timeLimit();
        this.control({
            '#rzsj_ws_search_btn': {
                click: this.onSearch
            }
        });
    },
    onSearch: function (obj) {
        var tempForm = Ext.getCmp('rzsj_ws_czlx_form').getForm();
        if (tempForm.isValid()) {
            var pData = tempForm.getValues();

            var record = Ext.getCmp('rzsj_ws_czlx_org').org_val.raw;
            if (record.is_org == true || record.isRoot == true) {
                pData.obj_code = record.id;
                pData.obj_type = 0;
            } else {
                pData.obj_code = record.id;
                pData.obj_type = 1;
            }
            var raval = Ext.getCmp('rzsj_ws_czlx_org').rawValue;
            if(raval != record.text){
                pData.obj_code = raval;
                pData.obj_type = 1;
            }
            for (var i in pData) {
                if (pData[i] === '' || pData[i] == null) {
                    delete pData[i];
                }
            }
            L(pData)
            var store = Ext.getCmp('rzsj_ws_search_grid').getStore();
            Ext.apply(store.proxy.extraParams, {pData: Ext.JSON.encode(pData)});
            store.loadPage(1);
        }
    },

    timeLimit: function () {
        Ext.apply(Ext.form.VTypes, {
            daterange: function (val, field) {
                if (field.fromDateId) {
                    if (Ext.getCmp(field.fromDateId).rawValue > val) {
                        return false;
                    }
                }
                ;
                if (field.toDateId) {
                    if (Ext.getCmp(field.toDateId).rawValue < val) {
                        return false;
                    }
                }
                ;
                return true;
            },
            daterangeText: '开始时间不能大于结束时间'
        });
    }
});