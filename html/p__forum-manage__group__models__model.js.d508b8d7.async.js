(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{fjPF:function(e,t,a){"use strict";a.r(t);var r=a("p0pE"),n=a.n(r),u=(a("miYZ"),a("tsqr")),c=a("d6i3"),s=a.n(c),o=a("kqyw");t["default"]={namespace:"group",state:{treeData:[],groupListData:[],pagination:{current:1,pageSize:10,total:null,showTotal:null},query:{}},effects:{getTreeNodeData:s.a.mark(function e(t,a){var r,n,u,c;return s.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.params,n=a.call,u=a.put,e.next=4,n(o["f"],r);case 4:return c=e.sent,e.next=7,u({type:"save",payload:{treeData:c}});case 7:case"end":return e.stop()}},e)}),addTreeNodeData:s.a.mark(function e(t,a){var r,n,c,i,p;return s.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.params,n=t.cb,c=a.call,a.put,a.select,e.next=4,c(o["b"],r);case 4:i=e.sent,p=i.success,p?(u["a"].success("\u64cd\u4f5c\u6210\u529f"),n&&n()):u["a"].error("\u64cd\u4f5c\u5931\u8d25");case 7:case"end":return e.stop()}},e)}),editTreeNodeData:s.a.mark(function e(t,a){var r,n,c,i,p;return s.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.params,n=t.cb,c=a.call,a.put,e.next=4,c(o["j"],r);case 4:i=e.sent,p=i.success,p?(u["a"].success("\u64cd\u4f5c\u6210\u529f"),n&&n()):u["a"].error("\u64cd\u4f5c\u5931\u8d25");case 7:case"end":return e.stop()}},e)}),deleteTreeNodeData:s.a.mark(function e(t,a){var r,n,c,i,p;return s.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.params,n=t.cb,c=a.call,a.put,e.next=4,c(o["d"],r);case 4:i=e.sent,p=i.success,p?(u["a"].success("\u64cd\u4f5c\u6210\u529f"),n&&n()):u["a"].error("\u64cd\u4f5c\u5931\u8d25");case 7:case"end":return e.stop()}},e)}),getGroupList:s.a.mark(function e(t,a){var r,n,u,c,i,p,d,f,l;return s.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.params,n=a.call,u=a.put,c=r.categoryId,e.next=5,n(o["i"],r);case 5:return i=e.sent,p=i.data,d=i.total,f=i.pageNumber,l=i.pageSize,e.next=9,u({type:"save",payload:{groupListData:p,pagination:{current:f,pageSize:l,total:d,showTotal:function(e){return"\u5171 ".concat(e," \u9879")}},query:{categoryId:c}}});case 9:case"end":return e.stop()}},e)}),groupEnableDisable:s.a.mark(function e(t,a){var r,n,c,i,p;return s.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(r=t.params,n=t.state,c=a.call,a.put,console.log(n),!n){e.next=9;break}return e.next=6,c(o["h"],r);case 6:e.t0=e.sent,e.next=12;break;case 9:return e.next=11,c(o["g"],r);case 11:e.t0=e.sent;case 12:i=e.t0,p=i.success,p?u["a"].success("\u64cd\u4f5c\u6210\u529f"):u["a"].error("\u64cd\u4f5c\u5931\u8d25");case 15:case"end":return e.stop()}},e)}),deleteGroup:s.a.mark(function e(t,a){var r,n,c,i,p;return s.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.params,n=t.cb,c=a.call,a.put,e.next=4,c(o["c"],r);case 4:i=e.sent,p=i.success,p?(u["a"].success("\u64cd\u4f5c\u6210\u529f"),n&&n()):u["a"].error("\u64cd\u4f5c\u5931\u8d25");case 7:case"end":return e.stop()}},e)}),clearAll:s.a.mark(function e(t,a){var r;return s.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.put,e.next=3,r({type:"save",payload:{treeData:[],groupListData:[],pagination:{current:1,pageSize:10,total:null,showTotal:null},query:{}}});case 3:case"end":return e.stop()}},e)})},reducers:{save:function(e,t){var a=t.payload;return n()({},e,a)}}}},kqyw:function(e,t,a){"use strict";a.d(t,"f",function(){return n}),a.d(t,"d",function(){return s}),a.d(t,"b",function(){return u}),a.d(t,"h",function(){return f}),a.d(t,"g",function(){return l}),a.d(t,"i",function(){return o}),a.d(t,"a",function(){return i}),a.d(t,"e",function(){return p}),a.d(t,"j",function(){return c}),a.d(t,"c",function(){return d});var r=a("oT5p"),n=function(e){return r["a"].get("/api/admin/forum/groupCategory",e)},u=function(e){return r["a"].post("/api/admin/forum/groupCategory",e,!0)},c=function(e){return r["a"].put("/api/admin/forum/groupCategory",e,!0)},s=function(e){return r["a"].delete("/api/admin/forum/groupCategory",e,!0)},o=function(e){return r["a"].get("/api/admin/forum/group",e)},i=function(e){return r["a"].post("/api/admin/forum/group",e,!0)},p=function(e){return r["a"].put("/api/admin/forum/group/".concat(e.id),e,!0)},d=function(e){return r["a"].delete("/api/admin/forum/group/".concat(e.id),e,!0)},f=function(e){return r["a"].post("/api/admin/forum/group/".concat(e.id,"/enable"),e,!0)},l=function(e){return r["a"].post("/api/admin/forum/group/".concat(e.id,"/disable"),e,!0)}}}]);
//# sourceMappingURL=p__forum-manage__group__models__model.js.d508b8d7.async.js.map