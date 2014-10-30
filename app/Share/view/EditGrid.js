/**
 * Created by 永志 on 14-2-4.
 */
Ext.define('Share.view.EditGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.editgrid',
    cls: "editGrid",
    selType: 'rowmodel',
    rowEditor: {
        ptype: 'rowediting',
        clicksToEdit: 2,
        clicksToMoveEditor: 1,
        cancelBtnText: '取消',
        saveBtnText: '保存'
    },
    forceFit: true,
    editable: true,
    addBtnText: '',
    page: true,
    viewConfig: {
        enableRowBody: true,
        loadMask: {msg: '加载数据中,请等待......'}
    },
    initComponent: function () {
        var self = this;
        this.addEvents(['editRow', 'deleteRow', 'addRow', 'actionItemClick']);
        if (self.editable) {
            this.columns.push({

                xtype: 'actioncolumn',
                width: 50,
                items: [
                    {
                        icon: 'app/Share/resource/imgs/edit.png',  // Use a URL in the icon config
                        tooltip: '编辑',
                        handler: function (grid, rowIndex, colIndex) {
                            self.fireEvent('editRow', {
                                rowIndex: rowIndex,
                                colIndex: colIndex
                            });
                        }
                    },
                    '-',
                    {
                        icon: 'app/Share/resource/imgs/delete.png',
                        tooltip: '删除',
                        handler: function (grid, rowIndex, colIndex) {
                            self.fireEvent('deleteRow', {
                                rowIndex: rowIndex,
                                colIndex: colIndex
                            });
                        }
                    }
                ]
            });
            this.plugins = [ self.rowEditor ];
        }

        if (this.page) {
            this.bbar = Ext.create("Ext.PagingToolbar", {
                displayMsg: '显示第{0}条到第{1}条记录，一共{2}条',
                emptyMsg: '没有记录',
                beforePageText: '当前页码',
                afterPageText: '共{0}页',
                firstText: '第一页',
                prevText: '上一页',
                nextText: '下一页',
                lastText: '最后一页',
                refreshText: '刷新当前页',
                inputItemWidth: 60,
                autoDestroy: true,
                autoWidth: true,
                autoHeight: true,
                store: self.store,
                displayInfo: true,
                bufferResize: true
            });
        }

        var store = this.getStore();
        if (store) {
            this.getStore().on("load", function (obj, records, successful, eOpts) {
                var pageToolBar = self.down("pagingtoolbar");
                if (!pageToolBar)
                    return;

                if (false == successful) {
                    pageToolBar.emptyMsg = '<span style=\"color:red\">加载数据错误</span>';
                } else {
                    pageToolBar.emptyMsg = '没有记录';
                }

                pageToolBar.updateInfo()
            }, this);
        }

        this.callParent(arguments);
    }
})
;