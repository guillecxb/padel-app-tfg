"use strict";(self.webpackChunkpadel_app=self.webpackChunkpadel_app||[]).push([[9825],{16811:(e,r,t)=>{t.d(r,{Nv:()=>l,oZ:()=>u,rq:()=>i});var s=t(21858),a=t(38826),n=t(21895);const o=a.P.injectEndpoints({endpoints:e=>({customers:e.query({query:()=>"/customers/",providesTags:[n._.Customers]}),createCustomer:e.mutation({query:e=>({url:"".concat(s.yq,"/customers/"),method:"POST",formData:!0,headers:{[s.Vb]:s.xS},body:e}),invalidatesTags:[n._.Customers]}),updateCustomer:e.mutation({query:e=>{let{body:r,customerId:t}=e;return{url:"".concat(s.yq,"/customers/").concat(t,"/"),method:"PATCH",formData:!0,headers:{[s.Vb]:s.xS},body:r}},invalidatesTags:[n._.Customers]})})}),{useCustomersQuery:i,useCreateCustomerMutation:l,useUpdateCustomerMutation:u}=o},47926:(e,r,t)=>{t.d(r,{DR:()=>i,Tj:()=>l,UQ:()=>o,a8:()=>u,x0:()=>c});t(21858);var s=t(66984),a=t(21895);const n=s.J.injectEndpoints({endpoints:e=>({availableCourts:e.query({query:e=>{let{customer_id:r,date:t}=e;return{url:"/customers/".concat(r,"/available-courts/"),params:{date:t}}},providesTags:[a.n.Reservations]}),createReservation:e.mutation({query:e=>{let{user_id:r,court_id:t,reservation_time:s,customer_id:a}=e;return{url:"/reservations/",method:"POST",body:{user_id:r,court_id:t,reservation_time:s,customer_id:a}}},providesTags:[a.n.Reservations]}),getUserReservations:e.query({query:e=>{let{user_id:r}=e;return{url:"/users/".concat(r,"/reservations/")}},providesTags:[a.n.Reservations]}),deleteReservation:e.mutation({query:e=>({url:"/reservations/".concat(e,"/"),method:"DELETE"}),invalidatesTags:[a.n.Reservations]}),getCustomerReservations:e.query({query:e=>{let{customer_id:r}=e;return{url:"/customers/".concat(r,"/reservations/")}},providesTags:[a.n.Reservations]}),getCustomerReservationsByDate:e.query({query:e=>{let{customer_id:r,from_date:t}=e;return{url:"/customers/".concat(r,"/reservations-by-date/"),params:t?{from_date:t}:{}}},providesTags:[a.n.Reservations]}),getReservationCountByCourt:e.query({query:e=>{let{customer_id:r}=e;return{url:"/customers/".concat(r,"/reservations/count-by-court/")}},providesTags:[a.n.Reservations]})})}),{useAvailableCourtsQuery:o,useCreateReservationMutation:i,useGetUserReservationsQuery:l,useDeleteReservationMutation:u,useGetCustomerReservationsQuery:c,useGetCustomerReservationsByDateQuery:d,useGetReservationCountByCourtQuery:m}=n},79825:(e,r,t)=>{t.r(r),t.d(r,{default:()=>T});var s=t(47313),a=t(9506),n=t(61113),o=t(24631),i=t(9019),l=t(69099),u=t(94469),c=t(33604),d=t(96467),m=t(97762),v=t(4117),p=t(85281),x=t(43394),h=t(44948),y=t(64507),g=t(47926),Z=t(29104),j=t(16811),C=t(89600),b=t(58467),R=t(67234),_=t(46417);const T=()=>{var e,r;const t=(0,b.TH)(),T=(0,b.s0)(),[D,f]=(0,s.useState)(null),[S,q]=(0,s.useState)(null),[M,w]=(0,s.useState)(null),[k,H]=(0,s.useState)(null),[P,A]=(0,s.useState)(!1),[E,Q]=(0,s.useState)(!1),[F,I]=(0,s.useState)(!1),[U,B]=(0,s.useState)((null===(e=t.state)||void 0===e?void 0:e.customerId)||null),[G,L]=(0,s.useState)((null===(r=t.state)||void 0===r?void 0:r.customerLocation)||""),[N]=(0,g.DR)(),{data:O,isLoading:V}=(0,Z.xY)({params:{customer_id:U}}),{data:W,isLoading:z}=(0,j.rq)(),J=new Date,Y=new Date(J);Y.setMonth(J.getMonth()+2);const K=[];for(let s=9;s<=22.5;s+=1.5){const e=Math.floor(s),r=s%1===.5?30:0;K.push(new Date(0,0,0,e,r))}const X=S&&M?"".concat((0,C.Z)(new Date(S),"yyyy-MM-dd"),"T").concat((0,C.Z)(M,"HH:mm:ss")):null,{data:$=[]}=(0,g.UQ)({customer_id:U,date:X},{skip:!X||!U}),ee=()=>{T(R.Z6.membersArea)};return(0,_.jsx)(x._,{dateAdapter:y.H,children:(0,_.jsxs)(a.Z,{sx:{padding:"16px"},children:[(0,_.jsx)(n.Z,{variant:"h5",sx:{textAlign:"center",marginBottom:4},children:U?"Reserva para: ".concat(G):"Seleccione un club para reservar"}),!U&&!z&&(0,_.jsxs)(o.Z,{select:!0,label:"Seleccione un club",value:U||"",onChange:e=>{const r=e.target.value,t=null===W||void 0===W?void 0:W.results.find((e=>e.id===parseInt(r)));B(r),L(t?t.location:"")},SelectProps:{native:!0},fullWidth:!0,children:[(0,_.jsx)("option",{value:"",disabled:!0,hidden:!0}),null===W||void 0===W?void 0:W.results.map((e=>(0,_.jsx)("option",{value:e.id,children:e.location},e.id)))]}),U&&(0,_.jsx)(_.Fragment,{children:(0,_.jsxs)(o.Z,{select:!0,label:"Seleccione un usuario",value:D||"",onChange:e=>f(e.target.value),SelectProps:{native:!0},fullWidth:!0,sx:{marginTop:4},children:[(0,_.jsx)("option",{value:"",disabled:!0,hidden:!0}),null===O||void 0===O?void 0:O.results.map((e=>(0,_.jsx)("option",{value:e.id,children:e.name||e.username||"Usuario ".concat(e.id)},e.id)))]})}),D&&(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(a.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"center",marginTop:4},children:(0,_.jsx)(h.M,{label:"Fecha de reserva",value:S,onChange:e=>q(e),renderInput:e=>(0,_.jsx)(o.Z,{...e}),minDate:J,maxDate:Y})}),S&&(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(n.Z,{variant:"h6",sx:{marginTop:4,textAlign:"center"},children:"Seleccione una hora"}),(0,_.jsx)(i.ZP,{container:!0,spacing:2,sx:{marginTop:2},children:K.map(((e,r)=>(0,_.jsx)(i.ZP,{item:!0,xs:6,md:3,children:(0,_.jsxs)(l.Z,{variant:M===e?"contained":"outlined",onClick:()=>w(e),children:[(0,C.Z)(e,"HH:mm")," - ",(0,C.Z)(new Date(e.getTime()+54e5),"HH:mm")]})},r)))})]}),M&&$.length>0&&(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(n.Z,{variant:"h6",sx:{marginTop:4,textAlign:"center"},children:"Seleccione una pista"}),(0,_.jsx)(i.ZP,{container:!0,spacing:2,sx:{marginTop:2},children:$.map((e=>(0,_.jsx)(i.ZP,{item:!0,xs:6,md:3,children:(0,_.jsxs)(a.Z,{sx:{padding:2,border:"2px solid",borderColor:e.available?"primary.main":"grey.400",backgroundColor:e.available?k===e.court_id?"primary.light":"white":"grey.200",color:e.available?"text.primary":"grey.600",textAlign:"center",borderRadius:1,cursor:e.available?"pointer":"not-allowed",pointerEvents:e.available?"auto":"none"},onClick:()=>{return r=e.court_id,void($.find((e=>e.court_id===r)).available&&H(r));var r},children:[(0,_.jsx)(n.Z,{variant:"h6",children:e.court_name}),(0,_.jsx)(n.Z,{variant:"body2",children:e.available?"Disponible":"Ocupada"})]})},e.court_id)))})]}),k&&(0,_.jsx)(a.Z,{sx:{marginTop:4,textAlign:"center"},children:(0,_.jsxs)(l.Z,{variant:"contained",color:"primary",onClick:()=>{A(!0)},children:["Reservar Pista ",k]})})]}),(0,_.jsxs)(u.Z,{open:P,onClose:()=>A(!1),children:[(0,_.jsx)(c.Z,{children:"Confirmar Reserva"}),(0,_.jsx)(d.Z,{children:(0,_.jsxs)(m.Z,{children:["\xbfEst\xe1s seguro de reservar la pista ",k," para el ",(0,C.Z)(new Date(X),"dd/MM/yyyy HH:mm"),"?"]})}),(0,_.jsxs)(v.Z,{children:[(0,_.jsx)(l.Z,{onClick:()=>A(!1),color:"secondary",children:"Cancelar"}),(0,_.jsx)(l.Z,{onClick:async()=>{Q(!0);try{await N({user_id:D,court_id:k,reservation_time:X,customer_id:parseInt(U)}).unwrap(),Q(!1),A(!1),I(!0)}catch(e){Q(!1),console.error("Error al crear la reserva:",e)}},color:"primary",disabled:E,children:E?(0,_.jsx)(p.Z,{size:24}):"Reservar"})]})]}),(0,_.jsxs)(u.Z,{open:F,onClose:ee,children:[(0,_.jsx)(c.Z,{children:"Reserva exitosa"}),(0,_.jsx)(d.Z,{children:(0,_.jsxs)(m.Z,{children:["\xa1Reserva confirmada para la pista ",k," el ",(0,C.Z)(new Date(X),"dd/MM/yyyy HH:mm"),"!"]})}),(0,_.jsxs)(v.Z,{children:[(0,_.jsx)(l.Z,{onClick:()=>{I(!1),q(null),w(null),H(null)},color:"primary",children:"Reservar otra pista"}),(0,_.jsx)(l.Z,{onClick:ee,color:"secondary",children:"Ir a mis reservas"})]})]})]})})}},97762:(e,r,t)=>{t.d(r,{Z:()=>y});var s=t(63366),a=t(87462),n=t(47313),o=t(83061),i=t(21921),l=t(17592),u=t(77342),c=t(61113),d=t(77430),m=t(32298);function v(e){return(0,m.Z)("MuiDialogContentText",e)}(0,d.Z)("MuiDialogContentText",["root"]);var p=t(46417);const x=["children","className"],h=(0,l.ZP)(c.Z,{shouldForwardProp:e=>(0,l.FO)(e)||"classes"===e,name:"MuiDialogContentText",slot:"Root",overridesResolver:(e,r)=>r.root})({}),y=n.forwardRef((function(e,r){const t=(0,u.Z)({props:e,name:"MuiDialogContentText"}),{className:n}=t,l=(0,s.Z)(t,x),c=(e=>{const{classes:r}=e,t=(0,i.Z)({root:["root"]},v,r);return(0,a.Z)({},r,t)})(l);return(0,p.jsx)(h,(0,a.Z)({component:"p",variant:"body1",color:"text.secondary",ref:r,ownerState:l,className:(0,o.Z)(c.root,n)},t,{classes:c}))}))}}]);