/*
 * Created by hcxowe on 14-2-18.
 */

Ext.define('TJFX.controller.TJSJController',
    {
        extend: 'Ext.app.Controller',
        pages: {},
        TJSJPWView: null,
        leaf: null,
        level: null,
        maxlevel: null,
        bottom1org: null,
        bottom2org: null,
        init: function () {
            this.control({
                '#tjfx_tjsj_search_btn': {
                    click: this.onSearch
                },
                '#tjfx_tjsj_grid': {
                    cellclick: this.onCellClick
                },
                '#tjfx_tjsj_pw': {
                   // show: this.PopWindow
                }
            });

            this.TJSJPWView = Ext.create("TJFX.view.TJSJPWView",{
                id:"tjfx_tjsj_pw"
            });
            this.leaf = false;
            this.level = 0;
            this.maxlevel = 0;
            this.bottom1org = false;
            this.bottom2org = false;
        },

        onSearch: function () {
            if (false == Ext.getCmp('tjfx_tjsj_org').org_val.raw.is_org)
                return;

            var tempForm = Ext.getCmp('tjfx_tjsj_search_form').getForm();
            var extraParams = {};

            this.bottom1org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom1Level;
            this.bottom2org = Ext.getCmp('tjfx_tjsj_org').org_val.raw.isBottom2Level;

            if (tempForm.isValid()) {
                extraParams = tempForm.getValues();
                extraParams.orgId = Ext.getCmp('tjfx_tjsj_org').val;
                extraParams.orgType = 0;

                var store = Ext.getCmp('tjfx_tjsj_grid').getStore();
                store.proxy.extraParams = extraParams;
                store.loadPage(1);

                if (true == this.bottom1org) {
                    Ext.getCmp('GZZColumn').hide();
                    Ext.getCmp('JYColumn').hide();
                    Ext.getCmp('ZFYColumn').hide();
                }
                else {
                    Ext.getCmp('GZZColumn').show();
                    Ext.getCmp('JYColumn').show();
                    Ext.getCmp('ZFYColumn').show();
                }
            }
        },
        onCellClick:function(obj, td, cellIndex, record, tr, rowIndex, e, eOpts){

            this.TJSJPWView.show();

            this.PopWindow(obj, td, cellIndex, record, tr, rowIndex, e, eOpts)
        },
        PopWindow: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
            if (2 > cellIndex) {
                L("点击了第一、二列");
                return;
            }

            if ((this.bottom2org) && (rowIndex != 0) && (cellIndex <= 4)) {
                return;
            }

            if ((this.bottom1org) && (rowIndex != 0)) {
                return;
            }
            // 获得网格的列模型
            var tempForm = Ext.getCmp('tjfx_tjsj_search_form').getForm();
            var extraParams = {};

            if (tempForm.isValid()) {
                extraParams = tempForm.getValues();
                extraParams.orgId = record.get('OBJBM');

                if (rowIndex == 0)
                    extraParams.orgType = 0;
                else if (this.bottom1org)
                    extraParams.orgType = 1;

                extraParams.objItem = this.bottom1org ? cellIndex + 2 : cellIndex - 1;
                var store = Ext.getCmp('tjfx_tjsjpw_chart').getStore();
                store.proxy.extraParams = extraParams;
                store.load();
                var title = '统计分析';
                title = title + '-' + record.get('OBJMC') + '-' + Ext.getCmp('tjfx_tjsj_grid').columns[extraParams.objItem + 1].text + ' (' + extraParams.start_date + '至' + extraParams.end_date + ')';
                this.TJSJPWView.setTitle(title);

            }
            else
                return;
        }
    });