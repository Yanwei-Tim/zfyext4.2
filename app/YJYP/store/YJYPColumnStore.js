/**
 * Created by qinwen on 14-2-18.
 */
Ext.define('YJYP.store.YJYPColumnStore', {
    extend: 'Ext.data.Store',
    model: 'YJYP.model.YJYPColumnModel',
    autoLoad: false,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/yjypWindowColumnHandle',
        extraParams: {
            /*obj_id: 1,
            obj_type: 1,
            start_time: Ext.Date.format(getMonthFirstDate(),'Y-m-d'),
            end_time: Ext.Date.format(new Date(),'Y-m-d'),
            date_flag: ''*/
        }
    }
});
