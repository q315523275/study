(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12],{f3xs:function(n,t,a){"use strict";a.r(t);var r=a("p0pE"),e=a.n(r),u=(a("miYZ"),a("tsqr")),c=a("d6i3"),i=a.n(c),s=a("fcMJ"),o=a("3a4m"),p=a.n(o);t["default"]={namespace:"topicCheck",state:{},effects:{getListData:i.a.mark(function n(t,a){return i.a.wrap(function(n){while(1)switch(n.prev=n.next){case 0:t.params,a.call,a.put;case 2:case"end":return n.stop()}},n)}),applyTopic:i.a.mark(function n(t,a){var r,e,c,o,f;return i.a.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return r=t.params,e=a.call,a.put,n.next=4,e(s["a"],r);case 4:c=n.sent,o=c.success,f=c.error,o?(u["a"].success("\u64cd\u4f5c\u6210\u529f"),p.a.push("/forum-manage/topic")):u["a"].error(f);case 8:case"end":return n.stop()}},n)})},reducers:{save:function(n,t){var a=t.payload;return e()({},n,a)}}}},fcMJ:function(n,t,a){"use strict";a.d(t,"d",function(){return e}),a.d(t,"e",function(){return u}),a.d(t,"b",function(){return i}),a.d(t,"f",function(){return s}),a.d(t,"a",function(){return o}),a.d(t,"c",function(){return c});var r=a("oT5p"),e=function(n){return r["a"].get("/api/admin/forum/discussion",n)},u=function(n){return r["a"].get("/api/admin/forum/discussion/active_users",n,!0)},c=function(n){return r["a"].get("/api/common/dic/apply_status",n,!0)},i=function(n){return r["a"].delete("/api/admin/forum/discussion",n,!0)},s=function(n){return r["a"].post("/api/admin/forum/discussion/pinned",n,!0)},o=function(n){return r["a"].post("/api/admin/forum/discussion/".concat(n.topicId,"/apply"),n,!0)}}}]);
//# sourceMappingURL=p__forum-manage__topic__models__check.js.244e0211.async.js.map