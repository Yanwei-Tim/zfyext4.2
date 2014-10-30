/**
 * Created by qinwen on 14-2-11.
 */
Ext.define('RZSJ.view.MainView', {
    extend: 'Ext.container.Container',
    bodyBorder: false,
    defaults: {
        collapsible: false,
        split: false,
        bodyPadding: 0,
        border: 0
    },
    layout: 'border',
    items: [
        {
            region: 'north',
            cls: "navTitle",
            height: 49,
            layout: 'absolute',
            defaults: {
                border: 0,
                width: 135,
                height: 41,
                allowDepress: false,
                toggleGroup: "rzsj_nav_btn"
            },
            items: [
                {
                    xtype: 'button',
                    id: 'rzsj_yhrz_btn',
                    cls: 'navBtnSelected',
                    x: 11,
                    y: 11
                },
                {
                    xtype: 'button',
                    id: 'rzsj_glrz_btn',
                    cls: 'navBtnUnSelected',   //可选的额外的CSS类将被添加到该组件的元素. 这可用于添加自定义样式的成分或任何其子组件使用标准的CSS规则.
                    x: 11 + 135 + 1,
                    y: 11
                },
                {                             //自己添加
                    xtype: 'button',
                    id: 'rzsj_zfjly_btn',
                    cls: 'navBtnUnSelected',
                    x: 11 + 135 + 135 + 1,
                    y: 11
                }
            ]
        },
        {
            xtype: "panel",
            region: 'center',
            id: 'rzsj_center',
            layout: 'fit'
        }
    ]
});