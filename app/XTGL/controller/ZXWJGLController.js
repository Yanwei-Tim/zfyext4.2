/**
 * Created by qinwen on 14-1-17.
 */
Ext.define('XTGL.controller.ZXWJGLController', {
    extend: 'Ext.app.Controller',
    pages: {},
    thisRowData: null,
    addZxwjWindow: Ext.create('XTGL.view.ZXWJGLAddView', {
        id: 'zxwj_add_Window',
        title: '添加'
    }),
    editZxwjWindow: Ext.create('XTGL.view.ZXWJGLEditView', {
        id: 'zxwj_edit_Window',
        title: '编辑'
    }),
    zxwjStatusWindow: Ext.create('XTGL.view.ZXWJGLStatusView', {
        id: 'zxwj_status_window',
        title: '状态显示'
    }),
    zxwjAssignWsWindow: Ext.create('XTGL.view.ZXWJGLAssignView', {
        id: 'zxwj_assign_Window',
        title: '分配工作站'
    }),

    init: function () {
        this.control({
            '#xtgl_zxwjgl_addzxwj': {
                click: this.addCjgzz
            },
            '#xtgl_zxwjgl_grid': {
                itemClick: this.onItemClick
            },
            '#xtgl_zxwjgl_addsave_btn': {
                click: this.onAddSave
            },
            '#xtgl_zxwjgl_editsave_btn': {
                click: this.onEditSave
            },
            '#xtgl_zxwjgl_assign_btn': {
                click: this.onAssign
            },
            '#zxwj_assign_Window': {
                show: this.onShow
            },
            '#xtgl_zxwjgl_freshzxwj': {
                click: this.onFreshZxwj
            }
        });

    },
    addCjgzz: function () {
        var form = this.addZxwjWindow.down("form").getForm();
        form.reset();
        this.addZxwjWindow.setTitle('添加');
        this.addZxwjWindow.show();
    },
    onFreshZxwj: function(){
        Ext.getCmp('xtgl_zxwjgl_grid').getStore().loadPage(1);
    },

    onShow: function(obj, eOpts){
        var self = this;
        var jsonResult = "";
        Ext.getCmp('zxwj_assign_name').setValue(self.thisRowData.sid);

        var pData = {};
        pData.c_sid = self.thisRowData.sid;

        Ext.Ajax.request({
            url: '/gmvcs/rest/get_cfilemgr_ws',
            method: 'POST',
            jsonData: pData,
            callback: function (options, success, response) {
                jsonResult = response.responseText;
                //Ext.getCmp('zxwj_assign_wsname').setValue(jsonResult);
                Ext.getCmp('zxwj_itemselector-field').up('form').getForm().reset();
                Ext.getCmp('zxwj_itemselector-field').setValue(jsonResult.split(","));
            }
        });
    },

    onAddSave: function () {
        var tempForm = Ext.getCmp('xtgl_zxwjgl_add_form').getForm();
        var pData = {};
        if (tempForm.isValid()) {
            var getForm = Ext.getCmp("xtgl_zxwjgl_add_form").getValues();
            if(null != getForm.worktime_begin || null != getForm.worktime_end){
                if (!this.TimeDiff(getForm.worktime_begin, getForm.worktime_end)) {
                    Ext.Msg.alert('提示信息', '开始时间不能大于结束时间');
                    return;
                }
            }else{
                getForm.worktime_begin = "00:00:00";
                getForm.worktime_end = "00:00:00";
            }


            L(getForm);  //获取查询数据
            pData.flag = "add";
            pData.sid = getForm.sid;
            pData.name = getForm.name;
            pData.ip = getForm.ip;
            pData.worktime_begin = getForm.worktime_begin;
            pData.worktime_end = getForm.worktime_end;
            pData.max_speed = getForm.max_speed;

            var sidFlag = Ext.getCmp("xtgl_zxwjgl_grid").getStore().data.items;
            if(null != sidFlag){
                for(var i=0;i<sidFlag.length;i++){
                    if(pData.sid == sidFlag[i].data.sid){
                        Ext.Msg.alert('提示信息', '该存储服务器编号已存在！请修改后重新添加！');
                        return;
                    }
                }
            }

            Ext.Ajax.request({
                url: '/gmvcs/rest/updatecenterfilemgr',
                method: 'POST',
                jsonData: pData,
                callback: function (options, success, response) {
                    var jsonResult = response.responseText;
                    if (false == jsonResult.ret) {
                        Ext.Msg.alert('提示信息', '添加存储服务器失败，请刷新后重试！');
                        return;
                    }
                    Ext.Msg.alert('提示信息', '添加存储服务器成功！');
                    Ext.getCmp('zxwj_add_Window').hide();
                    Ext.getCmp("xtgl_zxwjgl_grid").store.on("load",function(){
                        Ext.getCmp("xtgl_zxwjgl_grid").getSelectionModel().select(0,true);
                    });
                    Ext.getCmp("xtgl_zxwjgl_grid").getStore().loadPage(1);

                    // 记录日志
                    var descript = "添加存储服务器: " + pData.name+"(" + pData.sid + ")";
                    //Ext.create('Share.view.LogHandle').LogHandle(2, "326", pData.sid, descript);

                }
            });
        }
    },

    onEditSave: function () {
        var tempForm = Ext.getCmp('xtgl_zxwjgl_edit_form').getForm();
        var pData = {};
        if (tempForm.isValid()) {
            var getForm = Ext.getCmp("xtgl_zxwjgl_edit_form").getValues();
            if (!this.TimeDiff(getForm.worktime_begin, getForm.worktime_end)) {
                Ext.Msg.alert('提示信息', '开始时间不能大于结束时间');
                return;
            }
            L(getForm);  //获取查询数据
            pData.flag = "edit";
            pData.sid = this.thisRowData.sid;
            pData.name = getForm.name;
            pData.ip = getForm.ip;
            pData.worktime_begin = getForm.worktime_begin;
            pData.worktime_end = getForm.worktime_end;
            pData.max_speed = getForm.max_speed;


            Ext.Ajax.request({
                url: '/gmvcs/rest/updatecenterfilemgr',
                method: 'POST',
                jsonData: pData,
                callback: function (options, success, response) {
                    var jsonResult = response.responseText;
                    if (false == jsonResult.ret) {
                        Ext.Msg.alert('提示信息', '编辑存储服务器失败，请刷新后重试！');
                        return;
                    }
                    Ext.Msg.alert('提示信息', '编辑存储服务器成功！');
                    Ext.getCmp('zxwj_edit_Window').hide();
                    Ext.getCmp("xtgl_zxwjgl_grid").getStore().loadPage(1);

                    // 记录日志
                    var descript = "编辑存储服务器: " + pData.name+"(" + pData.sid + ")";
                    //Ext.create('Share.view.LogHandle').LogHandle(2, "327", pData.sid, descript);
                }
            });
        }
    },

    //分配工作站
    onAssign: function () {
        var tempForm = Ext.getCmp('xtgl_zxwjgl_assign_form').getForm();
        var pData = {};
        if (tempForm.isValid()) {

            //L(this.thisRowData.data.sid);  //获取查询数据
            pData.c_sid = this.thisRowData.sid;
            var name = this.thisRowData.name;
            L(this.thisRowData);

            var assignedData = Ext.getCmp('zxwj_itemselector-field').getValue();
            if(null == assignedData)
                return;
            var sids = new Array();
            for(var i=0;i<assignedData.length;i++){
                sids[i] = assignedData[i];
            }
            pData.ws_sid = sids;
            L(pData);

            Ext.Ajax.request({
                url: '/gmvcs/rest/assignCenterWsHandle',
                method: 'POST',
                jsonData: pData,
                callback: function (options, success, response) {
                    var jsonResult = response.responseText;
                    if (false == jsonResult.ret) {
                        Ext.Msg.alert('提示信息', '分配工作站失败，请刷新后重试！');
                        return;
                    }
                    Ext.Msg.alert('提示信息', '分配工作站成功！');
                    Ext.getCmp('zxwj_assign_Window').hide();
                    Ext.getCmp("xtgl_zxwjgl_grid").getStore().loadPage(1);

                    // 记录日志
                    var descript = "分配工作站: " + name +"(" + pData.c_sid + ")";
                    //Ext.create('Share.view.LogHandle').LogHandle(2, "327", pData.c_sid, descript);
                }
            });
        }
    },

    onItemClick: function (obj, rowIndex, colIndex, action) {
        var wjid = "";
        var record = Ext.getCmp("xtgl_zxwjgl_grid").getStore().getAt(rowIndex);
        this.thisRowData = record.data;
        if (action == "edit") {
            //编辑工作站显示弹窗
            this.editZxwjWindow.on('show', function (obj, eOpts) {
                Ext.getCmp('zxwj_edit_sid').setValue(record.data.sid);
                Ext.getCmp('zxwj_edit_name').setValue(record.data.name);
                Ext.getCmp('zxwj_edit_ip').setValue(record.data.ip);
                Ext.getCmp('zxwj_edit_worktime_begin').setValue(record.data.worktime_begin);
                Ext.getCmp('zxwj_edit_worktime_end').setValue(record.data.worktime_end);
                Ext.getCmp('zxwj_edit_max_speed').setValue(record.data.max_speed);


            });
            this.editZxwjWindow.setTitle('编辑');
            this.editZxwjWindow.show();

        } else if (action == "delete") {
            var pData = {};
            pData.sid = record.data.sid;
            Ext.MessageBox.confirm('提示信息', '您确定要删除该存储服务器吗？', function (btn) {
                if('yes' == btn){
                    Ext.Ajax.request({
                        url: '/gmvcs/rest/delcenterfilemgr',
                        method: 'POST',
                        jsonData: pData,
                        callback: function (options, success, response) {
                            L(response)
                            var jsonResult = response.responseText;
                            if (false == jsonResult.ret) {
                                Ext.Msg.alert('提示信息', '删除存储服务器失败，请刷新后重试！');
                                return;
                            }
                            Ext.getCmp("xtgl_zxwjgl_grid").getStore().loadPage(1);

                            // 记录日志
                            var descript = "删除存储服务器: " + record.data.name+"(" + record.data.sid + ")";
                            //Ext.create('Share.view.LogHandle').LogHandle(2, "328", pData.sid, descript);
                        }
                    });
                }
            });
        } else if (action == "showStatus") {

            //状态显示弹窗
            this.zxwjStatusWindow.on('show', function (obj, eOpts) {
                Ext.getCmp('zxwj_cpu').setValue(record.data.cpu);
                Ext.getCmp('zxwj_total_disk').setValue(record.data.total_disk);
                Ext.getCmp('zxwj_network').setValue(record.data.network);
                Ext.getCmp('zxwj_ram').setValue(record.data.last_alive_time);
                Ext.getCmp('zxwj_used_disk').setValue(record.data.ram);
                Ext.getCmp('zxwj_last_alive_time').setValue(record.data.used_disk);

            });

            this.zxwjStatusWindow.setTitle('状态显示');
            this.zxwjStatusWindow.show();
        } else if (action == "assignWs") {

            this.zxwjAssignWsWindow.setTitle('分配工作站');
            this.zxwjAssignWsWindow.show();
        }
    },

    TimeDiff: function (s1, s2) {
        s1 = s1.split(":");
        s2 = s2.split(":");
        if (s1[0] > s2[0]) {
            return false;
        } else if (s1[0] == s2[0] && s1[1] > s2[1]) {
            return false;
        } else if (s1[0] == s2[0] && s1[1] == s2[1] && s1[2] > s2[2]) {
            return false;
        }
        return true;
    }
})