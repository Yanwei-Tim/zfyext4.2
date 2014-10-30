/**
 * Created by qinwen on 14-2-20.
 */
Ext.define('YJYP.store.YJYPChartLineNianStore',{
    extend: 'Ext.data.Store',
    model: 'YJYP.model.YJYPChartLineModel',
    autoLoad: false,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/yjypWindowChartNianHandle',
        extraParams: {

        }
    }
});