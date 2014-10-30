/**
 * Created by qinwen on 14-2-14.
 */
Ext.define('YJYP.model.YJYPNoMediaMsgModel',{
    extend: 'Ext.data.Model',
    fields: [
        {name: 'MJJH', type: "string"},
        {name: 'MJMC', type: "string"},
        {name: 'JGMC', type: "string"},
        {name: 'SJDH', type: "string"},
        {name: 'SJLX', type: "string"},
        {name: 'WFSJ', type: "string"},
        {name: 'DSR', type: "string"},
        {name: 'JSZH', type: "string"},
        {name: 'HPHM', type: "string"},
        {name: 'WFXW', type: "string"},
        {name: 'WFDD', type: "string"},
        {name: 'CFQK', type: "string"},
        {name: 'KFQK', type: "int"},
        {name: 'HCQK', type: "int"},
        {name: 'HCRJH', type: "string"},
        {name: 'HCRMC', type: "string"},
        {name: 'HCQK_RESULT', type: "int"},
        {name: 'HCQK_REMARK', type: "string"}
    ]
})



/*

 |				 |TOTAL:int					|			|总项数							 	 |
 |ITEMS			 |{							|			|									 |
 |				 |MJJH:string			    |			|民警警号							 |
 |				 |MJMC:string			    |			|民警名称							 |
 |				 |JGMC:string				|			|机构名称							 |
 |				 |SJDH:string				|			|决定书号							 |
 |                |SJLX:string               |           |数据类型                            |
 |                |WFSJ:string               |           |违法时间                            |
 |				 |DSR:string				|	   		|当事人							 	 |
 |                |JSZH:string               |           |驾驶证号                            |
 |                |HPHM:string               |           |号牌号码                            |
 |                |WFXW:string               |           |违法行为                            |
 |                |WFDD:string               |           |违法地点                            |      新增 2014-1-6 00:57 湛永志
 |                |CFQK:string               |           |处罚情况                            |
 |                |KFQK:int                  |           |考核扣分情况                        |
 |                |HCQK:int                  |           |0：未核查,1已核查                   |
 |                |HCRJH:string              |           |核查人警号                          |
 |                |HCRMC:string              |           |核查人名称                          |
 |                |HCQK_RESULT:int           |           |核查结果:情况属实:1,查无此情况:2,其它原因:3  |
 |                |HCQK_REMARK:string        |           |核查评论                            |
 |				 |}
 */
