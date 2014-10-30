/**
 * Created by 永志 on 14-2-5.
 */
Ext.define('ZFJD.model.YCJDModel1', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'capture', type: "string"},
        {name: 'JGMC', type: "string"},
        {name: 'DATE', type: "string"},
        {name: 'SJDHS', type: "string"},
        {name: 'SJDHNum', type: "int"},
        {name: 'SJDH', type: "object"},
        {name: 'KFQK', type: "int"},
        {name: 'HCCL', type: "object"}
    ]
});