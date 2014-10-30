/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('XTGL.store.BMGLStore', {
    extend: 'Ext.data.TreeStore',
    model: 'XTGL.model.BMGLModel',
    pageSize: 10000,
    autoLoad:true,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/dep_info/get_dep_info',
        extraParams: {type:0}
    }
});
