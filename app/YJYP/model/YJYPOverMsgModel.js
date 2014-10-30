/**
 * Created by qinwen on 14-2-14.
 */
Ext.define('YJYP.model.YJYPOverMsgModel',{
    extend: 'Ext.data.Model',
    fields: [
        {name: 'MJJH', type: "string"},
        {name: 'MJMC', type: "string"},
        {name: 'JGMC', type: "string"},
        {name: 'DATE', type: "string"},
        {name: 'SJDH', type: "string"},

        {name: 'KFQK', type: "int"},
        {name: 'HCQK', type: "int"},
        {name: 'HCRJH', type: "string"},
        {name: 'HCRMC', type: "string"},
        {name: 'HCQK_RESULT', type: "int"},
        {name: 'HCQK_REMARK', type: "string"}
    ]
})



/*

 |				 |{TOTAL:int				|			|总项数							 	 |
 |ITEMS		     |[{MJJH:string             |			|民警警号     						 |
 |				 |MJMC:string			    |			|警号名称							 |
 |				 |JGMC:string				|			|机构名称							 |
 |				 |DATE:string				|			|日期								 |
 |				 |SJDH[]:					|			|数据单号							 |
 |				 |{						    |			|									 |
 |				 |    SJDH:string			|			|单号								 |
 |				 |    WJID:int				|			|文件ID								 |
 |				 |}						    |			|									 |
 |                |KFQK:int                  |           |考核扣分情况                        |
 |                |HCQK:int                  |           |0：未核查,1已核查                   |
 |                |HCRJH:string              |           |核查人警号                          |
 |                |HCRMC:string              |           |核查人名称                          |
 |                |HCQK_RESULT:int           |           |情况属实:1,查无此情况:2,其它原因:3  |
 |                |HCQK_REMARK:string        |           |核查评论                            |
 |				 |}]}
 */
