"use strict";(self.webpackChunkpadel_app=self.webpackChunkpadel_app||[]).push([[8963],{18963:(e,t,r)=>{r.r(t),r.d(t,{default:()=>D});var n=r(47313),s=r(85281),i=r(61113),l=r(9019),a=r(24631),o=r(1550),d=r(88797),c=r(51405),h=r(73428),p=r(16957),u=r(93405),x=r(69099),m=r(77970),j=r(36373),g=r(99881),Z=r(43394),f=r(44948),v=r(72905),y=r(27493),b=r(95349),w=r.n(b),C=r(68012),Y=r(46417);const D=()=>{const[e,t]=(0,n.useState)(1),[r,b]=(0,n.useState)(w()().subtract(7,"day")),[D,M]=(0,n.useState)("newest"),[k,P]=(0,n.useState)(!1),W=w()().subtract(1,"month"),A=r.format("YYYY-MM-DD"),B=(0,C.DF)(),{data:I,error:S,isLoading:_}=(0,y.V)({q:"premier padel",from:A,sortBy:"popularity"});if(_)return(0,Y.jsx)(s.Z,{});if(S)return(0,Y.jsx)(i.Z,{children:"Error al cargar las noticias"});const E=[...(null===I||void 0===I?void 0:I.articles)||[]].sort(((e,t)=>{const r=w()(e.publishedAt),n=w()(t.publishedAt);return"newest"===D?n.diff(r):r.diff(n)})),F=Math.ceil(E.length/9),L=9*(e-1),N=L+9,T=E.slice(L,N);return(0,Y.jsx)(Z._,{dateAdapter:v.y,children:(0,Y.jsxs)("div",{children:[(0,Y.jsx)(i.Z,{variant:"h3",component:"h1",align:"center",gutterBottom:!0,children:B("title")}),(0,Y.jsxs)(l.ZP,{container:!0,justifyContent:"space-between",alignItems:"center",style:{marginBottom:"20px"},children:[(0,Y.jsx)(l.ZP,{item:!0,style:{maxWidth:"250px"},children:(0,Y.jsx)(f.M,{label:B("selectDate"),value:r,onChange:e=>{e.isBefore(W)?P(!0):(b(e),t(1))},inputFormat:"DD/MM/YYYY",renderInput:e=>(0,Y.jsx)(a.Z,{...e,fullWidth:!0})})}),(0,Y.jsx)(l.ZP,{item:!0,style:{maxWidth:"400px",textAlign:"right"},children:(0,Y.jsx)(o.Z,{fullWidth:!0,children:(0,Y.jsxs)(d.Z,{labelId:"sort-order-label",value:D,onChange:e=>{M(e.target.value),t(1)},style:{minWidth:"150px"},children:[(0,Y.jsx)(c.Z,{value:"newest",children:B("newerNews")}),(0,Y.jsx)(c.Z,{value:"oldest",children:B("olderNews")})]})})})]}),(0,Y.jsx)(l.ZP,{container:!0,spacing:3,style:{padding:"20px"},children:null===T||void 0===T?void 0:T.map(((e,t)=>(0,Y.jsx)(l.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,Y.jsxs)(h.Z,{children:[(0,Y.jsx)(p.Z,{component:"img",height:"150",image:e.urlToImage||"https://via.placeholder.com/150",alt:e.title}),(0,Y.jsxs)(u.Z,{children:[(0,Y.jsx)(i.Z,{variant:"h5",component:"div",children:e.title}),(0,Y.jsx)(i.Z,{variant:"body2",color:"text.secondary",children:e.description}),(0,Y.jsx)(x.Z,{size:"small",color:"primary",href:e.url,target:"_blank",rel:"noopener noreferrer",children:"Leer m\xe1s"})]})]})},t)))}),(0,Y.jsx)(m.Z,{count:F,page:e,onChange:(e,r)=>{t(r)},color:"primary",style:{display:"flex",justifyContent:"center",marginTop:"20px"}}),(0,Y.jsx)(j.Z,{open:k,autoHideDuration:6e3,onClose:()=>P(!1),children:(0,Y.jsx)(g.Z,{onClose:()=>P(!1),severity:"warning",sx:{width:"100%"},children:"Esta funcionalidad de ver noticias de m\xe1s de un mes es de pago."})})]})})}}}]);