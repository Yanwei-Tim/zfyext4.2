/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('RZSJ.controller.MainFrame', {
    extend: 'Ext.app.Controller',
    pages: {},

    init: function () {
        var self = this;
        this.timeLimit();
        this.control({
            '#rzsj_yhrz_btn': {
                toggle: this.onBtnToggle("RZSJ.view.YHRZView"),
                boxready: this.onInitMainView
            },
            '#rzsj_glrz_btn': {
                toggle: this.onBtnToggle("RZSJ.view.WSUserView")
            },
            '#rzsj_zfjly_btn': {
                toggle: this.onBtnToggle("RZSJ.view.WSDeviceView")
            },
            "#rzsj_webrzlx_btn1": {
                change: function (obj, newValue, oldValue, eOpts) {
                    L(newValue)
                    if (newValue == "2") {
                        self.switchPanel("RZSJ.view.GLRZView");
                        Ext.getCmp("rzsj_webrzlx_btn2").setValue("2");
                    }
                }
            },
            "#rzsj_webrzlx_btn2": {
                change: function (obj, newValue, oldValue, eOpts) {
                    L(newValue)
                    if (newValue == "1") {
                        self.switchPanel("RZSJ.view.YHRZView");
                        Ext.getCmp("rzsj_webrzlx_btn1").setValue("1");
                    }
                }
            }
        });
    },

    onInitMainView: function (obj, width, height, eOpts) {
        obj.toggle(true);
    },

    switchPanel: function (name) {
        centerPanel = Ext.getCmp("rzsj_center");
        centerPanel.removeAll(false);


        if ('undefined' == typeof (this.pages[name])) {
            //L(name);
            this.pages[name] = Ext.create(name);
        }

        centerPanel.add(this.pages[name]);
    },

    onBtnToggle: function (moduleName) {

        return function (obj, pressed, eOpts) {
            if (true == pressed){
                this.switchPanel(moduleName);
                var web = Ext.getCmp("rzsj_webrzlx_btn1");
                var ws = Ext.getCmp("rzsj_wsrzlx_btn1");
                if (web != undefined)
                    web.setValue("1");
                if (ws != undefined)
                    ws.setValue("1");
            }
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
                ;
                if (field.toDateId) {
                    if (Ext.getCmp(field.toDateId).rawValue < val) {
                        return false;
                    }
                }
                ;
                return true;
            },
            daterangeText: '开始时间不能大于结束时间'
        });
    }
});