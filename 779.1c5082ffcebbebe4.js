"use strict";(self.webpackChunkplayground=self.webpackChunkplayground||[]).push([[779],{8779:(L,h,p)=>{p.r(h),p.d(h,{OverlayModule:()=>S});var d=p(177),c=p(4341),a=p(3964),k=p(8287),f=p(1635),_=p(8359),e=p(4438);function C(i,r){if(1&i&&(e.j41(0,"blockquote"),e.EFF(1),e.k0s()),2&i){const n=e.XpG(2);e.R7$(),e.SpI(" closed ",n.result,"")}}function b(i,r){if(1&i){const n=e.RV6();e.qex(0),e.j41(1,"div",2),e.EFF(2),e.j41(3,"kal-input",3),e.mxI("ngModelChange",function(t){e.eBV(n);const s=e.XpG();return e.DH7(s.data.user.firstname,t)||(s.data.user.firstname=t),e.Njj(t)}),e.k0s(),e.j41(4,"kal-input",4),e.mxI("ngModelChange",function(t){e.eBV(n);const s=e.XpG();return e.DH7(s.data.user.lastname,t)||(s.data.user.lastname=t),e.Njj(t)}),e.k0s(),e.DNE(5,C,2,1,"blockquote",5),e.k0s(),e.j41(6,"div",6)(7,"kal-button",7),e.bIt("click",function(){e.eBV(n);const t=e.XpG();return e.Njj(t.openDialog())}),e.EFF(8),e.k0s(),e.j41(9,"kal-button",8),e.EFF(10,"Close"),e.k0s(),e.j41(11,"kal-button",9),e.bIt("click",function(){e.eBV(n);const t=e.XpG();return e.Njj(t.submitDialog())}),e.EFF(12,"Submit"),e.k0s()(),e.bVm()}if(2&i){const n=e.XpG();e.R7$(2),e.E5c(" Example Dialog for ",null==n.data?null:n.data.user.firstname," ",null==n.data?null:n.data.user.lastname," N\xb0",n.id," "),e.R7$(),e.R50("ngModel",n.data.user.firstname),e.R7$(),e.R50("ngModel",n.data.user.lastname),e.R7$(),e.Y8G("ngIf",n.result),e.R7$(3),e.SpI("Sub Dialog ",n.id+1,"")}}function F(i,r){if(1&i){const n=e.RV6();e.j41(0,"div",2),e.EFF(1," Do you confirm ? "),e.k0s(),e.j41(2,"div",6)(3,"kal-button",8),e.EFF(4,"No"),e.k0s(),e.j41(5,"kal-button",9),e.bIt("click",function(){e.eBV(n);const t=e.XpG();return e.Njj(t.submitDialog())}),e.EFF(6,"Yes"),e.k0s()()}}let M=0;class u{constructor(r,n,o){this.dialogRef=r,this.dialogService=n,this.data=o,this.id=M++,this.subscription=_.yU.EMPTY}submitDialog(){this.data.closed=this.id,this.dialogRef.close(this.data)}openDialog(){const r=new a.r7({id:"test",hasBackdrop:!0,data:{user:{firstname:"john",lastname:"doe"}}}),n=this.dialogService.open(u,r);this.subscription=n.afterClosed.subscribe(o=>{o&&(this.result=o.closed)})}onNoClick(){this.dialogRef.close()}ngOnDestroy(){}static{this.\u0275fac=function(n){return new(n||u)(e.rXU(a.iA),e.rXU(a.uf),e.rXU(a.rL))}}static{this.\u0275cmp=e.VBU({type:u,selectors:[["ng-component"]],decls:3,vars:2,consts:[["confirm",""],[4,"ngIf","ngIfElse"],["kalDialogContent",""],["label","firstname",3,"ngModelChange","ngModel"],["label","lastname",3,"ngModelChange","ngModel"],[4,"ngIf"],["kalDialogFooter",""],["kalTheme","secondary",3,"click"],["kalDialogClose","","kalTheme","tertiary"],["kalTheme","primary",3,"click"]],template:function(n,o){if(1&n&&e.DNE(0,b,13,7,"ng-container",1)(1,F,7,0,"ng-template",null,0,e.C5r),2&n){const t=e.sdS(2);e.Y8G("ngIf",!o.data.confirm)("ngIfElse",t)}},dependencies:[d.bT,c.BC,c.vS,a.MW,a.gV,a.cS,a.XB,a.Pz,a.hK],encapsulation:2})}}function v(i,r){if(1&i&&(e.j41(0,"div",6)(1,"div",7)(2,"span"),e.EFF(3,"result "),e.k0s(),e.j41(4,"span"),e.EFF(5),e.nI1(6,"json"),e.k0s()()()),2&i){const n=e.XpG();e.R7$(5),e.JRh(e.bMT(6,1,n.result))}}function j(i,r){if(1&i&&(e.j41(0,"div",6)(1,"div",7)(2,"span"),e.EFF(3,"result "),e.k0s(),e.j41(4,"span"),e.EFF(5),e.nI1(6,"json"),e.k0s()()()),2&i){const n=e.XpG();e.R7$(5),e.JRh(e.bMT(6,1,n.resultConfirm))}}(0,f.Cg)([(0,a.P4)()],u.prototype,"subscription",void 0);class m{constructor(r,n){this.dialogService=r,this.cdr=n,this.disableClose=!1,this.hasBackdrop=!0,this.subscriptionsList=[]}get config(){return{disableClose:this.disableClose,hasBackdrop:this.hasBackdrop}}openConfirmDialog(){const r=new a.r7({title:"Confirm deletion",...this.config,data:{confirm:!0}}),n=this.dialogService.open(u,r);this.subscriptionsList.push(n.afterClosed.subscribe(o=>{this.resultConfirm=o,this.cdr.markForCheck()}))}openDialog(){const r=new a.r7({title:"Modal's title",...this.config,data:{user:{firstname:"john",lastname:"doe"}}}),n=this.dialogService.open(u,r);this.subscriptionsList.push(n.afterClosed.subscribe(o=>{this.result=o,this.cdr.markForCheck()}))}ngOnDestroy(){}static{this.\u0275fac=function(n){return new(n||m)(e.rXU(a.uf),e.rXU(e.gRc))}}static{this.\u0275cmp=e.VBU({type:m,selectors:[["app-dialog"]],decls:16,vars:4,consts:[[1,"example"],["kalTheme","primary",3,"click"],["class","technical-value",4,"ngIf"],[1,"configurator"],["label","hasBackdrop",3,"ngModelChange","ngModel"],["label","disableClose",3,"ngModelChange","ngModel"],[1,"technical-value"],[1,"technical-value__item"]],template:function(n,o){1&n&&(e.j41(0,"h1"),e.EFF(1,"Dialog"),e.k0s(),e.j41(2,"div",0)(3,"article")(4,"kal-button",1),e.bIt("click",function(){return o.openDialog()}),e.EFF(5,"Open Dialog"),e.k0s(),e.DNE(6,v,7,3,"div",2),e.k0s(),e.j41(7,"article")(8,"kal-button",1),e.bIt("click",function(){return o.openConfirmDialog()}),e.EFF(9,"Open confirm Dialog"),e.k0s(),e.DNE(10,j,7,3,"div",2),e.k0s()(),e.j41(11,"div",3)(12,"kal-form-field")(13,"kal-checkbox",4),e.mxI("ngModelChange",function(s){return e.DH7(o.hasBackdrop,s)||(o.hasBackdrop=s),s}),e.k0s()(),e.j41(14,"kal-form-field")(15,"kal-checkbox",5),e.mxI("ngModelChange",function(s){return e.DH7(o.disableClose,s)||(o.disableClose=s),s}),e.k0s()()()),2&n&&(e.R7$(6),e.Y8G("ngIf",o.result),e.R7$(4),e.Y8G("ngIf",o.resultConfirm),e.R7$(3),e.R50("ngModel",o.hasBackdrop),e.R7$(2),e.R50("ngModel",o.disableClose))},dependencies:[d.bT,c.BC,c.vS,a.MW,a.Zc,a.ss,a.hK,d.TG],encapsulation:2,changeDetection:0})}}function R(i,r){if(1&i){const n=e.RV6();e.j41(0,"kal-option",13),e.bIt("selectionChange",function(t){e.eBV(n);const s=e.XpG();return e.Njj(s.selected(t))}),e.EFF(1),e.k0s()}if(2&i){const n=r.$implicit;e.R7$(),e.JRh(n)}}function y(i,r){1&i&&(e.j41(0,"h2"),e.EFF(1,"Lorem ipsum dolor sit amet"),e.k0s(),e.j41(2,"ul")(3,"li"),e.EFF(4,"consectetur adipisicing elit. "),e.k0s(),e.j41(5,"li"),e.EFF(6,"Ipsam minima neque pariatur placeat similique."),e.k0s()())}(0,f.Cg)([(0,a.P4)()],m.prototype,"subscriptionsList",void 0);const I=[{path:"dialog",component:m},{path:"loader",component:(()=>{class i{constructor(){this.reverse=!1,this.loading=!1,this.width=800,this.height=200,this.message="Chargement en cours"}static{this.\u0275fac=function(o){return new(o||i)}}static{this.\u0275cmp=e.VBU({type:i,selectors:[["app-loader"]],decls:26,vars:11,consts:[[1,"example"],[1,"divToLoad",3,"kalLoading","kalLoadingMessage","kalTheme"],[1,"configurator"],["label","Reverse",3,"ngModelChange","ngModel"],["label","text",3,"ngModelChange","ngModel"],["label","width","type","number",3,"ngModelChange","ngModel"],["label","height","type","number",3,"ngModelChange","ngModel"],[3,"click"]],template:function(o,t){1&o&&(e.j41(0,"h1"),e.EFF(1,"Loader"),e.k0s(),e.j41(2,"div",0)(3,"article")(4,"div",1)(5,"div")(6,"p"),e.EFF(7,"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!"),e.k0s(),e.nrm(8,"br"),e.j41(9,"p"),e.EFF(10,"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!"),e.k0s(),e.nrm(11,"br"),e.j41(12,"p"),e.EFF(13,"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus "),e.k0s()()()()(),e.j41(14,"div",2)(15,"kal-form-field")(16,"kal-checkbox",3),e.mxI("ngModelChange",function(l){return e.DH7(t.reverse,l)||(t.reverse=l),l}),e.k0s()(),e.j41(17,"kal-form-field")(18,"kal-input",4),e.mxI("ngModelChange",function(l){return e.DH7(t.message,l)||(t.message=l),l}),e.k0s()(),e.j41(19,"kal-form-field")(20,"kal-input",5),e.mxI("ngModelChange",function(l){return e.DH7(t.width,l)||(t.width=l),l}),e.k0s()(),e.j41(21,"kal-form-field")(22,"kal-input",6),e.mxI("ngModelChange",function(l){return e.DH7(t.height,l)||(t.height=l),l}),e.k0s()(),e.j41(23,"kal-form-field")(24,"kal-button",7),e.bIt("click",function(){return t.loading=!t.loading}),e.EFF(25,"toggle"),e.k0s()()()),2&o&&(e.R7$(4),e.xc7("width",t.width,"px")("height",t.height,"px"),e.Y8G("kalLoading",t.loading)("kalLoadingMessage",t.message)("kalTheme",t.reverse?"reverse":""),e.R7$(12),e.R50("ngModel",t.reverse),e.R7$(2),e.R50("ngModel",t.message),e.R7$(2),e.R50("ngModel",t.width),e.R7$(2),e.R50("ngModel",t.height))},dependencies:[c.BC,c.vS,a.MW,a.Zc,a.ss,a.gV,a.s0,a.hK],encapsulation:2,changeDetection:0})}}return i})()},{path:"menu",component:(()=>{class i{constructor(){this.themes=[],this.optionsList=["Option 1","Option 2","Option 3"]}get reverse(){return this.themes.some(n=>"reverse"===n)}updateOptions(){this.optionsList=["Option A","Option B","Option C"]}selected(n){console.log("selected",n)}ngOnInit(){}static{this.\u0275fac=function(o){return new(o||i)}}static{this.\u0275cmp=e.VBU({type:i,selectors:[["app-menu"]],decls:27,vars:7,consts:[["menu",""],[1,"example"],[3,"kalMenuTriggerFor","kalTheme"],[3,"kalTheme"],[3,"selectionChange",4,"ngFor","ngForOf"],[1,"configurator"],["label","themes","placeholder","pick themes","multiple","true",3,"ngModelChange","ngModel"],["value",""],["value","primary"],["value","secondary"],["value","tertiary"],["value","reverse"],[3,"click"],[3,"selectionChange"]],template:function(o,t){if(1&o){const s=e.RV6();e.j41(0,"h1"),e.EFF(1,"Menu"),e.k0s(),e.j41(2,"div",1)(3,"article")(4,"kal-button",2)(5,"kal-icon"),e.EFF(6,"add"),e.k0s(),e.EFF(7," Toggle button primary "),e.k0s(),e.j41(8,"kal-menu",3,0),e.DNE(10,R,2,1,"kal-option",4),e.k0s()()(),e.j41(11,"div",5)(12,"kal-form-field")(13,"kal-select",6),e.mxI("ngModelChange",function(g){return e.eBV(s),e.DH7(t.themes,g)||(t.themes=g),e.Njj(g)}),e.j41(14,"kal-option",7),e.EFF(15,"none"),e.k0s(),e.j41(16,"kal-option",8),e.EFF(17,"primary"),e.k0s(),e.j41(18,"kal-option",9),e.EFF(19,"secondary"),e.k0s(),e.j41(20,"kal-option",10),e.EFF(21,"tertiary"),e.k0s(),e.j41(22,"kal-option",11),e.EFF(23,"reverse"),e.k0s()()(),e.j41(24,"kal-form-field")(25,"kal-button",12),e.bIt("click",function(){return e.eBV(s),e.Njj(t.updateOptions())}),e.EFF(26,"Update option"),e.k0s()()()}if(2&o){const s=e.sdS(9);e.R7$(2),e.AVh("darkBg",t.reverse),e.R7$(2),e.Y8G("kalMenuTriggerFor",s)("kalTheme",t.themes),e.R7$(4),e.Y8G("kalTheme",t.themes),e.R7$(2),e.Y8G("ngForOf",t.optionsList),e.R7$(3),e.R50("ngModel",t.themes)}},dependencies:[d.Sq,c.BC,c.vS,a.qA,a.MW,a.ss,a.HR,a.SF,a.GC,a.fi,a.hK],encapsulation:2,changeDetection:0})}}return i})()},{path:"snackbar",component:(()=>{class i{constructor(n){this.snackbarService=n,this.title="user is saved !",this.actionLabel="cancel",this.duration=4}addSnackbar(){const n={title:this.title,duration:this.duration};this.actionLabel&&(n.action={callback:()=>{alert("clicked on action")},label:this.actionLabel}),this.snackbarService.open(n)}ngOnInit(){}static{this.\u0275fac=function(o){return new(o||i)(e.rXU(a.fW))}}static{this.\u0275cmp=e.VBU({type:i,selectors:[["app-snackbar"]],decls:12,vars:3,consts:[[1,"example"],["kalTheme","primary",3,"click"],[1,"configurator"],["label","title",3,"ngModelChange","ngModel"],["label","action label",3,"ngModelChange","ngModel"],["label","duration",3,"ngModelChange","ngModel"]],template:function(o,t){1&o&&(e.j41(0,"h1"),e.EFF(1,"Snackbar"),e.k0s(),e.j41(2,"div",0)(3,"kal-button",1),e.bIt("click",function(){return t.addSnackbar()}),e.EFF(4," display snackbar "),e.k0s()(),e.j41(5,"div",2)(6,"kal-form-field")(7,"kal-input",3),e.mxI("ngModelChange",function(l){return e.DH7(t.title,l)||(t.title=l),l}),e.k0s()(),e.j41(8,"kal-form-field")(9,"kal-input",4),e.mxI("ngModelChange",function(l){return e.DH7(t.actionLabel,l)||(t.actionLabel=l),l}),e.k0s()(),e.j41(10,"kal-form-field")(11,"kal-input",5),e.mxI("ngModelChange",function(l){return e.DH7(t.duration,l)||(t.duration=l),l}),e.k0s()()()),2&o&&(e.R7$(7),e.R50("ngModel",t.title),e.R7$(2),e.R50("ngModel",t.actionLabel),e.R7$(2),e.R50("ngModel",t.duration))},dependencies:[c.BC,c.vS,a.MW,a.ss,a.gV,a.hK],encapsulation:2,changeDetection:0})}}return i})()},{path:"tooltip",component:(()=>{class i{constructor(){}get hasReverse(){return!!this.themes&&void 0!==this.themes.find(n=>"reverse"===n)}ngOnInit(){}static{this.\u0275fac=function(o){return new(o||i)}}static{this.\u0275cmp=e.VBU({type:i,selectors:[["app-tooltip"]],decls:18,vars:6,consts:[[1,"example"],["kalTooltip","Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam minima neque pariatur placeat similique. ",3,"kalTheme"],["kalTooltip","",3,"kalTheme"],["kalTooltipContent",""],[1,"configurator"],["label","themes",3,"ngModelChange","multiple","ngModel"],["value",""],["value","primary"],["value","reverse"]],template:function(o,t){1&o&&(e.j41(0,"h1"),e.EFF(1,"Tooltip"),e.k0s(),e.j41(2,"div",0)(3,"article")(4,"kal-button",1),e.EFF(5,"Button with string tooltip"),e.k0s(),e.j41(6,"kal-button",2),e.DNE(7,y,7,0,"ng-template",3),e.EFF(8," Button with html tooltip "),e.k0s()()(),e.j41(9,"div",4)(10,"kal-form-field")(11,"kal-select",5),e.mxI("ngModelChange",function(l){return e.DH7(t.themes,l)||(t.themes=l),l}),e.j41(12,"kal-option",6),e.EFF(13,"default"),e.k0s(),e.j41(14,"kal-option",7),e.EFF(15,"primary"),e.k0s(),e.j41(16,"kal-option",8),e.EFF(17,"reverse"),e.k0s()()()()),2&o&&(e.R7$(2),e.AVh("reverse",t.hasReverse),e.R7$(2),e.Y8G("kalTheme",t.themes),e.R7$(2),e.Y8G("kalTheme",t.themes),e.R7$(5),e.Y8G("multiple",!0),e.R50("ngModel",t.themes))},dependencies:[c.BC,c.vS,a.MW,a.ss,a.HR,a.SF,a.xV,a.kd,a.hK],encapsulation:2,changeDetection:0})}}return i})()}];let B=(()=>{class i{static{this.\u0275fac=function(o){return new(o||i)}}static{this.\u0275mod=e.$C({type:i})}static{this.\u0275inj=e.G2t({imports:[k.iI.forChild(I),k.iI]})}}return i})(),S=(()=>{class i{static{this.\u0275fac=function(o){return new(o||i)}}static{this.\u0275mod=e.$C({type:i})}static{this.\u0275inj=e.G2t({imports:[d.MD,c.X1,c.YN,B,a.fX]})}}return i})()}}]);