/**
 * Created by hcxowe on 14-3-12.
 */
Ext.define('XTGL.model.JSGLJSLBModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'sid',           type: "string"},
        {name: 'name',          type: "string"},
        {name: 'priviledges',   type: "string"}
    ]
});