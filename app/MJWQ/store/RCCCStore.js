/**
 * Created by 永志 on 14-1-31.
 */
Ext.define('MJWQ.store.RCCCStore', {
    extend: 'Ext.data.Store',
    model: 'MJWQ.model.RCCCModel',
    pageSize: 20,
    autoLoad: false,
    proxy: {
        type: 'rest',
        url: '/rest/zfjd/RcccController',
        reader: {
            type: 'json',
            root: 'files',
            successProperty: 'success',
            totalProperty: 'file_sum'
        },
        extraParams: {
            pData: Ext.JSON.encode({
                start_date: new Date().Format('yyyy-MM-dd'),
                end_date: new Date().Format('yyyy-MM-dd'),
                org_id: Ext.LoginInfo.info.org_id
            })
        }
    }
});