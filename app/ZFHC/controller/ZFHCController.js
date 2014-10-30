/**
 * Created by hcxowe on 14-2-11.
 */
Ext.define('ZFHC.controller.ZFHCController', {
    extend: 'Ext.app.Controller',
    pages: {},

    init: function () {
        this.timeLimit();
        this.control({
            '#zfhc_zfhc_search_btn': {
                click: this.onSearch
            }
        });
    },
    onSearch: function (obj) {

        L("2435678");
        var store = Ext.getCmp('zfhc_zfhc_search_grid').getStore();
        store.load();
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