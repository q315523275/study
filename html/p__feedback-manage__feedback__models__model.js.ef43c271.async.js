(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"306r":function(e,a,t){"use strict";t.r(a);var n=t("p0pE"),r=t.n(n),s=t("d6i3"),c=t.n(s),u=t("Zl8g");a["default"]={namespace:"feedback",state:{listData:[],enclosureList:[]},effects:{getListData:c.a.mark(function e(a,t){var n,r,s,i,o,p,d,l,f;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.params,r=t.call,s=t.put,e.next=4,r(u["b"],n);case 4:return i=e.sent,i.success,o=i.data,p=o.data,d=o.total,l=o.pageNumber,f=o.pageSize,e.next=13,s({type:"save",payload:{listData:p||[],pagination:{current:l,pageSize:f,total:d,showTotal:function(e){return"\u5171 ".concat(e," \u9879")}}}});case 13:case"end":return e.stop()}},e)}),getEnclosureList:c.a.mark(function e(a,t){var n,r,s,i,o;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.params,r=t.call,s=t.put,e.next=4,r(u["a"],n);case 4:return i=e.sent,i.success,o=i.data,e.next=9,s({type:"save",payload:{enclosureList:o}});case 9:case"end":return e.stop()}},e)})},reducers:{save:function(e,a){var t=a.payload;return r()({},e,t)}}}},Zl8g:function(e,a,t){"use strict";t.d(a,"b",function(){return r}),t.d(a,"a",function(){return s});var n=t("oT5p"),r=function(e){return n["a"].get("/api/admin/feedback",e,!0)},s=function(e){return n["a"].get("/api/admin/feedback/".concat(e.id,"/files"),e,!0)}}}]);
//# sourceMappingURL=p__feedback-manage__feedback__models__model.js.ef43c271.async.js.map