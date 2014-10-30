Ext.define('ZFJD.view.RCCCGIRD', {
    extend: 'Share.view.EditGrid',
    id: 'zfjd_rccc_grid',
    region: 'center',
    requires: [ 'Share.view.ActionTextColumn'],
    xtype: 'gridpanel',
    layout: 'fit',
    editable: false,
    store: Ext.create('ZFJD.store.RCCCStore'),
    columns: null,
    initComponent: function () {
        var index = Ext.LoginInfo.info.priviledgeTable.XT_SJBD;
        var item1 = {
            hidden: true
        }
        var item2 = {
            hidden: true
        }
        var item3 = {
            hidden: true
        }
        if (Ext.LoginInfo.info.priviledges.substr(parseInt(index) - 1, 1) == 1) {
            item1 = {
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
            }
            item2 = {
                header: '数据类型',
                menuDisabled: true,
                align: 'center',
                dataIndex: 'SJLX',
                minWidth: 70,
                width: 70,
                renderer: function (value) {
                    if (null == value || "" == value || "null" == value) {
                        return "-";
                    } else {
                        return value;
                    }
                }
            }
            item3 = {
                header: '比对结果',
                menuDisabled: true,
                align: 'center',
                dataIndex: 'BDJG',
                width: 70,
                renderer: function (value) {
                    if (null == value || "" == value || "null" == value) {
                        return "-";
                    } else {
                        return value;
                    }
                }
            }

        }
        this.columns = [
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
            item1,
            item2,
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
                header: '关键视频',
                menuDisabled: true,
                align: 'center',
                dataIndex: 'unusual',
                minWidth: 70,
                width: 70
            },
            {
                header: '视频质量',
                menuDisabled: true,
                align: 'center',
                dataIndex: 'media_quality',
                minWidth: 70,
                width: 70
            },
            item3,
            {
                header: '标注类型',
                menuDisabled: true,
                align: 'center',
                dataIndex: 'BZLX',
                flex: 1,
                minWidth: 170,
                width: 170,
                renderer: function (val) {
                    if (val == "00") {
                        val = "例行记录(保存3个月)";
                    } else if (val == "01") {
                        val = "执法不规范(永久保存)";
                    } else if (val == "02") {
                        val = "投诉不正确(永久保存)";
                    }
                    else if (val == "03") {
                        val = "投诉存疑(保存6个月)";
                    } else if (val == "04") {
                        val = "执法存疑(保存6个月)";
                    } else if (val == "05") {
                        val = "无效数据(优先删除)";
                    } else
                        val = "-"
                    return val;
                }
            },
            {
                header: '媒体类型',
                menuDisabled: true,
                align: 'center',
                dataIndex: 'file_type',
                flex: 1,
                minWidth: 70,
                width: 70
            }
        ]
        this.columns[1].renderer = this.renderImg;
        this.callParent(arguments);
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

});


