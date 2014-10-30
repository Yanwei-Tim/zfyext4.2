Ext.define('MJWQ.view.RCCCPJDFView', {
    extend: 'Share.view.PopupWindow',
    id: "MJWQ_Pjdf_PopupWindow",
    title: "评价打分",
    width: 570,
    height: 420,
    resizable: false,
    //layout: "fit",
    defaults: {
        border: false
    },
    items: [
        {
            xtype: "form",
            layout: "vbox",
            id: "mjwq_pjdf_north",
            defaults: {
                border: false,
                xtype: 'panel',
                layout: 'hbox',
                margin: '5 10'
            },
            items: [
                {
                    items: [
                        {
                            xtype: 'radiofield',
                            boxLabel: '无明显异常',
                            name: 'mjwq_pjdf_yc',
                            id: 'mjwq_pjdf_yc_1',
                            margin:"0 20 0 0"

                        },
                        {
                            xtype: 'radiofield',
                            boxLabel: '异常扣分',
                            name: 'mjwq_pjdf_yc',
                            id: 'mjwq_pjdf_yc_2'
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: "checkboxfield",
                            boxLabel: '不按规定配带（执勤）（-2分）',
                            name: 'mjwq_pjdf_ycnr',
                            value: 1,
                            id: 'mjwq_pjdf_ycnr_1'
                        },
                        {
                            xtype: "checkboxfield",
                            boxLabel: '不按规定配带（技术检验岗）（-5分）',
                            name: 'mjwq_pjdf_ycnr',
                            value: 2,
                            id: 'mjwq_pjdf_ycnr_2'
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: "checkboxfield",
                            boxLabel: '视频资料不完整（-2分）',
                            name: 'mjwq_pjdf_ycnr',
                            value: 3,
                            id: 'mjwq_pjdf_ycnr_3'
                        },
                        {
                            xtype: "checkboxfield",
                            boxLabel: '警容风纪，不规范（-2分）',
                            name: 'mjwq_pjdf_ycnr',
                            value: 4,
                            id: 'mjwq_pjdf_ycnr_4',
                            margin: "0 0 0 39"
                        },
                        {
                            xtype: "checkboxfield",
                            boxLabel: '执勤用语不规范（-2分）',
                            name: 'mjwq_pjdf_ycnr',
                            value: 5,
                            id: 'mjwq_pjdf_ycnr_5'
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: "checkboxfield",
                            boxLabel: '执法行为不规范（-2分）',
                            name: 'mjwq_pjdf_ycnr',
                            value: 6,
                            id: 'mjwq_pjdf_ycnr_6'
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: "label",
                            text: '评语:'
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: 'textareafield',
                            width: 533,
                            height: 160,
                            name:"comment",
                            margin: "0 0 10 0",
                            id: 'mjwq_pjdf_pl'
                        }
                    ]
                }
            ],
            buttons: ['->', {
                id: 'mjwq_pjdf_bc',
                text: '保存'
            }]

        }
    ]

});


