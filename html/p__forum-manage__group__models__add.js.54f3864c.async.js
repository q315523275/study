(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{"4jqE":function(n,r,t){"use strict";t.r(r);var e=t("p0pE"),a=t.n(e),u=(t("miYZ"),t("tsqr")),o=t("d6i3"),i=t.n(o),c=t("3a4m"),p=t.n(c),f=t("kqyw");r["default"]={namespace:"groupAdd",state:{treeData:[]},effects:{getTreeNodeDataReq:i.a.mark(function n(r,t){var e,a,u,o;return i.a.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return e=r.params,a=t.call,u=t.put,n.next=4,a(f["f"],e);case 4:return o=n.sent,n.next=7,u({type:"save",payload:{treeData:o}});case 7:case"end":return n.stop()}},n)}),getAdd:i.a.mark(function n(r,t){var e,a,o,c;return i.a.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return e=r.params,a=t.call,t.put,n.next=4,a(f["a"],e);case 4:o=n.sent,c=o.success,c?(u["a"].success("\u64cd\u4f5c\u6210\u529f"),p.a.push("/forum-manage/group")):u["a"].error("\u64cd\u4f5c\u5931\u8d25");case 7:case"end":return n.stop()}},n)})},reducers:{save:function(n,r){var t=r.payload;return a()({},n,t)}}}},kqyw:function(n,r,t){"use strict";t.d(r,"f",function(){return a}),t.d(r,"d",function(){return i}),t.d(r,"b",function(){return u}),t.d(r,"h",function(){return s}),t.d(r,"g",function(){return m}),t.d(r,"i",function(){return c}),t.d(r,"a",function(){return p}),t.d(r,"e",function(){return f}),t.d(r,"j",function(){return o}),t.d(r,"c",function(){return d});var e=t("oT5p"),a=function(n){return e["a"].get("/api/admin/forum/groupCategory",n)},u=function(n){return e["a"].post("/api/admin/forum/groupCategory",n,!0)},o=function(n){return e["a"].put("/api/admin/forum/groupCategory",n,!0)},i=function(n){return e["a"].delete("/api/admin/forum/groupCategory",n,!0)},c=function(n){return e["a"].get("/api/admin/forum/group",n)},p=function(n){return e["a"].post("/api/admin/forum/group",n,!0)},f=function(n){return e["a"].put("/api/admin/forum/group/".concat(n.id),n,!0)},d=function(n){return e["a"].delete("/api/admin/forum/group/".concat(n.id),n,!0)},s=function(n){return e["a"].post("/api/admin/forum/group/".concat(n.id,"/enable"),n,!0)},m=function(n){return e["a"].post("/api/admin/forum/group/".concat(n.id,"/disable"),n,!0)}}}]);
//# sourceMappingURL=p__forum-manage__group__models__add.js.54f3864c.async.js.map