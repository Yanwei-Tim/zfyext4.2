/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('ZFJD.controller.RCCCPjdfController', {
    extend: 'Ext.app.Controller',
    pages: {},
    fileInfo: null,
    fileId: null,
    police_id: null,
    recordData: null,
    init: function () {
        this.control({
            '#RCCC_Pjdf_PopupWindow': {
                show: this.onShow
            },
            "#pjdf_yc_1": {
                change: this.OnPjdfChange
            },
            "#pjdf_bc": {
                click: this.onSavePjdf
            }
        });

    },
    onShow: function (obj) {

        L(obj.recordData);
        this.recordData = obj.recordData;
        this.fileId = this.recordData.data.sid;
        this.police_id = this.recordData.data.police_id;
        var PJDF = obj.windowData.body;
        Ext.getCmp('zfjd_pjdf_north').getForm().reset();
        if (PJDF.XZLX == 1) {
            Ext.getCmp("pjdf_yc_1").setValue(true);
        } else {
            Ext.getCmp("pjdf_yc_2").setValue(true);
            var e = 0;
            for (var j in PJDF) {
                e++
            }

            for (var i = 1; i < e - 1; i++) {
                if (PJDF["ITEM" + i] != null) {
                    if (PJDF["ITEM" + i] != 0)
                        Ext.getCmp("ITEM" + i).setValue(true);
                }
            }
            Ext.getCmp("pjdf_pl").setValue(PJDF.remark);

        }


    },

    OnPjdfChange: function (obj, newValue, oldValue, eOpts) {
        var ITEM = Ext.ComponentQuery.query('checkboxfield[name=pjdf_ycnr]');
        if (newValue == true) {
            for (var i = 0; i < ITEM.length; i++) {
                ITEM[i].disable();
            }
        } else {
            for (var i = 0; i < ITEM.length; i++) {
                ITEM[i].enable();
            }
        }
    },

    onSavePjdf: function (obj) {

        L(this.recordData);

        var self = this;
        var pData = {};
        pData.file_id = this.fileId;
        pData.police_id = this.police_id;
        pData.item = Ext.getCmp("pjdf_yc_1").value;
        pData.comment = Ext.getCmp("pjdf_pl").value;
        pData.option = "";
        pData.option += Ext.getCmp("ITEM1").value == true ? "ITEM1," : "";
        pData.option += Ext.getCmp("ITEM2").value == true ? "ITEM2," : "";
        pData.option += Ext.getCmp("ITEM3").value == true ? "ITEM3," : "";
        pData.option += Ext.getCmp("ITEM4").value == true ? "ITEM4," : "";
        pData.option += Ext.getCmp("ITEM5").value == true ? "ITEM5," : "";
        pData.option += Ext.getCmp("ITEM6").value == true ? "ITEM6," : "";
        pData.option = pData.option.substr(0, pData.option.length - 1);
        for (var i in pData) {
            if (pData[i] === 0) {
                delete pData[i];
            }
        }
        if (!pData.comment)          pData.comment = "";

        Ext.Ajax.request({
            url: '/gmvcs/rest/mark_score',
            method: 'POST',
            jsonData: pData,
            callback: function (options, success, response) {
                L(response)
                var jsonResult = Ext.JSON.decode(response.responseText);
                if (false == jsonResult.ret) {
                    Ext.Msg.alert('提示信息', '数据提交失败，请刷新后重试！');
                    return;
                }
                Ext.getCmp("RCCC_Pjdf_PopupWindow").hide();
               // var store = Ext.getCmp('zfjd_rccc_grid').getStore();
                //store.loadPage(1);
                 self.recordData.set("KFQK", jsonResult.body);
                 self.recordData.commit();

                // 记录日志
                var descript = "文件属性: " + self.recordData.data.dep_name + "(" + self.recordData.data.police_dep + ") " + self.recordData.data.capture;
                //Ext.create('Share.view.LogHandle').LogHandle(1, "210", pData.file_id, descript);
            }
        });


    }
})