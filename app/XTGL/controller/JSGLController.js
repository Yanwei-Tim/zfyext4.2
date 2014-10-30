/**
 * Created by hcxowe on 14-3-5.
 */

Ext.define('XTGL.controller.JSGLController',
    {
        extend: 'Ext.app.Controller',
        pages: {},
        JSGLZCYView:  null,
        JSGLEDITView: null,
        JSGLADDView:  null,
        created:      null,
        responseData: null,
        CheckArray:   null,

        EditRecord:   null,
        DeleRecord:   null,
        roleName:null,
        Operator:     null,
        JsOninit:     null,

        init: function ()
        {
            this.control({
                '#xtgl_jsgl_grid':
                {
                    itemClick: this.onItemClick,
                    cellclick: this.OnJsClick
                },
                '#jsgl_edit_OKBtn':
                {
                    click: this.OnEditOKClick
                },
                '#jsgl_edit_CancelBtn':
                {
                    click: this.OnEditCancelClick
                },
                '#xtgl_jsgl_add1':
                {
                    click: this.OnAddClick
                },
                '#jsgl_add_OKBtn':
                {
                    click: this.OnAddOKClick
                },
                '#jsgl_add_CancelBtn':
                {
                    click: this.OnAddCancelClick
                },
                '#jsgl_qxsz_save':
                {
                    click: this.OnSavaClick
                },
                '#xtgl_jsgl_mainpaenl':{
                    boxready: this.onBoxReady
                },
                "#jsgl_qxsz_panel checkbox":
                {
                    change: this.OnCheckBoxChange
                },
                "#jsgl_add_Edit":
                {
                    keypress: this.OnAddEditKeyPress
                },
                '#jsgl_edit_Edit':
                {
                    keypress: this.OnEditEditKeyPress
                }

            });

            this.created        = false;
            this.Operator       = false;
            this.CheckArray     = [];
            this.JsOninit       = true;
        },

        onBoxReady: function()
        {
            var self = this;
            //this.JSGLZCYView    = Ext.create("XTGL.view.JSGLZCYView", {title: "组成员列表"});
            this.JSGLEDITView   = Ext.create("XTGL.view.JSGLEDITView", {title: "编辑角色"});
            this.JSGLADDView    = Ext.create("XTGL.view.JSGLADDView", {title: "添加角色"});

            var store = Ext.getCmp('xtgl_jsgl_grid').getStore();
            store.load();

            this.CreateQXSZPanel();

            setTimeout(function(){
                    var grid = Ext.getCmp("xtgl_jsgl_grid");
                    grid.getSelectionModel().select(0,true);

                    var sm = grid.getSelectionModel();
                    sm.getLastSelected();
                    var record = sm.getLastSelected();

                    self.OnJsClick(0, 0, 0, record);
                },
                200);


        },

        OnBeforeCellClick: function(obj, td, cellIndex, record, tr, rowIndex, e, eOpts)
        {
            //L("OnBeforeCellClick");
            return true;
        },

        OnBeforeDeselect: function()
        {
            //L("OnBeforeDeselect");
            return true;

            /*var temp = Ext.MessageBox.confirm('提示', '是否放弃当前角色所修改的配置?', function (btn)
            {
                if(btn == 'yes')
                    return true;

                return false;
            });*/
        },

        OnBeforeSelect: function(obj, record, index, eOpts)
        {
            L("OnBeforeSelect");
            return true;

            /*var temp = Ext.MessageBox.confirm('提示', '是否放弃当前角色所修改的配置?', function (btn)
            {
                if(btn == 'yes')




                    return true;

                return false;
            });*/

        },

        OnJsClick: function(obj, td, cellIndex, record, tr, rowIndex, e, eOpts)
        {
            L('OnJsClick');
            L(this.Operator);
            if(this.Operator == true)
                return;

            this.JsOninit = true;

            // 先清空所有勾选
            for(var i=0; i<this.CheckArray.length; ++i)
            {
                var checkid = this.CheckArray[i];
                var check   = Ext.getCmp(checkid);
                if(check == null)
                    continue;

                check.setValue(false);

                if("GMVCS" == check.inputValue)
                    continue;

                check.setDisabled(true);
            }

            var curjs =  record.data.priviledges.split(',');

            //L(record);
            //L(curjs);

            if(curjs == null)
            {
                this.JsOninit = false;
                return;
            }

            for(var j=0; j<curjs.length; ++j)
            {
                var tempid      = curjs[j];
                var tempcheck   = Ext.getCmp(tempid);
                if(tempcheck == null)
                    continue;

                tempcheck.setValue(true);
                tempcheck.setDisabled(false);

                for(var k=0; k<this.CheckArray.length; ++k)
                {
                    var checkid = this.CheckArray[k];
                    var check   = Ext.getCmp(checkid);
                    if(check == null)
                        continue;

                    if(check.inputValue == tempcheck.inputValue)
                        check.setDisabled(false);
                }
            }

            this.JsOninit = false;
        },

        OnSavaClick:function(obj, e, eOpts)
        {
            var grid = Ext.getCmp("xtgl_jsgl_grid");
            if(null == grid)
            {
                Ext.Msg.alert('提示', '保存设置失败');
                return;
            }

            var sm = grid.getSelectionModel();
            sm.getLastSelected();
            var record = sm.getLastSelected();

            if(null == record)
            {
                Ext.Msg.alert('提示', '请选择一个角色在进行保存操作');
                return;
            }

            var sid         = record.data.sid;
            var name        = record.data.name;
            var descript    = record.data.descript;

            var priviledges = this.GetqxszValue();

            var responseData = null;
            var extraParams  = {};
            extraParams.sid  = sid;
            extraParams.name = name;
            extraParams.priviledges = priviledges == null ? [] : priviledges;
            extraParams.descript    = descript == null ? "" : descript;
            extraParams.type        = "save";

            // 新建store用于获取后台数据
            Ext.Ajax.request({
                url: '/gmvcs/rest/edit_role',
                method: 'POST',
                jsonData: extraParams,
                callback: function (options, success, response){
                    var responsetempData = response.responseText;
                    //L(responsetempData);
                    var responseData = eval("("+responsetempData+")");

                    if(false == responseData.ret)
                        Ext.Msg.alert('提示', '保存设置失败');
                    else
                    {
                        var tempstr = "";
                        for(var z=0; z<priviledges.length; ++z)
                        {
                            if(z==0)
                                tempstr += priviledges[z];
                            else
                                tempstr += ',' + priviledges[z];
                        }

                        record.data.priviledges = tempstr;
                        Ext.Msg.alert('提示', '保存设置成功');
                        //Ext.create('Share.view.LogHandle').LogHandle(2, "325", "", "编辑角色权限: " + name);
                    }
                }
            });

            return;
        },

        GetqxszValue: function()
        {
            if(0 == this.CheckArray.length)
                return;

            var retary = [];
            for(var i=0; i<this.CheckArray.length; ++i)
            {
                var tempcheck = Ext.getCmp(this.CheckArray[i]);
                if(null == tempcheck)
                    return null;

                if(true == tempcheck.getValue())
                {
                    var find     = false;
                    var subexist = false;
                    for(var j=0; j<this.CheckArray.length; ++j)
                    {
                        var tempsubcheck = Ext.getCmp(this.CheckArray[j]);
                        if(null == tempsubcheck)
                            return null;

                        if(tempsubcheck.inputValue == tempcheck.id)
                        {
                            subexist = true;
                            if(true == tempsubcheck.getValue())
                            {
                                find = true;
                                break;
                            }
                        }
                    }

                    if((find == true)||(subexist == false))
                        retary[retary.length] = this.CheckArray[i];
                }
            }

            L(retary);
            return retary;
        },

        OnAddEditKeyPress: function(obj, e, eOpts)
        {
            if(e.getKey() == Ext.EventObject.ENTER)
                this.OnAddOKClick();

            return;
        },

        OnAddOKClick:function(obj, e, eOpts)
        {
            var Edit        = Ext.getCmp("jsgl_add_Edit");
            var name        = trim(Edit.getValue());
            var self        = this;

            if(name.length == 0)
            {
                Ext.Msg.alert('提示', '角色名称不能为空!');
                Edit.setValue("");
                Edit.focus(false, false);
                return;
            }

            var vaildchr = "?/:*\"<>|\\";
            for(var i=0; i<name.length; ++i)
            {
                if(-1 != vaildchr.lastIndexOf(name.charAt(i)))
                {
                    Ext.Msg.alert('提示', '角色名称不能包含\"?/:*\"<>|\\\"');
                    Edit.focus(false, false);
                    return;
                }
            }

            var extraParams         = {};
            extraParams.name        = name;
            extraParams.descript    = "";

            // 新建store用于获取后台数据
            Ext.Ajax.request({
                url: '/gmvcs/rest/add_role',
                method: 'POST',
                jsonData: extraParams,
                callback: function (options, success, response){
                    var responsetempData = response.responseText;
                    var responseData     = eval("("+responsetempData+")");

                    if(false == responseData.ret)
                    {
                        if(22209 == responseData.error)
                            Ext.Msg.alert('提示', '已存在相同角色名称, 请重试!');
                        else
                            Ext.Msg.alert('提示', '创建角色失败');
                    }
                    else
                    {
                        var store = Ext.getCmp("xtgl_jsgl_grid").getStore();
                        store.reload();
                        //Ext.create('Share.view.LogHandle').LogHandle(2, "322", "", "添加角色: " + extraParams.name);
                        // 清空置灰所有勾选
                        for(var i=0; i<self.CheckArray.length; ++i)
                        {
                            var checkid = self.CheckArray[i];
                            var check   = Ext.getCmp(checkid);
                            if(check == null)
                                continue;

                            check.setValue(false);

                            if("GMVCS" == check.inputValue)
                                continue;

                            check.setValue(false);
                            check.setDisabled(true);
                        }
                    }
                }
            });

            this.JSGLADDView.hide();
            return;
        },

        OnAddCancelClick: function()
        {
            this.JSGLADDView.hide();
        },

        OnAddClick:function(obj, e, eOpts)
        {
            this.JSGLEDITView.setTitle("添加角色");
            this.JSGLADDView.show();

            var Edit = Ext.getCmp("jsgl_add_Edit");

            Edit.setValue("");
            Edit.focus(true, false);
        },

        OnEditEditKeyPress:function(obj, e, eOpts)
        {
            if(e.getKey() == Ext.EventObject.ENTER)
                this.OnEditOKClick();

            return;
        },

        OnEditOKClick:function(obj, e, eOpts)
        {
            var  self = this;
            var Edit        = Ext.getCmp("jsgl_edit_Edit");
            var name        = trim(Edit.getValue());
            var self        = this;

            if(name.length == 0)
            {
                Ext.Msg.alert('提示', '角色名称不能为空!');
                Edit.setValue("");
                Edit.focus(false, false);
                return;
            }

            var vaildchr = "?/:*\"<>|\\";
            for(var i=0; i<name.length; ++i)
            {
                if(-1 != vaildchr.lastIndexOf(name.charAt(i)))
                {
                    Ext.Msg.alert('提示', '角色名称不能包含\"?/:*\"<>|\\\"');
                    Edit.focus(false, false);
                    return;
                }
            }

            var sid         = this.EditRecord.data.sid;
            var name        = name;
            var priviledges = this.EditRecord.data.priviledges;
            var descript    = this.EditRecord.data.descript;

            var extraParams         = {};
            extraParams.sid         = sid;
            extraParams.name        = name;
            extraParams.priviledges = priviledges == "" ? [] : priviledges.split(',');
            extraParams.descript    = descript == null ? "" : descript;
            extraParams.type        = "edit";

            // 新建store用于获取后台数据
            Ext.Ajax.request({
                url: '/gmvcs/rest/edit_role',
                method: 'POST',
                jsonData: extraParams,
                callback: function (options, success, response){
                    var responsetempData = response.responseText;
                    var responseData     = eval("("+responsetempData+")");

                    if(false == responseData.ret)
                    {
                        if(22209 == responseData.error)
                            Ext.Msg.alert('提示', '已存在相同角色名称, 请重试!');
                        else
                            Ext.Msg.alert('提示', '编辑角色失败');
                    }
                    else
                    {
                        var store = Ext.getCmp("xtgl_jsgl_grid").getStore();
                        store.reload();
                        //Ext.create('Share.view.LogHandle').LogHandle(2, "323", "", "编辑角色名称: " + self.roleName+"->"+extraParams.name);
                        // 清空置灰所有勾选
                        for(var i=0; i<self.CheckArray.length; ++i)
                        {
                            var checkid = self.CheckArray[i];
                            var check   = Ext.getCmp(checkid);
                            if(check == null)
                                continue;

                            check.setValue(false);

                            if("GMVCS" == check.inputValue)
                                continue;

                            check.setValue(false);
                            check.setDisabled(true);
                        }
                    }
                }
            });

            this.JSGLEDITView.hide();
            return;
        },

        OnEditCancelClick: function()
        {
            this.JSGLEDITView.hide();
        },

        onItemClick: function (obj, rowIndex, colIndex, action)
        {
            L("onItemClick");
            this.Operator = true;
            var self = this;
            if (action == "edit")
            {
                var record = Ext.getCmp("xtgl_jsgl_grid").getStore().getAt(rowIndex);
                if(null == record.data)
                    return;

                this.EditRecord = record;

                var Edit        = Ext.getCmp("jsgl_edit_Edit");

                this.JSGLEDITView.setTitle("编辑角色");

                this.JSGLEDITView.on("hide", function(){L("hide");self.Operator = false});
                this.JSGLEDITView.show();
                this.roleName = record.data.name;
                Edit.setValue(record.data.name);
                Edit.focus(true, false);
            }
            else if (action == "show")
            {
                //var record = Ext.getCmp("xtgl_jsgl_grid").getStore().getAt(rowIndex);
                //var record = Ext.getCmp("xtgl_jsgl_grid");

                this.JSGLZCYView.show();
            }
            else if (action == "delete")
            {
                var record = Ext.getCmp("xtgl_jsgl_grid").getStore().getAt(rowIndex);

                var tip    = "删除角色会重置拥有该角色用户的权限, 确定要删除角色" + "\"" + record.data.name + '\"' + "吗?";


                Ext.MessageBox.confirm('删除角色', tip, function (btn)
                {
                    if(btn != 'yes')
                    {
                        self.Operator = false;
                        L("delete no");
                        L(self.Operator);
                        return;
                    }

                    var sid                 = record.data.sid;

                    var extraParams         = {};
                    extraParams.sid         = sid;

                    Ext.Ajax.request({
                        url: '/gmvcs/rest/del_role',
                        method: 'POST',
                        jsonData: extraParams,
                        callback: function (options, success, response){
                            var responsetempData = response.responseText;
                            var responseData     = eval("("+responsetempData+")");

                            if(false == responseData.ret)
                            {
                                Ext.Msg.alert('提示', '删除角色失败');
                            }
                            else
                            {
                                var store = Ext.getCmp("xtgl_jsgl_grid").getStore();
                                store.reload();
                                //Ext.create('Share.view.LogHandle').LogHandle(2, "324", "", "删除角色: " + record.data.name);
                                // 清空置灰所有勾选
                                for(var i=0; i<self.CheckArray.length; ++i)
                                {
                                    var checkid = self.CheckArray[i];
                                    var check   = Ext.getCmp(checkid);
                                    if(check == null)
                                        continue;

                                    check.setValue(false);

                                    if("GMVCS" == check.inputValue)
                                        continue;

                                    check.setValue(false);
                                    check.setDisabled(true);
                                }
                            }

                            //self.Operator = false;
                        }
                    });

                    self.Operator = false;
                    L("delete yes");
                    L(this.Operator);
                })
            }

            L("onItemClick");
            return;
        },

        find: function(obj, id)
        {
            if(obj == null)
                return null;

            if(obj.code == id)
            {
                L(obj);
                return obj;
            }

            if(obj.childitem == undefined)
                return null;

            for(var i=0; i<obj.childitem.length; ++i)
            {
                if(obj.childitem[i].code == id)
                {
                    return obj.childitem[i];
                }

                var temp = this.find(obj.childitem[i], id);
                if(null == temp)
                    continue;

                return temp;
            }

            return null;
        },

        OnCheckBoxChange: function(obj, newValue, oldValue, eOpts)
        {
            if(true == this.JsOninit)
                return;

            L("JsOninit == false");

            if(newValue == false)
            {
                // 去掉该节点下的所以checkbox的勾选
                var finditem = null;
                for(var x=0; x<this.responseData.length; ++x)
                {
                    finditem = this.find(this.responseData[x], obj.id);
                    if(null == finditem)
                        continue;

                    break;
                }

                if(null == finditem.childitem)
                {
                    /*// 如果同级节点无选中，则去掉父节点勾选
                    for(var j=0; j<this.CheckArray.length; ++j)
                    {
                        var tempcheck = Ext.getCmp(this.CheckArray[j]);
                        if(null == tempcheck)
                            return;

                        if(obj.inputValue == tempcheck.inputValue)
                        {
                            if(true == tempcheck.getValue())
                                return;
                        }
                    }

                    var parentcheck = Ext.getCmp(obj.inputValue);
                    parentcheck.setValue(false);*/
                    return;
                }

                L(finditem.childitem.length);
                for(var i=0; i<finditem.childitem.length; ++i)
                {
                    var subid       = finditem.childitem[i].code;
                    var subcheck    = Ext.getCmp(subid);
                    if(null == subcheck)
                        return;

                    subcheck.setValue(false);
                    subcheck.setDisabled(true);
                }

                /*// 如果同级节点无选中，则去掉父节点勾选
                for(var k=0; k<this.CheckArray.length; ++k)
                {
                    var tempcheck = Ext.getCmp(this.CheckArray[k]);
                    if(null == tempcheck)
                        return;

                    if(obj.inputValue == tempcheck.inputValue)
                    {
                        if(true == tempcheck.getValue())
                            return;
                    }
                }*/

                /*var parentcheck = Ext.getCmp(obj.inputValue);
                if(parentcheck == null)
                    return;

                parentcheck.setValue(false);
                return;*/

                return;
            }

            // 勾选将所以子项置为可用
            var finditem = null;
            for(var x=0; x<this.responseData.length; ++x)
            {
                finditem = this.find(this.responseData[x], obj.id);
                if(null == finditem)
                    continue;

                break;
            }

            if(null == finditem.childitem)
                return;

            for(var i=0; i<finditem.childitem.length; ++i)
            {
                var subid       = finditem.childitem[i].code;
                var subcheck    = Ext.getCmp(subid);
                if(null == subcheck)
                    return;

                subcheck.setValue(true);
                subcheck.setDisabled(false);
                //subcheck.removeCls("xtgl_jsgl_cbdiabled_cls");
                //subcheck.readOnly = false;
                //subcheck.addCls("xtgl_jsgl_cbenabled_cls");
            }

            /*var parentcheck = Ext.getCmp(obj.inputValue);

            if(parentcheck == null)
                return;

            parentcheck.setValue(true);

            for(var k=0; k<this.CheckArray.length; ++k)
            {
                var tempcheck = Ext.getCmp(this.CheckArray[k]);
                if(null == tempcheck)
                    return;

                if(obj.id == tempcheck.inputValue)
                    tempcheck.setValue(true);
            }*/

            return;
        },

        OnShowQXSZLB: function(responseData)
        {
            var mainpanel = Ext.getCmp("jsgl_qxsz_panel");
            var subpanel  = new Ext.form.Panel(
                {
                    layout:     'absolute',
                    border:     0,
                    autoScroll: true
                });

            var button = new Ext.Button(
                {
                    id: 'jsgl_qxsz_save',
                    width:  80,
                    height: 30,
                    text:   '保   存'
                });

            subpanel.add(button);

            var curheight = 0;

            for(var a=0; a<responseData.length; ++a)
            {
                var tembranch1 = responseData[a];

                var height = curheight + 20;
                var marginstr = height + " 0 0 20";

                var checkbox1 = new Ext.form.Checkbox(
                    {
                        margin:     marginstr,
                        boxLabel:   "<div style='font-weight:bold'>"+ tembranch1.name +"</div>",
                        id:         tembranch1.code,
                        inputValue :tembranch1.parent_code,
                        width:      200,
                        border:     0
                    });

                this.CheckArray[this.CheckArray.length] = tembranch1.code;

                subpanel.add(checkbox1);

                curheight = curheight + 25;

                if(tembranch1.childitem == null)
                    continue;

                var subitem1 = true;
                for(var ii=0; ii<tembranch1.childitem.length; ++ii)
                {
                    if(null != tembranch1.childitem[ii].childitem)
                    {
                        subitem1 = false;
                        break;
                    }
                }

                if(true == subitem1)
                {
                    var checkboxitems1 = [];
                    for(var xx=0; xx<tembranch1.childitem.length; ++xx)
                    {
                        var boxitem1 = {};
                        boxitem1.boxLabel    = tembranch1.childitem[xx].name;
                        boxitem1.id          = tembranch1.childitem[xx].code;
                        boxitem1.inputValue  = tembranch1.childitem[xx].parent_code;

                        this.CheckArray[this.CheckArray.length] = tembranch1.childitem[xx].code;

                        checkboxitems1.push(boxitem1);
                    }

                    var height4   = curheight + 20;
                    marginstr     = height4 + " 0 0 56";

                    var itemsGroup = new Ext.form.CheckboxGroup({
                        width:      600,
                        columns:    3,
                        name:       'items',
                        labelWidth: 110,
                        labelAlign: 'left',
                        margin:     marginstr,
                        items:eval(checkboxitems1)
                    });

                    subpanel.add(itemsGroup);
                    curheight += 30 * (Math.floor(tembranch1.childitem.length/3) + tembranch1.childitem.length%3);

                    continue;
                }

                for(var i=0; i<tembranch1.childitem.length; ++i)
                {
                    var tembranch11 = tembranch1.childitem[i];

                    var height2     = curheight + 20;
                    var marginstr   = height2 + " 0 0 60 ";

                    var checkbox2   = new Ext.form.Checkbox(
                        {
                            margin:     marginstr,
                            boxLabel:   tembranch11.name,
                            id:         tembranch11.code,
                            inputValue :tembranch11.parent_code,
                            width:      200
                        });

                    this.CheckArray[this.CheckArray.length] = tembranch11.code;

                    curheight = curheight + 25;
                    subpanel.add(checkbox2);

                    if(tembranch11.childitem == null)
                        continue;

                    var subitem1 = true;
                    for(var jj=0; jj<tembranch11.childitem.length; ++jj)
                    {
                        if(null != tembranch11.childitem[jj].childitem)
                        {
                            subitem1 = false;
                            break;
                        }
                    }

                    if(true == subitem1)
                    {
                        var checkboxitems1 = [];
                        for(var xx=0; xx<tembranch11.childitem.length; ++xx)
                        {
                            var boxitem1 = {};
                            boxitem1.boxLabel    = tembranch11.childitem[xx].name;
                            boxitem1.id          = tembranch11.childitem[xx].code;
                            boxitem1.inputValue  = tembranch11.childitem[xx].parent_code;

                            this.CheckArray[this.CheckArray.length] = tembranch11.childitem[xx].code;

                            checkboxitems1.push(boxitem1);
                        }

                        var height4   = curheight + 20;
                        marginstr     = height4 + " 0 0 86";

                        var itemsGroup = new Ext.form.CheckboxGroup({
                            width:      600,
                            columns:    3,
                            name:       'items',
                            labelWidth: 110,
                            labelAlign: 'left',
                            margin:     marginstr,
                            items:eval(checkboxitems1)
                        });

                        subpanel.add(itemsGroup);
                        curheight += 25 * (Math.floor(tembranch11.childitem.length/3) + tembranch11.childitem.length%3);

                        continue;
                    }

                    for(var j=0; j<tembranch11.childitem.length; ++j)
                    {
                        var tembranch111 = tembranch11.childitem[j];

                        var height3   = curheight + 20;
                        var marginstr = height3 + " 0 0 90";

                        var checkbox3 = new Ext.form.Checkbox(
                            {
                                margin:     marginstr,
                                boxLabel:   tembranch111.name,
                                id:         tembranch111.code,
                                inputValue :tembranch111.parent_code,
                                width:      200
                            });

                        this.CheckArray[this.CheckArray.length] = tembranch111.code;

                        curheight += 25;
                        subpanel.add(checkbox3);

                        if(tembranch111.childitem == null)
                            continue;

                        var checkboxitems = [];
                        for(var x=0; x<tembranch111.childitem.length; ++x)
                        {
                            var boxitem = {};
                            boxitem.boxLabel    = tembranch111.childitem[x].name;
                            boxitem.id          = tembranch111.childitem[x].code;
                            boxitem.inputValue  = tembranch111.childitem[x].parent_code;

                            this.CheckArray[this.CheckArray.length] = tembranch111.childitem[x].code;

                            checkboxitems.push(boxitem);
                        }

                        var height4   = curheight + 20;
                        marginstr     = height4 + " 0 0 120";

                        var itemsGroup = new Ext.form.CheckboxGroup({
                            width:      600,
                            columns:    3,
                            name:       'items',
                            labelWidth: 110,
                            labelAlign: 'left',
                            margin:     marginstr,
                            items:eval(checkboxitems)
                        });

                        subpanel.add(itemsGroup);
                        curheight += 50;
                    }
                }

                curheight += 25;
            }

            subpanel.height += 20;
            mainpanel.add(subpanel);
            mainpanel.doLayout();

            this.created = true;
            return;
        },

        CreateQXSZPanel: function()
        {
            if(true == this.created)
                return;

            var self         = this;
            var responseData = null;
            // 新建store用于获取后台数据
            Ext.Ajax.request({
                url: '/gmvcs/rest/get_function_info',
                method: 'GET',
                callback: function (options, success, response){
                    var responsetempData = response.responseText;
                    self.responseData = eval("("+responsetempData+")").body;
                    self.OnShowQXSZLB(self.responseData);}
            });

            this.created = true;
            return;
        }
    }
)

