/**
 * Created by yongzhi.zhan on 14-1-17.
 */
Ext.define('YJYP.controller.MainFrame', {
    extend: 'Ext.app.Controller',
    pages: {},
    popWindow: Ext.create('YJYP.view.YJYPkqycWindow'), //定义弹窗，方便取值

    init: function() {
        this.timeLimit();
        this.control({
            '#yjyp_yjyp_btn': {
                toggle: this.onBtnToggle("YJYP.view.YJYPView"),
                boxready: this.onInitMainView
            },
            '#yjyp_yjyp_kqyc_btn': {
                toggle: this.onBtnToggle("YJYP.view.YJYPkqycView")
            },
            '#yjyp_yjyp_searchbtn': {
                click: this.searchMsg
            },
            '#yjyp_yjyp_grid': {
                cellclick: this.kqycMsgList
            }
        });
    },

    //预警研判列表搜索按钮
    searchMsg: function(){
        var tempForm = Ext.getCmp('yjyp_yjyp_form').getForm();
        if (tempForm.isValid()) {
            var getForm = Ext.getCmp("yjyp_yjyp_form").getValues();
            var record = Ext.getCmp("yjyp_yjyp_org").org_val.raw;
            var store = Ext.getCmp("yjyp_yjyp_grid").getStore();
            var objtype = 1;
            var obj_code = record.id;
            if(record.is_org == true || record.isRoot == true)
                objtype = 0;
            var raval = Ext.getCmp('yjyp_yjyp_org').rawValue;
            if(raval != record.text){
                obj_code = raval;
                obj_type = 1;
            }
            Ext.apply(store.proxy.extraParams,
                {
                    obj_code: obj_code,
                    obj_type: objtype,  //orgmsg.depth
                    start_time: getForm.start_date,
                    end_time: getForm.end_date
                }
            );
            store.loadPage(1);
        }
    },

    //预警研判点击列表弹出窗口，并传入标志flag,区别点击的元素
    kqycMsgList: function( obj, td, cellIndex, record, tr, rowIndex, e, eOpts ){
        this.popWindow.windowData = record.data;
        var flag;
        if(cellIndex > 2 && cellIndex < 6){
            switch (cellIndex){
                case 3:
                    flag = "摄录时长低于90％";
                    break;
                case 4:
                    flag = "执法无视频";
                    break;
                case 5:
                    flag = "连续开3单以上";
                    break;
            }
            this.popWindow.windowData.YjypWindowFlag = flag;
            this.popWindow.show();

        }else{
            return;
        }

    },


    //定义初始按下的选项卡
    onInitMainView: function(obj, width, height, eOpts){
        obj.toggle(true);

    },

    switchPanel: function(name){
        centerPanel = Ext.getCmp("yjyp_center");
        centerPanel.removeAll(false);

        if('undefined' == typeof (this.pages[name]))
        {
            //L(name);
            this.pages[name] = Ext.create(name);
        }

        centerPanel.add(this.pages[name]);
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
        });
    }
});