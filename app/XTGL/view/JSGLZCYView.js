/**
 * Created by hcxowe on 14-3-5.
 */

Ext.define('ZCYModel', {
    extend: 'Ext.data.Model',
    fields:
        [
            {name: 'YHJH', type: 'string'},
            {name: 'YHXM', type: 'string'},
            {name: 'YHZW', type: 'string'},
            {name: 'YHDW', type: 'string'},
            {name: 'YHBZ', type: 'string'}
        ]
});

var store2 = Ext.create('Ext.data.Store', {
    model: 'ZCYModel',
    data:
        [
            {'YHJH': '10001',  'YHXM': '刘备', 'YHZW': '汉中王', 'YHDW': '蜀国', 'YHBZ': '广施仁义，收买人心'},
            {'YHJH': '10002',  'YHXM': '孔明', 'YHZW': '丞相',   'YHDW': '蜀国', 'YHBZ': '运筹帷幄，不曾弄险'},
            {'YHJH': '10003',  'YHXM': '关羽', 'YHZW': '武圣',   'YHDW': '蜀国', 'YHBZ': '英明威武，骄傲过度'},
            {'YHJH': '10004',  'YHXM': '张飞', 'YHZW': '虎将',   'YHDW': '蜀国', 'YHBZ': '有勇有谋，性情暴躁'},
            {'YHJH': '10005',  'YHXM': '赵云', 'YHZW': '虎将',   'YHDW': '蜀国', 'YHBZ': '长胜将军，浑身是胆'},
            {'YHJH': '10006',  'YHXM': '黄忠', 'YHZW': '虎将',   'YHDW': '蜀国', 'YHBZ': '宝刀不老，百步穿杨'},
            {'YHJH': '10007',  'YHXM': '马超', 'YHZW': '虎将',   'YHDW': '蜀国', 'YHBZ': '名门之后，世之虎将'},
            {'YHJH': '10008',  'YHXM': '魏延', 'YHZW': '虎将',   'YHDW': '蜀国', 'YHBZ': '食其禄而弑其主，久后必反'},
            {'YHJH': '10009',  'YHXM': '廖化', 'YHZW': '虎将',   'YHDW': '蜀国', 'YHBZ': '无'},
            {'YHJH': '100010', 'YHXM': '姜维', 'YHZW': '虎将',   'YHDW': '蜀国', 'YHBZ': '无'}
        ],

    autoLoad: false
});

Ext.define('XTGL.view.JSGLZCYView',{
    extend: 'Share.view.PopupWindow',
    width:      800,
    height:     600,
    minHeight:  400,
    minWidth:   550,
    hidden:     false,
    maximizable:false,
    titleAlign: 'left',
    title:      '组成员',
    autoShow:   false,
    layout:     'fit',
    items:
    {
        xtype:      'editgrid',
        editable:   false,
        id:         'xtgl_zcy_grid',
        //store:      Ext.create('XTGL.store.ZCYStore'),
        store:      store2,

        columns:
            [
                {
                    header:     '用户警号',
                    align:      'center',
                    dataIndex:  'YHJH',
                    sortable:    false,
                    menuDisabled: true,

                    width:      120,
                    minWidth:   100
                },
                {
                    header:     '用户姓名',
                    align:      'center',
                    dataIndex:  'YHXM',
                    menuDisabled: true,
                    sortable:    false,
                    width:      100,
                    minWidth:   80
                },
                {
                    header:     '职位',
                    align:      'center',
                    dataIndex:  'YHZW',
                    menuDisabled: true,
                    sortable:    false,
                    width:      100,
                    minWidth:   80
                },
                {
                    header:     '单位',
                    align:      'center',
                    dataIndex:  'YHDW',
                    menuDisabled: true,
                    sortable:    false,
                    width:      200,
                    minWidth:   150
                },
                {
                    header:     '标志',
                    align:      'center',
                    dataIndex:  'YHBZ',
                    menuDisabled: true,
                    sortable:    false,
                    width:      120,
                    minWidth:   100,
                    flex:       1
                }
            ]

    }
});