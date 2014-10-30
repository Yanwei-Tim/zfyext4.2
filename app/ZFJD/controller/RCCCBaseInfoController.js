/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('ZFJD.controller.RCCCBaseInfoController', {
    extend: 'Ext.app.Controller',
    pages: {},
    sjbhComboxRecords: null,
    xzspComboxRecords: null,
    sjbhComboxRecentRecord: null,
    windowData: null,
    windowDatas: null,
    xzspComboxStore: Ext.create("ZFJD.store.RCCCModelStore"),
    sjdhComboxStore: Ext.create("ZFJD.store.RCCCModelStore"),
    init: function () {
        this.control({
            '#RCCC_BaseInfo_PopupWindow': {
                show: this.onShowF,
                hide: this.onHide
            },
            "#rccc_pupowindow_sjbh": {
                change: this.onsjbhComboxChange
            },
            /*"#rccc_pupowindow_xzsp": {
             change: this.onxzspComboxChange
             },*/
            "#zfjd_xzwj_btn": {
                click: this.xzwjBtnClick
            },
            "#zfjd_bjxx_save_btn": {
                click: this.bjxxSaveBtnClick
            },
            '#zfjd_bjxx_btn': {
                toggle: this.onBjxxClick
            },
            '#zfjd_spxx_btn ': {
                toggle: this.onSpxxClick
            },
            "button[name=ZYKSSJ2]":{
                click: this.onGjspClick
            }
        });

    },
    onBjxxClick: function (obj) {
        var spxxPanle = Ext.getCmp("zfjd_spxx_panel");
        var bjxxPanel = Ext.getCmp("zfjd_cksp_bjxx_form");
        bjxxPanel.show();
        spxxPanle.hide();
        var sid = this.windowData.file_sid;
        Ext.Ajax.request({
            url: '/gmvcs/rest/label_handle/get_file_label?sid=' + sid,
            method: 'GET',
            callback: function (options, success, response) {
                var jsonResult = Ext.JSON.decode(response.responseText);
                if (false == jsonResult.ret) {
                    Ext.Msg.alert('提示信息', '数据加载失败，请刷新后重试！');
                    return;
                }
                var userRecord = Ext.create("ZFJD.model.RCCCSPXXModel", jsonResult.body[0]);

                L(bjxxPanel.loadRecord(userRecord))
            }
        });
    },
    onSpxxClick: function (obj) {
        var spxxPanle = Ext.getCmp("zfjd_spxx_panel");
        var bjxxPanel = Ext.getCmp("zfjd_cksp_bjxx_form");
        bjxxPanel.hide();
        spxxPanle.show();
    },
    /*选择视频文件操作*/
    onxzspComboxChange: function (obj, newValue, oldValue, eOpts) {
        var files = this.windowDatas;
        for (var i = 0; i < files.length; i++) {
            if (files[i].id == newValue) {
                this.windowData = files[i];
                break;
            }
        }
        if (this.windowData.id == undefined) return;

        var userRecord = Ext.create("ZFJD.model.RCCCJBXXModel", this.windowData);
        var kzxxPanle = Ext.getCmp("zfjd_cksp_center_kzxxform");

        Ext.getCmp("zfjd_cksp_center_baseform").loadRecord(userRecord);
        if (undefined != this.windowData.ZFSJ[0]) {
            this.kzxxShow();
            kzxxPanle.show();
        } else {
            kzxxPanle.hide();
        }

        this.playFile("rtmp");
        Ext.getCmp("rccc_pupowindow_wjdx").setValue(this.windowData.file_size);
    },
    /*选择文件兼容模式*/
    onxzspComboxChangeF: function (file_id) {
        var files = this.windowDatas;
        for (var i = 0; i < files.length; i++) {
            if (files[i].file_sid == file_id) {
                this.windowData = files[i];
                if (this.windowData.file_sid == undefined) return;

                var userRecord = Ext.create("ZFJD.model.RCCCJBXXModel", this.windowData);
                var kzxxPanle = Ext.getCmp("zfjd_cksp_center_kzxxform");

                Ext.getCmp("zfjd_cksp_center_baseform").loadRecord(userRecord);
                if (undefined != this.windowData.ZFSJ[0]) {
                    this.kzxxShow();
                    kzxxPanle.show();

                } else {
                    kzxxPanle.hide();
                }
                L(this.windowData)
                if (this.windowData.file_type == '视频' || this.windowData.file_type == '语音') {
                    if (this.windowData.file_oripath == this.windowData.file_playpath) {
                        this.playFile("win");

                    } else {
                        this.playFile("rtmp");
                    }
                }
                else if (this.windowData.file_type == '图像')
                    this.playImg();

                Ext.getCmp("rccc_pupowindow_wjdx").setValue(this.windowData.file_size + "MB");

                break;
            }
        }
    },
    onGjspClick: function () {
        var self = this;
        if (self.sjbhComboxRecentRecord != null) {
            jwplayer("mediaspace").seek(self.sjbhComboxRecentRecord.JUMPTO);
        } else {
            Ext.Msg.alert('提示信息', '该文件没有关键视频段！');
        }
    },

    /*弹窗*/
    onShow: function (obj) {
        this.windowDatas = obj.windowData;
        var xzspComboxData = [];
        var data = obj.windowData;
        for (var i = 0; i < data.length; i++) {
            xzspComboxData[i] = {"name": data[i].capture_user + '-' + data[i].capture_time + '-' + data[i].file_duration, "type": data[i].id};
        }

        var xzspCombox = Ext.getCmp("rccc_pupowindow_xzsp");
        var xzspComboxStore = this.xzspComboxStore;
        xzspCombox.store = xzspComboxStore;
        xzspComboxStore.loadData(xzspComboxData);
        this.xzspComboxRecords = xzspComboxData;
        xzspCombox.setValue(xzspComboxData[0].type);


    },
    /*选择文件兼容模式*/
    onShowF: function (obj) {
        var self = this, data;
        this.windowDatas = data = obj.windowData.body;
        var option = '';
        var xzsp = document.getElementById("rccc_pupowindow_xzsp");
        for (var i = 0; i < data.length; i++) {
            xzsp.options.add(new Option(data[i].capture_user_name + '-' + data[i].capture_time + '-' + data[i].file_duration, data[i].file_sid));

        }
        // xzsp.innerHTML = option;
        xzsp.value = data[0].file_sid;

        xzsp.onchange = function () {
            self.onxzspComboxChangeF(this.value);
        }

        this.onxzspComboxChangeF(data[0].file_sid)
        Ext.getCmp("zfjd_spxx_btn").toggle(true);


    },
    onHide: function () {
        var bfsp_rtmp_panel = Ext.getCmp("bfsp_rtmp").update('<div id="mediaspace"></div>')
        var bfsp_win_panel = Ext.getCmp("bfsp_win").update("");
    },

    /*扩展信息*/
    kzxxShow: function () {
        var data = this.windowData;
        var sjbhComboxData = [];
        for (var i = 0; i < data.ZFSJ.length; i++) {
            sjbhComboxData[i] = {"name": data.ZFSJ[i].SJDH, "type": data.ZFSJ[i].SJDH}
        }
        var sjbhCombox = Ext.getCmp("rccc_pupowindow_sjbh");
        var sjbhComboxStore = this.sjdhComboxStore;

        sjbhCombox.store = sjbhComboxStore;
        sjbhComboxStore.loadData(sjbhComboxData);
        this.sjbhComboxRecords = data.ZFSJ;
        sjbhCombox.setValue(sjbhComboxData[0].type);
    },
    xzwjBtnClick: function () {

        var self = this;

        // 记录日志
        //var descript = "文件属性: " + self.windowData.capture_unit + "(" + self.windowData.capture_dep_id + ") " + self.windowData.capture_user_name + "(" + self.windowData.capture_user_id + ")";
        //Ext.create('Share.view.LogHandle').LogHandle(1, "203", this.windowData.file_sid, descript);
        Ext.Ajax.request({
            url: '/gmvcs/rest/DownLoad?url=' + self.windowData.file_oripath,
            method: 'GET',
            callback: function (options, success, response) {
            }
        });
        window.open(this.windowData.file_oripath, "_blank");
        //window.open('/gmvcs/rest/DownLoad?url='+this.windowData.file_oripath, "_blank");

        //window.open(this.windowData.file_oripath, "_blank");
    },
    bjxxSaveBtnClick: function (obj) {
        var self = this;
        var tempForm = Ext.getCmp('zfjd_cksp_bjxx_form').getForm();
        if (tempForm.isValid()) {
            var pData = tempForm.getValues();
            pData.WJBH = this.windowData.file_sid;
            pData.CLKSSJ = "";
            pData.CLJSSJ = "";

            Ext.Ajax.request({
                url: '/gmvcs/rest/label_handle/edit_file_label',
                jsonData: pData,
                method: 'POST',
                callback: function (options, success, response) {
                    var jsonResult = Ext.JSON.decode(response.responseText);
                    if (false == jsonResult.ret) {
                        Ext.Msg.alert('提示信息', '数据提交失败，请刷新后重试！');
                        return;
                    }
                    Ext.Msg.alert('提示信息', '数据保存成功！');
                }
            });
        }
    },
    /*事件编号改变*/
    onsjbhComboxChange: function (obj, newValue, oldValue, eOpts) {
        var self = this;
        var sjbhComboxRecentRecord = null;
        for (var i = 0; i < this.sjbhComboxRecords.length; i++) {
            if (this.sjbhComboxRecords[i].SJDH == newValue) {
                sjbhComboxRecentRecord = this.sjbhComboxRecords[i];
                self.sjbhComboxRecentRecord = sjbhComboxRecentRecord;
                break;
            }
        }

        L(sjbhComboxRecentRecord)
        var comboxRecord = Ext.create("ZFJD.model.RCCCZFSJModel", sjbhComboxRecentRecord);
        var sjlx = sjbhComboxRecentRecord.SJLX;
        var j = null;
        if ("违停拍照" == sjlx || "简易处罚" == sjlx || "强制措施" == sjlx) {
            j = 1;
        } else if ("接处警" == sjlx) {
            j = 2;
        } else if ("简易事故" == sjlx) {
            j = 3;
        }

        for (var i = 1; i < 4; i++) {
            var kf = Ext.getCmp("zfjd_cksp_center_kzxxform_" + i);
            if (i == j) {
                kf.show();
                var begin = Ext.ComponentQuery.query('panel[name=ZYKSSJ1]');
                var end = Ext.ComponentQuery.query('displayfield[name=ZYJSSJ]');
                /*if (sjbhComboxRecentRecord.JUMPTO == 0) {
                    begin[0].hide();
                    begin[1].hide();
                    begin[2].hide();
                    end[0].hide();
                    end[1].hide();
                    end[2].hide();
                }else{
                    begin[0].show();
                    begin[1].show();
                    begin[2].show();
                    end[0].show();
                    end[1].show();
                    end[2].show();
                }*/
                kf.loadRecord(comboxRecord);
            } else {
                kf.hide();
            }

        }
    },
    playFile: function (playType/*rtmp ,win*/) {
        var data = this.windowData
        var bfqContainer = Ext.getCmp("rccc_pupowindow_bfq");
        var bfsp_rtmp_panel = Ext.getCmp("bfsp_rtmp");
        var bfsp_win_panel = Ext.getCmp("bfsp_win");
        L(this.windowData.file_oripath)
        var file_oripath = this.windowData.file_oripath
        var file_playpath = this.windowData.file_playpath;
        var file_playid = this.windowData.file_playid;
        //var file_playid = "85f50c56adc111e3be7f001bb9be6550@gmvcs007";

        /* file_playpath = "rtmp://gmvcs.goldmsg.com:58883/live";
         file_playid = "123";*/

        if ("rtmp" == playType) {
            L("rtmp")
            bfsp_win_panel.hide();
            bfsp_rtmp_panel.show();

            /* var so = new SWFObject('app/Share/resource/player.swf', 'mpl', '550', '450', '9');
             so.addVariable('autostart', true);
             so.addParam('allowfullscreen', true);
             so.addParam('allowscriptaccess', 'always');
             so.addParam('wmode', 'opaque');
             so.addVariable('file', file_playid);
             so.addVariable('streamer', file_playpath);
             so.write('mediaspace');*/

            jwplayer("mediaspace").setup({
                playlist: [
                    {
                        // image: musicpic,
                        sources: [
                            {
                                //file: file_playpath + file_playid

                                file: "rtmp://192.168.20.25:1935/live/test.flv"
                                //file: "rtmp://192.168.10.76:1935/live/a1caf6793ec7471595d2653b04035be5@gmvcs007"
                            }
                        ]
                    }
                ],
                primary: "flash",
                height: 450,
                width: 550
            });
            //jwplayer("mediaspace").seek(20);
            jwplayer("mediaspace").play();

            if (!this.windowData.file_status) {
                Ext.Msg.alert('提示信息', '该记录已过期！');
                return;
            }
        } else if ("win" == playType) {
            bfsp_rtmp_panel.hide();
            bfsp_win_panel.show();

            var playObject = '<object id="player" height="450" width="550" classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6">' +
                '<param name="url" value="' + file_oripath + '">' +
                '<param name="AutoStart" value="0">' +
                '<param name="windowlessVideo" value="0">' +
                '<param name=BufferingTime value=5>' +
                '<param name="wmode" value="opaque"/>' +
                '<embed name="mediaPlayer" width="550px" height="450px" type="application/x-ms-wmp" autostart="0"' +
                'src="' + file_oripath + '" >' +
                '</object>'
            bfsp_win_panel.update(playObject);

        }

    },
    playImg: function () {
        var bfsp_rtmp_panel = Ext.getCmp("bfsp_rtmp");
        var bfsp_win_panel = Ext.getCmp("bfsp_win");
        bfsp_rtmp_panel.hide();
        bfsp_win_panel.show();
        var data = this.windowData
        var playObject = '<img id="' + data.sid + '" src="app/ZFJD/resource/imgs/loading.gif">'
        bfsp_win_panel.update(playObject);
        var imgID = data.sid;

        setTimeout(function () {
            var img = new Image(); //创建一个Image对象，实现图片的预下载

            img.onerror = function () {
                var obj = document.getElementById(imgID);
                obj.setAttribute("src", "app/ZFJD/resource/imgs/error.gif");
            }

            img.onload = function () { //图片下载完毕时异步调用callback函数。
                var obj = document.getElementById(imgID);
                obj.setAttribute("height", 450);
                obj.setAttribute("width", 550);
                obj.setAttribute("src", data.file_thumbnail);
            }

            img.src = data.file_oripath;
        }, 1000);
    }
})