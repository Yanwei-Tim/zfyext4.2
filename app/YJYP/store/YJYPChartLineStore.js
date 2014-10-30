/**
 * Created by qinwen on 14-2-17.
 */
Ext.define('YJYP.store.YJYPChartLineStore',{
    extend: 'Ext.data.Store',
    model: 'YJYP.model.YJYPChartLineModel',
    autoLoad: false,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/yjypWindowChartHandle',
        extraParams: {
            /*obj_id: 1,
            obj_type: 1,
            start_time: Ext.Date.format(getMonthFirstDate(),'Y-m-d'),
            end_time: Ext.Date.format(new Date(),'Y-m-d'),
            date_flag: ''*/
        }
    }
})
