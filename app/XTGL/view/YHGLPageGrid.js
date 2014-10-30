/**
 * Created by qinwen on 14-2-25.YHGLPageGrid
 */
Ext.define('XTGL.view.YHGLPageGrid', {
    requires: ['Share.view.ActionTextColumn'],
    extend: 'Share.view.EditGrid',
    xtype: 'xtgl_yhgl_rightgrid',
    rowLines: true,
    columnLines: true,
    editable:false,
    store: Ext.create('XTGL.store.YHGLGRIDStore'),
    columns: [
        {
            align: 'center',
            text: '用户警号',
            menuDisabled: true,
            sortable: false,
            width: 100,
            minWidth: 100,
            dataIndex: 'police_id'
        },
        {
            align: 'center',
            menuDisabled: true,
            text: '用户姓名',
            sortable: true,
            width: 100,
            minWidth: 100,
            dataIndex: 'name'
        } ,
        {
            align: 'center',
            menuDisabled: true,
            text: '职位',
            sortable: true,
            width: 100,
            minWidth: 100,
            dataIndex: 'position'
        },
        {
            align: 'center',
            menuDisabled: true,
            text: '角色',
            sortable: true,
            width: 200,
            minWidth: 200,
            dataIndex: 'rName'
        },
        {
            align: 'center',
            menuDisabled: true,
            text: '单位',
            sortable: true,
            width: 200,
            minWidth: 200,
            dataIndex: 'deptName'
        },
        {
            align: 'center',
            text: '状态',
            menuDisabled: true,
            sortable: true,
            width: 60,
            minWidth: 60,
            dataIndex: 'status'
        },
        {
            align: 'center',
            menuDisabled: true,
            text: '上次登录时间',
            sortable: true,
            width: 200,
            minWidth: 200,
            dataIndex: 'last_login_time'
        },
        {
            header: '操作',
            menuDisabled: true,
            align: 'center',
            minWidth: 300,
            width: 300,
            xtype: 'actiontextcolumn',
            items: [
                {
                    text:'重置密码 ',
                    tooltip: '重置密码',
                    cls:"actionText",
                    handler: function (obj, rowIndex, colIndex) {
                        this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "rspsw");
                    }
                },
                {
                    text:'解锁 ',
                    tooltip: '解锁',
                    getClass: function(v, meta, record) {
                        var id = record.get('status');
                        record.disableUnlock = false;

                        if(id == "锁定")
                            return "actionText";

                        record.disableUnlock = true;
                        return "disablePlay";
                    },
                    handler: function (obj, rowIndex, colIndex) {
                        var store = obj.getStore();
                        var record = store.getAt(rowIndex);
                        if(true == record.disableUnlock)
                            return;
                        this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "unlock");
                    }
                },
                {
                    text:'启用 ',
                    tooltip: '启用',
                    getClass: function(v, meta, record) {
                        var id = record.get('enabled');
                        record.disableStart = false;

                        if("0" == id)
                            return "actionText";

                        record.disableStart = true;
                        return "disablePlay";
                    },
                    handler: function (obj, rowIndex, colIndex) {
                        var store = obj.getStore();
                        var record = store.getAt(rowIndex);
                        if(true == record.disableStart)
                            return;
                        this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "start");
                    }
                },
                {
                    text:'停用 ',
                    tooltip: '停用',
                    getClass: function(v, meta, record) {
                        var id = record.get('enabled');
                        record.disableStop = false;

                        if("1" == id)
                            return "actionText";

                        record.disableStop = true;
                        return "disablePlay";
                    },
                    handler: function (obj, rowIndex, colIndex) {
                        var store = obj.getStore();
                        var record = store.getAt(rowIndex);
                        if(true == record.disableStop)
                            return;
                        this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "stop");
                    }
                },
                {
                    text:'删除 ',
                    tooltip: '删除',
                    cls: 'actionText',
                    handler: function (obj, rowIndex, colIndex) {
                        this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "delete");
                    }
                },
                {
                    text: '管理范围 ',
                    cls: 'actionText',
                    tooltip: '管理范围',
                    handler: function (obj, rowIndex, colIndex) {
                        this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "scope");
                    }
                },
                {
                    text:'属性修改',
                    cls: 'actionText',
                    tooltip: '属性修改',
                    handler: function (obj, rowIndex, colIndex) {
                        this.up("grid").fireEvent("itemClick", obj, rowIndex, colIndex, "edit");
                    }
                }
            ]
        }
    ]

})
