(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{L9IV:function(e,t,n){"use strict";n.r(t),n.d(t,"OverlayModule",(function(){return Q}));var i=n("ofXK"),o=n("3Pt+"),a=n("jxDA"),l=n("tyNb"),c=n("mrSG"),r=n("quSY"),b=n("fXoL");function s(e,t){if(1&e&&(b.Qb(0,"blockquote"),b.vc(1),b.Pb()),2&e){var n=b.Zb(2);b.zb(1),b.xc(" closed ",n.result,"")}}function u(e,t){if(1&e){var n=b.Rb();b.Ob(0),b.Qb(1,"div",2),b.vc(2),b.Qb(3,"kal-input",3),b.Xb("ngModelChange",(function(e){return b.mc(n),b.Zb().data.user.firstname=e})),b.Pb(),b.Qb(4,"kal-input",4),b.Xb("ngModelChange",(function(e){return b.mc(n),b.Zb().data.user.lastname=e})),b.Pb(),b.tc(5,s,2,1,"blockquote",5),b.Pb(),b.Qb(6,"div",6),b.Qb(7,"kal-button",7),b.Xb("click",(function(){return b.mc(n),b.Zb().openDialog()})),b.vc(8),b.Pb(),b.Qb(9,"kal-button",8),b.vc(10,"Close"),b.Pb(),b.Qb(11,"kal-button",9),b.Xb("click",(function(){return b.mc(n),b.Zb().submitDialog()})),b.vc(12,"Submit"),b.Pb(),b.Pb(),b.Nb()}if(2&e){var i=b.Zb();b.zb(2),b.zc(" Example Dialog for ",null==i.data?null:i.data.user.firstname," ",null==i.data?null:i.data.user.lastname," N\xb0",i.id," "),b.zb(1),b.ec("ngModel",i.data.user.firstname),b.zb(1),b.ec("ngModel",i.data.user.lastname),b.zb(1),b.ec("ngIf",i.result),b.zb(3),b.xc("Sub Dialog ",i.id+1,"")}}function d(e,t){if(1&e){var n=b.Rb();b.Qb(0,"div",2),b.vc(1," Do you confirm ? "),b.Pb(),b.Qb(2,"div",6),b.Qb(3,"kal-button",8),b.vc(4,"No"),b.Pb(),b.Qb(5,"kal-button",9),b.Xb("click",(function(){return b.mc(n),b.Zb().submitDialog()})),b.vc(6,"Yes"),b.Pb(),b.Pb()}}var p=0,f=function(){function e(e,t,n){this.dialogRef=e,this.dialogService=t,this.data=n,this.id=p++,this.subscription=r.a.EMPTY}return e.prototype.submitDialog=function(){this.data.closed=this.id,this.dialogRef.close(this.data)},e.prototype.openDialog=function(){var t=this,n=new a.w({id:"test",hasBackdrop:!0,data:{user:{firstname:"john",lastname:"doe"}}}),i=this.dialogService.open(e,n);this.subscription=i.afterClosed.subscribe((function(e){e&&(t.result=e.closed)}))},e.prototype.onNoClick=function(){this.dialogRef.close()},e.prototype.ngOnDestroy=function(){},e.\u0275fac=function(t){return new(t||e)(b.Kb(a.z),b.Kb(a.A),b.Kb(a.b))},e.\u0275cmp=b.Eb({type:e,selectors:[["ng-component"]],decls:3,vars:2,consts:[[4,"ngIf","ngIfElse"],["confirm",""],["kalDialogContent",""],["label","firstname",3,"ngModel","ngModelChange"],["label","lastname",3,"ngModel","ngModelChange"],[4,"ngIf"],["kalDialogFooter",""],["kalTheme","secondary",3,"click"],["kalDialogClose","","kalTheme","tertiary"],["kalTheme","primary",3,"click"]],template:function(e,t){if(1&e&&(b.tc(0,u,13,7,"ng-container",0),b.tc(1,d,7,0,"ng-template",null,1,b.uc)),2&e){var n=b.kc(2);b.ec("ngIf",!t.data.confirm)("ngIfElse",n)}},directives:[i.l,a.x,a.K,o.l,o.n,a.y,a.h,a.hb,a.v],encapsulation:2}),Object(c.b)([Object(a.a)(),Object(c.c)("design:type",Object)],e.prototype,"subscription",void 0),e}();function g(e,t){if(1&e&&(b.Qb(0,"div",6),b.Qb(1,"div",7),b.Qb(2,"span"),b.vc(3,"result "),b.Pb(),b.Qb(4,"span"),b.vc(5),b.ac(6,"json"),b.Pb(),b.Pb(),b.Pb()),2&e){var n=b.Zb();b.zb(5),b.wc(b.bc(6,1,n.result))}}function h(e,t){if(1&e&&(b.Qb(0,"div",6),b.Qb(1,"div",7),b.Qb(2,"span"),b.vc(3,"result "),b.Pb(),b.Qb(4,"span"),b.vc(5),b.ac(6,"json"),b.Pb(),b.Pb(),b.Pb()),2&e){var n=b.Zb();b.zb(5),b.wc(b.bc(6,1,n.resultConfirm))}}function m(e,t){if(1&e){var n=b.Rb();b.Qb(0,"kal-option",13),b.Xb("selectionChange",(function(e){return b.mc(n),b.Zb().selected(e)})),b.vc(1),b.Pb()}if(2&e){var i=t.$implicit;b.zb(1),b.wc(i)}}function v(e,t){1&e&&(b.Qb(0,"h2"),b.vc(1,"Lorem ipsum dolor sit amet"),b.Pb(),b.Qb(2,"ul"),b.Qb(3,"li"),b.vc(4,"consectetur adipisicing elit. "),b.Pb(),b.Qb(5,"li"),b.vc(6,"Ipsam minima neque pariatur placeat similique."),b.Pb(),b.Pb())}var k=[{path:"dialog",component:function(){function e(e,t){this.dialogService=e,this.cdr=t,this.disableClose=!1,this.hasBackdrop=!0,this.subscriptionsList=[]}return Object.defineProperty(e.prototype,"config",{get:function(){return{disableClose:this.disableClose,hasBackdrop:this.hasBackdrop}},enumerable:!1,configurable:!0}),e.prototype.openConfirmDialog=function(){var e=this,t=new a.w(Object(c.a)(Object(c.a)({title:"Confirm deletion"},this.config),{data:{confirm:!0}})),n=this.dialogService.open(f,t);this.subscriptionsList.push(n.afterClosed.subscribe((function(t){e.resultConfirm=t,e.cdr.markForCheck()})))},e.prototype.openDialog=function(){var e=this,t=new a.w(Object(c.a)(Object(c.a)({title:"Modal's title"},this.config),{data:{user:{firstname:"john",lastname:"doe"}}})),n=this.dialogService.open(f,t);this.subscriptionsList.push(n.afterClosed.subscribe((function(t){e.result=t,e.cdr.markForCheck()})))},e.prototype.ngOnDestroy=function(){},e.\u0275fac=function(t){return new(t||e)(b.Kb(a.A),b.Kb(b.h))},e.\u0275cmp=b.Eb({type:e,selectors:[["app-dialog"]],decls:16,vars:4,consts:[[1,"example"],["kalTheme","primary",3,"click"],["class","technical-value",4,"ngIf"],[1,"configurator"],["label","hasBackdrop",3,"ngModel","ngModelChange"],["label","disableClose",3,"ngModel","ngModelChange"],[1,"technical-value"],[1,"technical-value__item"]],template:function(e,t){1&e&&(b.Qb(0,"h1"),b.vc(1,"Dialog"),b.Pb(),b.Qb(2,"div",0),b.Qb(3,"article"),b.Qb(4,"kal-button",1),b.Xb("click",(function(){return t.openDialog()})),b.vc(5,"Open Dialog"),b.Pb(),b.tc(6,g,7,3,"div",2),b.Pb(),b.Qb(7,"article"),b.Qb(8,"kal-button",1),b.Xb("click",(function(){return t.openConfirmDialog()})),b.vc(9,"Open confirm Dialog"),b.Pb(),b.tc(10,h,7,3,"div",2),b.Pb(),b.Pb(),b.Qb(11,"div",3),b.Qb(12,"kal-form-field"),b.Qb(13,"kal-checkbox",4),b.Xb("ngModelChange",(function(e){return t.hasBackdrop=e})),b.Pb(),b.Pb(),b.Qb(14,"kal-form-field"),b.Qb(15,"kal-checkbox",5),b.Xb("ngModelChange",(function(e){return t.disableClose=e})),b.Pb(),b.Pb(),b.Pb()),2&e&&(b.zb(6),b.ec("ngIf",t.result),b.zb(4),b.ec("ngIf",t.resultConfirm),b.zb(3),b.ec("ngModel",t.hasBackdrop),b.zb(2),b.ec("ngModel",t.disableClose))},directives:[a.h,a.hb,i.l,a.H,a.r,o.l,o.n],pipes:[i.e],styles:[""],encapsulation:2,changeDetection:0}),Object(c.b)([Object(a.a)(),Object(c.c)("design:type",Array)],e.prototype,"subscriptionsList",void 0),e}()},{path:"loader",component:function(){function e(){this.reverse=!1,this.loading=!1,this.width=800,this.height=200,this.message="Chargement en cours"}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=b.Eb({type:e,selectors:[["app-loader"]],decls:26,vars:11,consts:[[1,"example"],[1,"divToLoad",3,"kalLoading","kalLoadingMessage","kalTheme"],[1,"configurator"],["label","Reverse",3,"ngModel","ngModelChange"],["label","text",3,"ngModel","ngModelChange"],["label","width","type","number",3,"ngModel","ngModelChange"],["label","height","type","number",3,"ngModel","ngModelChange"],[3,"click"]],template:function(e,t){1&e&&(b.Qb(0,"h1"),b.vc(1,"Loader"),b.Pb(),b.Qb(2,"div",0),b.Qb(3,"article"),b.Qb(4,"div",1),b.Qb(5,"div"),b.Qb(6,"p"),b.vc(7,"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!"),b.Pb(),b.Lb(8,"br"),b.Qb(9,"p"),b.vc(10,"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!"),b.Pb(),b.Lb(11,"br"),b.Qb(12,"p"),b.vc(13,"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus "),b.Pb(),b.Pb(),b.Pb(),b.Pb(),b.Pb(),b.Qb(14,"div",2),b.Qb(15,"kal-form-field"),b.Qb(16,"kal-checkbox",3),b.Xb("ngModelChange",(function(e){return t.reverse=e})),b.Pb(),b.Pb(),b.Qb(17,"kal-form-field"),b.Qb(18,"kal-input",4),b.Xb("ngModelChange",(function(e){return t.message=e})),b.Pb(),b.Pb(),b.Qb(19,"kal-form-field"),b.Qb(20,"kal-input",5),b.Xb("ngModelChange",(function(e){return t.width=e})),b.Pb(),b.Pb(),b.Qb(21,"kal-form-field"),b.Qb(22,"kal-input",6),b.Xb("ngModelChange",(function(e){return t.height=e})),b.Pb(),b.Pb(),b.Qb(23,"kal-form-field"),b.Qb(24,"kal-button",7),b.Xb("click",(function(){return t.loading=!t.loading})),b.vc(25,"toggle"),b.Pb(),b.Pb(),b.Pb()),2&e&&(b.zb(4),b.rc("width",t.width,"px")("height",t.height,"px"),b.ec("kalLoading",t.loading)("kalLoadingMessage",t.message)("kalTheme",t.reverse?"reverse":""),b.zb(12),b.ec("ngModel",t.reverse),b.zb(2),b.ec("ngModel",t.message),b.zb(2),b.ec("ngModel",t.width),b.zb(2),b.ec("ngModel",t.height))},directives:[a.N,a.hb,a.H,a.r,o.l,o.n,a.K,a.h],styles:[""],encapsulation:2,changeDetection:0}),e}()},{path:"menu",component:function(){function e(){this.themes=[],this.optionsList=["Option 1","Option 2","Option 3"]}return Object.defineProperty(e.prototype,"reverse",{get:function(){return this.themes.some((function(e){return"reverse"===e}))},enumerable:!1,configurable:!0}),e.prototype.updateOptions=function(){this.optionsList=["Option A","Option B","Option C"]},e.prototype.selected=function(e){console.log("selected",e)},e.prototype.ngOnInit=function(){},e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=b.Eb({type:e,selectors:[["app-menu"]],decls:27,vars:7,consts:[[1,"example"],[3,"kalMenuTriggerFor","kalTheme"],[3,"kalTheme"],["menu",""],[3,"selectionChange",4,"ngFor","ngForOf"],[1,"configurator"],["label","themes","placeholder","pick themes","multiple","true",3,"ngModel","ngModelChange"],["value",""],["value","primary"],["value","secondary"],["value","tertiary"],["value","reverse"],[3,"click"],[3,"selectionChange"]],template:function(e,t){if(1&e&&(b.Qb(0,"h1"),b.vc(1,"Menu"),b.Pb(),b.Qb(2,"div",0),b.Qb(3,"article"),b.Qb(4,"kal-button",1),b.Qb(5,"kal-icon"),b.vc(6,"add"),b.Pb(),b.vc(7," Toggle button primary "),b.Pb(),b.Qb(8,"kal-menu",2,3),b.tc(10,m,2,1,"kal-option",4),b.Pb(),b.Pb(),b.Pb(),b.Qb(11,"div",5),b.Qb(12,"kal-form-field"),b.Qb(13,"kal-select",6),b.Xb("ngModelChange",(function(e){return t.themes=e})),b.Qb(14,"kal-option",7),b.vc(15,"none"),b.Pb(),b.Qb(16,"kal-option",8),b.vc(17,"primary"),b.Pb(),b.Qb(18,"kal-option",9),b.vc(19,"secondary"),b.Pb(),b.Qb(20,"kal-option",10),b.vc(21,"tertiary"),b.Pb(),b.Qb(22,"kal-option",11),b.vc(23,"reverse"),b.Pb(),b.Pb(),b.Pb(),b.Qb(24,"kal-form-field"),b.Qb(25,"kal-button",12),b.Xb("click",(function(){return t.updateOptions()})),b.vc(26,"Update option"),b.Pb(),b.Pb(),b.Pb()),2&e){var n=b.kc(9);b.zb(2),b.Cb("darkBg",t.reverse),b.zb(2),b.ec("kalMenuTriggerFor",n)("kalTheme",t.themes),b.zb(4),b.ec("kalTheme",t.themes),b.zb(2),b.ec("ngForOf",t.optionsList),b.zb(3),b.ec("ngModel",t.themes)}},directives:[a.h,a.P,a.hb,a.J,a.O,i.k,a.H,a.W,o.l,o.n,a.R],styles:[""],encapsulation:2,changeDetection:0}),e}()},{path:"snackbar",component:function(){function e(e){this.snackbarService=e,this.title="user is saved !",this.actionLabel="cancel",this.duration=4}return e.prototype.addSnackbar=function(){var e={title:this.title,duration:this.duration};this.actionLabel&&(e.action={callback:function(){alert("clicked on action")},label:this.actionLabel}),this.snackbarService.open(e)},e.prototype.ngOnInit=function(){},e.\u0275fac=function(t){return new(t||e)(b.Kb(a.Z))},e.\u0275cmp=b.Eb({type:e,selectors:[["app-snackbar"]],decls:12,vars:3,consts:[[1,"example"],["kalTheme","primary",3,"click"],[1,"configurator"],["label","title",3,"ngModel","ngModelChange"],["label","action label",3,"ngModel","ngModelChange"],["label","duration",3,"ngModel","ngModelChange"]],template:function(e,t){1&e&&(b.Qb(0,"h1"),b.vc(1,"Snackbar"),b.Pb(),b.Qb(2,"div",0),b.Qb(3,"kal-button",1),b.Xb("click",(function(){return t.addSnackbar()})),b.vc(4," display snackbar "),b.Pb(),b.Pb(),b.Qb(5,"div",2),b.Qb(6,"kal-form-field"),b.Qb(7,"kal-input",3),b.Xb("ngModelChange",(function(e){return t.title=e})),b.Pb(),b.Pb(),b.Qb(8,"kal-form-field"),b.Qb(9,"kal-input",4),b.Xb("ngModelChange",(function(e){return t.actionLabel=e})),b.Pb(),b.Pb(),b.Qb(10,"kal-form-field"),b.Qb(11,"kal-input",5),b.Xb("ngModelChange",(function(e){return t.duration=e})),b.Pb(),b.Pb(),b.Pb()),2&e&&(b.zb(7),b.ec("ngModel",t.title),b.zb(2),b.ec("ngModel",t.actionLabel),b.zb(2),b.ec("ngModel",t.duration))},directives:[a.h,a.hb,a.H,a.K,o.l,o.n],styles:[""],encapsulation:2,changeDetection:0}),e}()},{path:"tooltip",component:function(){function e(){}return Object.defineProperty(e.prototype,"hasReverse",{get:function(){return!!this.themes&&void 0!==this.themes.find((function(e){return"reverse"===e}))},enumerable:!1,configurable:!0}),e.prototype.ngOnInit=function(){},e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=b.Eb({type:e,selectors:[["app-tooltip"]],decls:18,vars:6,consts:[[1,"example"],["kalTooltip","Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam minima neque pariatur placeat similique. ",3,"kalTheme"],["kalTooltip","",3,"kalTheme"],["kalTooltipContent",""],[1,"configurator"],["label","themes",3,"multiple","ngModel","ngModelChange"],["value",""],["value","primary"],["value","reverse"]],template:function(e,t){1&e&&(b.Qb(0,"h1"),b.vc(1,"Tooltip"),b.Pb(),b.Qb(2,"div",0),b.Qb(3,"article"),b.Qb(4,"kal-button",1),b.vc(5,"Button with string tooltip"),b.Pb(),b.Qb(6,"kal-button",2),b.tc(7,v,7,0,"ng-template",3),b.vc(8," Button with html tooltip "),b.Pb(),b.Pb(),b.Pb(),b.Qb(9,"div",4),b.Qb(10,"kal-form-field"),b.Qb(11,"kal-select",5),b.Xb("ngModelChange",(function(e){return t.themes=e})),b.Qb(12,"kal-option",6),b.vc(13,"default"),b.Pb(),b.Qb(14,"kal-option",7),b.vc(15,"primary"),b.Pb(),b.Qb(16,"kal-option",8),b.vc(17,"reverse"),b.Pb(),b.Pb(),b.Pb(),b.Pb()),2&e&&(b.zb(2),b.Cb("reverse",t.hasReverse),b.zb(2),b.ec("kalTheme",t.themes),b.zb(2),b.ec("kalTheme",t.themes),b.zb(5),b.ec("multiple",!0)("ngModel",t.themes))},directives:[a.h,a.jb,a.hb,a.ib,a.H,a.W,o.l,o.n,a.R],styles:[""],encapsulation:2,changeDetection:0}),e}()}],P=function(){function e(){}return e.\u0275mod=b.Ib({type:e}),e.\u0275inj=b.Hb({factory:function(t){return new(t||e)},imports:[[l.c.forChild(k)],l.c]}),e}(),Q=function(){function e(){}return e.\u0275mod=b.Ib({type:e}),e.\u0275inj=b.Hb({factory:function(t){return new(t||e)},imports:[[i.b,o.o,o.h,P,a.rb]]}),e}()}}]);