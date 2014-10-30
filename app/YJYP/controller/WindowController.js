/**
 * Created by qinwen on 14-1-17.
 * 预警研判弹窗控制器
 */
Ext.define('YJYP.controller.WindowController', {
    extend: 'Ext.app.Controller',
    pages: {},
    kqycWindowData: null,  //声明弹窗全局变量，方便取值

    kqycZhouWindow: Ext.create('YJYP.view.YJYPkqyczhouView'),  //定义三个选项卡的窗口
    kqycYueWindow: Ext.create('YJYP.view.YJYPkqycyueView'),  //定义三个选项卡的窗口
    kqycNianWindow: Ext.create('YJYP.view.YJYPkqycnianView'),  //定义三个选项卡的窗口
    kqycQuWindow: Ext.create('YJYP.view.YJYPkqycquView'),  //定义三个选项卡的窗口

    kqycXxxxWindow: null,//Ext.create('YJYP.view.YJYPkqycmsgView'),  //定义三个选项卡的窗口
    noMediaXxxxWindow: null,//Ext.create('YJYP.view.YJYPNoMediamsgView'),
    overXxxxWindow: null,//Ext.create('YJYP.view.YJYPOvermsgView'),

    init: function() {
        this.control({
            '#yjyp_yjyp_kqyc_window':{
                show: this.onInitWindowData
            },
            '#yjyp_yjyp_kqyc_zhou_btn': {
                toggle: this.onBtnToggle("YJYP.view.YJYPkqyczhouView")
            },
            '#yjyp_yjyp_kqyc_yue_btn': {
                toggle: this.onBtnToggle("YJYP.view.YJYPkqycyueView")
            },
            '#yjyp_yjyp_kqyc_nian_btn': {
                toggle: this.onBtnToggle("YJYP.view.YJYPkqycnianView")
            },
            '#yjyp_yjyp_kqyc_qu_btn': {
                toggle: this.onBtnToggle("YJYP.view.YJYPkqycquView")
            },
            '#yjyp_yjyp_kqyc_msg_btn': {
                toggle: this.onBtnToggle("YJYP.view.YJYPmsgView")
            }

        });
    },

    //定义弹窗中，周选项卡为默认选中，并把预警研判列表中取得的值传到窗口变量
    onInitWindowData: function(obj, eOpts){
        this.kqycXxxxWindow = Ext.create('YJYP.view.YJYPkqycmsgView');
        this.noMediaXxxxWindow = Ext.create('YJYP.view.YJYPNoMediamsgView');
        this.overXxxxWindow = Ext.create('YJYP.view.YJYPOvermsgView');

        this.kqycWindowData = obj.windowData;
        obj.setTitle(obj.windowData.OBJMC + "-" + obj.windowData.YjypWindowFlag);
        var zhouBtn = Ext.getCmp("yjyp_yjyp_kqyc_zhou_btn");
        zhouBtn.toggle(true);
        var self = this;
        this.loadAllData(self);
    },

    //设置弹窗中的公共文字，并返回标志
    setWindowPublicMsg: function(labelId, msg, self){
        if("yjyp_window_xxxx" != labelId){
            Ext.getCmp(labelId).setText(self.kqycWindowData.OBJMC+"-"+this.kqycWindowData.YjypWindowFlag+" "+msg);
        }

        var flag = this.kqycWindowData.YjypWindowFlag;
        var strMsg = ["摄录时长低于90％", "执法无视频", "连续开3单以上"];
        var windowViewFlag;
        switch (flag){
            case strMsg[0]:
                windowViewFlag = "KQYC";
                break;
            case strMsg[1]:
                windowViewFlag = "noMediaCutStore";
                break;
            case strMsg[2]:
                windowViewFlag = "OVER3";
                break;
        }
        return windowViewFlag;

    },

    loadAllData:function(self){
        var zhoucolumnStore = Ext.getCmp("yjyp_zhou_column").getStore();  //周环比柱形图数据
        Ext.apply(zhoucolumnStore.proxy.extraParams,
            {
                obj_code: self.kqycWindowData.OBJBM,
                obj_type: self.kqycWindowData.OBJTYPE,
                date_flag: 'zhou'
            }
        );
        zhoucolumnStore.load();

        var zhouchartLineStore = Ext.getCmp("yjyp_zhou_chartline").getStore();  //周环比曲线图数据
        Ext.apply(zhouchartLineStore.proxy.extraParams,
            {
                obj_code: self.kqycWindowData.OBJBM,
                obj_type: self.kqycWindowData.OBJTYPE,
                date_flag: 'zhou'
            }
        );
        zhouchartLineStore.load();

        var yuecolumnStore = Ext.getCmp("yjyp_yue_column").getStore();  //月环比柱形图数据
        Ext.apply(yuecolumnStore.proxy.extraParams,
            {
                obj_code: self.kqycWindowData.OBJBM,
                obj_type: self.kqycWindowData.OBJTYPE,
                date_flag: 'yue'
            }
        );
        yuecolumnStore.load();

        var yuechartLineStore = Ext.getCmp("yjyp_yue_chartline").getStore();  //月环比曲线图数据
        Ext.apply(yuechartLineStore.proxy.extraParams,
            {
                obj_code: self.kqycWindowData.OBJBM,
                obj_type: self.kqycWindowData.OBJTYPE,
                date_flag: 'yue'
            }
        );
        yuechartLineStore.load();

        var niancolumnStore = Ext.getCmp("yjyp_nian_column").getStore();  //年环比柱形图数据
        Ext.apply(niancolumnStore.proxy.extraParams,
            {
                obj_code: self.kqycWindowData.OBJBM,
                obj_type: self.kqycWindowData.OBJTYPE,
                date_flag: 'nian'
            }
        );
        niancolumnStore.load();

        var nianchartLineStore = Ext.getCmp("yjyp_nian_chartline").getStore();  //周环比柱形图数据
        Ext.apply(nianchartLineStore.proxy.extraParams,
            {
                obj_code: self.kqycWindowData.OBJBM,
                obj_type: self.kqycWindowData.OBJTYPE,
                date_flag: 'nian'
            }
        );
        nianchartLineStore.load();

        var qustore = Ext.getCmp("yjyp_qu_chartline").getStore();  //趋势图数据
        var getForm = Ext.getCmp("yjyp_yjyp_form").getValues();  //获取日期
        Ext.apply(qustore.proxy.extraParams,
            {
                obj_code: self.kqycWindowData.OBJBM,
                obj_type: self.kqycWindowData.OBJTYPE,
                start_time: getForm.start_date,
                end_time: getForm.end_date
            }
        );
        var loadMask2 = new Ext.LoadMask(Ext.getBody(), {msg: "正在请求数据......"});
        loadMask2.show();
        qustore.load();
        qustore.on('load',function(){
            loadMask2.hide();
        });

        var store1 = Ext.getCmp("yjyp_yjyp_kqyc_grid").getStore();  //弹窗表格数据

        Ext.apply(store1.proxy.extraParams,
            {
                obj_code: self.kqycWindowData.OBJBM,
                obj_type: self.kqycWindowData.OBJTYPE,
                start_time: getForm.start_date,
                end_time: getForm.end_date
            }
        );
        store1.loadPage(1);

        var store2 = Ext.getCmp("yjyp_yjyp_nomedia_grid").store;  //弹窗表格数据

        Ext.apply(store2.proxy.extraParams,
            {
                obj_code: self.kqycWindowData.OBJBM,
                obj_type: self.kqycWindowData.OBJTYPE,
                start_time: getForm.start_date,
                end_time: getForm.end_date
            }
        );
        store2.loadPage(1);


        var store3 = Ext.getCmp("yjyp_yjyp_over_grid").store;  //弹窗表格数据

        Ext.apply(store3.proxy.extraParams,
            {
                obj_code: self.kqycWindowData.OBJBM,
                obj_type: self.kqycWindowData.OBJTYPE,
                start_time: getForm.start_date,
                end_time: getForm.end_date
            }
        );
        store3.loadPage(1);


    },

    //设置、改变周弹窗中一些可变字段，并load出值显示图标在页面上
    showZhouMsg: function(self){
        var quFlag = self.setWindowPublicMsg("yjyp_window_zhb", "周环比", self);
        self.setWindowPublicMsg("yjyp_window_qszhb", "趋势周环比", self);
        Ext.getCmp("yjyp_zhou_column").axes.items[0].fields[0] = quFlag; //动态改变同一弹窗弹窗三种数据
        Ext.getCmp("yjyp_zhou_column").series.items[0].yField = quFlag;
        Ext.getCmp("yjyp_zhou_column").series.items[0].label.field = quFlag;
        Ext.getCmp("yjyp_zhou_column").refresh();

        Ext.getCmp("yjyp_zhou_chartline").axes.items[0].fields[0] = "last" + quFlag; //动态改变同一弹窗弹窗三种数据
        Ext.getCmp("yjyp_zhou_chartline").axes.items[0].fields[1] = "this" + quFlag;
        Ext.getCmp("yjyp_zhou_chartline").series.items[0].yField = "last" + quFlag;
        Ext.getCmp("yjyp_zhou_chartline").series.items[1].yField = "this" + quFlag;
        Ext.getCmp("yjyp_zhou_chartline").refresh();
    },

    //设置、改变月弹窗中一些可变字段，并load出值显示图标在页面上
    showYueMsg: function(self){
        var quFlag = self.setWindowPublicMsg("yjyp_window_yhb",  "月环比", self);
        self.setWindowPublicMsg("yjyp_window_qsyhb",  "趋势月环比", self);
        Ext.getCmp("yjyp_yue_column").axes.items[0].fields[0] = quFlag; //动态改变同一弹窗弹窗三种数据
        Ext.getCmp("yjyp_yue_column").series.items[0].yField = quFlag;
        Ext.getCmp("yjyp_yue_column").series.items[0].label.field = quFlag;
        Ext.getCmp("yjyp_yue_column").refresh();

        Ext.getCmp("yjyp_yue_chartline").axes.items[0].fields[0] = "last" + quFlag; //动态改变同一弹窗弹窗三种数据
        Ext.getCmp("yjyp_yue_chartline").axes.items[0].fields[1] = "this" + quFlag;
        Ext.getCmp("yjyp_yue_chartline").series.items[0].yField = "last" + quFlag;
        Ext.getCmp("yjyp_yue_chartline").series.items[1].yField = "this" + quFlag;
        Ext.getCmp("yjyp_yue_chartline").refresh();

    },

    //设置、改变年弹窗中一些可变字段，并load出值显示图标在页面上
    showNianMsg: function(self){
        var quFlag = this.setWindowPublicMsg("yjyp_window_nhb",  "年同比", self);
        self.setWindowPublicMsg("yjyp_window_qsnhb",  "趋势年同比", self);
        Ext.getCmp("yjyp_nian_column").axes.items[0].fields[0] = quFlag; //动态改变同一弹窗弹窗三种数据
        Ext.getCmp("yjyp_nian_column").series.items[0].yField = quFlag;
        Ext.getCmp("yjyp_nian_column").series.items[0].label.field = quFlag;
        Ext.getCmp("yjyp_nian_column").refresh();

        Ext.getCmp("yjyp_nian_chartline").axes.items[0].fields[0] = "last" + quFlag; //动态改变同一弹窗弹窗三种数据
        Ext.getCmp("yjyp_nian_chartline").axes.items[0].fields[1] = "this" + quFlag;
        Ext.getCmp("yjyp_nian_chartline").series.items[0].yField = "last" + quFlag;
        Ext.getCmp("yjyp_nian_chartline").series.items[1].yField = "this" + quFlag;
        Ext.getCmp("yjyp_nian_chartline").refresh();

    },

    //设置、改变趋势图弹窗中一些可变字段，并load出值显示图标在页面上
    showQuMsg: function(self){
        var quFlag = self.setWindowPublicMsg("yjyp_window_qst",  "趋势图", self);

        Ext.getCmp("yjyp_qu_chartline").axes.items[0].fields[0] = quFlag; //动态改变同一弹窗弹窗三种数据
        Ext.getCmp("yjyp_qu_chartline").series.items[0].yField = quFlag;
        Ext.getCmp("yjyp_qu_chartline").refresh();

    },

    //设置、改变详细信息弹窗中一些可变字段，并load出值显示图标在页面上
    showXxxxMsg: function(self){
        var quFlag = self.setWindowPublicMsg("yjyp_window_xxxx",  "详细信息", self);
        var getForm = Ext.getCmp("yjyp_yjyp_form").getValues();  //获取日期
        //根据标志quFlag来区分三个选项卡弹出不同的详细信息窗口
        switch (quFlag){
            case "KQYC":
                Ext.getCmp('yjyp_xxxxmsg_center').removeAll(false);
                Ext.getCmp('yjyp_xxxxmsg_center').add(this.kqycXxxxWindow);
                Ext.getCmp('yjyp_window_kqyc_xxxx').setText(self.kqycWindowData.OBJMC+"-"+self.kqycWindowData.YjypWindowFlag+" "+"详细信息");

                break;
            case "noMediaCutStore":
                Ext.getCmp('yjyp_xxxxmsg_center').removeAll(false);
                Ext.getCmp('yjyp_xxxxmsg_center').add(this.noMediaXxxxWindow);
                Ext.getCmp('yjyp_window_nomedia_xxxx').setText(self.kqycWindowData.OBJMC+"-"+self.kqycWindowData.YjypWindowFlag+" "+"详细信息");

                break;
            case "OVER3":
                Ext.getCmp('yjyp_xxxxmsg_center').removeAll(false);
                Ext.getCmp('yjyp_xxxxmsg_center').add(this.overXxxxWindow);
                Ext.getCmp('yjyp_window_over_xxxx').setText(self.kqycWindowData.OBJMC+"-"+self.kqycWindowData.YjypWindowFlag+" "+"详细信息");

                break;
        }

    },


    onInitMainView: function(obj, width, height, eOpts){
        obj.toggle(true);
    },

    switchPanel: function(name){
        centerPanel = Ext.getCmp("yjyp_kqyc_center");
        centerPanel.removeAll(false);

        for(value in this.pages){
            if(value == name)
                continue;

            if('undefined' == typeof (this.pages[value]))
                continue;

            this.pages[value].hide();
        }

        if('undefined' == typeof (this.pages[name]))
        {
            //L(name);
            this.pages[name] = Ext.create(name,{

            });
        }

        this.pages[name].show();
        centerPanel.add(this.pages[name]);
    },

    onBtnToggle: function(moduleName) {
        var self = this;
        return function(obj, pressed, eOpts){
            if(true == pressed){
                self.switchPanel(moduleName);

                switch (moduleName){
                    case "YJYP.view.YJYPkqyczhouView":
                        this.showZhouMsg(self);
                        break;
                    case "YJYP.view.YJYPkqycyueView":
                        this.showYueMsg(self);
                        break;
                    case "YJYP.view.YJYPkqycnianView":
                        this.showNianMsg(self);
                        break;
                    case "YJYP.view.YJYPkqycquView":
                        this.showQuMsg(self);
                        break;
                    case "YJYP.view.YJYPmsgView":
                        this.showXxxxMsg(self);
                        break;
                }
            }
        }
    }
});