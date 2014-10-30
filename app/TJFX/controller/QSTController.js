/*
 * Created by hcxowe on 14-2-21.
 */

Ext.define('TJFX.controller.QSTController',
    {
        extend: 'Ext.app.Controller',
        allStore: null,
        pages: {},
        Query: false,
        responseData: null,

        init: function () {
            this.control({
                '#tjfx_qst_search_btn': {
                    click: this.onSearch
                },
                '#qst_YCZS': {
                    change: this.OnRadioChange
                },
                '#qst_KQYC': {
                    change: this.OnRadioChange
                },
                '#qst_ZFWSP': {
                    change: this.OnRadioChange
                },
                '#qst_OVER3': {
                    change: this.OnRadioChange
                },
                '#qst_CFSL': {
                    change: this.OnRadioChange
                },
                '#qst_ZFYSPS': {
                    change: this.OnRadioChange
                },
                '#qst_SPGS': {
                    change: this.OnRadioChange
                },
                '#qst_SPSC': {
                    change: this.OnRadioChange
                },
                '#qst_HSPGS': {
                    change: this.OnRadioChange
                },
                '#qst_HSPSC': {
                    change: this.OnRadioChange
                },
                '#qst_LSPGS': {
                    change: this.OnRadioChange
                },
                '#qst_LSPSC': {
                    change: this.OnRadioChange
                },
                '#qst_BDSL': {
                    change: this.OnRadioChange
                }
            });
        },

        onSearch: function () {
            if (false == Ext.getCmp('tjfx_tjsj_org').org_val.raw.is_org)
                return;

            var self = this;
            L('onSearch');
            var tempForm = Ext.getCmp('tjfx_qst_search_form').getForm();
            var extraParams = {};

            if (tempForm.isValid()) {
                extraParams.orgId = Ext.getCmp('tjfx_qst_org').val;
                //extraParams.orgType     = Ext.getCmp('tjfx_qst_org').org_val.get("depth") == "4" ? 0 : 1;
                extraParams.orgType = 0;
                extraParams.start_time = tempForm.getValues().start_date;
                extraParams.end_time = tempForm.getValues().end_date;

                var store = Ext.getCmp('tjfx_qst_chart').getStore();
                var panel = Ext.getCmp('qst_boby_panel');

                // 新建store用于获取后台数据
                var pdataStr = '?orgId=' + extraParams.orgId + '&orgType=' + extraParams.orgType +
                    '&start_time=' + extraParams.start_time + '&end_time=' + extraParams.end_time +
                    '&start=0&limit=10'
                Ext.Ajax.request({
                    url: '/gmvcs/rest/QSTController' + pdataStr,
                    method: 'GET',
                    callback: function (options, success, response) {
                        var responsetempData = response.responseText;
                        self.responseData = eval("(" + responsetempData + ")")
                        self.OnShow(self.responseData);
                        self.Query = true;
                    }
                });

            }
        },

        OnRadioChange: function (obj, newValue, oldValue, eOpts) {
            var self = this;

            if (false == newValue)
                return;

            Ext.getCmp("tjfx_qst_chart").axes.items[0].fields[0] = obj.inputValue;
            Ext.getCmp("tjfx_qst_chart").series.items[0].yField = obj.inputValue;

            var panel = Ext.getCmp('qst_boby_panel');

            if (self.Query == false) {
                L("Query == false");
                return;
            }

            self.OnShow(self.responseData);
        },

        OnShow: function (responseData) {
            var data = [];
            var Index = 0;

            var tempForm = Ext.getCmp('tjfx_qst_search_form').getForm();
            var extraParams = {};

            extraParams.start_time = tempForm.getValues().start_date;
            extraParams.end_time = tempForm.getValues().end_date;

            // 获取日期间隔(天)
            var startTime = new Date(extraParams.start_time.replace(/-/, ','));
            var endTime = new Date(extraParams.end_time.replace(/-/, ','));
            var IntervalDay = (endTime.getTime() - startTime.getTime()) / 1000 / 3600 / 24 + 1;

            var baseCount = Math.floor(IntervalDay / 12);
            var leftCount = IntervalDay % 12;

            var valueStr = Ext.getCmp("tjfx_qst_chart").series.items[0].yField;
            L(endTime);
            if (0 == baseCount) {
                for (var a = 0; a < leftCount; ++a) {
                    data[a] = {};

                    var substartTime = new Date(startTime.valueOf() + 24 * 1000 * 3600 * a);
                    var startDateStr = substartTime.getFullYear() + "-" + (substartTime.getMonth() + 1) + "-" + substartTime.getDate();

                    var tempValue = responseData[a][valueStr];

                    data[a].DATE = startDateStr;
                    data[a][valueStr] = tempValue;
                }
            }
            else {
                for (var i = 0; i < 12; ++i) {
                    var tempValue = 0;
                    data[i] = {};

                    for (var j = 0; j < baseCount; ++j) {
                        tempValue += responseData[Index++][valueStr];
                    }

                    if (i < leftCount) {
                        tempValue += responseData[Index++][valueStr];
                        tempValue = Math.floor(tempValue / (baseCount + 1));

                        var substartTime = new Date(startTime.valueOf() + 24 * 1000 * 3600 * ((baseCount + 1) * i));
                        var subendTime = new Date(startTime.valueOf() + 24 * 1000 * 3600 * ((baseCount + 1) * (i + 1) - 1));

                        var startDateStr = substartTime.getFullYear().toString().substr(2, 2) + "-" + (substartTime.getMonth() + 1) + "-" + substartTime.getDate();
                        var endDateStr = subendTime.getFullYear().toString().substr(2, 2) + "-" + (subendTime.getMonth() + 1) + "-" + subendTime.getDate();

                        data[i].DATE = startDateStr + "至" + endDateStr;

                        // 为Tip chart提供数据
                        if (baseCount < 12) {
                            for (var x = 0; x < baseCount + 1; ++x) {
                                var tipdata = "Tipdata" + x;
                                var tipDate = "TipDate" + x;

                                data[i][tipdata] = responseData[Index - (baseCount + 1) + x][valueStr];
                                data[i][tipDate] = "第" + (x + 1) + "天";
                            }
                        }
                        else {
                            var tipbasecount = Math.floor((baseCount + 1) / 12);
                            var tipleftcount = (baseCount + 1) % 12;
                            var tipIndex = Index - (baseCount + 1);

                            for (var y = 0; y < 12; ++y) {
                                var tempTipValue = 0;

                                var tipdata = "Tipdata" + y;
                                var tipDate = "TipDate" + y;
                                for (var z = 0; z < tipbasecount; ++z) {
                                    tempTipValue += responseData[tipIndex++][valueStr];
                                }

                                if (y < tipleftcount) {
                                    tempTipValue += responseData[tipIndex++][valueStr];

                                    tempTipValue = Math.floor(tempTipValue / (tipbasecount + 1));

                                    data[i][tipDate] = "第" + ((y * (tipbasecount + 1)) + 1) + "-" + ((y + 1) * (tipbasecount + 1)) + "天";
                                }
                                else {
                                    tempTipValue = Math.floor(tempTipValue / tipbasecount);

                                    if (tipbasecount <= 1)
                                        data[i][tipDate] = "第" + (y * tipbasecount + tipleftcount + 1) + "天";
                                    else
                                        data[i][tipDate] = "第" + (y * tipbasecount + tipleftcount + 1) + "-" + ((y + 1) * tipbasecount + tipleftcount) + "天";
                                }

                                data[i][tipdata] = tempTipValue;
                            }
                        }
                    }
                    else {
                        tempValue = Math.floor(tempValue / baseCount);
                        var substartTime = new Date(startTime.valueOf() + 24 * 1000 * 3600 * (i * baseCount + leftCount));
                        var subendTime = new Date(startTime.valueOf() + 24 * 1000 * 3600 * ((i + 1) * baseCount + leftCount - 1));

                        var startDateStr = substartTime.getFullYear().toString().substr(2, 2) + "-" + (substartTime.getMonth() + 1) + "-" + substartTime.getDate();
                        var endDateStr = subendTime.getFullYear().toString().substr(2, 2) + "-" + (subendTime.getMonth() + 1) + "-" + subendTime.getDate();

                        if (substartTime.getTime() == subendTime.getTime())
                            data[i].DATE = startDateStr;
                        else
                            data[i].DATE = startDateStr + "至" + endDateStr;

                        // 为Tip chart提供数据
                        if (baseCount <= 12) {
                            for (var x = 0; x < baseCount; ++x) {
                                var tipdata = "Tipdata" + x;
                                var tipDate = "TipDate" + x;

                                data[i][tipdata] = responseData[Index - (baseCount) + x][valueStr];
                                data[i][tipDate] = "第" + (x + 1) + "天";
                            }
                        }
                        else {
                            var tipbasecount = Math.floor((baseCount) / 12);
                            var tipleftcount = (baseCount) % 12;
                            var tipIndex = Index - (baseCount);
                            for (var y = 0; y < 12; ++y) {
                                var tempTipValue = 0;

                                var tipdata = "Tipdata" + y;
                                var tipDate = "TipDate" + y;
                                for (var z = 0; z < tipbasecount; ++z) {
                                    tempTipValue += responseData[tipIndex++][valueStr];
                                }

                                if (y < tipleftcount) {
                                    tempTipValue += responseData[tipIndex++][valueStr];
                                    tempTipValue = Math.floor(tempTipValue / (tipbasecount + 1));
                                    data[i][tipDate] = "第" + ((y * (tipbasecount + 1)) + 1) + "-" + ((y + 1) * (tipbasecount + 1)) + "天";
                                }
                                else {
                                    tempTipValue = Math.floor(tempTipValue / tipbasecount);
                                    if (tipbasecount <= 1)
                                        data[i][tipDate] = "第" + (y * tipbasecount + tipleftcount + 1) + "天";
                                    else
                                        data[i][tipDate] = "第" + (y * tipbasecount + tipleftcount + 1) + "-" + ((y + 1) * tipbasecount + tipleftcount) + "天";
                                }

                                data[i][tipdata] = tempTipValue;
                            }
                        }
                    }

                    data[i][valueStr] = tempValue;
                }
            }
            for (var i = 0; i < data.length; i++) {
            }
            var store = Ext.getCmp("tjfx_qst_chart").getStore();
            store.loadData(data);
        }
    });

