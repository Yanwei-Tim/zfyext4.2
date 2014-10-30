/**
 * Created by qinwen on 14-2-14.
 */
Ext.define('YJYP.store.YJYPOverMsgStore',{
    extend: 'Ext.data.Store',
    model: 'YJYP.model.YJYPOverMsgModel',
    pageSize: 10,
    autoLoad: false,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/yjypOverHandle',
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

