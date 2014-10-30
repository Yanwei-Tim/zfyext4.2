/**
 * Created by qinwen on 14-2-12.
 */
Ext.define('RZSJ.store.GLRZStore', {
    extend: 'Ext.data.Store',
    model: 'RZSJ.model.GLRZModel',
    pageSize:20,
    autoLoad:false,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/adminLogHandle',
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
