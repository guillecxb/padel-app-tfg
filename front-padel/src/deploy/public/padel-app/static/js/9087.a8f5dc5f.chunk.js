"use strict";(self.webpackChunkpadel_app=self.webpackChunkpadel_app||[]).push([[9087],{59141:(e,t,n)=>{n.d(t,{X:()=>i,n:()=>h});var r=n(70501),s=n(9506),a=n(20619),l=n(46417);const i=e=>{let{children:t,"data-testid":n,color:i,onClick:o,...c}=e;return(0,l.jsxs)(r.Z,{alignItems:"center",component:s.Z,"data-testid":n,display:"flex",gap:2,justifyContent:"space-between",p:2,...c,onClick:o,sx:{cursor:"pointer",overflow:"hidden"},children:[(0,l.jsx)(s.Z,{width:"100%",children:t}),(0,l.jsx)(s.Z,{alignItems:"center",display:"flex",justifyContent:"center",children:(0,l.jsx)(a.Z,{color:i,children:"chevron-right"})})]})};var o=n(47313),c=n(75192),d=n.n(c);const u=e=>{let{isDisabled:t,mouseHoverElevation:n=5}=e;const[r,s]=(0,o.useState)(1),[a,l]=(0,o.useState)("text.primary"),i=(0,o.useCallback)((()=>{s(n),l("primary")}),[n]),c=(0,o.useCallback)((()=>{s(1),l("text.primary")}),[]);return{color:a,paperButtonProps:{disabled:t,color:a,...!t&&{onMouseOut:c,onMouseOver:i},elevation:r}}};u.propTypes={isDisabled:d().bool,mouseHoverElevation:d().number};const h=u},22719:(e,t,n)=>{n.d(t,{KZ:()=>l,rl:()=>i,s_:()=>r,wg:()=>o});const r={HOURLY:"HOURLY",DAILY:"DAILY",BIDAILY:"BIDAILY",WEEKLY:"WEEKLY",MONTHLY:"MONTHLY"},s={[r.DAILY]:24,[r.BIDAILY]:48,[r.WEEKLY]:168,[r.MONTHLY]:720},a=e=>{const t=new Date,n=new Date(t.setHours(t.getHours()-s[e]));return e=>new Date(e)>=n},l={[r.DAILY]:a(r.DAILY),[r.BIDAILY]:a(r.BIDAILY),[r.WEEKLY]:a(r.WEEKLY),[r.MONTHLY]:a(r.MONTHLY)},i={lastConnection:"lastConnnection",customerStatus:"customerStatus",alerts:"alerts",alertsError:"alertsError",network:"network",connectionStatus:"connectionStatus"},o=(i.customerStatus,i.alerts,i.customerStatus,i.alertsError,[i.lastConnection]);i.connectionStatus,i.network},26125:(e,t,n)=>{n.d(t,{Z:()=>d});var r=n(75192),s=n.n(r),a=n(47313),l=n(21429),i=n(68012),o=n(22719);const c=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];const t=(0,i.Qu)(),n=(0,a.useMemo)((()=>({[o.rl.lastConnection]:{key:o.rl.lastConnection,singleSelection:!0,title:t("lastConnection"),values:[{label:t("last24h"),value:o.s_.DAILY},{label:t("last48h"),value:o.s_.BIDAILY},{label:t("lastWeek"),value:o.s_.WEEKLY},{label:t("lastMonth"),value:o.s_.MONTHLY}]},[o.rl.alertsError]:{key:o.rl.alertsError,title:t("alerts"),disabled:!0,values:[]},[o.rl.alerts]:{key:o.rl.alerts,title:t("alerts"),values:[{label:t("critical"),value:l.fR.ERROR},{label:t("warning"),value:l.fR.WARNING},{label:t("noAlerts"),value:l.fR.OK}]},[o.rl.customerStatus]:{key:o.rl.customerStatus,singleSelection:!0,title:t("customerStatus"),values:[{label:t("active"),value:l.Gi.ACTIVE},{label:t("deploying"),value:l.Gi.DEPLOYING},{label:t("pending"),value:l.Gi.PENDING},{label:t("draft"),value:l.Gi.DRAFT}]},[o.rl.network]:{key:o.rl.network,title:t("connectionStatus"),values:[{label:t("allConnected"),value:l.cR.ALL_CONNECTED},{label:t("someConnected"),value:l.cR.SOME_CONNECTED},{label:t("allDisconnected"),value:l.cR.ALL_DISCONNECTED},{label:t("allSuspended"),value:l.cR.ALL_SUSPENDED}]},[o.rl.connectionStatus]:{key:o.rl.connectionStatus,title:t("connectionStatus"),values:[{label:t("connected"),value:l.cR.ALL_CONNECTED},{label:t("disconnected"),value:l.cR.ALL_DISCONNECTED},{label:t("suspended"),value:l.cR.ALL_SUSPENDED}]}})),[t]);return e.reduce(((e,t)=>[...e,n[t]]),[])};c.propTypes={requiredFilters:s().array};const d=c},39087:(e,t,n)=>{n.r(t),n.d(t,{default:()=>te});var r=n(47313),s=n(97594),a=n(58467),l=n(294),i=n(70501),o=n(9506),c=n(61113),d=n(63984),u=n(69099),h=n(29104),p=n(59863),x=(n(24960),n(55757)),m=n(14762),j=n(55162),v=n(22719),b=n(93397),g=n(21429),Z=n(26125),y=n(67234),w=n(25673),C=n(46400),f=n(68012),k=n(46417);const I=e=>{let{isOpen:t,userId:n}=e;const l=(0,s.I0)(),x=(0,a.s0)(),{id:m}=(0,s.v9)(p.jo),j=(0,f.qb)(),[v,b]=(0,r.useState)(t);(0,r.useEffect)((()=>{t&&b(!0)}),[t,n]);const[g]=(0,h.Tm)(),Z=m===n,I=Z?"messageOwner":"message",D=(0,r.useCallback)((async()=>{if(await g({userId:n}).unwrap(),Z)return l((0,p.ni)()),void x(y.Z6.login);b(!1)}),[g,l,Z,x,n]),E=()=>b(!1);return(0,k.jsx)(w.Z,{open:v,children:(0,k.jsx)(o.Z,{alignItems:"center",display:"flex",justifyContent:"center",sx:{width:"100vw",height:"100vh"},children:(0,k.jsx)(C.Z,{"data-testid":"user-delete-form",entity:{},errorOn:"snackbar",onSubmit:D,snackbarOptions:{action:!0},snackbarTranslationParams:{userId:n},successOn:"snackbar",translationKey:"deleteUser",validateOnChange:!1,children:(0,k.jsxs)(i.Z,{sx:{p:4},children:[(0,k.jsx)(c.Z,{mb:2,variant:"h4",children:j("customer.deleteModal.title")}),(0,k.jsx)(c.Z,{mb:2,children:j("customer.deleteModal.".concat(I),{userId:n})}),(0,k.jsx)(c.Z,{color:"text.secondary",variant:"body2",children:j("customer.deleteModal.warning")}),(0,k.jsx)(o.Z,{children:(0,k.jsx)(C.Z.DataBlock,{children:e=>{let{submitForm:t}=e;return(0,k.jsxs)(d.Z,{alignItems:"center",direction:"row",justifyContent:"flex-end",mt:3,spacing:2,children:[(0,k.jsx)(u.Z,{onClick:E,variant:"contained",children:j("customer.deleteModal.cancel")}),(0,k.jsx)(u.Z,{color:"error",onClick:t,variant:"contained",children:j("customer.deleteModal.delete")})]})}})})]})})})})};var D=n(65053),E=n(7577),S=n(20619);const L=e=>{let{children:t,display:n="inline",verticalAlign:r="text-bottom"}=e;return(0,k.jsx)("img",{alt:t[0],src:"".concat("","/help_images/en/").concat(t[0],".svg"),style:{display:n,position:"relative",verticalAlign:r,paddingRight:"8px"}})},O=e=>{let{children:t,...n}=e;return(0,k.jsx)(c.Z,{...n,children:(0,k.jsx)(E.c,{components:{bold:(0,k.jsx)("b",{}),you:(0,k.jsx)(c.Z,{color:"text.primary",component:"span"}),b:(0,k.jsx)("strong",{}),sb:(0,k.jsx)(c.Z,{color:"black",component:"span",display:"inline",variant:"body1"}),sbs:(0,k.jsx)(c.Z,{color:"text.secondary",component:"span",display:"inline",variant:"body1"}),h4:(0,k.jsx)(c.Z,{color:"text.primary",component:"span",display:"inline",variant:"h4"}),h3:(0,k.jsx)(c.Z,{color:"text.primary",display:"inline",variant:"h3"}),h5:(0,k.jsx)(c.Z,{color:"text.primary",variant:"h5"}),li:(0,k.jsx)(c.Z,{color:"text.secondary",component:"li",mb:2,variant:"list-item"}),i:(0,k.jsx)(S.Z,{color:"icon",children:"information-user"}),flex_svg:(0,k.jsx)(L,{display:"inline-block",verticalAlign:"text-top"}),flex:(0,k.jsx)(o.Z,{display:"flex"}),br:(0,k.jsx)("br",{})},children:t})})};var R=n(75192),T=n.n(R),A=n(50301),M=n(9019),Y=n(59141);const N=e=>{let{menuItem:t,handleClick:n}=e;const{color:r,paperButtonProps:s}=(0,Y.n)({isDisabled:!1,mouseHoverElevation:3});return(0,k.jsx)(Y.X,{"data-testid":"drawer-menu-item",onClick:n,...s,children:(0,k.jsxs)(d.Z,{direction:"row",children:[t.customIcon,t.icon,(0,k.jsx)(c.Z,{color:r,ml:2,variant:"body2",children:t.title})]})})},P=e=>{let{menu:t,level:n=0,handleClick:r}=e;return(0,k.jsx)(k.Fragment,{children:t.map((e=>(0,k.jsxs)(M.ZP,{component:i.Z,elevation:0===n&&e.subMenu?1:0,mb:0===n?2:0,mt:n>0?1:0,children:[(0,k.jsx)(N,{handleClick:()=>r(e.id),menuItem:e}),e.subMenu&&(0,k.jsx)(P,{handleClick:r,level:n+1,menu:e.subMenu})]},e.id)))})},_={id:T().string.isRequired,title:T().string.isRequired,icon:T().node,customIcon:T().node};_.subMenu=T().arrayOf(T().shape(_));var F=n(46923),B=n(71263),H=n(19536);const K=e=>{let{children:t,open:n,drawerHeader:r,handleClose:s,closeOnBackDrop:a=!1}=e;return(0,k.jsxs)(F.ZP,{anchor:"right","data-testid":"drawer-container",open:n,sx:{zIndex:1400},transitionDuration:{enter:700,exit:700},...a&&{ModalProps:{onBackdropClick:s}},children:[(0,k.jsxs)(M.ZP,{container:!0,children:[(0,k.jsxs)(M.ZP,{alignItems:"center",display:"flex",item:!0,justifyContent:"space-between",p:2,xs:12,children:[r,(0,k.jsx)(B.Z,{"data-testid":"drawer-close",onClick:s,variant:"pointer",children:"close"})]}),(0,k.jsx)(M.ZP,{item:!0,xs:12,children:(0,k.jsx)(H.Z,{})})]}),t]})},W=e=>{let{headerTitle:t,contentTitle:n,contentDescription:s,currentSlide:a,setSlide:l=(()=>{}),showSlide:i=!1,drawerMenu:d,openDrawer:h,setOpenDrawer:p,"data-testid":x}=e;const[m,j]=(0,r.useState)(i),v=(0,r.useCallback)((e=>{l(e),j(!0)}),[l]),b=(0,r.useCallback)((()=>{j(!1),l("")}),[l]),g=(0,r.useCallback)((()=>{p(!1),j(!1),l("")}),[p,l]);return(0,k.jsx)(k.Fragment,{children:(0,k.jsx)(K,{"data-testid":x,drawerHeader:(0,k.jsx)(k.Fragment,{children:m&&d?(0,k.jsx)(u.Z,{color:"primary","data-testid":"drawer-slide-back",onClick:b,startIcon:(0,k.jsx)(S.Z,{color:"icon",children:"arrow-line-left"}),variant:"outlined",children:(0,k.jsx)(c.Z,{color:"gradient",variant:"subtitle",children:"Back"})}):(0,k.jsx)(c.Z,{"data-testid":"drawer-header-title",variant:"body2",children:t})}),handleClose:g,open:h,children:(0,k.jsxs)(o.Z,{overflow:"hidden",children:[!m&&d&&(0,k.jsx)(A.Z,{direction:"right",in:!m,children:(0,k.jsxs)(M.ZP,{flexDirection:"column",maxWidth:548,minWidth:548,p:5,children:[(0,k.jsxs)(M.ZP,{mb:5,children:[(0,k.jsx)(c.Z,{"data-testid":"subtitle",mb:3,variant:"subtitle1",children:n}),s]}),(0,k.jsx)(P,{handleClick:v,menu:d})]})}),m&&(0,k.jsx)(A.Z,{direction:"left",in:m,children:(0,k.jsx)(M.ZP,{flexDirection:"column",height:"100%",maxWidth:548,minWidth:548,overflow:"auto",px:5,py:3,children:a})})]})})})},G={id:T().string.isRequired,title:T().string.isRequired,icon:T().node,customIcon:T().node};G.subMenu=T().arrayOf(T().shape(G));var U=n(52769),q=n(98492),V=n(41872);const z=e=>{let{action:t,children:n,summaryContent:s,"data-testid":a,summaryDataTestId:l,expanded:i=!1,detailsVariant:c,expandIcon:u,...h}=e;const[p,x]=(0,r.useState)(i),[m,j]=(0,r.useState)(!1),v=(0,r.useCallback)(((e,t)=>x(t)),[]);return(0,k.jsxs)(U.Z,{"data-testid":a,expanded:p,onChange:v,...h,children:[(0,k.jsx)(q.Z,{"data-testid":l,expandIcon:null!==u&&void 0!==u?u:(0,k.jsx)(S.Z,{color:!p&&m?"primary":"text.primary",children:"chevron-down"}),onMouseLeave:()=>j(!1),onMouseOver:()=>j(!0),state:p?"":"closed",children:(0,k.jsx)(o.Z,{pr:2,width:"100%",children:(0,k.jsxs)(d.Z,{direction:"row",justifyContent:"flex-end",children:[(0,k.jsx)(o.Z,{flexGrow:1,children:"function"===typeof s?s({expand:p,mouseOver:m}):s}),t||(0,k.jsx)(k.Fragment,{})]})})}),(0,k.jsx)(V.Z,{variant:c,children:p?n:(0,k.jsx)(k.Fragment,{})})]})},X=e=>{let{image:t,style:n}=e;return(0,k.jsx)("img",{alt:"",src:""+t,style:{paddingBottom:"16px ",...n}})},Q=e=>{let{pageTitle:t,contents:n}=e;const r={text:e=>{let{element:t}=e;return(0,k.jsx)(k.Fragment,{children:t.map(((e,t)=>(0,k.jsx)(O,{pb:3,children:e},t)))})},list:e=>{let{element:t}=e;return(0,k.jsx)("ul",{children:t.map(((e,t)=>(0,k.jsx)("li",{children:(0,k.jsx)(O,{pb:1,children:e})},t)))})},img:e=>{let{element:t,style:n}=e;return(0,k.jsx)(k.Fragment,{children:t.map(((e,t)=>(0,k.jsx)(o.Z,{alignItems:"center",display:"flex",justifyContent:"center",width:"100%",children:(0,k.jsx)(X,{image:e,style:n})},t)))})},info:e=>{let{element:t}=e;return(0,k.jsxs)(d.Z,{alignItems:"top",direction:"row",pb:3,spacing:1,children:[(0,k.jsx)(o.Z,{children:(0,k.jsx)(S.Z,{color:"info",variant:"regular",children:"information"})}),(0,k.jsx)(c.Z,{variant:"body3",children:t})]})},grid:e=>{let{content:t}=e;return(0,k.jsx)(M.ZP,{alignItems:"center",container:!0,spacing:2,children:t.map(((e,t)=>(0,k.jsx)(M.ZP,{item:!0,xs:6,children:r[e.type](e,e.type)},t)))})}},s=e=>r[e.type](e,e.type),a={plain:(e,t)=>(0,k.jsxs)(k.Fragment,{children:[!!e&&(0,k.jsx)(c.Z,{pb:3,variant:"h3",children:e}),t]}),grid:(e,t)=>(0,k.jsxs)(k.Fragment,{children:[!!e&&(0,k.jsx)(c.Z,{pb:3,variant:"h3",children:e}),(0,k.jsx)(M.ZP,{alignItems:"center",container:!0,spacing:2,children:t.map(((e,t)=>(0,k.jsx)(M.ZP,{item:!0,xs:6,children:e},t)))})]}),accordion:(e,t,n)=>(0,k.jsx)(z,{"data-testid":"drawer-container",disablePadding:!0,elevation:0,expanded:n,summaryContent:(0,k.jsx)(c.Z,{"data-testid":"accordion-title",variant:"h3",children:e}),children:t})};return(0,k.jsxs)(o.Z,{height:"100vh",children:[(0,k.jsx)(c.Z,{"data-testid":"content-title",pb:3,variant:"h3",children:t}),null===n||void 0===n?void 0:n.map(((e,t)=>{let{contentTitle:n,content:r,type:l,expanded:i}=e;return(0,k.jsx)(o.Z,{children:a[l](n,r.map(s),i)},t)}))]})},J=e=>{var t;let{useHelpTranslation:n,openDrawer:s,setOpenDrawer:a}=e;const[l,i]=(0,r.useState)(""),o=n(),c=o("pages",{returnObjects:!0}),d=e=>e.reduce(((e,t)=>(e.push(t),t.pages&&Array.isArray(t.pages)&&(e=e.concat(d(t.pages))),e)),[]),u=e=>{var t;return{id:e.id,title:e.pageTitle,icon:e.icon?(0,k.jsx)(S.Z,{color:"icon",variant:null!==(t=e.style)&&void 0!==t&&t.iconVariant?e.style.iconVariant:"filled",children:e.icon}):(0,k.jsx)(O,{children:"<svg>".concat(e.customIcon,"</svg>")})}},h=e=>e.map((e=>{const t=u(e);return e.subMenu&&(t.subMenu=e.subMenu.map(u)),e.pages&&Array.isArray(e.pages)?{...t,subMenu:h(e.pages)}:t})),p=c.filter((e=>{var t;return null===(t=e.visible)||void 0===t||t})),x=h(p),m=d(c).reduce(((e,t)=>{let{id:n,contents:r,pageTitle:s}=t;return{...e,[n]:(0,k.jsx)(Q,{contents:r,pageTitle:s})}}),{});return(0,k.jsx)(k.Fragment,{children:1===(null===(t=Object.keys(m))||void 0===t?void 0:t.length)?(0,k.jsx)(W,{currentSlide:m[Object.keys(m)[0]],"data-testid":"help-drawer",headerTitle:o("headerTitle"),openDrawer:s,setOpenDrawer:a,showSlide:!0}):(0,k.jsx)(W,{contentDescription:(0,k.jsx)(O,{children:o("description")}),contentTitle:o("title"),currentSlide:m[l],"data-testid":"help-drawer",drawerMenu:x,headerTitle:o("headerTitle"),openDrawer:s,setOpenDrawer:a,setSlide:i})})};var $=n(47131);const ee=e=>{let{drawer:t}=e;const[n,s]=(0,r.useState)(!1),a=(0,r.useCallback)((()=>{s(!0)}),[]);return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(M.ZP,{position:"absolute",right:20,top:150,children:(0,k.jsx)($.Z,{"data-testid":"help-stick-label",onClick:a,variant:"contrast",children:(0,k.jsx)(S.Z,{color:"icon",variant:"filled",children:"question"})})}),n&&(0,r.cloneElement)(t,{openDrawer:n,setOpenDrawer:s})]})},te=()=>{const e=(0,a.s0)(),t=(0,f.AK)(),{role:n,id:w}=((0,Z.Z)(v.wg),(0,s.v9)(p.jo)),[C,E]=(0,r.useState)(),{data:{count:S="-",results:L}={},isLoading:R,error:T}=(0,h.xY)({params:{customer_id:1}}),A=[],M=(0,r.useMemo)((()=>(null===A||void 0===A?void 0:A.credentials_type)===g.zR.USER_PASS),[false,null===A||void 0===A?void 0:A.credentials_type]),[Y,N]=(0,r.useState)(0),[P,_]=(0,r.useState)({lastCon:[]}),[F,B]=(0,r.useState)([]),{name:H=""}={},K=(0,r.useCallback)((()=>{const t=y.Z6.usersAdd;e(t)}),[e]),W=(0,r.useCallback)((t=>{const n=(0,l.Gn)(y.Z6.usersEdit,{userId:t});e(n)}),[1,e,n]),G=(0,r.useCallback)((t=>{const r=n===x.K.OPERATOR?y.Z6.asCustomerUserView:y.Z6.usersView,s=(0,l.Gn)(r,{customerId:1,userId:t});e(s)}),[1,e,n]),U=e=>{N(e)},q=(0,r.useMemo)((()=>[{name:"id",label:t("table.id"),options:{customBodyRender:(e,n)=>{const r=w===e?(0,k.jsx)(O,{children:t("currentUser",{id:e})}):e;return(0,m.Fb)(r,n)}}},{name:"name",label:t("table.name"),options:{customBodyRender:m.Fb}},{name:"role",label:t("table.role"),options:{customBodyRender:m.Fb}},{name:"active_reservations",label:t("table.activeReservations"),options:{customBodyRender:m.h_}},{name:"actions",label:" ",options:{customBodyRender:(e,t)=>{let{rowData:n}=t;const r=M||"LINKED"!==(null===n||void 0===n?void 0:n[4])?{handleEdit:W}:{handleView:G};return(0,m.qR)({id:n[0],handleDelete:U,...r})},filter:!1,sort:!1,hideLabel:!0}}]),[W,G,M,t,w]);return(0,r.useEffect)((()=>{E(L)}),[E,L]),(0,r.useEffect)((()=>{var e;const t=null!==(e=P[v.rl.lastConnection])&&void 0!==e&&e.length?C.filter((e=>P[v.rl.lastConnection].filter((t=>v.KZ[t](e.last_login))).length)):C;B(t)}),[C,P,t]),(0,k.jsxs)("div",{"data-testid":"users-dashboard-page",children:[(0,k.jsx)(D.Z,{title:t("headerTitleName",{name:H})})," ",(0,k.jsxs)(i.Z,{sx:{p:6},children:[(0,k.jsxs)(o.Z,{alignItems:"center",display:"flex",justifyContent:"space-between",mb:2,width:"100%",children:[(0,k.jsx)(c.Z,{"data-testid":"count",variant:"h5",children:t("totalUsers",{count:S})}),(0,k.jsxs)(d.Z,{alignItems:"center",direction:"row",flexWrap:"wrap",justifyContent:"flex-end",spacing:2,useFlexGap:!0,children:[(0,k.jsx)(o.Z,{width:496,children:(0,k.jsx)(b.E,{disabled:R||T,searchOverFields:["name","id","oid"],setRows:E,tableRows:L,variant:"filled"})}),(0,k.jsx)(o.Z,{children:(0,k.jsx)(u.Z,{"data-testid":"add",disabled:R||T,onClick:K,size:"large",variant:"contained",children:(0,k.jsx)(c.Z,{variant:"subtitle",children:t("add")})})})]})]}),(0,k.jsx)(j.Z,{columns:q,data:F,"data-testid":"users-table",empty:!(null!==L&&void 0!==L&&L.length),error:T,isLoading:R,translationKey:"usersTable"})]}),(0,k.jsx)(I,{isOpen:!!Y,userId:Y}),(0,k.jsx)(ee,{drawer:(0,k.jsx)(J,{useHelpTranslation:f.oc})})]})}}}]);