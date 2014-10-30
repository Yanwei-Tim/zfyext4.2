/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('XTGL.store.YHGLGRIDStore', {
    extend: 'Ext.data.Store',
    model: 'XTGL.model.YHGLGRIDModel',
    pageSize: 20,
    //autoLoad:true,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/systemManagement/get_user',
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
