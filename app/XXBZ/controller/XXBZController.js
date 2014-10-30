/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('XXBZ.controller.XXBZController', {
    extend: 'Ext.app.Controller',
    pages: {},

    init: function () {
        this.timeLimit();
        this.control({
            '#xxbz_xxbz_search_btn': {
                click: this.onSearch
            }
        });
    },
    onSearch: function (obj) {
        var tempForm = Ext.getCmp('xxbz_xxbz_form').getForm();
        if (tempForm.isValid()) {
            var pData = tempForm.getValues();

            var record = Ext.getCmp('xxbz_xxbz_org').org_val.raw;
            var raval = Ext.getCmp('xxbz_xxbz_org').rawValue;
            if (raval != record.text) {
                pData.input_police_id = raval
            }
            if (record.is_org == true || record.isRoot == true) {
                pData.dep_code = record.id
            } else {
                pData.police_id = record.id
            }
            for (var i in pData) {
                if (pData[i] === '' || pData[i] == null) {
                    delete pData[i];
                }
            }

            L(pData)
            var store = Ext.getCmp('xxbz_xxbz_search_grid').getStore();
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