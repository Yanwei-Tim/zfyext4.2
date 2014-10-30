/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('ZFJD.controller.MainFrame', {
    extend: 'Ext.app.Controller',
    pages: {},

    init: function () {
        this.timeLimit();
        this.control({
            '#zfjd_mainpanel':{
                boxready: this.onBoxReady
            },
            '#zfjd_rccc_btn': {
                boxready: this.onInitMainView,
                toggle: this.onBtnToggle("ZFJD.view.RCCCView")
            },
            '#zfjd_ycjd_btn': {
                toggle: this.onBtnToggle("ZFJD.view.YCJDView")
            },
            '#zfjd_jdkp_btn': {
                toggle: this.onBtnToggle("ZFJD.view.JDKPView")
            }
        });
    },
    onBoxReady:function()    {
        var btn1 = Ext.getCmp("zfjd_rccc_btn");
        var btn2 = Ext.getCmp("zfjd_ycjd_btn");
        var btn3 = Ext.getCmp("zfjd_jdkp_btn");

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
        }

    },
    onInitMainView: function (obj, width, height, eOpts) {
        obj.toggle(true);
    },

    switchPanel: function (name) {
        centerPanel = Ext.getCmp("zfjd_center");
        centerPanel.removeAll(false);


        if ('undefined' == typeof (this.pages[name])) {
            //L(name);
            this.pages[name] = Ext.create(name);
        }

        centerPanel.add(this.pages[name]);
    },

    onBtnToggle: function (moduleName) {
        return function (obj, pressed, eOpts) {
            if (true == pressed)
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
        });
    }
});