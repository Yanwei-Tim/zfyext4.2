/**
 * Created by hcxowe on 14-2-12.
 */
Ext.define('ZFHC.model.ZFHCModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'police_id', type: "string"},
        {name: 'depName',   type: "string"},
        {name: 'JDSH',      type: "string"},
        {name: 'TSR',       type: "string"},
        {name: 'time',      type: "string"},
        {name: 'CLJG',      type: "string"}
    ]
});