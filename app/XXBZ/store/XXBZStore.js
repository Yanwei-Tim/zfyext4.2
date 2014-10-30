/**
 * Created by qinwen on 14-2-12.
 */
Ext.define('XXBZ.store.XXBZStore', {
    extend: 'Ext.data.Store',
    model: 'XXBZ.model.XXBZModel',
    pageSize: 20,
    autoLoad: false,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/search_file',
        reader: {
            type: 'json',
            root: 'files',
            successProperty: 'ret',
            totalProperty: 'file_sum'
        },
        extraParams: {
            pData: Ext.JSON.encode({
                start_date: new Date().Format('yyyy-MM-dd'),
                end_date: new Date().Format('yyyy-MM-dd'),
                dep_code: 1//Ext.LoginInfo.info.org_id
            })
        }
    }
});
