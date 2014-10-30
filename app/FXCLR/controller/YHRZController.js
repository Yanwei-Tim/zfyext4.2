/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('FXCLR.controller.YHRZController', {
    extend: 'Ext.app.Controller',
    pages: {},

    init: function () {
        this.timeLimit();
        this.control({
            '#fxclr_yhrz_search_btn': {
                click: this.onSearch
            }
        });
    },
    onSearch: function (obj) {
       /* var store = Ext.getCmp('fxclr_yhrz_search_grid').getStore();
        store.loadPage(1);
*/
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