"use strict";(self.webpackChunkpadel_app=self.webpackChunkpadel_app||[]).push([[9283],{3960:(e,t,l)=>{l.d(t,{u:()=>C});var s=l(47313),a=l(61113),n=l(9506),r=l(1550),i=l(23306),o=l(88797),d=l(49914),c=l(51405),u=l(71751),h=l(44758),p=l(83213),b=l(47131),x=l(15480),m=l(20619),v=l(46417);const C=e=>{let{selectedFilters:t,setSelectedFilters:l,values:C,name:E,tag:j,handleBlur:g,disabled:L,singleSelection:S=!1,optional:I=!1,selectionIcon:Z=!1,"data-testid":f,error:D,helperText:N}=e;const R=(0,s.useMemo)((()=>C.reduce(((e,t)=>{let{value:l,label:s}=t;return{...e,[l]:s}}),{})),[C]),y=(0,s.useCallback)((e=>{const t=Array.isArray(e)?e:[e];return(0,v.jsx)(a.Z,{"data-testid":"selection-text",style:{marginTop:10,marginRight:30,marginLeft:"-2px",textOverflow:"ellipsis",overflow:"hidden"},variant:"body2",children:t.map((e=>R[e])).join(", ")})}),[R]),A=(0,s.useCallback)((e=>{const{target:{value:t}}=e;l("string"===typeof t?t.split(","):t)}),[l]),k=(0,s.useCallback)((()=>{l([])}),[l]);return(0,v.jsxs)(r.Z,{"data-testid":f,disabled:L,error:!!D&&!N,fullWidth:!0,variant:"filled",children:[(0,v.jsx)(i.Z,{"data-testid":"tag",children:j}),(0,v.jsxs)(n.Z,{alignItems:"center",display:"flex",position:"relative",children:[(0,v.jsx)(o.Z,{IconComponent:e=>{var t;const l=null!==e&&void 0!==e&&null!==(t=e.className)&&void 0!==t&&t.includes("MuiSelect-iconOpen")?"chevron-up":"chevron-down";return(0,v.jsx)(n.Z,{mr:1,mt:1,children:(0,v.jsx)(m.Z,{color:"text.primary",children:l})})},"data-testid":"select",input:(0,v.jsx)(d.Z,{fullWidth:!0,label:j}),multiple:!S,name:E,notched:!1,onBlur:g,onChange:A,renderValue:y,value:t,children:C.map((e=>{let{label:l,value:s,disabled:a}=e;return(0,v.jsxs)(c.Z,{"data-testid":"multiple-selector-item",disabled:a,value:s,children:[Z&&(S?(0,v.jsx)(u.Z,{checked:t.indexOf(s)>-1}):(0,v.jsx)(h.Z,{checked:t.indexOf(s)>-1})),(0,v.jsx)(p.Z,{primary:l})]},s)}))}),!(null===t||void 0===t||!t.length)&&!I&&(0,v.jsx)(n.Z,{position:"absolute",style:{right:30},children:(0,v.jsx)(b.Z,{"data-testid":"multiple-selector-clear",onClick:k,size:"small",title:"Clear",children:(0,v.jsx)(m.Z,{color:"text.primary",children:"close"})})})]}),(0,v.jsx)(x.Z,{children:null!==D&&void 0!==D?D:N})]})};C.defaultProps={disabled:!1}},22719:(e,t,l)=>{l.d(t,{KZ:()=>r,rl:()=>i,s_:()=>s,wg:()=>o});const s={HOURLY:"HOURLY",DAILY:"DAILY",BIDAILY:"BIDAILY",WEEKLY:"WEEKLY",MONTHLY:"MONTHLY"},a={[s.DAILY]:24,[s.BIDAILY]:48,[s.WEEKLY]:168,[s.MONTHLY]:720},n=e=>{const t=new Date,l=new Date(t.setHours(t.getHours()-a[e]));return e=>new Date(e)>=l},r={[s.DAILY]:n(s.DAILY),[s.BIDAILY]:n(s.BIDAILY),[s.WEEKLY]:n(s.WEEKLY),[s.MONTHLY]:n(s.MONTHLY)},i={lastConnection:"lastConnnection",customerStatus:"customerStatus",alerts:"alerts",alertsError:"alertsError",network:"network",connectionStatus:"connectionStatus"},o=(i.customerStatus,i.alerts,i.customerStatus,i.alertsError,[i.lastConnection]);i.connectionStatus,i.network},26125:(e,t,l)=>{l.d(t,{Z:()=>c});var s=l(75192),a=l.n(s),n=l(47313),r=l(21429),i=l(68012),o=l(22719);const d=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];const t=(0,i.Qu)(),l=(0,n.useMemo)((()=>({[o.rl.lastConnection]:{key:o.rl.lastConnection,singleSelection:!0,title:t("lastConnection"),values:[{label:t("last24h"),value:o.s_.DAILY},{label:t("last48h"),value:o.s_.BIDAILY},{label:t("lastWeek"),value:o.s_.WEEKLY},{label:t("lastMonth"),value:o.s_.MONTHLY}]},[o.rl.alertsError]:{key:o.rl.alertsError,title:t("alerts"),disabled:!0,values:[]},[o.rl.alerts]:{key:o.rl.alerts,title:t("alerts"),values:[{label:t("critical"),value:r.fR.ERROR},{label:t("warning"),value:r.fR.WARNING},{label:t("noAlerts"),value:r.fR.OK}]},[o.rl.customerStatus]:{key:o.rl.customerStatus,singleSelection:!0,title:t("customerStatus"),values:[{label:t("active"),value:r.Gi.ACTIVE},{label:t("deploying"),value:r.Gi.DEPLOYING},{label:t("pending"),value:r.Gi.PENDING},{label:t("draft"),value:r.Gi.DRAFT}]},[o.rl.network]:{key:o.rl.network,title:t("connectionStatus"),values:[{label:t("allConnected"),value:r.cR.ALL_CONNECTED},{label:t("someConnected"),value:r.cR.SOME_CONNECTED},{label:t("allDisconnected"),value:r.cR.ALL_DISCONNECTED},{label:t("allSuspended"),value:r.cR.ALL_SUSPENDED}]},[o.rl.connectionStatus]:{key:o.rl.connectionStatus,title:t("connectionStatus"),values:[{label:t("connected"),value:r.cR.ALL_CONNECTED},{label:t("disconnected"),value:r.cR.ALL_DISCONNECTED},{label:t("suspended"),value:r.cR.ALL_SUSPENDED}]}})),[t]);return e.reduce(((e,t)=>[...e,l[t]]),[])};d.propTypes={requiredFilters:a().array};const c=d},21429:(e,t,l)=>{l.d(t,{Gi:()=>d,Hr:()=>r,cR:()=>c,fR:()=>o,pT:()=>n,zR:()=>i});const s="CRITICAL",a="WARNING",n="success",r="error",i={USER_PASS:"USER_PASS",MICROSOFT:"MICROSOFT"},o={WARNING:a,ERROR:s,OK:"OK"},d={PENDING:"PENDING",DEPLOYING:"DEPLOYING",ACTIVE:"ACTIVE",DRAFT:"DRAFT"},c={ALL_CONNECTED:"Connected",SOME_CONNECTED:"Some_Connected",ALL_DISCONNECTED:"Disconnected",ALL_SUSPENDED:"Suspended"}},9283:(e,t,l)=>{l.r(t),l.d(t,{default:()=>O});var s=l(47313),a=l(58467),n=l(294),r=l(97594),i=l(70501),o=l(9506),d=l(61113),c=l(63984),u=l(69099),h=l(29104),p=l(59863),b=l(14762),x=l(55162),m=l(22719),v=l(24064),C=l(47131),E=l(24631),j=l(43394),g=l(20737),L=l(64507),S=l(3960),I=l(61233),Z=l(20619),f=l(68012),D=l(46417);const N=e=>{let{filterGroups:t,getSelected:l=(()=>{}),filterInitialState:a,disabled:n}=e;const r=(0,f.Qu)(),[i,h]=(0,s.useState)(null),[p,b]=(0,s.useState)(a?[a]:[]),x=Boolean(i);(0,s.useEffect)((()=>{l(p)}),[l,p]);const m=(0,s.useCallback)((e=>{h(e.currentTarget.parentNode)}),[]),N=(0,s.useCallback)((()=>{h(null)}),[]),R=(0,s.useCallback)((()=>{b([])}),[]),y=(0,s.useCallback)(((e,t)=>{b((l=>e.length?{...l,[t]:e}:(delete l[t],{...l})))}),[]);return(0,D.jsxs)(o.Z,{children:[(0,D.jsx)(u.Z,{behaviour:"menu",color:"primary","data-testid":"filter-button",disabled:n,onClick:m,size:"large",startIcon:(0,D.jsx)(Z.Z,{color:"icon",variant:"filled",children:"controls"}),variant:"outlined",children:(0,D.jsxs)(d.Z,{color:"highlighted",noWrap:!0,children:[r("title")," (",Object.keys(p).length,")"]})}),(0,D.jsx)(o.Z,{alignItems:"flex-end",display:"flex",children:(0,D.jsx)(v.Z,{anchorEl:i,"data-testid":"filter-menu",onClose:N,open:x,children:(0,D.jsxs)(o.Z,{minWidth:348,p:2,pt:1,children:[(0,D.jsxs)(o.Z,{alignItems:"center",display:"flex",justifyContent:"space-between",mb:2,children:[(0,D.jsxs)(o.Z,{alignItems:"center",display:"flex",ml:1,children:[(0,D.jsx)(d.Z,{color:"text.secondary",mr:1,variant:"h4",children:r("title")}),(0,D.jsx)(u.Z,{"data-testid":"filters-reset",onClick:R,children:(0,D.jsx)(d.Z,{color:"highlighted",variant:"subtitle2",children:r("reset")})})]}),(0,D.jsx)(C.Z,{color:"secondary","data-testid":"filters-close",onClick:N,children:(0,D.jsx)(Z.Z,{color:"text.primary",children:"close"})})]}),(0,D.jsx)(c.Z,{spacing:1,children:t.map((e=>{var t;let{key:l,singleSelection:s=!1,title:a,values:n=[],disabled:r,type:i}=e;return"date-time-picker"===i?(0,D.jsx)(j._,{dateAdapter:L.H,children:(0,D.jsx)(g.x,{"data-testid":"date-time-picker",disabled:r,label:a,onChange:e=>y([(0,I.i)(e)],l),renderInput:e=>(0,D.jsx)(E.Z,{sx:{m:1,width:300},...e}),value:null!==(t=p[l])&&void 0!==t&&t.length?p[l][0]:null})},a):(0,D.jsx)(S.u,{"data-testid":"multiple-selector",disabled:r,optional:s,selectedFilters:p[l]||[],selectionIcon:!0,setSelectedFilters:e=>y(e,l),singleSelection:s,tag:a,values:n},a)}))})]})})})]})};var R=l(93397),y=l(67234),A=l(26125),k=l(65053);const O=()=>{const e=(0,f.vT)(),t=(0,A.Z)(m.wg),l=(0,f.K2)(),v=(0,a.s0)(),{customerId:C}=(0,r.v9)(p.jo),{data:{count:E="-",results:j}={},isLoading:g,error:L}=(0,h.xY)({params:{customer_id:C}}),[S,I]=(0,s.useState)({lastCon:[]}),[Z,O]=(0,s.useState)(),[T,Y]=(0,s.useState)([]),w=(0,s.useCallback)((e=>{const t=(0,n.Gn)(y.Z6.operatorsEdit,{id:e});v(t)}),[v]),_=(0,s.useCallback)((e=>{const t=(0,n.Gn)(y.Z6.operatorsView,{id:e});v(t)}),[v]),G=(0,s.useMemo)((()=>[{name:"id",label:e("table.id"),options:{customBodyRender:b.Fb}},{name:"id",label:e("table.id"),options:{customBodyRender:(t,l)=>{const s=C===t?(0,D.jsx)(CustomTrans,{children:e("currentUser",{id:t})}):t;return(0,b.Fb)(s,l)}}},{name:"name",label:e("table.name"),options:{customBodyRender:b.Fb}},{name:"role",label:e("table.role"),options:{customBodyRender:(e,t)=>(0,b.Fb)(l(e),t)}},{name:"actions",label:" ",options:{customBodyRender:(e,t)=>{let{rowData:l}=t;return(0,b.qR)({id:l[0],handleEdit:w,handleView:_})},filter:!1,sort:!1,hideLabel:!0}}]),[w,_,l,e]),F=(0,s.useCallback)((()=>v(y.Z6.operatorsAdd)),[v]);return(0,s.useEffect)((()=>{O(j)}),[j]),(0,s.useEffect)((()=>{var e;const t=null!==(e=S[m.rl.lastConnection])&&void 0!==e&&e.length?Z.filter((e=>S[m.rl.lastConnection].filter((t=>m.KZ[t](e.last_login))).length)):Z;Y(t)}),[Z,S,e]),(0,D.jsxs)("div",{"data-testid":"operator-dashboard-page",children:[(0,D.jsx)(k.Z,{title:e("headerTitle")}),(0,D.jsxs)(i.Z,{sx:{p:6},children:[(0,D.jsxs)(o.Z,{alignItems:"center",display:"flex",justifyContent:"space-between",mb:2,width:"100%",children:[(0,D.jsx)(d.Z,{"data-testid":"count",variant:"h5",children:e("totalUsers",{count:E})}),(0,D.jsxs)(c.Z,{alignItems:"center",direction:"row",flexWrap:"wrap",justifyContent:"flex-end",spacing:2,useFlexGap:!0,children:[(0,D.jsx)(o.Z,{children:(0,D.jsx)(N,{disabled:g||L,filterGroups:t,getSelected:I})}),(0,D.jsx)(o.Z,{width:496,children:(0,D.jsx)(R.E,{disabled:g||L,searchOverFields:["name","id","oid"],setRows:O,tableRows:j,variant:"filled"})}),(0,D.jsx)(o.Z,{children:(0,D.jsx)(u.Z,{"data-testid":"add",disabled:g||L,onClick:F,size:"large",variant:"contained",children:(0,D.jsx)(d.Z,{variant:"subtitle",children:e("add")})})})]})]}),(0,D.jsx)(x.Z,{columns:G,data:T,"data-testid":"users-table",empty:!(null!==j&&void 0!==j&&j.length),error:L,isLoading:g,translationKey:"usersTable"})]})]})}}}]);