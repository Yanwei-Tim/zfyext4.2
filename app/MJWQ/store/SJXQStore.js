/**
 * Created by hansen on 14-2-11.
 */
//执法监督-异常监督-数据详情
Ext.define('MJWQ.store.SJXQStore', {
    extend: 'Ext.data.Store',
    model: 'MJWQ.model.SJXQModel',
    pageSize: 1000,
    autoLoad: false,
    proxy: {
        type: 'rest',
        url: '/rest/zfjd/YCJDSJXQController',
        reader: {
            type: 'json',
            root: 'results',
            successProperty: 'success',
            totalProperty: 'file_sum'
        },
        extraParams: {}
    }
});