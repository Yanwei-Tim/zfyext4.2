/**
 * Created by qinwen on 14-2-12.
 *//*

Ext.define('XTGL.store.CJGZZGLStatusStore', {
    extend: 'Ext.data.Store',
    model: 'XTGL.model.CJGZZGLStatusModel',
    pageSize: 1000,
    autoLoad:true,
    proxy: {
        type: 'rest',
        url: '/rest/xtgl/cjzzzController',
        reader: {
            type: 'json',
            root: 'result',
            successProperty: 'success',
            totalProperty: 'total'
        },
        extraParams: {
            org: 1
        }
    }
});*/
