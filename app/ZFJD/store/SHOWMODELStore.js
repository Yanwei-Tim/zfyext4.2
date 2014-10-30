/**
 * Created by hansen on 14-2-11.
 */
Ext.define('ZFJD.store.SHOWMODELStore', {
    extend: 'Ext.data.Store',
    fields: ['type', 'name'],
    data: [
        {"type": "pic", "name": "图表模式"},
        {"type": "list", "name": "列表模式"}
    ]
});