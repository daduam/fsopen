(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),u=t.n(a),r=t(14),c=t.n(r),o=t(4),l=t(2),i=function(e){var n=e.value,t=e.onChange;return u.a.createElement("div",null,"filter shown with ",u.a.createElement("input",{value:n,onChange:t}))},m=function(e){return u.a.createElement("form",null,u.a.createElement("div",null,"name: ",u.a.createElement("input",{value:e.name,onChange:e.onNameChange})),u.a.createElement("div",null,"number: ",u.a.createElement("input",{value:e.number,onChange:e.onNumberChange})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit",onClick:e.onClick},"add")))},f=function(e){var n=e.persons,t=e.deletePersonOf;return u.a.createElement("ul",null,n.map((function(e){return u.a.createElement("li",{key:e.name},e.name," ",e.number,"\xa0",u.a.createElement("button",{onClick:function(){return t(e.id)}},"delete"))})))},s=t(3),d=t.n(s),b="/api/persons",h=function(){return d.a.get(b).then((function(e){return e.data}))},v=function(e){return d.a.post(b,e).then((function(e){return e.data}))},p=function(e){return d.a.delete("".concat(b,"/").concat(e)).then((function(e){return e.status}))},E=function(e,n){return d.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))},O=function(e){var n=e.message,t=e.type;return null===n?null:u.a.createElement("div",{className:t},n)},g=(t(37),function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)(""),s=Object(l.a)(c,2),d=s[0],b=s[1],g=Object(a.useState)(""),j=Object(l.a)(g,2),C=j[0],w=j[1],k=Object(a.useState)(""),S=Object(l.a)(k,2),y=S[0],N=S[1],T=Object(a.useState)(!0),P=Object(l.a)(T,2),A=P[0],D=P[1],I=Object(a.useState)(null),J=Object(l.a)(I,2),x=J[0],B=J[1],L=Object(a.useState)(null),q=Object(l.a)(L,2),z=q[0],F=q[1];Object(a.useState)((function(){h().then((function(e){r(e)}))}),[]);var G=A?t:t.filter((function(e){return e.name.toLowerCase().includes(y)}));return u.a.createElement("div",null,u.a.createElement("h2",null,"Phonebook"),u.a.createElement(O,{message:x,type:z}),u.a.createElement(i,{value:y,onChange:function(e){N(e.target.value),D(0===y.length)}}),u.a.createElement("h2",null,"Add a new"),u.a.createElement(m,{name:d,number:C,onNameChange:function(e){b(e.target.value)},onNumberChange:function(e){w(e.target.value)},onClick:function(e){e.preventDefault();var n=t.find((function(e){return e.name===d}));if(void 0===n)v({name:d,number:C,show:!0}).then((function(e){r(t.concat(e)),b(""),w(""),B("Added ".concat(d)),F("success"),setTimeout((function(){B(null),F(null)}),5e3)})).catch((function(e){B(e.response.data.error),F("error"),setTimeout((function(){B(null),F(null)}),5e3)}));else if(window.confirm("".concat(d," is already added to phonebook, replace the old number with a new one"))){var a=n.id;E(a,Object(o.a)(Object(o.a)({},n),{},{number:C})).then((function(e){r(t.filter((function(e){return e.id!==a})).concat(e)),b(""),w(""),B("Changed number for ".concat(d)),F("success"),setTimeout((function(){B(null),F(null)}),5e3)})).catch((function(e){B("Information of ".concat(d," has already been removed from server")),F("error"),setTimeout((function(){B(null),F(null)}),5e3),r(t.filter((function(e){return e.id!==a})))}))}else b("")}}),u.a.createElement("h2",null,"Numbers"),u.a.createElement(f,{persons:G,deletePersonOf:function(e){var n=t.filter((function(n){return n.id===e})),a=Object(l.a)(n,1)[0];window.confirm("Delete ".concat(a.name," ?"))&&p(e).then((function(e){200===e&&r(t.filter((function(e){return e!==a})))}))}}))});c.a.render(u.a.createElement(g,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.90cc310f.chunk.js.map