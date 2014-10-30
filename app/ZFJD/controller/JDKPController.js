/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('ZFJD.controller.JDKPController', {
    extend: 'Ext.app.Controller',
    startTime: null,
    endTime: null,
    pages: {},
    init: function () {
        this.control({
            '#zfjd_jdkp_search_btn': {
                click: this.onSearch
            },
            "#zfjd_jdkp_export_btn": {
                click: this.onExport
            }
        });

    },
    onSearch: function () {
        var tempForm = Ext.getCmp('zfjd_jdkp_search_form').getForm();
        if (tempForm.isValid()) {
            var pData = tempForm.getValues();
            var org_record = Ext.getCmp('zfjd_jdkp_org').org_val.raw;
            L(org_record)
            pData.objId = org_record.id;
            if (org_record.isRoot || org_record.is_org) {
                pData.objType = 1;
            } else {
                pData.objType = 2;
            }
            var raval = Ext.getCmp('zfjd_jdkp_org').rawValue;
            if(raval != org_record.text){
                pData.objId = raval;
                pData.objType = 2;
            }
            for (var i in pData) {
                if (pData[i] == '' || pData[i] == null) {
                    delete pData[i];
                }
            }
            var store = Ext.getCmp('zfjd_jdkp_grid').getStore();
            Ext.apply(store.proxy.extraParams, {pData: Ext.JSON.encode(pData)});
            store.loadPage(1);
            this.startTime = pData.startTime;
            this.endTime = pData.endTime;
        }
    },
    onExport: function (obj) {
        var store = Ext.getCmp('zfjd_jdkp_grid').getStore();
        var pData = [];
        for (var i = 0; i < store.data.items.length; i++) {
            pData[i] = store.data.items[i].raw;
            pData[i].startTime = this.startTime;
            pData[i].endTime = this.endTime;
        }
        if (pData.length == 0) {
            Ext.Msg.alert('提示信息', '无数据，请查询后重试！');
            return;
        }
        L(pData);

        // 记录日志
        var tempForm = Ext.getCmp('zfjd_jdkp_search_form').getForm();
        if (tempForm.isValid()) {
            var pData = tempForm.getValues();
            var org_record = Ext.getCmp('zfjd_jdkp_org').org_val.raw;

            var descript = "统计表属性: " +  org_record.text + "(" + org_record.id +")";
            L(descript);
            //Ext.create('Share.view.LogHandle').LogHandle(1, "205", "", descript);
        }

        window.open("gmvcs/rest/excelexport", "_blank");
    }
});