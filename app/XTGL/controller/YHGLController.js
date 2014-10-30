/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('XTGL.controller.YHGLController', {
    extend: 'Ext.app.Controller',
    pages: {},
    record: null,
    addUserWindow: Ext.create('XTGL.view.YHGLUSERView', {
        id: 'YhglAddUserWindow',
        title: '添加用户'
    }),
    editUserWindow: Ext.create('XTGL.view.YHGLUSERView', {
        id: 'YhglEditUserWindow',
        title: '属性修改'
    }),
    scopeUserWindow: Ext.create('XTGL.view.YHGLSCOPEView', {
        id: 'YhglScopeUserWindow',
        height: 400,
        title: '管理范围'
    }),
    // pjdfPopWindow: Ext.create('ZFJD.view.RCCCPJDFView'),

    init: function () {
        this.control({
            '#xtgl_yhgl_adduser': {
                click: this.onAddUser
            },
            '#xtgl_yhgl_tree': {
                load: this.onGridReady,
                itemclick: this.onOrgTreeClick
            },
            '#xtgl_yhgl_rightgrid': {
                itemClick: this.onItemClick
            },
            '#YhglAddUserWindow button[action=save]': {
                click: this.onSubAddUser
            },
            '#YhglEditUserWindow button[action=save]': {
                click: this.onSubEditUser
            },
            '#YhglScopeUserWindow button[action=save]': {
                click: this.onSubScopeUser
            }
        });
    },
    onAddUser: function (obj) {
        this.addUserWindow.show();
        this.addUserWindow.setTitle("添加用户");
        var form = this.addUserWindow.down("form").getForm();
        form.reset();
        var orgTree = Ext.getCmp('xtgl_yhgl_tree');
        var sNode = orgTree.getSelectionModel().getSelection()[0];
        var id = sNode.raw.id;
        var tree = this.addUserWindow.down("TreeCombo[name=dep_code]").tree;
        var node = tree.getRootNode().findChild("id", id, true);
        tree.fireEvent('itemclick', tree, node, 1, 0);

    },
    onSubAddUser: function (obj) {
        var self = this;
        var form = obj.up("form").getForm();
        if (form.isValid()) {
            var pData = form.getValues();
            var id = obj.up("form").down("TreeCombo").val;
            pData.dep_code = id;
            L(pData)
            Ext.Ajax.request({
                url: '/gmvcs/rest/add_user',
                method: 'POST',
                jsonData: pData,
                callback: function (options, success, response) {
                    var jsonResult = Ext.JSON.decode(response.responseText);
                    L(jsonResult)
                    if (false == jsonResult.ret && 22203 == jsonResult.error) {
                        Ext.Msg.alert('提示信息',jsonResult.msg);
                        return;
                    }
                    if (false == jsonResult.ret) {
                        Ext.Msg.alert('提示信息', '数据提交失败，请刷新后重试！');
                        return;
                    }
                    self.addUserWindow.hide();
                    var store = Ext.getCmp('xtgl_yhgl_rightgrid').getStore();
                    store.loadPage(1);
                    //Ext.create('Share.view.LogHandle').LogHandle(2, "303", pData.police_id, "添加用户: " + pData.name + "(" + pData.police_id + ")");
                    // self.recordData.set("KFQK", (-1) * kfqk);
                    // self.recordData.commit();
                }
            });
        }
    },
    onSubEditUser: function (obj) {
        var self = this;
        var form = obj.up("form").getForm();
        if (form.isValid()) {
            var pData = form.getValues();
            var id = obj.up("form").down("TreeCombo").val;
            pData.dep_code = id;
            Ext.Ajax.request({
                url: '/gmvcs/rest/edit_user',
                method: 'POST',
                jsonData: pData,
                callback: function (options, success, response) {
                    var jsonResult = Ext.JSON.decode(response.responseText);
                    if (false == jsonResult.ret) {
                        Ext.Msg.alert('提示信息', '数据提交失败，请刷新后重试！');
                        return;
                    }
                    Ext.Msg.alert('提示信息', '修改成功！');
                    self.editUserWindow.hide();
                    var store = Ext.getCmp('xtgl_yhgl_rightgrid').getStore();
                    store.loadPage(1);
                    //Ext.create('Share.view.LogHandle').LogHandle(2, "316", pData.police_id, "编辑用户: " + pData.name + "(" + pData.police_id + ")");
                }
            });
        }

    },
    onSubScopeUser: function (obj) {
        var self = this;
        pData = {};
        var cktree = Ext.getCmp("xtgl_yhgl_cktree");
        var records = cktree.getChecked(),
            name = [];

        Ext.Array.each(records, function (rec) {
            if (!Ext.Array.contains(records, rec.parentNode)) {
                name.push(rec.get('id'));
            }
        });
        var record = this.record;
        pData.police_id = record.data.police_id;
        pData.deps = name;
        Ext.Ajax.request({
            url: '/gmvcs/rest/systemManagement/scope',
            method: 'POST',
            jsonData: pData,
            callback: function (options, success, response) {
                var jsonResult = Ext.JSON.decode(response.responseText);
                if (false == jsonResult.ret) {
                    Ext.Msg.alert('提示信息', '数据提交失败，请刷新后重试！');
                    return;
                }
                self.scopeUserWindow.hide();
                Ext.Msg.alert('提示信息', '提交成功！');
                var store = Ext.getCmp('xtgl_yhgl_rightgrid').getStore();
                store.loadPage(1);
                //Ext.create('Share.view.LogHandle').LogHandle(2, "315", pData.police_id, "编辑管理范围: " + record.get("name") + "(" + pData.police_id + ")");
            }
        });

    },
    onOrgTreeClick: function (obj, record, item, index, e, eOpts) {
        var store = Ext.getCmp('xtgl_yhgl_rightgrid').getStore();
        var pData = {};
        pData.objId = record.data.id;
        Ext.apply(store.proxy.extraParams, {pData: Ext.JSON.encode(pData)});
        store.loadPage(1);
        //store.load();
    },
    onGridReady: function () {
        var orgTree = Ext.getCmp('xtgl_yhgl_tree');
        if (Ext.LoginInfo == undefined)
            return;
        orgTree.getSelectionModel().select(orgTree.getRootNode().firstChild, true);
        orgTree.getRootNode().firstChild.expand();
        //  orgTree.getSelectionModel().select((data.treestore树模型).getNodeById('节点id'),true);
        var store = Ext.getCmp('xtgl_yhgl_rightgrid').getStore();
        var pData = {};
        pData.objId = orgTree.getRootNode().firstChild.get("id");
        Ext.apply(store.proxy.extraParams, {pData: Ext.JSON.encode(pData)});
        store.loadPage(1);
    },
    onItemClick: function (obj, rowIndex, colIndex, action) {
        var self = this;
        var record = Ext.getCmp("xtgl_yhgl_rightgrid").getStore().getAt(rowIndex);
        this.record = record;
        if (action == "edit") {

            this.editUserWindow.show();
            this.editUserWindow.setTitle("编辑用户");
            var EditUserForm = Ext.getCmp("YhglEditUserWindow").down("form");
            var tree = EditUserForm.down("TreeCombo[name=dep_code]").tree;
            var node = tree.getRootNode().findChild("id", this.record.data.dep_code, true);
            tree.fireEvent('itemclick', tree, node, 1, 0);
            EditUserForm.down("textfield[name=police_id]").setValue(this.record.get("police_id"));
            EditUserForm.down("textfield[name=police_id]").setReadOnly(true);

            EditUserForm.down("textfield[name=name]").setValue(this.record.get("name"));
            EditUserForm.down("combo[name=type]").setValue(this.record.get("type"));
            EditUserForm.down("combo[name=gender]").setValue(this.record.get("gender"));
            EditUserForm.down("textfield[name=position]").setValue(this.record.get("position"));
            EditUserForm.down("combo[name=role_sid]").setValue(this.record.get("role_sid"));

        } else if (action == "rspsw") {
            Ext.MessageBox.confirm('重置密码', '<p>警员姓名：' + record.get("name") + '</p><p>警员警号：' + record.get("police_id") + '</p>确定将该用户密码重置为<font color=red>111111</font>', function (btn) {
                if (btn == "yes") {
                    var pData = {};
                    pData.police_id = record.data.police_id;
                    Ext.Ajax.request({
                        url: '/gmvcs/rest/systemManagement/reset_user_psw',
                        method: 'POST',
                        jsonData: pData,
                        callback: function (options, success, response) {
                            var jsonResult = Ext.JSON.decode(response.responseText);
                            if (false == jsonResult.ret) {
                                Ext.Msg.alert('提示信息', '数据提交失败，请刷新后重试！');
                                return;
                            }
                            Ext.Msg.alert('提示信息', '重置成功！');
                            var store = Ext.getCmp('xtgl_yhgl_rightgrid').getStore();
                            store.loadPage(1);
                            //Ext.create('Share.view.LogHandle').LogHandle(2, "311", pData.police_id, "重置用户密码: " + record.get("name") + "(" + pData.police_id + ")");
                        }
                    });
                }

            });
        } else if (action == "unlock") {
            Ext.MessageBox.confirm('解锁用户', '<p>警员姓名：' + record.get("name") + '</p><p>警员警号：' + record.get("police_id") + '</p>你确定要解锁该用户吗?', function (btn) {
                if (btn == "yes") {
                    var pData = {};
                    pData.police_id = record.data.police_id;
                    Ext.Ajax.request({
                        url: '/gmvcs/rest/systemManagement/unlock_user',
                        method: 'POST',
                        jsonData: pData,
                        callback: function (options, success, response) {
                            var jsonResult = Ext.JSON.decode(response.responseText);
                            if (false == jsonResult.ret) {
                                Ext.Msg.alert('提示信息', '数据提交失败，请刷新后重试！');
                                return;
                            }
                            Ext.Msg.alert('提示信息', '解锁成功！');
                            var store = Ext.getCmp('xtgl_yhgl_rightgrid').getStore();
                            store.loadPage(1);
                            //Ext.create('Share.view.LogHandle').LogHandle(2, "312", pData.police_id, "解锁成功: " + record.get("name") + "(" + pData.police_id + ")");
                        }
                    });
                }

            });
        } else if (action == "start") {
            Ext.MessageBox.confirm('启用用户', '<p>警员姓名：' + record.get("name") + '</p><p>警员警号：' + record.get("police_id") + '</p>你确定要启用该用户吗?', function (btn) {
                if (btn == "yes") {
                    var pData = {};
                    pData.police_id = record.data.police_id;
                    Ext.Ajax.request({
                        url: '/gmvcs/rest/systemManagement/start_user',
                        method: 'POST',
                        jsonData: pData,
                        callback: function (options, success, response) {
                            var jsonResult = Ext.JSON.decode(response.responseText);
                            if (false == jsonResult.ret) {
                                Ext.Msg.alert('提示信息', '数据提交失败，请刷新后重试！');
                                return;
                            }
                            Ext.Msg.alert('提示信息', '启用成功！');
                            var store = Ext.getCmp('xtgl_yhgl_rightgrid').getStore();
                            store.loadPage(1);
                            //Ext.create('Share.view.LogHandle').LogHandle(2, "313", pData.police_id, "启用用户: " + record.get("name") + "(" + pData.police_id + ")");
                        }
                    });
                }

            });
        } else if (action == "stop") {
            Ext.MessageBox.confirm('停用用户', '<p>警员姓名：' + record.get("name") + '</p><p>警员警号：' + record.get("police_id") + '</p>你确定要停用该用户吗?', function (btn) {
                if (btn == "yes") {
                    var pData = {};
                    pData.police_id = record.data.police_id;
                    Ext.Ajax.request({
                        url: '/gmvcs/rest/systemManagement/stop_user',
                        method: 'POST',
                        jsonData: pData,
                        callback: function (options, success, response) {
                            var jsonResult = Ext.JSON.decode(response.responseText);
                            if (false == jsonResult.ret) {
                                Ext.Msg.alert('提示信息', '数据提交失败，请刷新后重试！');
                                return;
                            }
                            Ext.Msg.alert('提示信息', '停用成功！');
                            var store = Ext.getCmp('xtgl_yhgl_rightgrid').getStore();
                            store.loadPage(1);
                            //Ext.create('Share.view.LogHandle').LogHandle(2, "314", pData.police_id, "停用用户: " + record.get("name") + "(" + pData.police_id + ")");
                        }
                    });
                }

            });
        } else if (action == "delete") {
            Ext.MessageBox.confirm('删除用户', '<p>警员姓名：' + record.get("name") + '</p><p>警员警号：' + record.get("police_id") + '</p>你确定要删除该用户吗?', function (btn) {
                if (btn == "yes") {
                    var pData = {};
                    pData.police_id = record.data.police_id;
                    Ext.Ajax.request({
                        url: '/gmvcs/rest/systemManagement/delete_user',
                        method: 'POST',
                        jsonData: pData,
                        callback: function (options, success, response) {
                            var jsonResult = Ext.JSON.decode(response.responseText);
                            if (false == jsonResult.ret) {
                                Ext.Msg.alert('提示信息', '数据提交失败，请刷新后重试！');
                                return;
                            }
                            Ext.Msg.alert('提示信息', '删除成功！');
                            var store = Ext.getCmp('xtgl_yhgl_rightgrid').getStore();
                            store.loadPage(1);
                            //Ext.create('Share.view.LogHandle').LogHandle(2, "304", pData.police_id, "删除用户: " + record.get("name") + "(" + pData.police_id + ")");
                        }
                    })
                }

            })
        } else if (action == "scope") {
            var deps = record.data.deps;
            this.scopeUserWindow.show();
            this.scopeUserWindow.setTitle("范围管理");
            var cktree = Ext.getCmp("xtgl_yhgl_cktree");
            cktree.getRootNode().cascadeBy(function () {
                this.set('checked', false);
            });
            for (var i = 0; i < deps.length; i++) {
                var node = cktree.getRootNode().findChild("id", deps[i], true);
                node.set("checked", true);
                node.cascadeBy(function (child) {
                    child.set("checked", true)
                })
                node.commit();
            }
        }
    }
})