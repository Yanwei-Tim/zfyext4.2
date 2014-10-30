/**
 * Created by qinwen on 14-2-14.
 */
Ext.define('YJYP.store.YJYPNoMediaMsgStore',{
    extend: 'Ext.data.Store',
    model: 'YJYP.model.YJYPNoMediaMsgModel',
    pageSize: 10,
    autoLoad: false,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/yjypNoMediaHandle',
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

