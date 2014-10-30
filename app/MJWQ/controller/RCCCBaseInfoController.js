/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('MJWQ.controller.RCCCBaseInfoController', {
    extend: 'Ext.app.Controller',
    pages: {},
    sjbhComboxRecords: null,
    xzspComboxRecords: null,
    windowData: null,
    windowDatas: null,
    xzspComboxStore: Ext.create("MJWQ.store.RCCCModelStore"),
    sjdhComboxStore: Ext.create("MJWQ.store.RCCCModelStore"),
    init: function () {
        this.control({
            '#MJWQ_BaseInfo_PopupWindow': {
                show: this.onShowF,
                hide: this.onHide
            },
            "#mjwq_pupowindow_sjbh": {
                change: this.onsjbhComboxChange
            },
            /*"#rccc_pupowindow_xzsp": {
             change: this.onxzspComboxChange
             },*/
            "#mjwq_xzwj_btn": {
                click: this.xzwjBtnClick
            }
        });

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

        var userRecord = Ext.create("MJWQ.model.RCCCJBXXModel", this.windowData);
        var kzxxPanle = Ext.getCmp("mjwq_cksp_center_kzxxform");

        Ext.getCmp("mjwq_cksp_center_baseform").loadRecord(userRecord);
        if (undefined != this.windowData.ZFSJ[0]) {
            this.kzxxShow();
            kzxxPanle.show();
        } else {
            kzxxPanle.hide();
        }

        this.playFile("rtmp");
        Ext.getCmp("mjwq_pupowindow_wjdx").setValue(this.windowData.file_size);
    },
    /*选择文件兼容模式*/
    onxzspComboxChangeF: function (file_id) {
        var files = this.windowDatas;
        for (var i = 0; i < files.length; i++) {
            if (files[i].id == file_id) {
                this.windowData = files[i];
                if (this.windowData.id == undefined) return;

                var userRecord = Ext.create("MJWQ.model.RCCCJBXXModel", this.windowData);
                var kzxxPanle = Ext.getCmp("mjwq_cksp_center_kzxxform");

                Ext.getCmp("mjwq_cksp_center_baseform").loadRecord(userRecord);
                if (undefined != this.windowData.ZFSJ[0]) {
                    this.kzxxShow();
                    kzxxPanle.show();
                } else {
                    kzxxPanle.hide();
                }

                this.playFile("rtmp");
                Ext.getCmp("mjwq_pupowindow_wjdx").setValue(this.windowData.file_size);
                break;
            }
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

        var xzspCombox = Ext.getCmp("mjwq_pupowindow_xzsp");
        var xzspComboxStore = this.xzspComboxStore;
        xzspCombox.store = xzspComboxStore;
        xzspComboxStore.loadData(xzspComboxData);
        this.xzspComboxRecords = xzspComboxData;
        xzspCombox.setValue(xzspComboxData[0].type);


    },
    /*选择文件兼容模式*/
    onShowF: function (obj) {
        var self = this;
        this.windowDatas = obj.windowData;
        var data = obj.windowData;
        var option = '';
        for (var i = 0; i < data.length; i++) {
            option += '<option value="' + data[i].id + '">' + data[i].capture_user +
                '-' + data[i].capture_time + '-' + data[i].file_duration + '</option>'

        }
        var xzsp = document.getElementById("mjwq_pupowindow_xzsp");
        xzsp.innerHTML = option;
        xzsp.value = data[0].id;

        xzsp.onchange = function () {
            self.onxzspComboxChangeF(this.value);
        }

        this.onxzspComboxChangeF(data[0].id)

    },
    onHide: function () {
        var bfsp_rtmp_panel = Ext.getCmp("mjwq_bfsp_rtmp").update('<div id="mjwq_mediaspace"></div>')
        var bfsp_win_panel = Ext.getCmp("mjwq_bfsp_win").update("");
    },

    /*扩展信息*/
    kzxxShow: function () {
        var data = this.windowData;
        var sjbhComboxData = [];
        for (var i = 0; i < data.ZFSJ.length; i++) {
            sjbhComboxData[i] = {"name": data.ZFSJ[i].SJDH, "type": data.ZFSJ[i].SJDH}
        }
        var sjbhCombox = Ext.getCmp("mjwq_pupowindow_sjbh");
        var sjbhComboxStore = this.sjdhComboxStore;

        sjbhCombox.store = sjbhComboxStore;
        sjbhComboxStore.loadData(sjbhComboxData);
        this.sjbhComboxRecords = data.ZFSJ;
        sjbhCombox.setValue(sjbhComboxData[0].type);
    },
    xzwjBtnClick: function () {
        //window.open(this.windowData.file_oripath, "_blank");
        window.open("app/Share/resource/test.flv", "_blank");
    },
    /*事件编号改变*/
    onsjbhComboxChange: function (obj, newValue, oldValue, eOpts) {
        L(this.sjbhComboxRecords)
        var sjbhComboxRecentRecord = null;
        for (var i = 0; i < this.sjbhComboxRecords.length; i++) {
            if (this.sjbhComboxRecords[i].SJDH == newValue) {
                sjbhComboxRecentRecord = this.sjbhComboxRecords[i];
                break;
            }
        }
        var comboxRecord = Ext.create("MJWQ.model.RCCCZFSJModel", sjbhComboxRecentRecord);
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
            if (i == j) {
                Ext.getCmp("mjwq_cksp_center_kzxxform_" + i).show();
                Ext.getCmp("mjwq_cksp_center_kzxxform_" + i).loadRecord(comboxRecord);
            } else {
                Ext.getCmp("mjwq_cksp_center_kzxxform_" + i).hide();
            }

        }
    },
    playFile: function (playType/*rtmp ,win*/) {
        var data = this.windowData
        var bfqContainer = Ext.getCmp("mjwq_pupowindow_bfq");
        var bfsp_rtmp_panel = Ext.getCmp("mjwq_bfsp_rtmp");
        var bfsp_win_panel = Ext.getCmp("mjwq_bfsp_win");
        L(this.windowData.file_oripath)
        var playpath = this.windowData.file_playpath;
        var file_oripath = this.windowData.file_oripath
        var file_playpath = playpath.substr(0, playpath.indexOf("id"));
        var file_playid = playpath.substr(playpath.indexOf("id"));

        playType = "rtmp";
        file_playpath = "rtmp://gmvcs.goldmsg.com:58883/live";
        file_playid = "123";

        if ("rtmp" == playType) {
            bfsp_win_panel.hide();
            bfsp_rtmp_panel.show();

            var so = new SWFObject('app/Share/resource/player.swf', 'mpl', '550', '450', '9');
            so.addParam('autoplay', 'false');
            so.addParam('allowfullscreen', 'true');
            so.addParam('allowscriptaccess', 'always');
            so.addParam('wmode', 'opaque');
            so.addVariable('file', file_playid);
            so.addVariable('streamer', file_playpath);
            so.write('mjwq_mediaspace');
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

    }
})