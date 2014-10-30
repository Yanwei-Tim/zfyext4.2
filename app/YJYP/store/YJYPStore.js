/**
 * Created by qinwen on 14-2-13.
 */
Ext.define('YJYP.store.YJYPStore', {
    extend: 'Ext.data.Store',
    model: 'YJYP.model.YJYPModel',
    pageSize: 1000,
    autoLoad: false,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/yjypHandle',
        reader: {
            type: 'json',
            root: 'body',
            successProperty: 'ret',
            totalProperty: 'total'
        },
        extraParams: {
            obj_code: "1",
            obj_type: 0,
            start_time: Ext.Date.format(getMonthFirstDate(),'Y-m-d'),
            end_time: Ext.Date.format(new Date(),'Y-m-d')

            /*obj_id: Ext.LoginInfo.info.org_id,
            obj_type: 1,
            start_time: Ext.Date.format(getMonthFirstDate(),'Y-m-d'),
            end_time: Ext.Date.format(new Date(),'Y-m-d')*/
        }
    }
});