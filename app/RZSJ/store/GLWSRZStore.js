/**
 * Created by qinwen on 14-2-12.
 */
Ext.define('RZSJ.store.GLWSRZStore', {
    extend: 'Ext.data.Store',
    model: 'RZSJ.model.YHWSRZModel',
    pageSize: 20,
    autoLoad:false,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/ws_device_log',
        reader: {
            type: 'json',
            root: 'result',
            successProperty: 'success',
            totalProperty: 'total'
        },
        extraParams: {
            pData:Ext.JSON.encode({
                start_date: new Date().Format('yyyy-MM-dd'),
                end_date: new Date().Format('yyyy-MM-dd')
            })
        }
    }
});
