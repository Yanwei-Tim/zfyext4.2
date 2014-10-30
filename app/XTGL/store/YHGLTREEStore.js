/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('XTGL.store.YHGLTREEStore', {
    extend: 'Ext.data.TreeStore',
    autoLoad: false,
    border:false,
    proxy: {
        type: 'rest',
        url: '/gmvcs/rest/orgSelect',
        reader: {
            type: 'json',
            successProperty: 'success'
        },
        extraParams: {showPolice: false,showHideOrg: false}
    }
});
