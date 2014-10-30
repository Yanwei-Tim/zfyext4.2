/**
 * Created by hcxowe on 14-2-12.
 */

Ext.define('TJFX.controller.MainFrame', {
    extend: 'Ext.app.Controller',
    pages: {},    

    init: function() {
        this.control({
            '#tjfx_tjsj_btn': {
                toggle: this.onBtnToggle("TJFX.view.TJSJView"),
                boxready: this.onInitMainView
            },
            '#tjfx_qst_btn': {
                toggle: this.onBtnToggle("TJFX.view.QSTView")
            },
            '#tjfx_qsdbt_btn': {
                toggle: this.onBtnToggle("TJFX.view.QSDBTView")
            }
        });
    },

    onInitMainView: function(obj, width, height, eOpts){
        obj.toggle(true);
    },

    switchPanel: function(name){
        centerPanel = Ext.getCmp("tjfx_center");
        centerPanel.removeAll(false);

        if('undefined' == typeof (this.pages[name]))
        {
            this.pages[name] = Ext.create(name);
        }

        centerPanel.add(this.pages[name]);
    },

    onBtnToggle: function(moduleName) {
        return function(obj, pressed, eOpts){
            if(true == pressed)
                this.switchPanel(moduleName);
        }
    }
});