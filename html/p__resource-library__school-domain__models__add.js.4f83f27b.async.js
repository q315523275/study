(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[32],{PJCB:function(n,t,e){"use strict";e.r(t);var a=e("p0pE"),r=e.n(a),u=(e("miYZ"),e("tsqr")),i=e("d6i3"),c=e.n(i),s=e("3a4m"),o=e.n(s),p=e("oWbJ");t["default"]={namespace:"schoolDomainAdd",state:{subjectList:[],pagination:{current:1,pageSize:10,total:null}},effects:{getSubjectCanAdd:c.a.mark(function n(t,e){var a,r,u,i,s,o,d;return c.a.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return a=t.params,r=e.call,u=e.put,n.next=4,r(p["h"],a);case 4:return i=n.sent,s=i.data,o=i.total,d=i.pageNumber,n.next=10,u({type:"save",payload:{subjectList:s,pagination:{current:d,pageSize:10,total:o}}});case 10:case"end":return n.stop()}},n)}),getAdd:c.a.mark(function n(t,e){var a,r,i,s;return c.a.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return a=t.params,r=e.call,e.put,n.next=4,r(p["a"],a);case 4:i=n.sent,s=i.success,s?(u["a"].success("\u64cd\u4f5c\u6210\u529f"),o.a.push("/resource-library/school-domain")):u["a"].error("\u64cd\u4f5c\u5931\u8d25");case 7:case"end":return n.stop()}},n)}),clearAll:c.a.mark(function n(t,e){var a;return c.a.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return a=e.put,n.next=3,a({type:"save",payload:{subjectList:[],pagination:{current:1,pageSize:10,total:null}}});case 3:case"end":return n.stop()}},n)})},reducers:{save:function(n,t){var e=t.payload;return r()({},n,e)}}}},oWbJ:function(n,t,e){"use strict";e.d(t,"e",function(){return r}),e.d(t,"g",function(){return u}),e.d(t,"c",function(){return o}),e.d(t,"b",function(){return p}),e.d(t,"h",function(){return i}),e.d(t,"a",function(){return c}),e.d(t,"d",function(){return s}),e.d(t,"f",function(){return d}),e.d(t,"i",function(){return f});var a=e("oT5p"),r=function(n){return a["a"].get("/api/admin/country/university",n)},u=function(n){return a["a"].get("/api/admin/universitySubject/".concat(n.universityId),n)},i=function(n){return a["a"].get("/api/admin/universitySubject/".concat(n.universityId,"/subject_enable"),n)},c=function(n){return a["a"].post("/api/admin/universitySubject/".concat(n.universityId,"/subject"),n,!0)},s=function(n){return a["a"].get("/api/admin/universitySubject/details/".concat(n.id),n)},o=function(n){return a["a"].put("/api/admin/universitySubject/".concat(n[0].universityId,"/subject"),n,!0)},p=function(n){return a["a"].delete("/api/admin/universitySubject",n,!0)},d=function(n){return a["a"].post("/api/admin/universitySubject/pinned",n,!0)},f=function(n){return a["a"].post("/api/admin/universitySubject/un_pinned",n,!0)}}}]);
//# sourceMappingURL=p__resource-library__school-domain__models__add.js.4f83f27b.async.js.map