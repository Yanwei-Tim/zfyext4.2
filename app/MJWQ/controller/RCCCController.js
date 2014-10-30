/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('MJWQ.controller.RCCCController', {
    extend: 'Ext.app.Controller',
    pages: {},
    baseInfoPopWindow: Ext.create('MJWQ.view.RCCCCKSPView'),
    pjdfPopWindow: Ext.create('MJWQ.view.RCCCPJDFView'),

    init: function () {
        this.control({
            '#mjwq_rccc_search_btn': {
                click: this.onSearch
            },
            '#mjwq_rccc_grid': {
                boxready: this.onGridReady
            },
            '#mjwq_rccc_grid': {
                itemClick: this.onItemClick
            }
        });
    },
    onSearch: function () {
        var tempForm1 = Ext.getCmp('mjwq_rccc_search_form1').getForm();
        var tempForm2 = Ext.getCmp('mjwq_rccc_search_form2').getForm();
        if (tempForm1.isValid() && tempForm2.isValid()) {
            var pData = mergeObject(tempForm1.getValues(), tempForm2.getValues());
            var id = Ext.getCmp('mjwq_rccc_org').val;
            id > 0 ? pData.org_id = id : pData.user_id = id * (-1);
            for (var i in pData) {
                if (pData[i] === '' || pData[i] == null) {
                    delete pData[i];
                }
            }
            L(pData)
            var store = Ext.getCmp('mjwq_rccc_grid').getStore();
            Ext.apply(store.proxy.extraParams, {pData: Ext.JSON.encode(pData)});
            store.loadPage(1);
        }
    },

    onGridReady: function () {
        var pData = {
            start_date: new Date().Format('yyyy-MM-dd'),
            end_date: new Date().Format('yyyy-MM-dd')
        }

        pData.org_id = Ext.getCmp('mjwq_rccc_org').val;
        var store = Ext.getCmp('mjwq_rccc_grid').getStore();
        Ext.apply(store.proxy.extraParams, {pData: Ext.JSON.encode(pData)});
    },
    onItemClick: function (obj, rowIndex, colIndex, action) {
        var wjid = "";

        var record = Ext.getCmp('mjwq_rccc_grid').getStore().getAt(rowIndex);
        wjid =  record.data.id
        var self = this;
        if (action == "play" || action == "valuing" || action == "plays") {
            var loadMask = new Ext.LoadMask(Ext.getBody(), {msg: "正在请求数据......"});
            loadMask.show();
            Ext.Ajax.request({
                url: '/rest/zfjd/RCCCPopWindowController/getfileinfo/'+wjid,
                method: 'GET',
                callback: function (options, success, response) {
                    loadMask.hide();
                    var jsonResult = Ext.JSON.decode(response.responseText);
                    if (false == jsonResult.success) {
                        Ext.Msg.alert('提示信息', '数据加载失败，请刷新后重试！');
                        return;
                    }
                    self.baseInfoPopWindow.windowData = jsonResult; //数组形式表示：支持返回多个文件的信息
                    self.pjdfPopWindow.windowData = jsonResult[0];
                    self.pjdfPopWindow.recordData = record;
                    if (action == "play" || action  == "plays") {
                        self.baseInfoPopWindow.show();
                    } else if (action == "valuing") {
                        self.pjdfPopWindow.show();
                    }
                }
            });
        } else if (action == "donwload") {
           // window.open(record.data.file_oripath, "_blank");
            window.open("app/Share/resource/test.flv", "_blank");
        } else if (action == "save") {
        }
    }
})