/**
 * Created by 永志 on 14-1-31.
 */
Ext.define('ZFJD.store.JDKPStore', {
    extend: 'Ext.data.Store',
    model: 'ZFJD.model.JDKPModel',
    pageSize: 200,
    autoLoad: false,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/supervision/getScope',
        reader: {
            type: 'json',
            root: 'files',
            successProperty: 'success',
            totalProperty: 'file_sum'
        },
        extraParams: {
            pData: Ext.JSON.encode({
                startTime: new Date().Format('yyyy-MM-dd'),
                endTime: new Date().Format('yyyy-MM-dd'),
                objType:1,
                objId: 1//Ext.LoginInfo.info.org_id
            })
        }
    }
});
