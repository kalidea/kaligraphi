(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{J5zi:function(e,t,n){"use strict";n.r(t),n.d(t,"LayoutModule",(function(){return _}));var i=n("ofXK"),o=n("3Pt+"),l=n("jxDA"),a=n("tyNb"),c=n("mrSG"),r=n("LRne"),s=n("2Vo4"),b=Math.ceil,u=Math.max,d=n("YHEm"),p=n("5WsY"),h=n("cSlR"),f=n("IzLi"),m=n("ywm8"),g=n("vkgz"),k=n("IzEk"),C=n("fXoL");function A(e,t){1&e&&C.uc(0),2&e&&C.wc(" ",t.item.name," ")}var O=function(){function e(){this.items=[],this.dataSource=new v,this.groupByFunction=null,this.disableRowsFunction=null,this.selectionMode="single",this.listSelection=null,this.virtualScrollConfig={itemSize:48},this.icon="keyboard_arrow_right",this.selectRowOnContentClick=!1,this.highlightedItem=null}return e.prototype.selectRow=function(e){this.listSelection=e},e.prototype.highlightItem=function(e){this.highlightedItem=e},e.prototype.changeDataSource=function(){var e,t,n;this.virtualScrollConfig=null,this.dataSource=(e=1,t=2e4,n&&"number"!=typeof n&&function(e,t,n){if(!Object(f.a)(n))return!1;var i=typeof t;return!!("number"==i?Object(p.a)(n)&&Object(h.a)(t,n.length):"string"==i&&t in n)&&Object(d.a)(n[t],e)}(e,t,n)&&(t=n=void 0),e=Object(m.a)(e),void 0===t?(t=e,e=0):t=Object(m.a)(t),function(e,t,n,i){for(var o=-1,l=u(b((t-e)/(n||1)),0),a=Array(l);l--;)a[++o]=e,e+=n;return a}(e,t,n=void 0===n?e<t?1:-1:Object(m.a)(n))).map((function(e){return{id:""+e,name:(4!==e?"aTest":"bTest")+e,disabled:1===e}})),this.listSelection=new l.X({numberOfItems:this.dataSource.length})},e.prototype.addGroupByFunction=function(){this.groupByFunction=this.groupByFunction?null:function(e){return e.name.charAt(0).toLocaleUpperCase()}},e.prototype.disableRow=function(){this.disableRowsFunction=this.disableRowsFunction?null:function(e){return e.disabled}},e.prototype.selectAll=function(){this.listSelection&&this.listSelection.format().all?this.kalListComponent.clear():this.kalListComponent.selectAll()},e.prototype.selectMultipleRows=function(){this.icon="keyboard_arrow_right",this.selectionMode="multiple",this.listSelection.clear()},e.prototype.unselectRows=function(){this.icon=null,this.selectionMode="none",this.listSelection.clear()},e.prototype.selectSingleRow=function(){this.icon="keyboard_arrow_right",this.selectionMode=null,this.listSelection.clear()},e.prototype.changeSelection=function(){this.listSelection=new l.X({added:[{id:"1"}],all:!1})},e.prototype.ngOnInit=function(){this.selectionMode="multiple",this.listSelection=new l.X({added:[{id:"1"},{id:"2"}],all:!1})},e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=C.Db({type:e,selectors:[["app-list"]],viewQuery:function(e,t){var n;1&e&&C.pc(l.L,!0),2&e&&C.ic(n=C.Xb())&&(t.kalListComponent=n.first)},decls:38,vars:16,consts:[[1,"example"],["tabindex","1",3,"icon","selection","dataSource","groupByFunction","disableRowsFunction","selectionMode","virtualScrollConfig","selectRowOnContentClick","selectionChange","highlighted"],["kalListItem",""],[1,"technical-value"],[1,"technical-value__item"],[1,"configurator"],["type","button","kalTheme","secondary",3,"click"]],template:function(e,t){1&e&&(C.Pb(0,"h1"),C.uc(1,"List"),C.Ob(),C.Pb(2,"div",0),C.Pb(3,"article"),C.Pb(4,"kal-list",1),C.Wb("selectionChange",(function(e){return t.selectRow(e)}))("highlighted",(function(e){return t.highlightItem(e)})),C.sc(5,A,1,1,"ng-template",2),C.Ob(),C.Pb(6,"div",3),C.Pb(7,"div",4),C.Pb(8,"span"),C.uc(9,"Selected value"),C.Ob(),C.Pb(10,"span"),C.uc(11),C.Zb(12,"json"),C.Ob(),C.Ob(),C.Pb(13,"div",4),C.Pb(14,"span"),C.uc(15,"highlighted value"),C.Ob(),C.Pb(16,"span"),C.uc(17),C.Zb(18,"json"),C.Ob(),C.Ob(),C.Ob(),C.Ob(),C.Ob(),C.Pb(19,"div",5),C.Pb(20,"kal-button",6),C.Wb("click",(function(){return t.addGroupByFunction()})),C.uc(21,"Group items"),C.Ob(),C.Pb(22,"kal-button",6),C.Wb("click",(function(){return t.disableRow()})),C.uc(23,"Disable rows"),C.Ob(),C.Pb(24,"kal-button",6),C.Wb("click",(function(){return t.unselectRows()})),C.uc(25,"Unselectable rows"),C.Ob(),C.Pb(26,"kal-button",6),C.Wb("click",(function(){return t.selectSingleRow()})),C.uc(27,"Single selectable row"),C.Ob(),C.Pb(28,"kal-button",6),C.Wb("click",(function(){return t.selectMultipleRows()})),C.uc(29,"Multiple selectable rows"),C.Ob(),C.Pb(30,"kal-button",6),C.Wb("click",(function(){return t.selectAll()})),C.uc(31,"Select All rows"),C.Ob(),C.Pb(32,"kal-button",6),C.Wb("click",(function(){return t.changeSelection()})),C.uc(33,"Select first item"),C.Ob(),C.Pb(34,"kal-button",6),C.Wb("click",(function(){return t.changeDataSource()})),C.uc(35,"Change DataSource"),C.Ob(),C.Pb(36,"kal-button",6),C.Wb("click",(function(){return t.selectRowOnContentClick=!t.selectRowOnContentClick})),C.uc(37,"Select row on content click "),C.Ob(),C.Ob()),2&e&&(C.zb(4),C.Bb("has-selected-element",t.listSelection&&t.listSelection.total>0),C.dc("icon",t.icon)("selection",t.listSelection)("dataSource",t.dataSource)("groupByFunction",t.groupByFunction)("disableRowsFunction",t.disableRowsFunction)("selectionMode",t.selectionMode)("virtualScrollConfig",t.virtualScrollConfig)("selectRowOnContentClick",t.selectRowOnContentClick),C.zb(7),C.vc(C.ac(12,12,t.listSelection.format())),C.zb(6),C.vc(C.ac(18,14,t.highlightedItem)))},directives:[l.L,l.M,l.h,l.ib],pipes:[i.e],styles:[""],encapsulation:2,changeDetection:0}),e}(),v=function(){function e(){this.subscriptionsList=[],this.datastream=new s.a([]),this.total=new s.a(0),this.page=1,this.countElement=500,this._cachedData=[],this.subscriptionsList.push(this.changePage().subscribe())}return Object.defineProperty(e.prototype,"cachedData",{get:function(){return this._cachedData},set:function(e){var t;(t=this._cachedData).push.apply(t,Object(c.d)(e)),this.datastream.next(this._cachedData)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"displayedElement",{get:function(){return this.page*this.countElement},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"list",{get:function(){return function(e,t){for(var n=[],i=(e-1)*t+1,o=Math.min(1e3,e*t),l=i;l<=o;l++)n.push({id:""+l,name:"rTest"+l,disabled:1===l});return Object(r.a)({data:n,meta:{total:1e3}})}(this.page,this.countElement)},enumerable:!1,configurable:!0}),e.prototype.connect=function(e){var t=this;return this.subscriptionsList.push(e.viewChange.pipe(Object(g.a)((function(e){e.end>=t.displayedElement&&t.cachedData.length<=t.total.getValue()&&(t.page+=1,t.subscriptionsList.push(t.changePage().subscribe()))}))).subscribe()),this.datastream},e.prototype.changePage=function(){var e=this;return this.list.pipe(Object(k.a)(1),Object(g.a)((function(t){var n=t.meta;e.cachedData=t.data,e.total.next(n.total)})))},e.prototype.disconnect=function(e){this.subscriptionsList.forEach((function(e){e&&e.unsubscribe()}))},e}(),P=function(){function e(){}return e.prototype.ngOnInit=function(){this.items=[{label:"home",route:""},{label:"activity",route:""},{label:"calendar",route:""},{label:"contact",route:""}]},e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=C.Db({type:e,selectors:[["app-menu"]],decls:5,vars:1,consts:[[1,"example"],[3,"items"],[1,"configurator"]],template:function(e,t){1&e&&(C.Pb(0,"h1"),C.uc(1,"Nav"),C.Ob(),C.Pb(2,"div",0),C.Kb(3,"kal-nav",1),C.Ob(),C.Kb(4,"div",2)),2&e&&(C.zb(3),C.dc("items",t.items))},directives:[l.Q],styles:["kal-nav{height:auto}"],encapsulation:2,changeDetection:0}),e}();function E(e,t){if(1&e&&(C.Pb(0,"kal-button",12),C.uc(1," First step "),C.Ob()),2&e){C.Yb();var n=C.jc(5);C.dc("kalTheme",0===n.selectedIndex?"primary":"tertiary")}}function I(e,t){if(1&e&&(C.Pb(0,"kal-button",12),C.uc(1," Second Step "),C.Ob()),2&e){C.Yb();var n=C.jc(5);C.dc("kalTheme",1===n.selectedIndex?"primary":"tertiary")}}function Q(e,t){if(1&e&&(C.Pb(0,"kal-button",12),C.uc(1," Third Step "),C.Ob()),2&e){C.Yb();var n=C.jc(5);C.dc("kalTheme",2===n.selectedIndex?"primary":"tertiary")}}var y=function(){function e(e){this.formBuilder=e,this.linear=!0}return e.prototype.selectionUpdated=function(e){},e.prototype.ngOnInit=function(){this.firstFormGroup=this.formBuilder.group({email:["",[o.q.required]]}),this.secondFormGroup=this.formBuilder.group({firstname:[""]})},e.\u0275fac=function(t){return new(t||e)(C.Jb(o.c))},e.\u0275cmp=C.Db({type:e,selectors:[["app-stepper"]],decls:32,vars:8,consts:[[1,"example"],["orientation","horizontal",3,"linear","selectionChange"],["stepper",""],[3,"stepControl"],["kalStepLabel",""],[3,"formGroup"],["formControlName","email"],["kalTheme","primary",3,"disabled","click"],["formControlName","firstname"],["kalTheme","tertiary",3,"click"],[1,"configurator"],["label","linear",3,"ngModel","ngModelChange"],[3,"kalTheme"]],template:function(e,t){if(1&e){var n=C.Qb();C.Pb(0,"h1"),C.uc(1,"Stepper"),C.Ob(),C.Pb(2,"div",0),C.Pb(3,"article"),C.Pb(4,"kal-stepper",1,2),C.Wb("selectionChange",(function(e){return t.selectionUpdated(e)})),C.Pb(6,"kal-step",3),C.sc(7,E,2,1,"ng-template",4),C.Pb(8,"form",5),C.Kb(9,"kal-input",6),C.Pb(10,"div"),C.Pb(11,"kal-button",7),C.Wb("click",(function(){return C.lc(n),C.jc(5).next()})),C.uc(12," Next 1 "),C.Ob(),C.Ob(),C.Ob(),C.Ob(),C.Pb(13,"kal-step",3),C.sc(14,I,2,1,"ng-template",4),C.Pb(15,"form",5),C.Kb(16,"kal-input",8),C.Pb(17,"div"),C.Pb(18,"kal-button",9),C.Wb("click",(function(){return C.lc(n),C.jc(5).previous()})),C.uc(19," Previous 2 "),C.Ob(),C.Pb(20,"kal-button",7),C.Wb("click",(function(){return C.lc(n),C.jc(5).next()})),C.uc(21," Next 2 "),C.Ob(),C.Ob(),C.Ob(),C.Ob(),C.Pb(22,"kal-step"),C.sc(23,Q,2,1,"ng-template",4),C.Pb(24,"p"),C.uc(25," Thanks for your subscription "),C.Ob(),C.Pb(26,"div"),C.Pb(27,"kal-button",9),C.Wb("click",(function(){return C.lc(n),C.jc(5).previous()})),C.uc(28," Previous 3 "),C.Ob(),C.Ob(),C.Ob(),C.Ob(),C.Ob(),C.Ob(),C.Pb(29,"div",10),C.Pb(30,"kal-form-field"),C.Pb(31,"kal-checkbox",11),C.Wb("ngModelChange",(function(e){return t.linear=e})),C.Ob(),C.Ob(),C.Ob()}2&e&&(C.zb(4),C.dc("linear",t.linear),C.zb(2),C.dc("stepControl",t.firstFormGroup),C.zb(2),C.dc("formGroup",t.firstFormGroup),C.zb(3),C.dc("disabled",t.linear&&t.firstFormGroup.invalid),C.zb(2),C.dc("stepControl",t.secondFormGroup),C.zb(2),C.dc("formGroup",t.secondFormGroup),C.zb(5),C.dc("disabled",t.linear&&t.firstFormGroup.invalid),C.zb(11),C.dc("ngModel",t.linear))},directives:[l.db,l.bb,l.cb,o.r,o.m,o.g,l.K,o.l,o.f,l.h,l.ib,l.H,l.r,o.n],styles:[""],encapsulation:2,changeDetection:0}),e}();function w(e,t){1&e&&C.uc(0," Label 1 ")}function B(e,t){1&e&&(C.Pb(0,"kal-icon"),C.uc(1,"done"),C.Ob(),C.uc(2," Label 2 "))}function x(e,t){1&e&&(C.Pb(0,"kal-tab"),C.sc(1,B,3,0,"ng-template",2),C.Pb(2,"h5"),C.uc(3,"Tab2"),C.Ob(),C.uc(4," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo nesciunt possimus quaerat veritatis. Aliquid consequuntur eaque enim ipsa, laudantium nam nisi praesentium quaerat quibusdam! At commodi eum mollitia porro reprehenderit! "),C.Ob())}function S(e,t){1&e&&(C.Pb(0,"kal-icon"),C.uc(1,"star"),C.Ob(),C.uc(2," Label 3 "))}var M=function(){function e(){this.formControl=new o.d(2),this.showTab=!0}return e.prototype.changeTab=function(){this.formControl.patchValue((this.formControl.value+1)%3)},e.prototype.toggleTab=function(){this.showTab=!this.showTab},e.prototype.ngOnInit=function(){},e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=C.Db({type:e,selectors:[["app-tab-panel"]],decls:20,vars:2,consts:[[1,"example"],["tabIndex","1",3,"formControl"],["kalTabLabel",""],[4,"ngIf"],[1,"configurator"],[3,"click"]],template:function(e,t){1&e&&(C.Pb(0,"h1"),C.uc(1,"Tabs"),C.Ob(),C.Pb(2,"div",0),C.Pb(3,"kal-tab-group",1),C.Pb(4,"kal-tab"),C.sc(5,w,1,0,"ng-template",2),C.Pb(6,"h5"),C.uc(7,"Tab1"),C.Ob(),C.uc(8," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo nesciunt possimus quaerat veritatis. Aliquid consequuntur eaque enim ipsa, laudantium nam nisi praesentium quaerat quibusdam! At commodi eum mollitia porro reprehenderit! "),C.Ob(),C.sc(9,x,5,0,"kal-tab",3),C.Pb(10,"kal-tab"),C.sc(11,S,3,0,"ng-template",2),C.Pb(12,"h5"),C.uc(13,"Tab3"),C.Ob(),C.uc(14," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo nesciunt possimus quaerat veritatis. Aliquid consequuntur eaque enim ipsa, laudantium nam nisi praesentium quaerat quibusdam! At commodi eum mollitia porro reprehenderit! "),C.Ob(),C.Ob(),C.Ob(),C.Pb(15,"div",4),C.Pb(16,"kal-button",5),C.Wb("click",(function(){return t.changeTab()})),C.uc(17,"Change tab"),C.Ob(),C.Pb(18,"kal-button",5),C.Wb("click",(function(){return t.toggleTab()})),C.uc(19,"Toggle tab"),C.Ob(),C.Ob()),2&e&&(C.zb(3),C.dc("formControl",t.formControl),C.zb(6),C.dc("ngIf",t.showTab))},directives:[l.fb,o.l,o.e,l.eb,l.gb,i.l,l.h,l.J],styles:[""],encapsulation:2,changeDetection:0}),e}();function z(e,t){if(1&e){var n=C.Qb();C.Pb(0,"kal-tree-node",8),C.Wb("kalDrop",(function(e){return C.lc(n),C.Yb().drop(e)})),C.uc(1),C.Ob()}if(2&e){var i=t.$implicit;C.dc("kalDrag",i),C.zb(1),C.wc(" ",i.title," ")}}function D(e,t){if(1&e){var n=C.Qb();C.Pb(0,"kal-tree-node",8),C.Wb("kalDrop",(function(e){return C.lc(n),C.Yb().drop(e)})),C.Pb(1,"kal-icon",9),C.uc(2),C.Ob(),C.uc(3),C.Ob()}if(2&e){var i=t.$implicit,o=C.Yb();C.dc("kalDrag",i),C.zb(2),C.wc(" ",o.treeControl.isExpanded(i)?"expand_more":"chevron_right"," "),C.zb(1),C.wc(" ",i.title," ")}}function T(e,t){if(1&e&&(C.Pb(0,"kal-option",10),C.uc(1),C.Ob()),2&e){var n=t.$implicit;C.dc("value",n.id),C.zb(1),C.wc(" ",n.title," ")}}var R=[{id:"1",title:"level A",children:[{id:"11",title:"level A1"},{id:"12",title:"level A2",children:[{id:"121",title:"level A21"},{id:"122",title:"level A22"},{id:"123",title:"level A23"}]},{id:"13",title:"level A3"}]},{id:"2",title:"level B",children:[{id:"21",title:"level B1",children:[{id:"211",title:"level B11",children:[{id:"2111",title:"level B111"},{id:"2112",title:"level B112"}]},{id:"212",title:"level B12",children:[{id:"2121",title:"level B121"},{id:"2122",title:"level B122"}]}]},{id:"22",title:"level B2",children:[{id:"221",title:"level B21"},{id:"222",title:"level B22"},{id:"223",title:"level B23"}]},{id:"23",title:"level B3"}]}],G=function(){function e(){this.hasNestedChild=function(e,t){return!!t.children},this.treeControl=new l.mb,this.dataSource=new l.nb(this.treeControl),this.dataSource.data=R}return e.prototype.select=function(e){this.dataSource.selectNode(e)},e.prototype.changed=function(e){},e.prototype.drop=function(e){console.log(e)},e.prototype.collapseAll=function(){this.treeControl.collapseAll()},e.prototype.expandAll=function(){this.treeControl.expandAll()},e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=C.Db({type:e,selectors:[["app-tree"]],decls:16,vars:4,consts:[[1,"example"],[3,"dataSource","treeControl","selectionChanged"],["kalTreeNodePadding","",3,"kalDrag","kalDrop",4,"kalTreeNodeDef"],["kalTreeNodePadding","",3,"kalDrag","kalDrop",4,"kalTreeNodeDef","kalTreeNodeDefWhen"],[1,"configurator"],["label","select node","tabIndex","1",3,"valueChanges"],[3,"value",4,"ngFor","ngForOf"],["kalTheme","primary",3,"click"],["kalTreeNodePadding","",3,"kalDrag","kalDrop"],["kalTreeNodeToggle","",1,"mat-icon-rtl-mirror"],[3,"value"]],template:function(e,t){1&e&&(C.Pb(0,"h1"),C.uc(1,"Treeview"),C.Ob(),C.Pb(2,"div",0),C.Pb(3,"kal-tree",1),C.Wb("selectionChanged",(function(e){return t.changed(e)})),C.sc(4,z,2,2,"kal-tree-node",2),C.sc(5,D,4,3,"kal-tree-node",3),C.Ob(),C.Ob(),C.Pb(6,"div",4),C.Pb(7,"kal-form-field"),C.Pb(8,"kal-select",5),C.Wb("valueChanges",(function(e){return t.select(e)})),C.sc(9,T,2,2,"kal-option",6),C.Ob(),C.Ob(),C.Pb(10,"kal-form-field"),C.Pb(11,"kal-button",7),C.Wb("click",(function(){return t.collapseAll()})),C.uc(12,"collapseAll"),C.Ob(),C.Ob(),C.Pb(13,"kal-form-field"),C.Pb(14,"kal-button",7),C.Wb("click",(function(){return t.expandAll()})),C.uc(15,"expandAll"),C.Ob(),C.Ob(),C.Ob()),2&e&&(C.zb(3),C.dc("dataSource",t.dataSource)("treeControl",t.treeControl),C.zb(2),C.dc("kalTreeNodeDefWhen",t.hasNestedChild),C.zb(4),C.dc("ngForOf",t.dataSource._flattenedData.value))},directives:[l.lb,l.pb,l.H,l.W,i.k,l.h,l.ib,l.ob,l.qb,l.B,l.C,l.J,l.rb,l.R],styles:[""],encapsulation:2,changeDetection:0}),e}(),U=function(){function e(){this.disabled=!1,this.multiple=!1}return e.prototype.ngOnInit=function(){},e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=C.Db({type:e,selectors:[["app-accordion"]],decls:37,vars:5,consts:[[1,"example"],[3,"multi"],[3,"disabled"],["type","button"],[1,"configurator"],["label","disabled",3,"ngModel","ngModelChange"],["label","multiple",3,"ngModel","ngModelChange"]],template:function(e,t){1&e&&(C.Pb(0,"h1"),C.uc(1,"Accordion"),C.Ob(),C.Pb(2,"div",0),C.Pb(3,"article"),C.Pb(4,"kal-accordion",1),C.Pb(5,"kal-expansion-panel",2),C.Pb(6,"kal-expansion-panel-header"),C.Pb(7,"span"),C.uc(8),C.Ob(),C.Ob(),C.Pb(9,"kal-expansion-panel-content"),C.Pb(10,"p"),C.uc(11,"Main panel 1 content Lorem ipsum dolor sit amet, consectetur adipisicing elit. A at consequuntur eveniet maxime modi nobis sint soluta vero? Atque culpa deleniti facilis necessitatibus omnis. Architecto culpa dolore natus nisi perspiciatis?"),C.Ob(),C.Ob(),C.Pb(12,"kal-action-row"),C.Pb(13,"button",3),C.uc(14,"Submit"),C.Ob(),C.Ob(),C.Ob(),C.Pb(15,"kal-expansion-panel"),C.Pb(16,"kal-expansion-panel-header"),C.Pb(17,"span"),C.uc(18,"Second panel"),C.Ob(),C.Ob(),C.Pb(19,"kal-expansion-panel-content"),C.Pb(20,"p"),C.uc(21,"Main panel 2 content Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda facere ipsam neque rerum! Aliquid cupiditate, dolorem esse, impedit ipsa molestiae obcaecati odio reiciendis sed sunt unde veniam vero voluptates."),C.Ob(),C.Ob(),C.Pb(22,"kal-expansion-panel-footer"),C.Pb(23,"p"),C.uc(24,"Second Panel sticky Footer"),C.Ob(),C.Ob(),C.Ob(),C.Pb(25,"kal-expansion-panel"),C.Pb(26,"kal-expansion-panel-header"),C.Pb(27,"span"),C.uc(28,"Third panel"),C.Ob(),C.Ob(),C.Pb(29,"kal-expansion-panel-content"),C.Pb(30,"p"),C.uc(31,"Main panel 3 content Lorem ipsum dolor sit amet, consectetur adipisicing elit. At consequatur dolores eveniet, illum nemo perspiciatis reiciendis sit soluta. Deleniti eius, eligendi excepturi id ipsum nostrum obcaecati officia sapiente tempore voluptatibus!"),C.Ob(),C.Ob(),C.Ob(),C.Ob(),C.Ob(),C.Ob(),C.Pb(32,"div",4),C.Pb(33,"kal-form-field"),C.Pb(34,"kal-checkbox",5),C.Wb("ngModelChange",(function(e){return t.disabled=e})),C.Ob(),C.Ob(),C.Pb(35,"kal-form-field"),C.Pb(36,"kal-checkbox",6),C.Wb("ngModelChange",(function(e){return t.multiple=e})),C.Ob(),C.Ob(),C.Ob()),2&e&&(C.zb(4),C.dc("multi",t.multiple),C.zb(1),C.dc("disabled",t.disabled),C.zb(3),C.wc("First panel ",t.disabled?"disabled":"",""),C.zb(26),C.dc("ngModel",t.disabled),C.zb(2),C.dc("ngModel",t.multiple))},directives:[l.e,l.D,l.G,l.E,l.f,l.F,l.H,l.r,o.l,o.n],styles:[""],encapsulation:2,changeDetection:0}),e}();function F(e,t){if(1&e&&(C.Pb(0,"kal-card-on-title"),C.uc(1),C.Ob()),2&e){var n=C.Yb();C.zb(1),C.vc(n.onTitle)}}function W(e,t){if(1&e&&(C.Pb(0,"kal-card-title"),C.uc(1),C.Ob()),2&e){var n=C.Yb();C.zb(1),C.vc(n.title)}}function j(e,t){1&e&&(C.Pb(0,"kal-card-actions"),C.Pb(1,"kal-button",11),C.uc(2,"action1"),C.Ob(),C.Pb(3,"kal-button",12),C.uc(4,"action2"),C.Ob(),C.Ob())}var Y=function(){function e(){this.themes=[],this.dismissable=!1,this.actions=!0,this.title="My title",this.onTitle="My on Title"}return e.prototype.dismissed=function(){console.log("dismissed")},e.prototype.ngOnInit=function(){},e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=C.Db({type:e,selectors:[["app-card"]],decls:25,vars:10,consts:[[1,"example"],[3,"dismissable","kalTheme","dismissed"],[4,"ngIf"],[1,"configurator"],["label","themes",3,"ngModel","ngModelChange"],["value",""],["value","reverse"],["label","Title",3,"ngModel","ngModelChange"],["label","onTitle",3,"ngModel","ngModelChange"],["label","dismissable",3,"ngModel","ngModelChange"],["label","actions",3,"ngModel","ngModelChange"],["kalTheme","tertiary"],["kalTheme","primary"]],template:function(e,t){1&e&&(C.Pb(0,"h1"),C.uc(1,"Card"),C.Ob(),C.Pb(2,"div",0),C.Pb(3,"kal-card",1),C.Wb("dismissed",(function(){return t.dismissed()})),C.Pb(4,"kal-card-header"),C.sc(5,F,2,1,"kal-card-on-title",2),C.sc(6,W,2,1,"kal-card-title",2),C.Ob(),C.Pb(7,"kal-card-content"),C.uc(8," My Content "),C.Ob(),C.sc(9,j,5,0,"kal-card-actions",2),C.Ob(),C.Ob(),C.Pb(10,"section",3),C.Pb(11,"kal-form-field"),C.Pb(12,"kal-select",4),C.Wb("ngModelChange",(function(e){return t.themes=e})),C.Pb(13,"kal-option",5),C.uc(14,"default"),C.Ob(),C.Pb(15,"kal-option",6),C.uc(16,"reverse"),C.Ob(),C.Ob(),C.Ob(),C.Pb(17,"kal-form-field"),C.Pb(18,"kal-input",7),C.Wb("ngModelChange",(function(e){return t.title=e})),C.Ob(),C.Ob(),C.Pb(19,"kal-form-field"),C.Pb(20,"kal-input",8),C.Wb("ngModelChange",(function(e){return t.onTitle=e})),C.Ob(),C.Ob(),C.Pb(21,"kal-form-field"),C.Pb(22,"kal-checkbox",9),C.Wb("ngModelChange",(function(e){return t.dismissable=e})),C.Ob(),C.Ob(),C.Pb(23,"kal-form-field"),C.Pb(24,"kal-checkbox",10),C.Wb("ngModelChange",(function(e){return t.actions=e})),C.Ob(),C.Ob(),C.Ob()),2&e&&(C.zb(3),C.dc("dismissable",t.dismissable)("kalTheme",t.themes),C.zb(2),C.dc("ngIf",t.onTitle),C.zb(1),C.dc("ngIf",t.title),C.zb(3),C.dc("ngIf",t.actions),C.zb(3),C.dc("ngModel",t.themes),C.zb(6),C.dc("ngModel",t.title),C.zb(2),C.dc("ngModel",t.onTitle),C.zb(2),C.dc("ngModel",t.dismissable),C.zb(2),C.dc("ngModel",t.actions))},directives:[l.k,l.ib,l.m,i.l,l.l,l.H,l.W,o.l,o.n,l.R,l.K,l.r,l.n,l.o,l.j,l.h],styles:[""],encapsulation:2}),e}();function q(e,t){if(1&e){var n=C.Qb();C.Pb(0,"a",7),C.Wb("click",(function(){return C.lc(n),C.Yb(),C.jc(4).previous()})),C.Ob()}}function L(e,t){if(1&e&&(C.Pb(0,"article"),C.Pb(1,"h3"),C.uc(2),C.Ob(),C.Ob()),2&e){var n=t.$implicit;C.qc("background-image","url("+n.image+")"),C.zb(2),C.wc(" ",n.title,"")}}function K(e,t){if(1&e){var n=C.Qb();C.Pb(0,"a",8),C.Wb("click",(function(){return C.lc(n),C.Yb(),C.jc(4).next()})),C.Ob()}}var N=function(){function e(){this.elements=[{title:"image 1",image:"iVBORw0KGgoAAAANSUhEUgAAAGQAAAABCAYAAAAo2wu9AAAAEklEQVR42mP8z/C/nmEUDBoAAOMkAn+dUf1PAAAAAElFTkSuQmCC"},{title:"image 2",image:"iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnUlEQVR42u3RAQ0AAAQAMFppJzo1zP4Kz5jq4IwUIgQhQhAiBCFCECJEiBCECEGIEIQIQYgQhCBECEKEIEQIQoQgBCFCECIEIUIQIgQhCBGCECEIEYIQIQhBiBCECEGIEIQIQQhChCBECEKEIEQIQhAiBCFCECIEIUIQghAhCBGCECEIEYIQhAhBiBCECEGIEIQIESIEIUIQIgQh3y3slKt97+l5oAAAAABJRU5ErkJggg=="},{title:"image 3",image:"iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnUlEQVR42u3RQREAAAQAMDr7i04N57YKy6jp4IwUIgQhQhAiBCFCECJEiBCECEGIEIQIQYgQhCBECEKEIEQIQoQgBCFCECIEIUIQIgQhCBGCECEIEYIQIQhBiBCECEGIEIQIQQhChCBECEKEIEQIQhAiBCFCECIEIUIQghAhCBGCECEIEYIQhAhBiBCECEGIEIQIESIEIUIQIgQh3y3ZssLttzj4IgAAAABJRU5ErkJggg=="},{title:"image 4",image:"iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnUlEQVR42u3RQREAAAQAMJJ7yU0N57YKy+mo4IwUIgQhQhAiBCFCECJEiBCECEGIEIQIQYgQhCBECEKEIEQIQoQgBCFCECIEIUIQIgQhCBGCECEIEYIQIQhBiBCECEGIEIQIQQhChCBECEKEIEQIQhAiBCFCECIEIUIQghAhCBGCECEIEYIQhAhBiBCECEGIEIQIESIEIUIQIgQh3y3+bsmRo2hARQAAAABJRU5ErkJggg=="},{title:"image 5",image:"iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAoUlEQVR42u3RAQ0AMAgAoBvidaxmYjtYwzmoQPTPeqwRQoQgRAhChCBECEKECBGCECEIEYIQIQgRghCECEGIEIQIQYgQhCBECEKEIEQIQoQgBCFCECIEIUIQIgQhCBGCECEIEYIQIQhBiBCECEGIEIQIQQhChCBECEKEIEQIQhAiBCFCECIEIUIQghAhCBGCECEIEYIQIUKEIEQIQoQg5LoBaUuvAe5Ayi0AAAAASUVORK5CYII="}],this.vignetteVisible=4,this.elements=this.elements.map((function(e){return{title:e.title,image:"data:image/png;base64,"+e.image}}))}return e.prototype.isEndOfViewport=function(e){return e+this.vignetteVisible>=this.elements.length},e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=C.Db({type:e,selectors:[["app-carousel"]],decls:9,vars:3,consts:[[1,"example"],[3,"items"],["carousel","kalCarousel"],["class","previous",3,"click",4,"ngIf"],[1,"container"],[3,"background-image",4,"kalCarouselItem"],["class","next",3,"click",4,"ngIf"],[1,"previous",3,"click"],[1,"next",3,"click"]],template:function(e,t){if(1&e&&(C.Pb(0,"h1"),C.uc(1,"Carousel"),C.Ob(),C.Pb(2,"div",0),C.Pb(3,"kal-carousel",1,2),C.sc(5,q,1,0,"a",3),C.Pb(6,"div",4),C.sc(7,L,3,3,"article",5),C.Ob(),C.sc(8,K,1,0,"a",6),C.Ob(),C.Ob()),2&e){var n=C.jc(4);C.zb(3),C.dc("items",t.elements),C.zb(2),C.dc("ngIf",!n.isFirst),C.zb(3),C.dc("ngIf",!t.isEndOfViewport(n.currentItem))}},directives:[l.p,i.l,l.q],styles:['kal-carousel{height:200px;position:relative;display:block}kal-carousel .container{display:flex;overflow:hidden}kal-carousel a{position:absolute;width:20px;top:0;bottom:0;background:#ccc;border:1px solid #ccc;color:#fff;display:flex}kal-carousel a:before{align-self:center;display:block;text-align:center;width:100%}kal-carousel a:hover{background:#fff;border:1px solid #ccc}kal-carousel a:hover:before{color:#ccc}kal-carousel a.previous{left:-22px}kal-carousel a.previous:before{content:"<"}kal-carousel a.next{right:-22px}kal-carousel a.next:before{content:">"}kal-carousel article{box-sizing:border-box;background-position:50%;background-size:cover;display:inline-block;flex:0 0 calc(100%/4);height:200px;border:2px solid #fff;position:relative}'],encapsulation:2,changeDetection:0}),e}(),V=[{path:"accordion",component:U},{path:"calendar",component:function(){function e(){this.selectedDates=[new l.t("02/09/2020"),new l.t("20/09/2020")]}return e.prototype.datePicked=function(e){this.date=e},e.prototype.ngOnInit=function(){},e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=C.Db({type:e,selectors:[["app-month-calendar"]],decls:20,vars:7,consts:[[1,"example"],[3,"selectedDate","activatedDates","datePicked"],[1,"technical-value"],[1,"technical-value__item"],[1,"configurator"],["label","Select new date",3,"ngModel","ngModelChange"]],template:function(e,t){1&e&&(C.Pb(0,"h1"),C.uc(1,"Calendar"),C.Ob(),C.Pb(2,"div",0),C.Pb(3,"div"),C.Pb(4,"kal-calendar",1),C.Wb("datePicked",(function(e){return t.datePicked(e)})),C.Ob(),C.Pb(5,"div",2),C.Pb(6,"div",3),C.Pb(7,"span"),C.uc(8,"Date Picked"),C.Ob(),C.Pb(9,"span"),C.uc(10),C.Ob(),C.Ob(),C.Pb(11,"div",3),C.Pb(12,"span"),C.uc(13,"Selected Dates"),C.Ob(),C.Pb(14,"span"),C.uc(15),C.Zb(16,"json"),C.Ob(),C.Ob(),C.Ob(),C.Ob(),C.Ob(),C.Pb(17,"div",4),C.Pb(18,"kal-form-field"),C.Pb(19,"kal-datepicker",5),C.Wb("ngModelChange",(function(e){return t.newdate=e}))("ngModelChange",(function(e){return t.selectedDates.push(e)})),C.Ob(),C.Ob(),C.Ob()),2&e&&(C.zb(4),C.dc("selectedDate",t.date)("activatedDates",t.selectedDates),C.zb(6),C.vc(t.date),C.zb(5),C.vc(C.ac(16,5,t.selectedDates)),C.zb(4),C.dc("ngModel",t.newdate))},directives:[l.i,l.H,l.u,o.l,o.n],pipes:[i.e],styles:[""],encapsulation:2,changeDetection:0}),e}()},{path:"card",component:Y},{path:"carousel",component:N},{path:"list",component:O},{path:"nav",component:P},{path:"stepper",component:y},{path:"tab-panel",component:M},{path:"tree",component:G}],J=function(){function e(){}return e.\u0275mod=C.Hb({type:e}),e.\u0275inj=C.Gb({factory:function(t){return new(t||e)},imports:[[a.c.forChild(V)],a.c]}),e}(),_=function(){function e(){}return e.\u0275mod=C.Hb({type:e}),e.\u0275inj=C.Gb({factory:function(t){return new(t||e)},imports:[[i.b,o.o,o.h,J,l.sb]]}),e}()}}]);