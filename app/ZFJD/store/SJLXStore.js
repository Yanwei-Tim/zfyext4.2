/**
 * Created by hansen on 14-2-11.
 */
Ext.define('ZFJD.store.SJLXStore', {
    extend: 'Ext.data.Store',
    fields: ['SJLX','SJMC'],
    autoLoad:true,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/lawSupervise/get_data_type',
        reader: {
            type: 'json',
            root: 'files',
            successProperty: 'success',
            totalProperty: 'file_sum'
        },
        extraParams: {
            pData: Ext.JSON.encode({
                //objId: 1//Ext.LoginInfo.info.org_id
            })
        }
    }

});