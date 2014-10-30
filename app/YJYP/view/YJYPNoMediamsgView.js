/**
 * Created by qinwen on 14-2-13.
 */
Ext.define('YJYP.view.YJYPNoMediamsgView', {
    extend: 'Ext.container.Container',
    width: 805,
    height: 350,
    bodyBorder: false,
    id: 'yjyp_window_nomedia_message',
    defaults: {
        collapsible: false,
        split: false,
        bodyPadding: 0,
        border: 0
    },
    layout: 'border',
    items: [{
        region:'center',
        border: 0,
        layout: 'border',
        items: [{
            region: 'north',
            border: 0,
            height:40,
            items: [{
                xtype: "label",
                style: 'background:#fff;font: 14px Arial;line-height:40px;margin-left:10px',
                id: "yjyp_window_nomedia_xxxx",
                text: "详细信息"
            }]
        },{
            region:'west',
            border: 0,
            xtype: 'panel',
            width: 790,
            collapsible: false,
            layout: 'fit',
            items: [
                {
                    xtype: 'editgrid',
                    id:'yjyp_yjyp_nomedia_grid',
                    editable: false,
                    border: 0,
                    columnLines: true,
                    store: Ext.create('YJYP.store.YJYPNoMediaMsgStore'),
                    columns: [
                        {
                            width: 60,
                            header: '序号',
                            align: 'center',
                            minWidth: 60,
                            menuDisabled:true,
                            xtype: 'rownumberer'
                        },
                        {
                            header : 'id',
                            dataIndex : 'id',
                            align : 'center',
                            hidden:true
                        }, {
                            header : '警员名称',
                            dataIndex : 'MJMC',
                            align : 'center',
                            minWidth: 70,
                            menuDisabled:true,
                            flex : 1
                        }, {
                            header : '警员号',
                            align : 'center',
                            minWidth: 70,
                            menuDisabled:true,
                            dataIndex : 'MJJH',
                            flex : 1
                        }, {
                            header : '部门名称',
                            align : 'center',
                            minWidth: 150,
                            menuDisabled:true,
                            dataIndex : 'JGMC',
                            flex : 2
                        }, {
                            header : '类型',
                            align : 'center',
                            minWidth: 90,
                            menuDisabled:true,
                            dataIndex : 'SJLX',
                            flex : 2,
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else if("JCJ" == value){
                                    return "接处警";
                                } else if("JYCF" == value){
                                    return "简易处罚";
                                } else if("PECC" == value){
                                    return "非现场处罚";
                                } else if("QZCS" == value){
                                    return "强制措施";
                                } else if("SGCL" == value){
                                    return "事故处理";
                                } else if("SGCL" == value){
                                    return value;
                                }
                            }
                        }, {
                            header : '违法时间',
                            align : 'center',
                            minWidth: 160,
                            menuDisabled:true,
                            dataIndex : 'WFSJ',
                            flex : 2,
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        },{
                            header : '违法行为',
                            align : 'center',
                            minWidth: 110,
                            menuDisabled:true,
                            dataIndex : 'WFXW',
                            flex : 1,
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        }, {
                            header : '当事人',
                            align : 'center',
                            minWidth: 70,
                            menuDisabled:true,
                            dataIndex : 'DSR',
                            flex : 1,
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        }, {
                            header : '驾驶证号',
                            align : 'center',
                            minWidth: 150,
                            menuDisabled:true,
                            dataIndex : 'JSZH',
                            flex : 2,
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        }, {
                            header : '号牌号码',
                            align : 'center',
                            minWidth: 80,
                            menuDisabled:true,
                            dataIndex : 'HPHM',
                            flex : 1,
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        }, {
                            header : '数据编号',
                            align : 'center',
                            minWidth: 100,
                            menuDisabled:true,
                            dataIndex : 'SJDH',
                            flex : 1,
                            renderer: function(value){
                                if(null == value || "" == value || "null" == value){
                                    return "-";
                                } else {
                                    return value;
                                }
                            }
                        }
                    ],
                    listeners: {
                        single: true
                    }
            }]
        }]
    }]

});