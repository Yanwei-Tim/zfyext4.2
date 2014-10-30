/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('ZFJD.controller.RCCCController', {
    extend: 'Ext.app.Controller',
    pages: {},
    baseInfoPopWindow: Ext.create('ZFJD.view.RCCCCKSPView'),
    pjdfPopWindow: Ext.create('ZFJD.view.RCCCPJDFView'),
    jzbcPopWindow: Ext.create('ZFJD.view.RCCCZJBCView'),
    record: null,
    columns: null,
    init: function () {
        this.control({
            '#showModel': {
                change: this.onShowModel
            },
            '#zfjd_rccc_search_btn': {
                click: this.onSearch
            },
            '#zfjd_rccc_grid': {
                boxready: this.onGridReady
            },
            '#zfjd_rccc_grid': {
                itemClick: this.onItemClick
            },
            '#zfjd_ycjd_grid_sfzlxcf': {
                itemClick: this.onItemClick
            },
            "#zjbc_bc": {
                click: this.onzjbcBtnClick
            }
        });
    },
    onSearch: function () {
        var tempForm1 = Ext.getCmp('zfjd_rccc_search_form1').getForm();
        if (tempForm1.isValid()) {
            var pData = tempForm1.getValues();
            var record = Ext.getCmp('zfjd_rccc_org').org_val.raw;
            var raval = Ext.getCmp('zfjd_rccc_org').rawValue;
            if (raval != record.text) {
                pData.police_id = raval
            } else {
                if (record.is_org == true || record.isRoot == true) {
                    pData.dep_code = record.id
                } else {
                    pData.police_id = record.id
                }
            }
            for (var i in pData) {
                if (pData[i] === '' || pData[i] == null) {
                    delete pData[i];
                }
            }
            var store = Ext.getCmp('zfjd_rccc_grid').getStore();
            Ext.apply(store.proxy.extraParams, {pData: Ext.JSON.encode(pData)});
            store.loadPage(1);
        }
    },
    onShowModel: function (obj, newValue, oldValue, eOpts) {
        var self = this;
        self.columns = this.getColumn();
        if (newValue == "pic") {
            self.columns[1].renderer = this.renderImg;
            Ext.getCmp('zfjd_rccc_grid').reconfigure(null, self.columns);
        } else {
            var columns = self.columns.removeAt(2);
            Ext.getCmp('zfjd_rccc_grid').reconfigure(null, columns);
        }
    },
    onGridReady: function () {
        var pData = {
            start_date: new Date().Format('yyyy-MM-dd'),
            end_date: new Date().Format('yyyy-MM-dd')
        }

        pData.org_id = Ext.getCmp('zfjd_rccc_org').val;
        var store = Ext.getCmp('zfjd_rccc_grid').getStore();
        Ext.apply(store.proxy.extraParams, {pData: Ext.JSON.encode(pData)});

    },

    onItemClick: function (obj, rowIndex, colIndex, action) {
        var wjid = "";
        if (action == "plays") {
            var record = Ext.getCmp("zfjd_ycjd_center").down("grid").getStore().getAt(rowIndex);

            for (var i = 0; i < record.data.SJDH.length; i++) {
                if (record.data.SJDH[i].WJID == 0)
                    continue;
                wjid += record.data.SJDH[i].WJID + ",";
            }
            wjid = wjid.substring(0, wjid.length - 1);
            L(wjid)
        } else {
            var record = Ext.getCmp('zfjd_rccc_grid').getStore().getAt(rowIndex);
            wjid = record.data.sid;
        }
        var self = this;
        if (action == "play" || action == "valuing" || action == "plays") {
            var url = '/gmvcs/rest/get_file_info?code=' + wjid;
            if (action == "valuing")
                var url = '/gmvcs/rest/get_file_info/get_scope_info?code=' + wjid;
            else if (action == "play") {
                if (!record.data.file_status) {
                    Ext.Msg.alert('提示信息', '该记录已过期！');
                    return;
                }

            }
            var loadMask = new Ext.LoadMask(Ext.getBody(), {msg: "正在请求数据......"});
            loadMask.show();
            Ext.Ajax.request({
                url: url,
                method: 'GET',
                callback: function (options, success, response) {
                    loadMask.hide();

                    var jsonResult = Ext.JSON.decode(response.responseText);
                    if (false == jsonResult.ret) {
                        Ext.Msg.alert('提示信息', '数据加载失败，请刷新后重试！');
                        return;
                    }
                    if (action == "play" || action == "plays") {
                        self.baseInfoPopWindow.windowData = jsonResult; //数组形式表示：支持返回多个文件的信息

                        L("record.data.SJDH");

                        if (action == "play") {
                            L(jsonResult);
                            var descript = "文件属性: " + jsonResult.body[0].capture_unit + "(" + jsonResult.body[0].capture_dep_id + ") " + jsonResult.body[0].capture_user_name + "(" + jsonResult.body[0].capture_user_id + ")";
                            L(descript);
                            //Ext.create('Share.view.LogHandle').LogHandle(1, "201", wjid, descript);
                        }
                        else {
                            // 记录日志
                            for (var i = 0; i < record.data.SJDH.length; i++) {
                                if (record.data.SJDH[i].WJID == 0)
                                    continue;

                                var descript = "文件属性: " + record.data.dep_name + "(" + record.data.police_dep + ") " + record.data.capture;
                                L(descript);
                                //Ext.create('Share.view.LogHandle').LogHandle(1, "201", record.data.SJDH[i].WJID, descript);
                            }
                        }

                        self.baseInfoPopWindow.show();
                        self.baseInfoPopWindow.setTitle("查看文件");

                    } else if (action == "valuing") {
                        self.pjdfPopWindow.windowData = jsonResult;
                        self.pjdfPopWindow.recordData = record;
                        self.pjdfPopWindow.show();
                        self.pjdfPopWindow.setTitle("评价打分");
                    }
                }
            });
        } else if (action == "donwload") {

            // 记录日志
            //var descript = "文件属性: " + record.data.dep_name + "(" + record.data.police_dep + ") " + record.data.capture;
            //Ext.create('Share.view.LogHandle').LogHandle(1, "203", record.data.sid, descript);

            Ext.Ajax.request({
                url: '/gmvcs/rest/DownLoad?url=' + record.data.file_oripath,
                method: 'GET',
                callback: function (options, success, response) {
                }
            });
            window.open(record.data.file_oripath, "_blank");
            //window.open('/gmvcs/rest/DownLoad?url=' + record.data.file_oripath, "_blank");

        }
        else if (action == "save") {
            /* this.jzbcPopWindow.show();
             var form = this.jzbcPopWindow.down("form").getForm();
             form.reset();
             this.record = record;*/

            //var record = Ext.getCmp('zfjd_rccc_grid').getStore().getAt(rowIndex);

            //L(record);

            Ext.MessageBox.confirm('保存证据', '确定要保存该证据吗？', function (btn) {
                if (btn == "yes") {
                    var pData = {};
                    pData.sid = record.data.sid;
                    Ext.Ajax.request({
                        url: '/gmvcs/rest/lawSupervise/save_evidence',
                        method: 'POST',
                        jsonData: pData,
                        callback: function (options, success, response) {
                            var jsonResult = Ext.JSON.decode(response.responseText);
                            if (false == jsonResult.ret) {
                                Ext.Msg.alert('提示信息', '数据提交失败，请刷新后重试！');
                                return;
                            }
                            Ext.Msg.alert('提示信息', '保存成功！');
                            //var store = Ext.getCmp('zfjd_rccc_grid').getStore();
                            //store.loadPage(1);
                            record.set("need_upload", 1);
                            record.commit();

                            // 记录日志
                            var descript = "文件属性: " + record.data.dep_name + "(" + record.data.police_dep + ") " + record.data.capture;
                            //Ext.create('Share.view.LogHandle').LogHandle(1, "209", record.data.sid, descript);
                        }
                    });
                }

            });

        }
        else if (action == "del") {
            Ext.MessageBox.confirm('删除文件', '确定要删除该文件吗？', function (btn) {
                if (btn == "yes") {

                    var descript = "文件属性: " + record.data.dep_name + "(" + record.data.police_dep + ") " + record.data.capture;

                    var pData = {};
                    pData.sid = record.data.sid;
                    Ext.Ajax.request({
                        url: '/gmvcs/rest/lawSupervise/del_file',
                        method: 'POST',
                        jsonData: pData,
                        callback: function (options, success, response) {
                            var jsonResult = Ext.JSON.decode(response.responseText);
                            if (false == jsonResult.ret) {
                                Ext.Msg.alert('提示信息', '数据提交失败，请刷新后重试！');
                                return;
                            }
                            Ext.Msg.alert('提示信息', '删除成功！');
                            var store = Ext.getCmp('zfjd_rccc_grid').getStore();
                            // store.remove(record)
                            store.loadPage(1);
                            /* record.set("need_upload", 1);
                             record.commit();*/

                            // 记录日志

                            //Ext.create('Share.view.LogHandle').LogHandle(1, "204", pData.sid, descript);
                        }
                    });
                }

            });

        }
    },
    onzjbcBtnClick: function (obj) {
        var pData = {};
        var me = this;
        pData.sid = this.record.data.sid;
        Ext.Ajax.request({
            url: '/gmvcs/rest/lawSupervise/save_evidence',
            method: 'POST',
            jsonData: pData,
            callback: function (options, success, response) {
                var jsonResult = Ext.JSON.decode(response.responseText);
                if (false == jsonResult.ret) {
                    Ext.Msg.alert('提示信息', '数据提交失败，请刷新后重试！');
                    return;
                }
                Ext.Msg.alert('提示信息', '保存成功！');
                me.jzbcPopWindow.hide();
                //var store = Ext.getCmp('zfjd_rccc_grid').getStore();
                //store.loadPage(1);
                me.record.set("need_upload", 1);
                me.record.commit();
            }
        });
    },
    getColumn: function () {
        return  [
            {
                width: 60,
                minWidth: 60,
                align: "center",
                header: '序号',
                xtype: 'rownumberer'
            },
            {
                header: '缩略图',
                menuDisabled: true,
                dataIndex: 'file_thumbnail',
                align: 'center',
                width: 200,
                minWidth: 200
            },
            {
                header: '部门',
                menuDisabled: true,
                dataIndex: 'dep_name',
                align: 'center',
                minWidth: 200,
                width: 200
            },
            {
                header: '警员名称(警号)',
                menuDisabled: true,
                align: 'center',
                dataIndex: 'capture',
                minWidth: 150,
                width: 150
            },
            {
                header: '文件时间(文件时长)',
                menuDisabled: true,
                align: 'center',
                dataIndex: 'file_info',
                minWidth: 250,
                width: 250
            },
            {
                header: '数据编号',
                menuDisabled: true,
                align: 'center',
                dataIndex: 'SJDH',
                minWidth: 200,
                width: 200,
                renderer: function (value) {
                    if (null == value || "" == value || "null" == value) {
                        return "-";
                    } else {
                        return value;
                    }
                }
            },
            {
                header: '数据类型',
                menuDisabled: true,
                align: 'center',
                dataIndex: 'SJLX',
                minWidth: 100,
                width: 100,
                renderer: function (value) {
                    if (null == value || "" == value || "null" == value) {
                        return "-";
                    } else {
                        return value;
                    }
                }
            },
            {
                header: '扣分情况',
                menuDisabled: true,
                align: 'center',
                dataIndex: 'KFQK',
                minWidth: 100,
                width: 100
            },
            {
                header: '操作',
                menuDisabled: true,
                align: 'center',
                dataIndex: 'KFQK',
                minWidth: 220,
                width: 220,
                xtype: 'actiontextcolumn',
                items: [
                    {
                        tooltip: '查看',
                        text: '查看  ',
                        cls: 'actionText',
                        handler: function (obj, rowIndex, colIndex) {
                            this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "play");
                        }
                    },
                    {
                        text: '下载  ',
                        tooltip: '下载',
                        cls: 'actionText',
                        getClass: function (v, meta, record) {
                            record.disableDownload = false;
                            var index = Ext.LoginInfo.info.priviledgeTable.XT_ZFJD_RCCC_SJXZ
                            if (Ext.LoginInfo.info.priviledges.substr(parseInt(index) - 1, 1) == 1)
                                return "actionText";

                            record.disableDownload = true;
                            return "disablePlay";
                        },
                        handler: function (obj, rowIndex, colIndex) {
                            var store = obj.getStore();
                            var record = store.getAt(rowIndex);
                            if (true == record.disableDownload)
                                return;
                            this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "donwload");
                        }
                    },
                    {
                        text: '证据保存  ',
                        tooltip: '证据保存',
                        getClass: function (v, meta, record) {
                            var id = record.get('need_upload');
                            record.disableSave = false;

                            if ("0" == id)
                                return "actionText";

                            record.disableSave = true;
                            return "disablePlay";
                        },
                        handler: function (obj, rowIndex, colIndex) {
                            var store = obj.getStore();
                            var record = store.getAt(rowIndex);
                            if (true == record.disableSave)
                                return;
                            this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "save");
                        }
                    },
                    {
                        text: '评价打分 ',
                        tooltip: '评价打分',
                        cls: 'actionText',
                        getClass: function (v, meta, record) {
                            record.disableValuing = false;
                            var index = Ext.LoginInfo.info.priviledgeTable.XT_ZFJD_RCCC_PJDF
                            if (Ext.LoginInfo.info.priviledges.substr(parseInt(index) - 1, 1) == 1)
                                return "actionText";

                            record.disableValuing = true;
                            return "disablePlay";
                        },
                        handler: function (obj, rowIndex, colIndex) {
                            var store = obj.getStore();
                            var record = store.getAt(rowIndex);
                            if (true == record.disableValuing)
                                return;
                            this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "valuing");
                        }
                    },
                    {
                        text: '删除',
                        tooltip: '删除',
                        cls: 'actionText',
                        getClass: function (v, meta, record) {
                            record.disableDel = false;
                            var index = Ext.LoginInfo.info.priviledgeTable.XT_ZFJD_RCCC_SJSC
                            if (Ext.LoginInfo.info.priviledges.substr(parseInt(index) - 1, 1) == 1)
                                return "actionText";

                            record.disableDel = true;
                            return "disablePlay";
                        },
                        handler: function (obj, rowIndex, colIndex) {
                            var store = obj.getStore();
                            var record = store.getAt(rowIndex);
                            if (true == record.disableDel)
                                return;
                            this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "del");
                        }
                    }
                ]
            },
            {
                header: '视频质量',
                menuDisabled: true,
                align: 'center',
                dataIndex: 'media_quality',
                minWidth: 100,
                width: 100
            },
            {
                header: '比对结果',
                menuDisabled: true,
                align: 'center',
                dataIndex: 'BDJG',
                width: 100,
                renderer: function (value) {
                    if (null == value || "" == value || "null" == value) {
                        return "-";
                    } else {
                        return value;
                    }
                }
            },
            {
                header: '媒体类型',
                menuDisabled: true,
                align: 'center',
                dataIndex: 'file_type',
                flex: 1,
                minWidth: 200,
                width: 200
            }
        ]
    },
    renderImg: function (value, metaData, record, rowIndex, colIndexview) {
        L(value)
        //value = "app/ZFJD/resource/imgs/demo.jpg?rand=" + Math.random();

        var imgID = "imgID_" + rowIndex;

        setTimeout(function () {
            var img = new Image(); //创建一个Image对象，实现图片的预下载

            img.onerror = function () {
                var obj = document.getElementById(imgID);
                obj.setAttribute("src", "app/ZFJD/resource/imgs/error.gif");
            }

            img.onload = function () { //图片下载完毕时异步调用callback函数。
                var obj = document.getElementById(imgID);
                obj.setAttribute("src", value);
                obj.setAttribute("width", "150px");
                obj.setAttribute("height", "100px");
            }

            img.src = value;
        }, 100);

        return '<img id="' + imgID + '" src="app/ZFJD/resource/imgs/loading.gif"/> '
    }
})