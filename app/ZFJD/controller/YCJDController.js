/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('ZFJD.controller.YCJDController', {
    extend: 'Ext.app.Controller',
    pages: {},
    SFZLXCFView: null,
    ZFWSPView: null,
    SLSCCFView: null,
    SJXQView: Ext.create('ZFJD.view.SJXQWindow', {id: "zfjd_ycjd_window_sjxq"}),
    HCCLView: Ext.create('ZFJD.view.HCCLWindow', {id: "zfjd_ycjd_window_hccl"}),
    SXGQKView: Ext.create('ZFJD.view.SXGQKWindow', {id: "zfjd_ycjd_window_sxgqk"}),
    CurIndex: 0,

    init: function () {
        this.control({
            '#zfjd_ycjd_yclx_btn': {
                change: this.onChangeColumns
            },
            '#zfjd_ycjd_search_btn': {
                click: this.onSearch
            },
            '#zfjd_ycjd_center': {
                boxready: this.onCenterReady
            },
            '#zfjd_ycjd_grid_sfzlxcf': {
                actionItemClick: this.onItemClick
            },
            '#zfjd_ycjd_grid_zfwsp': {
                actionItemClick: this.onItemClick
            },
            '#zfjd_ycjd_grid_slsc': {
                actionItemClick: this.onItemClick
            },
            '#zfjd_ycjd_sxgqk_grid': {
                actionItemClick: this.onItemClick
            },
            '#zfjd_ycjd_window_sjxq': {
                show: this.onSJXQShow
            },
            '#zfjd_ycjd_window_sxgqk': {
                show: this.onSXGQKShow
            },
            '#zfjd_ycjd_window_hccl': {
                show: this.onHCCLShow
            },
            '#zfjd_ycjd_hccl_save': {
                click: this.onHCCLSave
            }
        });
    },

    //数据详情显示
    onSJXQShow: function (windowObj) {
        //获取单号，加载表格
        var SJDHS = windowObj.windowData.get("SJDHS");
        var store = null;

        //通过字段SJDHS判断是”十分钟内连续执法“还是”执法无视频“
        if (SJDHS) {
            //十分钟内连续执法
            if (0 == SJDHS.length) {
                windowObj.hide();
                return;
            }

            store = Ext.getCmp("zfjd_ycjd_sjxq_grid").getStore();
        } else {
            //执法无视频
            var SJDH = windowObj.windowData.get("SJDH");
            SJDHS = [SJDH];
            store = Ext.getCmp("zfjd_ycjd_sjxq_grid").getStore();
        }

        Ext.apply(store.proxy.extraParams, {sjdhs: SJDHS});
        store.loadPage(1);
    },

    //上下岗记录显示
    onSXGQKShow: function (windowObj) {
        //获取单号，加载表格
        var MJJH = windowObj.windowData.raw.MJJH;
        var form = Ext.getCmp('zfjd_ycjd_search_form').getForm();
        var formVal = form.getValues();

        //获取store，赋值数据，刷新表格
        var store = Ext.getCmp("zfjd_ycjd_sxgqk_grid").getStore();
        Ext.apply(store.proxy.extraParams, {
            mjjh: MJJH,
            start_time: formVal.start_time,
            end_time: formVal.end_time
        });

        store.loadPage(1);
    },

    ////核查处理显示
    onHCCLShow: function (windowObj) {
        //获取核查处理处理内容
        var HCQK = windowObj.windowData.raw.HCQK;
        var HCQK_RESULT = windowObj.windowData.raw.HCQK_RESULT;
        var HCQK_REMARK = windowObj.windowData.raw.HCQK_REMARK;

        var radioQKSS = Ext.getCmp("zfjd_ycjd_hccl_qkss");
        var radioQKPC = Ext.getCmp("zfjd_ycjd_hccl_qkpc");
        var radioQTYY = Ext.getCmp("zfjd_ycjd_hccl_qtyy");
        var textareaHCPL = Ext.getCmp("zfjd_ycjd_hccl_hcpl");

        radioQKSS.setRawValue(false);
        radioQKPC.setRawValue(false);
        radioQTYY.setRawValue(false);

        if (1 == HCQK) {
            if (1 == HCQK_RESULT)     radioQKSS.setRawValue(true);
            if (2 == HCQK_RESULT)     radioQKPC.setRawValue(true);
            if (3 == HCQK_RESULT)     radioQTYY.setRawValue(true);
        }

        textareaHCPL.setValue((new Base64).decode(HCQK_REMARK));
    },

    onHCCLSave: function (obj) {
        var self = this;
        var radioQKSS = Ext.getCmp("zfjd_ycjd_hccl_qkss");
        var radioQKPC = Ext.getCmp("zfjd_ycjd_hccl_qkpc");
        var radioQTYY = Ext.getCmp("zfjd_ycjd_hccl_qtyy");
        var textareaHCPL = Ext.getCmp("zfjd_ycjd_hccl_hcpl");

        var HCQK_REMARK = textareaHCPL.getValue();
        var HCCL_RESULT = "1";

        //编码请求数据
        HCQK_REMARK = (new Base64).encode(HCQK_REMARK);

        if (radioQKSS.getValue())        HCCL_RESULT = 1;
        if (radioQKPC.getValue())        HCCL_RESULT = 2;
        if (radioQTYY.getValue())        HCCL_RESULT = 3;

        //获取第一单单号
        var sjdh = "";
        if (self.HCCLView.windowData.raw.SJDH && self.HCCLView.windowData.raw.SJDH[0]) {
            if (self.HCCLView.windowData.raw.SJDH[0].SJDH)
                sjdh = self.HCCLView.windowData.raw.SJDH[0].SJDH;               //连续开3单使用字段
            else
                sjdh = self.HCCLView.windowData.raw.SJDH;                       //执法无视频使用字段
        }

        //获取日期
        var date;
        if (self.HCCLView.windowData.raw.DATE)       date = self.HCCLView.windowData.raw.DATE;
        if (self.HCCLView.windowData.raw.RIQI)       date = self.HCCLView.windowData.raw.RIQI;
        if (self.HCCLView.windowData.raw.WFSJ)       date = self.HCCLView.windowData.raw.WFSJ;

        //请求保存
        var loadMask = new Ext.LoadMask(Ext.getBody(), {msg: "正在保存数据......"});
        loadMask.show();
        var userId = Ext.LoginInfo.info.user_id;
        Ext.Ajax.request({
            url: '/gmvcs/rest/hccl',
            method: 'POST',
            jsonData: {
                hcjg: HCCL_RESULT,
                hcpy: HCQK_REMARK,
                mjjh: self.HCCLView.windowData.raw.MJJH,
                time: date,
                sjdh: sjdh,
                hcrid: userId,
                descr: self.HCCLView.title.substring(5),
                exception: self.HCCLView.windowData.raw.YCLX
            },

            callback: function (options, success, response) {
                loadMask.hide();
                var jsonResult = response.responseText;//Ext.JSON.decode(response.responseText);
                //L(jsonResult);
                if (false == jsonResult.success) {
                    Ext.Msg.alert('提示信息', '数据保存失败，请刷新后重试！');
                    return;
                }

                //对传入指针赋值，影响外部数据
                self.HCCLView.windowData.raw.HCQK = 1;
                self.HCCLView.windowData.raw.HCQK_RESULT = HCCL_RESULT;
                self.HCCLView.windowData.raw.HCQK_REMARK = HCQK_REMARK;

                //计算分数，update下
                var KFQK = 0;
                //L(HCCL_RESULT);
                //L(self.CurIndex);
                if (2 != HCCL_RESULT) {
                    if (0 == self.CurIndex)
                        KFQK = 0;

                    if (1 == self.CurIndex)
                        KFQK = -1;

                    if (2 == self.CurIndex)
                        KFQK = -2;
                }

                self.HCCLView.windowData.set("KFQK", KFQK);
                self.HCCLView.windowData.commit();
                self.HCCLView.hide();

                // 记录日志
                var descript = self.HCCLView.title.substring(5);
                L(descript);
                //Ext.create('Share.view.LogHandle').LogHandle(1, "211", self.HCCLView.windowData.raw.MJJH, descript);
            }
        });
    },

    onCenterReady: function (YCJDCenterObj) {
        this.SFZLXCFView = Ext.create("ZFJD.view.YCJDViewSFZLXCF", {id: "zfjd_ycjd_grid_sfzlxcf"});
        this.ZFWSPView = Ext.create("ZFJD.view.YCJDViewZFWSP", {id: "zfjd_ycjd_grid_zfwsp"});
        this.SLSCCFView = Ext.create("ZFJD.view.YCJDViewSLSC", {id: "zfjd_ycjd_grid_slsc"});

        this.CurIndex = 0;
        //设置默认界面
        YCJDCenterObj.removeAll(false);
        YCJDCenterObj.add(this.SFZLXCFView);
    },

    onChangeColumns: function (obj, newValue, oldValue, eOpts) {
        YCJDCenterObj = Ext.getCmp("zfjd_ycjd_center");

        this.CurIndex = newValue;

        if (3 > newValue)
            YCJDCenterObj.removeAll(false);

        if (0 == newValue)   YCJDCenterObj.add(this.SFZLXCFView);
        if (1 == newValue)   YCJDCenterObj.add(this.SLSCCFView);
        if (2 == newValue) YCJDCenterObj.add(this.ZFWSPView);
    },

    onItemClick: function (obj, rowIndex, colIndex, type) {
        var store = Ext.getCmp("zfjd_ycjd_center").down("grid").getStore();
        var record = store.getAt(rowIndex);
        var showWindow = null;

        switch (type) {
            case "look":
                showWindow = this.SJXQView;
                break;
            case "plays":
                //this.SJXQView.showPlayWindow(record);
                ///


                break;
            case "check":
            {
                this.HCCLView.setTitle("核查处理-" + record.data.capture);
                showWindow = this.HCCLView;
                break;
            }
            case "SXGQK":
                showWindow = this.SXGQKView;
                break;
        }

        if (null != showWindow) {
            //计算显示位置
            var width = showWindow.width;
            var height = showWindow.height;
            var bodyWidth = Ext.getBody().getWidth();
            var bodyHeight = Ext.getBody().getHeight();

            new_x = (bodyWidth - width) / 2;
            new_y = (bodyHeight - height) / 2;

            showWindow.windowData = record;
            showWindow.showAt(new_x, new_y);
        }
    },



    onSearch: function () {
        var tempForm = Ext.getCmp('zfjd_ycjd_search_form').getForm();
        if (tempForm.isValid()) {
            var pData = tempForm.getValues();
            var org_record = Ext.getCmp('zfjd_ycjd_org').org_val;
            if (org_record != null) {
                pData.obj_id = org_record.getId();
                pData.obj_type = (org_record.raw.is_org == false) ? 1 : 0;            //1为警员
            }
            var record = Ext.getCmp('zfjd_ycjd_org').org_val.raw;
            var raval = Ext.getCmp('zfjd_ycjd_org').rawValue;
            if(raval != record.text){
                pData.obj_id = raval;
                pData.obj_type = 1;
            }
            for (var i in pData) {
                if (pData[i] === '' || pData[i] == null) {
                    delete pData[i];
                }
            }

            var store = Ext.getCmp("zfjd_ycjd_center").down("grid").getStore();
            Ext.apply(store.proxy.extraParams, {pData: Ext.JSON.encode(pData)});
            store.loadPage(1);
        }
    }
});