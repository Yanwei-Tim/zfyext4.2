/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('XTGL.controller.MainFrame', {
    extend: 'Ext.app.Controller',
    pages: {},

    init: function() {
        this.timeLimit();
        this.control({
            '#xtgl_mainpanel':{
                boxready: this.onBoxReady
            },
            '#xtgl_bmgl_btn': {
                //boxready: this.onInitMainView,
                toggle: this.onBtnToggle("XTGL.view.BMGLView")
            },
            '#xtgl_yhgl_btn': {
                toggle: this.onBtnToggle("XTGL.view.YHGLView")
            },
            '#xtgl_zfjlygl_btn': {
                toggle: this.onBtnToggle("XTGL.view.ZFJLYGLView")
            },
            '#xtgl_cjzzzgl_btn': {
                toggle: this.onBtnToggle("XTGL.view.CJGZZGLView")
            },
            '#xtgl_jsgl_btn': {
                toggle: this.onBtnToggle("XTGL.view.JSGLView")
            },
            '#xtgl_zxwjgl_btn': {
                toggle: this.onBtnToggle("XTGL.view.ZXWJGLView")
            }
        });
    },

    onBoxReady: function()
    {
        var btn1 = Ext.getCmp("xtgl_bmgl_btn");
        var btn2 = Ext.getCmp("xtgl_yhgl_btn");
        var btn3 = Ext.getCmp("xtgl_zfjlygl_btn");
        var btn4 = Ext.getCmp("xtgl_cjzzzgl_btn");
        var btn5 = Ext.getCmp("xtgl_jsgl_btn");
        var btn6 = Ext.getCmp("xtgl_zxwjgl_btn");

        var x = 11;
        var i = 0;
        var first = false;

        if(btn1.hidden == false)
        {
            i = 1;
            btn1.setLocalX(x);
            x = x + 102 + 1;

            first = true;
        }

        if(btn2.hidden == false)
        {
            if(first == false)
                i = 2;

            btn2.setLocalX(x);
            x = x + 102 + 1;
            first = true;
        }

        if(btn3.hidden == false)
        {
            if(first == false)
                i = 3;

            btn3.setLocalX(x);
            x = x + 142 + 1;
            first = true;
        }

        if(btn4.hidden == false)
        {
            if(first == false)
                i = 4;

            btn4.setLocalX(x);
            x = x + 142 + 1;
            first = true;
        }

        if(btn5.hidden == false)
        {
            if(first == false)
                i = 5;

            btn5.setLocalX(x);
            x = x + 102 + 1;
            first = true;
        }

        if(btn6.hidden == false)
        {
            if(first == false)
                i = 6;

            btn6.setLocalX(x);
            first = true;
        }

        L(i);
        switch (i)
        {
            case 1:
                btn1.toggle(true);
                break;
            case 2:
                btn2.toggle(true);
                break;
            case 3:
                btn3.toggle(true);
                break;
            case 4:
                btn4.toggle(true);
                break;
            case 5:
                btn5.toggle(true);
                break;
            case 6:
                btn6.toggle(true);
                break;
        }

    },

    onInitMainView: function(obj, width, height, eOpts){
        obj.toggle(true);
    },

    switchPanel: function(name){
        centerPanel = Ext.getCmp("xtgl_center");
        centerPanel.removeAll(false);


        if('undefined' == typeof (this.pages[name]))
        {
            //L(name);
            this.pages[name] = Ext.create(name);
        }

        centerPanel.add(this.pages[name]);
        //解决分配工作站列表刷新问题
        if(name == "XTGL.view.ZXWJGLView"){
            Ext.getCmp('zxwj_itemselector-field').getStore().load();
        }

        /*if(name == "XTGL.view.CJGZZGLView"){
            //采集工作站列表，在线状态字体颜色正常，离线状态为红色，each为列表store循环
            Ext.getCmp('xtgl_cjgzzgl_grid').getStore().on('load',function(s,records){
                var gridcount=0;
                s.each(function(r){
                    if(r.get('line_status')=='离线'){
                        Ext.getCmp('xtgl_cjgzzgl_grid').getView().addRowCls(r, "line_status_cls1");
                    }
                    gridcount=gridcount+1;
                });
            });
        }
        if(name == "XTGL.view.ZXWJGLView"){
            //服务器列表，在线状态字体颜色正常，离线状态为红色，each为列表store循环
            Ext.getCmp('xtgl_zxwjgl_grid').getStore().on('load',function(s,records){
                var gridcount=0;
                s.each(function(r){
                    if(r.get('line_status')=='离线'){
                        Ext.getCmp('xtgl_zxwjgl_grid').getView().addRowCls(r, "line_status_cls2");
                    }
                    gridcount=gridcount+1;
                });
            });
        }*/

    },

    onBtnToggle: function(moduleName) {
        return function(obj, pressed, eOpts){
            if(true == pressed)
                this.switchPanel(moduleName);
        }
    },
    timeLimit: function () {
        Ext.apply(Ext.form.VTypes, {
            daterange: function (val, field) {
                if (field.fromDateId) {
                    if (Ext.getCmp(field.fromDateId).rawValue > val) {
                        return false;
                    }
                }
                if (field.toDateId) {
                    if (Ext.getCmp(field.toDateId).rawValue < val) {
                        return false;
                    }
                }
                return true;
            },
            daterangeText: '开始时间不能大于结束时间'
        })
        Ext.apply(Ext.form.VTypes, {
            trimBlank: function (val, field) {
                if (trim(val) == "") {
                        return false;
                }
                return true;
            },
            trimBlankText: '该输入项不能为空'
        })
        Ext.apply(Ext.form.VTypes, {
            trimNum: function (val, field) {
                if (trim(val) == "") {
                    return false;
                }
                var reg = new RegExp(/^\d+$/);
                if (!reg.test(val)) {
                    return false;
                }
                return true;
            },
            trimBlankText: '只能输入数字'
        })
    }
});