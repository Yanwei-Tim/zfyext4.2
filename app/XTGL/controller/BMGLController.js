/**
 * Created by yongzhi.zhan on 14-3-5.
 */
Ext.define('XTGL.controller.BMGLController', {
    extend: 'Ext.app.Controller',
    bmglEditPopWindow: Ext.create('XTGL.view.BMGLEditWindow', {id: "BMGLEditWindow"}),
    bmglAddPopWindow: Ext.create('XTGL.view.BMGLAddWindow', {id: "BMGLAddWindow"}),
    record: null,
    init: function () {
        this.control({
            '#xtgl_bmgl_treegrid': {
                load: this.onGridReady,
                actionItemClick: this.onItemClick
            },
            '#BMGLEditWindow': {
                show: this.onBMGLEditShow
            },
            '#bmgl_edit_ok': {
                click: this.onEditOk
            },
            '#bmgl_edit_cancel': {
                click: this.onEditCancel
            },
            '#bmgl_add_ok': {
                click: this.onAddOk
            },
            '#bmgl_add_cancel': {
                click: this.onAddCancel
            },
            '#xtgl_bmgl_search': {
                click: this.onSearch
            }
        });
        var tree = this.bmglEditPopWindow.down("TreeCombo[name=dep_code]").tree;
        var me = this;
        tree.on('load', function (obj) {
            if( me.record == null) return;
            if (me.record.parentNode.getId() != "root")
                tree.fireEvent('itemclick', tree, me.record.parentNode, 1, 0);
        })
    },

    onItemClick: function (obj, rowIndex, colIndex, action) {
        var tree = Ext.getCmp("xtgl_bmgl_treegrid");
        var record = tree.getView().getRecord(tree.getView().getNode(rowIndex));
        this.record = record;
        if ("add" == action)
            this.onAdd(obj, rowIndex, colIndex, action);

        if ("edit" == action) {
            this.bmglEditPopWindow.windowData = record;

            //显示弹出窗口
            this.bmglEditPopWindow.setTitle("编辑部门信息");
            this.bmglEditPopWindow.show();

            var EditOrgForm = Ext.getCmp("bmgl_edit_form");
            var tree = EditOrgForm.down("TreeCombo[name=dep_code]").tree;
            var store = tree.getStore();
            Ext.apply(store.proxy.extraParams, {showPolice: false, showHideOrg: true});
            store.load();


        }

        if ("delete" == action)
            this.onDelete(obj, rowIndex, colIndex, action);

        if ("hide" == action)
            this.onHide(obj, rowIndex, colIndex, action);
    },
    onGridReady: function () {
        var orgTree = Ext.getCmp('xtgl_bmgl_treegrid');
        if (Ext.LoginInfo == undefined)
            return;
        orgTree.getSelectionModel().select(orgTree.getRootNode().firstChild, true);
        orgTree.getRootNode().firstChild.expand();


        var record = orgTree.getRootNode().firstChild
        record.set("show", true);
        record.commit();
    },

    onBMGLEditShow: function (obj) {
        //初始化值
        var windowData = obj.windowData;
        Ext.getCmp("xtgl_bmgl_bmmc").setValue(windowData.get("bmmc"));
        Ext.getCmp("xtgl_bmgl_bmbh").setValue(windowData.get("bmbh"));
        Ext.getCmp("xtgl_bmgl_bmpx").setValue(windowData.get("bmpx"));
    },

    onEditOk: function () {
        var self = this;
        var form = Ext.getCmp("bmgl_edit_form");
        if (!form.isValid())
            return false;

        var formData = form.getValues();

        //增加部门ID
        formData.bmbh = self.bmglEditPopWindow.windowData.raw.id;
        formData.parent_code = Ext.getCmp('bmgl_edit_form').down("TreeCombo").val;

        var loadMask = new Ext.LoadMask(Ext.getBody(), {msg: "正在保存数据......"});
        loadMask.show();
        Ext.Ajax.request({
            url: '/gmvcs/rest/dep_info/save',
            method: 'POST',
            jsonData: formData,
            callback: function (options, success, response) {
                loadMask.hide();

                var jsonResult = Ext.JSON.decode(response.responseText);
                if (false == jsonResult.ret) {
                    if ("selforg" == jsonResult.msg) {
                        Ext.Msg.alert('提示信息', '数据保存失败，不能添加到本部门及其子部门！');
                        return;
                    }
                    if ("existorgname" == jsonResult.msg) {
                        Ext.Msg.alert('提示信息', '该部门名称在同级部门中已存在，请重新输入！');
                        return;
                    }
                    Ext.Msg.alert('提示信息', '数据保存失败，请刷新后重试！');
                    return;
                }

                //对传入指针赋值，影响外部数据
                //self.bmglEditPopWindow.windowData.set("bmbh", formData.bmbh);
                self.bmglEditPopWindow.windowData.set("bmpx", formData.bmpx);
                self.bmglEditPopWindow.windowData.commit();

                //重新排序
                Ext.getCmp("xtgl_bmgl_treegrid").getStore().sort({
                    property: 'bmpx',
                    direction: 'ASC',
                    sortType: 'asInt'
                }, {
                    property: 'org_name',
                    direction: 'ASC'
                });

                self.bmglEditPopWindow.hide();
                Ext.Msg.alert('提示信息', '编辑部门成功！');
                Ext.getCmp("xtgl_bmgl_treegrid").getStore().load();
                var orgTree = Ext.getCmp('bmgl_edit_form').down("TreeCombo").tree;
                orgTree.getStore().load();

                //Ext.create('Share.view.LogHandle').LogHandle(2, "307", formData.bmbh, "编辑部门: " + formData.bmmc + "(" + formData.bmbh + ")");
            }
        });
    },

    onEditCancel: function () {
        this.bmglEditPopWindow.hide();
    },

/////////添加部门
    onAdd: function (obj, rowIndex, colIndex, action) {
        var tree = Ext.getCmp("xtgl_bmgl_treegrid");
        var record = tree.getView().getRecord(tree.getView().getNode(rowIndex));
        this.bmglAddPopWindow.windowData = record;

        var form = this.bmglAddPopWindow.down("form").getForm();
        form.reset();

        //显示弹出窗口
        this.bmglAddPopWindow.setTitle("添加部门信息");
        this.bmglAddPopWindow.show();
    },
    onAddOk: function (obj) {
        var self = this;
        var form = Ext.getCmp("bmgl_add_form");
        if (!form.isValid())
            return false;

        var formData = form.getValues();

        //增加部门ID
        formData.parent_code = self.bmglAddPopWindow.windowData.raw.id;

        var loadMask = new Ext.LoadMask(Ext.getBody(), {msg: "正在保存数据......"});
        loadMask.show();
        Ext.Ajax.request({
            url: '/gmvcs/rest/dep_info/addOrg',
            method: 'POST',
            jsonData: formData,
            callback: function (options, success, response) {
                loadMask.hide();

                var jsonResult = Ext.JSON.decode(response.responseText);
                if (false == jsonResult.ret) {
                    if ("exist" == jsonResult.msg) {
                        Ext.Msg.alert('提示信息', '该部门编号已存在，请重新输入！');
                        return;
                    }
                    if ("existorgname" == jsonResult.msg) {
                        Ext.Msg.alert('提示信息', '该部门名称在同级部门中已存在，请重新输入！');
                        return;
                    }
                    Ext.Msg.alert('提示信息', '数据保存失败，请刷新后重试！');
                    return;
                }

                //对传入指针赋值，影响外部数据
                //self.bmglAddPopWindow.windowData.set("bmbh", formData.bmbh);
                self.bmglAddPopWindow.windowData.set("bmpx", formData.bmpx);
                self.bmglAddPopWindow.windowData.commit();

                //重新排序
                Ext.getCmp("xtgl_bmgl_treegrid").getStore().sort({
                    property: 'bmpx',
                    direction: 'ASC',
                    sortType: 'asInt'
                }, {
                    property: 'org_name',
                    direction: 'ASC'
                });

                self.bmglAddPopWindow.hide();
                Ext.Msg.alert('提示信息', '添加部门成功！');
                Ext.getCmp("xtgl_bmgl_treegrid").getStore().load();
                //Ext.create('Share.view.LogHandle').LogHandle(2, "301", formData.bmbh, "添加部门: " + formData.bmmc + "(" + formData.bmbh + ")");
            }
        });
    },

    onAddCancel: function () {
        this.bmglAddPopWindow.hide();
    },

//////删除部门
    onDelete: function (obj, rowIndex, colIndex, action) {
        var tree = Ext.getCmp("xtgl_bmgl_treegrid");
        var record = tree.getView().getRecord(tree.getView().getNode(rowIndex));
        var pData = {};
        pData.code = record.data.bmbh;

        Ext.MessageBox.confirm('提示信息', '您确定要删除该部门吗？', function (btn) {
            if ('yes' == btn) {
                Ext.Ajax.request({
                    url: '/gmvcs/rest/dep_info/delete',
                    method: 'POST',
                    jsonData: pData,
                    callback: function (options, success, response) {
                        var jsonResult = Ext.JSON.decode(response.responseText);
                        if (false == jsonResult.ret) {
                            if ("existuser" == jsonResult.msg) {
                                Ext.Msg.alert('提示信息', '删除部门失败，该部门存在用户！');
                                return;
                            }
                            if ("existorg" == jsonResult.msg) {
                                Ext.Msg.alert('提示信息', '删除部门失败，该部门存在子部门！');
                                return;
                            }
                            Ext.Msg.alert('提示信息', '删除部门失败，请刷新后重试！');
                            return;
                        }
                        Ext.Msg.alert('提示信息', '删除部门成功！');
                        Ext.getCmp("xtgl_bmgl_treegrid").getStore().load();
                        //Ext.create('Share.view.LogHandle').LogHandle(2, "302", pData.code, "删除部门: " + record.data.bmmc + "(" + pData.code + ")");
                    }
                });
            }

        });
    },

    onHide: function (obj, rowIndex, colIndex, action) {
        var tree = Ext.getCmp("xtgl_bmgl_treegrid");
        var node = tree.getView().getNode(rowIndex);
        var record = tree.getView().getRecord(node);

        //提交后的状态
        var display = record.raw.isHide;
        var msg = "";
        var orgdescript = '';
        var num = "";
        if (false == display) {
            msg = "确定隐藏该部门吗？";
            orgdescript = "隐藏部门";
            num = "308";
        } else {
            msg = "确定显示该部门吗？";
            orgdescript = "显示部门";
            num = "309";
        }

        Ext.Msg.buttonText = {
            yes: '确定',
            no: '取消',
            ok: '确定',
            cancel: '取消'
        };

        Ext.MessageBox.confirm("操作提示", msg, function (button, text) {
            if (button != 'yes')
                return;

            var loadMask = new Ext.LoadMask(Ext.getBody(), {msg: "正在保存数据......"});
            loadMask.show();
            Ext.Ajax.request({
                url: '/gmvcs/rest/dep_info/hide',
                method: 'POST',
                jsonData: {
                    isHide: !display,
                    depCode: record.raw.id
                },
                callback: function (options, success, response) {
                    loadMask.hide();

                    var jsonResult = Ext.JSON.decode(response.responseText);
                    if (false == jsonResult.ret) {
                        Ext.Msg.alert('提示信息', '数据保存失败，请刷新后重试！');
                        return;
                    }

                    if (display) {
                        record.raw.isHide = false;
                    } else {
                        record.raw.isHide = true;
                    }

                    record.commit();
                    Ext.getCmp("xtgl_bmgl_treegrid").getStore().load();

                    //Ext.create('Share.view.LogHandle').LogHandle(2, num, record.raw.id, orgdescript + ": " + record.raw.text + "(" + record.raw.id + ")");
                }
            });
        });
    },

    onSearch: function (obj) {
        var tree = Ext.getCmp("xtgl_bmgl_treegrid");
        var store = tree.getStore();

        Ext.apply(store.proxy.extraParams, Ext.getCmp("xtgl_bmgl_search_form").getValues());
        store.getRootNode().removeAll();
        store.load();
    }
})