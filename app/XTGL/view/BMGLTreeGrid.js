/**
 * Created by qinwen on 14-2-25.BMGLTreeGrid
 */

Ext.define('XTGL.view.BMGLTreeGrid', {
    extend: 'Ext.tree.Panel',
    xtype: 'xtgl_bmgl_treegrid',

    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*'
    ],

    height: 300,
    useArrows: true,
    rowLines:true,
    rootVisible: false,
    multiSelect: true,
    singleExpand: true
})

