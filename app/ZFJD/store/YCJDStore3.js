/**
 * Created by 永志 on 14-1-31.
 */
Ext.define('ZFJD.store.YCJDStore3', {
    extend: 'Ext.data.Store',
    model: 'ZFJD.model.YCJDModel3',
    pageSize: 20,
    autoLoad: false,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/exceptionCheck/getNoVideo',
        reader: {
            type: 'json',
            root: 'ITEMS',
            successProperty: 'success',
            totalProperty: 'TOTAL'
        },
        extraParams: {
            pData:Ext.JSON.encode({
                start_time: new Date().Format('yyyy-MM-dd'),
                end_time: new Date().Format('yyyy-MM-dd'),
                obj_id: Ext.LoginInfo.info.org_id,
                obj_type: 0
            })
        }
    }
});