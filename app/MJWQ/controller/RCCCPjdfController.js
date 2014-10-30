/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('MJWQ.controller.RCCCPjdfController', {
    extend: 'Ext.app.Controller',
    pages: {},
    fileInfo: null,
    fileId: null,
    recordData: null,
    init: function () {
        this.control({
            '#MJWQ_Pjdf_PopupWindow': {
                show: this.onShow
            },
            "#mjwq_pjdf_yc_1": {
                change: this.OnPjdfChange
            },
            "#mjwq_pjdf_bc": {
                click: this.onSavePjdf
            }
        });

    },
    onShow: function (obj) {
        this.recordData = obj.recordData;
        this.fileId = this.recordData.data.id;

        L(obj.windowData.PJDF)
        var PJDF = obj.windowData.PJDF;
        var kfqk = PJDF.ITEM_1 + PJDF.ITEM_2 + PJDF.ITEM_3 + PJDF.ITEM_4 + PJDF.ITEM_5 + PJDF.ITEM_6;
        L(kfqk + "afaf")
        if (kfqk > 0) {
            Ext.getCmp("mjwq_pjdf_yc_2").setValue(true);
            Ext.getCmp("mjwq_pjdf_yc_1").setValue(false);

            for (var i = 1; i < 7; i++) {
                var item = "ITEM_" + i;
                if (PJDF[item] > 0) {
                    Ext.getCmp("mjwq_pjdf_ycnr_" + i).setValue(true);
                } else {
                    Ext.getCmp("mjwq_pjdf_ycnr_" + i).setValue(false);
                }
            }

            Ext.getCmp("mjwq_pjdf_pl").setValue(PJDF.remark);

        } else {
            Ext.getCmp("mjwq_pjdf_yc_1").setValue(true);
            Ext.getCmp("mjwq_pjdf_yc_2").setValue(false);

            for (var i = 1; i < 7; i++) {
                var item = "ITEM_" + i;
                Ext.getCmp("mjwq_pjdf_ycnr_" + i).setValue(false);
            }

        }


    },

    OnPjdfChange: function (obj, newValue, oldValue, eOpts) {
        var mjwq_pjdf_ycnr = Ext.ComponentQuery.query('checkboxfield[name=mjwq_pjdf_ycnr]');
        if (newValue == true) {
            for (var i = 0; i < mjwq_pjdf_ycnr.length; i++) {
                mjwq_pjdf_ycnr[i].disable();
            }
        } else {
            for (var i = 0; i < mjwq_pjdf_ycnr.length; i++) {
                mjwq_pjdf_ycnr[i].enable();
            }
        }
    },

    onSavePjdf: function (obj) {
        var self = this;
        var pData = {};
        pData.file_id = this.fileId;
        pData.item = Ext.getCmp("mjwq_pjdf_yc_1").value;
        pData.comment = Ext.getCmp("mjwq_pjdf_pl").value;
        pData.item_1 = Ext.getCmp("mjwq_pjdf_ycnr_1").value == true ? 2 : 0;
        pData.item_2 = Ext.getCmp("mjwq_pjdf_ycnr_2").value == true ? 5 : 0;
        pData.item_3 = Ext.getCmp("mjwq_pjdf_ycnr_3").value == true ? 2 : 0;
        pData.item_4 = Ext.getCmp("mjwq_pjdf_ycnr_4").value == true ? 2 : 0;
        pData.item_5 = Ext.getCmp("mjwq_pjdf_ycnr_5").value == true ? 2 : 0;
        pData.item_6 = Ext.getCmp("mjwq_pjdf_ycnr_6").value == true ? 2 : 0;

        if (pData.item == true) {
            pData.item_1 = pData.item_2 = pData.item_3 = pData.item_4 = pData.item_5 = pData.item_6 = 0;
        }

        if (!pData.comment)          pData.comment = "";

        Ext.Ajax.request({
            url: '/rest/zfjd/RCCCPopWindowController/savepjdf',
            method: 'POST',
            jsonData: pData,
            callback: function (options, success, response) {
                var jsonResult = Ext.JSON.decode(response.responseText);
                if (false == jsonResult.success) {
                    Ext.Msg.alert('提示信息', '数据提交失败，请刷新后重试！');
                    return;
                }
                Ext.getCmp("MJWQ_Pjdf_PopupWindow").hide();
                var kfqk = pData.item_1 + pData.item_2 + pData.item_3 + pData.item_4 + pData.item_5 + pData.item_6;
                self.recordData.set("KFQK", (-1) * kfqk);
                self.recordData.commit();
            }
        });


    }
})