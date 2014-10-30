/**
 * Created by qinwen on 14-1-17.
 */
Ext.define('XTGL.controller.CJGZZGLController', {
    extend: 'Ext.app.Controller',
    pages: {},
    cjgzzConfigData: null,
    addCjgzzWindow: Ext.create('XTGL.view.CJGZZGLAddView', {
        id: 'cjgzz_add_Window',
        title: '添加'
    }),
    editCjgzzWindow: Ext.create('XTGL.view.CJGZZGLEditView', {
        id: 'cjgzz_edit_Window',
        title: '编辑'
    }),
    configCjgzzWindow: Ext.create('XTGL.view.CJGZZGLConfigView', {
        id: 'cjgzz_config_Window',
        title: '工作站策略配置'
    }),
    cjgzzStatusWindow: Ext.create('XTGL.view.CJGZZGLStatusView', {
        id: 'cjgzz_status_window',
        title: '采集工作站状态'
    }),

    init: function () {

        this.control({
            '#xtgl_cjgzzgl_addgzz':{
                click: this.addCjgzz
            },
            '#xtgl_cjgzzgl_grid': {
                itemClick: this.onItemClick
            },
            '#xtgl_cjgzzgl_addsave_btn': {
                click: this.onAddSave
            },
            '#xtgl_cjgzzgl_editsave_btn': {
                click: this.onEditSave
            },
            '#xtgl_cjgzzgl_configsave_btn': {
                click: this.onConfigSave
            },
            '#xtgl_cjgzzgl_freshgzz': {
                click: this.onFreshgzz
            }
        });

    },
    addCjgzz: function(obj){
        var form = this.addCjgzzWindow.down("form").getForm();
        form.reset();
        this.addCjgzzWindow.setTitle('添加');
        this.addCjgzzWindow.show();
    },
    onFreshgzz: function(){
        Ext.getCmp('xtgl_cjgzzgl_grid').getStore().loadPage(1);
    },

    onAddSave: function(obj){
        var tempForm = Ext.getCmp('xtgl_cjgzzgl_add_form').getForm();
        var pData = {};
        if (tempForm.isValid()) {
            var getForm = Ext.getCmp("xtgl_cjgzzgl_add_form").getValues();

            L(getForm);  //获取查询数据
            pData.flag = "add";
            pData.sid = getForm.sid;
            pData.name = getForm.name;
            pData.ip = getForm.ip;
            pData.dep_code = obj.up("form").down("TreeCombo").val;
            pData.admin = getForm.admin;
            pData.phone = getForm.phone;
            pData.address = getForm.address;
            pData.service_phone = getForm.service_phone;

            var sidFlag = Ext.getCmp("xtgl_cjgzzgl_grid").getStore().data.items;
            if(null != sidFlag){
                for(var i=0;i<sidFlag.length;i++){
                    if(pData.sid == sidFlag[i].data.sid){
                        Ext.Msg.alert('提示信息', '该工作站编号已存在！请修改后重新添加！');
                        return;
                    }
                }
            }

            Ext.Ajax.request({
                url: '/gmvcs/rest/addEditWs',
                method: 'POST',
                jsonData: pData,
                callback: function (options, success, response) {
                    var jsonResult = Ext.JSON.decode(response.responseText);
                    if (false == jsonResult.ret || "false" == jsonResult.ret) {
                        Ext.Msg.alert('提示信息', '添加工作站失败，请刷新后重试！');
                        return;
                    }
                    Ext.Msg.alert('提示信息', '添加工作站成功！');
                    Ext.getCmp('cjgzz_add_Window').hide();
                    Ext.getCmp("xtgl_cjgzzgl_grid").store.on("load",function(){
                        Ext.getCmp("xtgl_cjgzzgl_grid").getSelectionModel().select(0,true);
                    });
                    Ext.getCmp("xtgl_cjgzzgl_grid").getStore().loadPage(1);
                    //Ext.create('Share.view.LogHandle').LogHandle(2, "318", pData.sid, "添加工作站: " + pData.name + "(" + pData.sid + ")");

                }
            });
        }
    },

    onEditSave: function(obj){
        var tempForm = Ext.getCmp('xtgl_cjgzzgl_edit_form').getForm();
        var pData = {};
        if (tempForm.isValid()) {
            var getForm = Ext.getCmp("xtgl_cjgzzgl_edit_form").getValues();

            L(getForm);  //获取查询数据

            pData.flag = "edit";
            pData.sid = this.cjgzzConfigData.sid;
            pData.name = getForm.name;
            pData.ip = getForm.ip;
            pData.dep_code = obj.up("form").down("TreeCombo").val;
            pData.admin = getForm.admin;
            pData.phone = getForm.phone;
            pData.address = getForm.address;
            pData.service_phone = getForm.service_phone;

            Ext.Ajax.request({
                url: '/gmvcs/rest/addEditWs',
                method: 'POST',
                jsonData: pData,
                callback: function (options, success, response) {
                    var jsonResult = Ext.JSON.decode(response.responseText);
                    L(jsonResult)
                    if (false == jsonResult.ret || "false" == jsonResult.ret) {
                        Ext.Msg.alert('提示信息', '编辑工作站失败，请刷新后重试！');
                        return;
                    }
                    Ext.Msg.alert('提示信息', '编辑工作站成功！');
                    Ext.getCmp('cjgzz_edit_Window').hide();
                    Ext.getCmp("xtgl_cjgzzgl_grid").getStore().loadPage(1);
                   // Ext.create('Share.view.LogHandle').LogHandle(2, "319", pData.sid, "编辑工作站: " + pData.name + "(" + pData.sid + ")");

                }
            });
        }
    },

    onConfigSave :function(obj){
        var self = this;
        var tempForm = Ext.getCmp('xtgl_cjgzzgl_config_form').getForm();
        var pData = {};
        if (tempForm.isValid()) {
            var getForm = Ext.getCmp("xtgl_cjgzzgl_config_form").getValues();

            L(getForm);  //获取查询数据

            pData.flag = "config";
            pData.sid = this.cjgzzConfigData.sid;
            pData.file_save_days = getForm.file_save_days;
            pData.need_upload_ori = getForm.size1;
            pData.need_upload_tb = getForm.size2;
            pData.need_upload_flv= getForm.size3;
            pData.trancode_quality = getForm.trancode_quality;
            pData.trancode_instance = getForm.trancode_instance;
            pData.syntime = getForm.syntime;

            Ext.Ajax.request({
                url: '/gmvcs/rest/addEditWs',
                method: 'POST',
                jsonData: pData,
                callback: function (options, success, response) {
                    var jsonResult = Ext.JSON.decode(response.responseText);
                    if (false == jsonResult.ret || "false" == jsonResult.ret) {
                        Ext.Msg.alert('提示信息', '配置工作站策略失败，请刷新后重试！');
                        return;
                    }
                    Ext.Msg.alert('提示信息', '配置工作站策略成功！');
                    Ext.getCmp('cjgzz_config_Window').hide();
                    Ext.getCmp("xtgl_cjgzzgl_grid").getStore().loadPage(1);
                    //Ext.create('Share.view.LogHandle').LogHandle(2, "321", pData.sid, "编辑工作站策略: " + self.cjgzzConfigData.name + "(" + pData.sid + ")");
                }
            });
        }
    },

    onItemClick: function (obj, rowIndex, colIndex, action) {
        var record = Ext.getCmp("xtgl_cjgzzgl_grid").getStore().getAt(rowIndex);
        this.cjgzzConfigData = record.data;
        if (action == "edit") {
            //编辑工作站显示弹窗
            this.editCjgzzWindow.on('show', function( obj, eOpts ){
                Ext.getCmp('cjgzzgl_edit_sid').setValue(record.data.sid);
                Ext.getCmp('cjgzzgl_edit_name').setValue(record.data.name);
                Ext.getCmp('cjgzzgl_edit_ip').setValue(record.data.ip);
                //Ext.getCmp('cjgzzgl_edit_dep_code').setValue(record.data.dep_code);

                var EditCjgzzForm = Ext.getCmp("cjgzz_edit_Window").down("form");
                var  tree =  EditCjgzzForm.down("TreeCombo").tree;
                var node = tree.getRootNode().findChild("id",record.data.dep_code,true);
                tree.fireEvent('itemclick', tree, node, 1, 0);

                Ext.getCmp('cjgzzgl_edit_admin').setValue(record.data.admin);
                Ext.getCmp('cjgzzgl_edit_phone').setValue(record.data.phone);
                Ext.getCmp('cjgzzgl_edit_address').setValue(record.data.address);
                Ext.getCmp('cjgzzgl_edit_service_phone').setValue(record.data.service_phone);

            });

            this.editCjgzzWindow.setTitle('编辑');
            this.editCjgzzWindow.show();

        } else if(action == "delete"){
            var pData = {};
            pData.sid = record.data.sid;
            Ext.MessageBox.confirm('提示信息', '您确定要删除该工作站吗？', function(btn){
                if('yes' == btn){
                    Ext.Ajax.request({
                        url: '/gmvcs/rest/delws',
                        method: 'POST',
                        jsonData: pData,
                        callback: function (options, success, response) {
                            L(response)
                            var jsonResult = Ext.JSON.decode(response.responseText);
                            if (false == jsonResult.success) {
                                Ext.Msg.alert('提示信息', '删除工作站失败，请刷新后重试！');
                                return;
                            }
                            Ext.getCmp("xtgl_cjgzzgl_grid").getStore().loadPage(1);
                            //Ext.create('Share.view.LogHandle').LogHandle(2, "320", pData.sid, "删除工作站: " + record.data.name + "(" + pData.sid + ")");

                        }
                    });
                }

            });
        }else if(action == "config"){
            //编辑工作站显示弹窗
            this.configCjgzzWindow.on('show', function( obj, eOpts ){
                Ext.getCmp('cjgzzgl_config_del_threshold_mb').setValue(record.data.file_save_days);
                if("1" == record.data.need_upload_ori)
                    Ext.getCmp('cjgzzgl_config_need_upload_ori1').setValue(true);
                else
                    Ext.getCmp('cjgzzgl_config_need_upload_ori2').setValue(true);
                if("1" == record.data.need_upload_flv)
                    Ext.getCmp('cjgzzgl_config_need_upload_flv1').setValue(true);
                else
                    Ext.getCmp('cjgzzgl_config_need_upload_flv2').setValue(true);
                if("1" == record.data.need_upload_tb)
                    Ext.getCmp('cjgzzgl_config_need_upload_tb1').setValue(true);
                else
                    Ext.getCmp('cjgzzgl_config_need_upload_tb2').setValue(true);

                Ext.getCmp('cjgzzgl_config_trancode_quality').setValue(record.data.trancode_quality);
                Ext.getCmp('cjgzzgl_config_trancode_instance').setValue(record.data.trancode_instance);
                Ext.getCmp('cjgzzgl_config_syntime').setValue(record.data.syntime);

            });

            this.configCjgzzWindow.setTitle('策略配置');
            this.configCjgzzWindow.show();
        } else if(action == "showStatus"){
            //状态显示弹窗
            this.cjgzzStatusWindow.on('show', function( obj, eOpts ){
                Ext.getCmp('cjgzz_cpu').setValue(record.data.cpu);
                Ext.getCmp('cjgzz_total_disk').setValue(record.data.total_disk);
                Ext.getCmp('cjgzz_network').setValue(record.data.network);
                Ext.getCmp('cjgzz_last_alive_time').setValue(record.data.last_alive_time);
                Ext.getCmp('cjgzz_ram').setValue(record.data.ram);
                Ext.getCmp('cjgzz_used_disk').setValue(record.data.used_disk);
                Ext.getCmp('cjgzz_last_syn_time').setValue(record.data.last_syn_time);

            });

            this.cjgzzStatusWindow.setTitle('状态显示');
            this.cjgzzStatusWindow.show();

        }
    },

    onLoadGridColor: function(){
        var grid = Ext.getCmp('xtgl_cjgzzgl_grid');
        Ext.getCmp('xtgl_cjgzzgl_grid').getStore().on('load',function(s,records){
            var girdcount=0;L(s);L(records)
            s.each(function(r){
                if(r.get('line_status')=='在线'){
                    Ext.getCmp('xtgl_cjgzzgl_grid').getView().getRow(girdcount).style.backgroundColor='#236fa1';
                }else if(r.get('line_status')=='离线'){
                    Ext.getCmp('xtgl_cjgzzgl_grid').getView().getRow(girdcount).style.backgroundColor='#ccc';
                }
                girdcount=girdcount+1;
            });
        });
    }
})