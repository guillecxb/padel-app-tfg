"use strict";(self.webpackChunkpadel_app=self.webpackChunkpadel_app||[]).push([[6673],{96637:(e,a,t)=>{t.d(a,{FH:()=>l,HJ:()=>i,Zp:()=>r});const s=(e,a,t,s)=>()=>{return r=e(a,{field:t,...s}),"".concat(r);var r},r=(e,a,t)=>s(e,"validations.field-required",a,t),i=(e,a,t)=>s(e,"validations.field-already-taken",a,t),l=(e,a,t)=>s(e,"validations.field-email-invalid",a,t)},36673:(e,a,t)=>{t.r(a),t.d(a,{default:()=>Z});var s=t(47313),r=t(3463),i=t(58467),l=t(9506),n=t(70501),d=t(63984),o=t(69099),c=t(29104),u=t(67234),p=t(46400),m=t(96637),h=t(68012),x=t(46417);const Z=()=>{const e=(0,i.s0)(),a=(0,h.AK)(),t=(0,h.Am)(),[Z]=(0,c.ny)(),f=(0,s.useMemo)((()=>r.Ry().shape({name:r.Z_().required((0,m.Zp)(t,a("validations.name"))),password:r.Z_().required((0,m.Zp)(t,a("validations.password"))),role:r.Z_().required((0,m.Zp)(t,a("validations.role")))})),[a,t]),b=(0,s.useMemo)((()=>({name:"",password:"",role:""})),[]),k=(0,s.useMemo)((()=>[{key:"customer",value:"customer",label:a("fields.customer")},{key:"operator",value:"operator",label:a("fields.operator")}]),[a]),w=(0,s.useCallback)((async e=>{try{await Z(e).unwrap()}catch(a){throw a}return!0}),[Z]),v=(0,s.useCallback)((()=>{e(u.Z6.home)}),[e]);return(0,x.jsx)(p.Z,{entity:b,errorOn:"snackbar",onSubmit:w,onSubmitSuccess:v,snackbarTranslationParams:e=>{let{name:a}=e;return{user:a}},successOn:"snackbar",translationKey:"userAdd",validation:f,children:(0,x.jsxs)(l.Z,{sx:{padding:2,maxWidth:"75%",margin:"0 auto",width:"100%"},children:[(0,x.jsx)(n.Z,{sx:{padding:4},children:(0,x.jsx)(p.Z.LayoutBlock,{subtitle:a("createSubtitle"),title:a("createUser"),children:(0,x.jsxs)(d.Z,{alignItems:"flex-start",direction:"column",spacing:2,children:[(0,x.jsx)(p.Z.TextField,{"data-testid":"name",fullWidth:!0,id:"name",inputProps:{maxLength:255},label:a("fields.name"),name:"name",type:"text"}),(0,x.jsx)(p.Z.TextField,{"data-testid":"password",fullWidth:!0,id:"password",inputProps:{maxLength:255},label:a("fields.password"),name:"password",type:"password"}),(0,x.jsx)(p.Z.Select,{"data-testid":"role",id:"role",name:"role",tag:a("fields.role"),values:k,helperText:a("fields.roleHelperText")})]})})}),(0,x.jsxs)(d.Z,{direction:"row",justifyContent:"flex-end",mt:2,pb:2,spacing:2,children:[(0,x.jsx)(p.Z.DataBlock,{children:t=>{let{isSubmitting:s}=t;return(0,x.jsx)(o.Z,{color:"primary","data-testid":"form-actions-cancel",disabled:s,onClick:()=>e(u.Z6.home),size:"large",variant:"outlined",children:a("cancel")})}}),(0,x.jsx)(p.Z.SubmitButton,{"data-testid":"form-actions-send",size:"large",children:a("create")})]})]})})}}}]);