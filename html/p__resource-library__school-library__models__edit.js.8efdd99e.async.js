(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[36],{eoVL:function(n,t,e){"use strict";e.r(t);var r=e("p0pE"),a=e.n(r),i=(e("miYZ"),e("tsqr")),u=e("d6i3"),c=e.n(u),s=e("3a4m"),o=e.n(s),p=e("hH4C");t["default"]={namespace:"schoolLibraryEdit",state:{initData:null,countryList:[]},effects:{getCountryList:c.a.mark(function n(t,e){var r,a,i,u;return c.a.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return r=t.params,a=e.call,i=e.put,n.next=4,a(p["b"],r);case 4:return u=n.sent,n.next=7,i({type:"save",payload:{countryList:u}});case 7:case"end":return n.stop()}},n)}),getDetail:c.a.mark(function n(t,e){var r,a,i,u;return c.a.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return r=t.params,a=e.call,i=e.put,n.next=4,a(p["e"],r);case 4:return u=n.sent,n.next=7,i({type:"save",payload:{initData:u}});case 7:case"end":return n.stop()}},n)}),getEdit:c.a.mark(function n(t,e){var r,a,u;return c.a.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return r=t.params,a=e.call,e.put,n.next=4,a(p["f"],r);case 4:u=n.sent,u?(i["a"].success("\u64cd\u4f5c\u6210\u529f"),o.a.push("/resource-library/school-library")):i["a"].error("\u64cd\u4f5c\u5931\u8d25");case 6:case"end":return n.stop()}},n)})},reducers:{save:function(n,t){var e=t.payload;return a()({},n,e)}}}},hH4C:function(n,t,e){"use strict";e.d(t,"g",function(){return i}),e.d(t,"a",function(){return s}),e.d(t,"f",function(){return o}),e.d(t,"e",function(){return p}),e.d(t,"c",function(){return u}),e.d(t,"b",function(){return a}),e.d(t,"d",function(){return c}),e.d(t,"h",function(){return d}),e.d(t,"i",function(){return f});var r=e("oT5p"),a=function(n){return r["a"].get("/api/admin/country/university",n)},i=function(n){return r["a"].get("/api/admin/university",n)},u=function(n){return r["a"].delete("/api/admin/university",n,!0)},c=function(n){return r["a"].delete("/api/admin/university",n,!0)},s=function(n){return r["a"].post("/api/admin/university",n,!0)},o=function(n){return r["a"].put("/api/admin/university",n,!0)},p=function(n){return r["a"].get("/api/admin/university",n)},d=function(n){return r["a"].post("/api/admin/".concat(n.resource,"/pinned"),n,!0)},f=function(n){return r["a"].post("/api/admin/".concat(n.resource,"/un_pinned"),n,!0)}}}]);
//# sourceMappingURL=p__resource-library__school-library__models__edit.js.8efdd99e.async.js.map