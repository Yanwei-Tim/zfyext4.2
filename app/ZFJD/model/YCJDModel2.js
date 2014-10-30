/**
 * Created by 永志 on 14-2-5.
 */
Ext.define('ZFJD.model.YCJDModel2', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'capture', type: "string"},
        {name: 'JGMC', type: "string"},
        {name: 'RIQI', type: "string"},
        {name: 'CQSJ', type: "string"},
        {name: 'SLSC', type: "int"},
        {name: 'CQBL', type: "object"},
        {name: 'KFQK', type: "int"}
    ]
});