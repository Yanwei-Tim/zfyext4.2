/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('RZSJ.controller.GLRZController', {
    extend: 'Ext.app.Controller',
    pages: {},

    init: function () {
        this.timeLimit();
        this.control({
            '#rzsj_glrz_search_btn': {
                click: this.onSearch
            }
        });
    },
    onSearch: function (obj) {
        var tempForm = Ext.getCmp('rzsj_glrz_czlx_form').getForm();
        if (tempForm.isValid()) {
            var pData = tempForm.getValues();

            for (var i in pData) {
                if (pData[i] === '' || pData[i] == null) {
                    delete pData[i];
                }
            }

            var record = Ext.getCmp("rzsj_glrz_org").org_val.raw;
            var objtype = 1;
            var objcode = record.id;
            if(record.is_org == true || record.isRoot == true)
                objtype = 0;
            var raval = Ext.getCmp('rzsj_glrz_org').rawValue;
            if(raval != record.text){
                objcode = raval;
                objtype = 1;
            }
            pData.obj_code = objcode;
            pData.obj_type = objtype;
            L(pData)
            var store = Ext.getCmp('rzsj_glrz_grid').getStore();
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