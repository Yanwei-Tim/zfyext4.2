Ext.define('XTGL.view.CJGZZGLConfigView', {
    extend: 'Share.view.PopupWindow',
    width: 335,
    height: 320,
    resizable: false,
    //layout: "fit",
    defaults: {
        border: false
    },
    layout: "fit",
    cls: 'xtgl_cjgzzgl_configwindow',
    requires: ['Share.view.TreeCombo'],
    items: [
        {
            xtype: 'form',
            id: 'xtgl_cjgzzgl_config_form',
            margin: "20 20 10 20",
            layout: "border",
            defaults: {
                border: false,
                xtype: "textfield",
                labelWidth: 110,
                width: 335
            },
            items: [
                {
                    region: 'center',
                    layout: 'vbox',
                    xtype: 'panel',
                    defaults: {
                        border: false,
                        xtype: "textfield",
                        labelWidth: 110,
                        width: 280
                    },
                    width: 300,
                    items: [
                        {
                            name: 'file_save_days',
                            id: 'cjgzzgl_config_del_threshold_mb',
                            fieldLabel: '普通文件保存天数',
                            value: 0,
                            validator: function (value) {
                                if (value == null || value == '') {
                                    return true;
                                }
                                var reg = /(^[0-9]*$)/;
                                if (value.match(reg) == null) {
                                    return '只能是整数';
                                } else {
                                    return true;
                                }
                            },
                            listeners: {
                                change: function (field) {
                                    var $ = function (id) {
                                        return document.getElementById(id);
                                    }
                                    $(field.getId() + "-inputEl").setAttribute("maxLength", 10);
                                }
                            }
                        },
                        {
                            name: 'syntime',
                            id: 'cjgzzgl_config_syntime',
                            fieldLabel: '同步间隔(秒)',
                            value: 0,
                            validator: function (value) {
                                if (value == null || value == '') {
                                    return true;
                                }
                                var reg = /(^[0-9]*$)/;
                                if (value.match(reg) == null) {
                                    return '只能是整数';
                                } else {
                                    return true;
                                }
                            }
                        },
                        {
                            xtype: 'numberfield',
                            value: 0,
                            minValue: 0,
                            maxValue: 50,
                            name: 'trancode_quality',
                            id: 'cjgzzgl_config_trancode_quality',
                            fieldLabel: '转码质量',
                            validator: function (value) {
                                if (value == null || value == '') {
                                    return true;
                                }
                                var reg = /(^[0-9]*$)/;
                                if (value.match(reg) == null) {
                                    return "只能输入大于0的整数";
                                } else {
                                    return true;
                                }
                            },
                            listeners: {
                                change: function (field) {
                                    var $ = function (id) {
                                        return document.getElementById(id);
                                    }
                                    $(field.getId() + "-inputEl").setAttribute("maxLength", 20);
                                }
                            }
                        },
                        {
                            xtype: 'numberfield',
                            value: 0,
                            minValue: 0,
                            maxValue: 10,
                            name: 'trancode_instance',
                            id: 'cjgzzgl_config_trancode_instance',
                            fieldLabel: '转码实例数',
                            negativeText: "",
                            validator: function (value) {
                                if (value == null || value == '') {
                                    return true;
                                }
                                var reg = /(^[0-9]*$)/;
                                if (value.match(reg) == null) {
                                    return "只能输入大于0的整数";
                                } else {
                                    return true;
                                }
                            },
                            listeners: {
                                change: function (field) {
                                    var $ = function (id) {
                                        return document.getElementById(id);
                                    }
                                    $(field.getId() + "-inputEl").setAttribute("maxLength", 20);
                                }
                            }
                        },
                        {
                            xtype: 'fieldcontainer',
                            name: 'need_upload_ori',
                            fieldLabel: '上传所有原文件',
                            defaultType: 'radiofield',
                            defaults: {
                                flex: 1
                            },
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: '是',
                                    name: 'size1',
                                    inputValue: '1',
                                    id: 'cjgzzgl_config_need_upload_ori1'
                                },
                                {
                                    boxLabel: '否',
                                    name: 'size1',
                                    inputValue: '0',
                                    checked: true,
                                    id: 'cjgzzgl_config_need_upload_ori2'
                                }
                            ]

                        },
                        {
                            xtype: 'fieldcontainer',
                            name: 'need_upload_tb',
                            fieldLabel: '上传所有缩略图',
                            defaultType: 'radiofield',
                            defaults: {
                                flex: 1
                            },
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: '是',
                                    name: 'size2',
                                    inputValue: '1',
                                    id: 'cjgzzgl_config_need_upload_tb1'
                                },
                                {
                                    boxLabel: '否',
                                    name: 'size2',
                                    inputValue: '0',
                                    checked: true,
                                    id: 'cjgzzgl_config_need_upload_tb2'
                                }
                            ]

                        },
                        {
                            xtype: 'fieldcontainer',
                            name: 'need_upload_flv',
                            fieldLabel: '上传所有转码文件',
                            defaultType: 'radiofield',
                            defaults: {
                                flex: 1
                            },
                            layout: 'hbox',
                            items: [
                                {
                                    boxLabel: '是',
                                    name: 'size3',
                                    inputValue: '1',
                                    id: 'cjgzzgl_config_need_upload_flv1'
                                },
                                {
                                    boxLabel: '否',
                                    name: 'size3',
                                    inputValue: '0',
                                    checked: true,
                                    id: 'cjgzzgl_config_need_upload_flv2'
                                }
                            ]

                        }
                    ]
                }
            ],
            buttons: ['->', {
                id: 'xtgl_cjgzzgl_configsave_btn',
                text: '保存'
            }]

        }
    ]

});


