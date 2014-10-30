/**
 * Created by hansen on 14-2-11.
 */
Ext.define('XTGL.store.ROLEStore', {
    extend: 'Ext.data.Store',
    fields: ['sid', 'name'],
    autoLoad:true,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/systemManagement/get_role',
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