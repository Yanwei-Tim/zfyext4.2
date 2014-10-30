/*
 * Created by hcxowe on 14-2-21.
 */

Ext.define('TJFX.controller.QSDBTController',
    {
        extend: 'Ext.app.Controller',
        pages: {},
        Query: false,
        init: function ()
        {
            this.control({
                '#tjfx_qsdbt_search_btn':
                {
                    click: this.onSearch
                }
            })
        },

        onSearch: function ()
        {
            if(false == Ext.getCmp('tjfx_tjsj_org').org_val.raw.is_org)
                return;

            var self = this;
            Ext.Ajax.request({
                url: '/gmvcs/rest/QSDBTGetSubOrg/',
                params:{
                    root:Ext.getCmp('tjfx_qsdbt_org').val
                    //showPolice: true
                },
                method: 'GET',
                callback: function (options, success, response) {
                    var jsonResult = Ext.JSON.decode(response.responseText);
                    self.reflashChart(jsonResult)
                }
            });
        },

        reflashChart: function(jsonResult)
        {
            var self = this;

            for(var a=0; a<50; ++a)
            {
                //Ext.getCmp("tjfx_qsdbt_chart").axes.items[0].fields[a] = "";
                Ext.getCmp("tjfx_qsdbt_chart").series.getAt(a).hideAll();
                Ext.getCmp("tjfx_qsdbt_chart").series.items[a].showInLegend = false;
                Ext.getCmp("tjfx_qsdbt_chart").series.items[a].showMarkers  = true;
            }

            for(var i=0; i<jsonResult.length; ++i)
            {
                Ext.getCmp("tjfx_qsdbt_chart").series.items[i].showInLegend = true;
                Ext.getCmp("tjfx_qsdbt_chart").series.getAt(i).showAll();
                Ext.getCmp("tjfx_qsdbt_chart").series.items[i].showMarkers  = true;
                Ext.getCmp("tjfx_qsdbt_chart").series.items[i].title        = jsonResult[i].desc;
            }

            var extraParams = {};
            var tempForm = Ext.getCmp('tjfx_qsdbt_search_form').getForm();

            if (tempForm.isValid())
            {
                extraParams.orgId       = Ext.getCmp('tjfx_qsdbt_org').val;
                extraParams.orgType     = Ext.getCmp('tjfx_qsdbt_org').org_val.get("depth");
                extraParams.start_time  = tempForm.getValues().start_date;
                extraParams.end_time    = tempForm.getValues().end_date;
                extraParams.DBItem      = tempForm.getValues().qsdbt_dbx;

                var qsdbt_store = Ext.getCmp('tjfx_qsdbt_chart').getStore();
                var qsdbt_panel = Ext.getCmp('qsdbt_panel');
                Ext.apply(qsdbt_store.proxy.extraParams, extraParams);

                var loadMask = new Ext.LoadMask(qsdbt_panel, {msg: "正在请求数据......"});

                loadMask.show();
                qsdbt_store.load();
                qsdbt_store.on({
                    load:function(){
                        loadMask.hide();
                    }
                })
            }

            return;
        }
    });

