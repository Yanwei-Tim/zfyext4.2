/**
 * Created by qinwen on 14-2-14.
 */
Ext.define('YJYP.store.YJYPKqycMsgStore',{
    extend: 'Ext.data.Store',
    model: 'YJYP.model.YJYPKqycMsgModel',
    pageSize: 10,
    autoLoad: false,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/yjypKqycHandle',
        reader: {
            type: 'json',
            root: 'ITEMS',
            successProperty: 'success',
            totalProperty: 'TOTAL'
        },
        extraParams: {

        }
    }
})
