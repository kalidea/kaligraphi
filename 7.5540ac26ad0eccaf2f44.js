(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{J5zi:function(e,t,n){"use strict";n.r(t),n.d(t,"LayoutModule",(function(){return ee}));var i=n("Valr"),o=n("QJY3"),c=n("fxc8"),l=n("DUip"),a=n("mrSG"),r=n("F/XL"),s=n("26FU"),u=Math.ceil,b=Math.max,p=n("YHEm"),d=n("5WsY"),h=/^(?:0|[1-9]\d*)$/,f=n("IzLi"),m=n("8M4i"),g=n("EUcb"),k=/^\s+|\s+$/g,S=/^[-+]0x[0-9a-f]+$/i,C=/^0b[01]+$/i,A=/^0o[0-7]+$/i,R=parseInt,E=function(e){return e?(e=function(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||Object(g.a)(e)&&"[object Symbol]"==Object(m.a)(e)}(e))return NaN;if(Object(f.a)(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=Object(f.a)(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(k,"");var n=C.test(e);return n||A.test(e)?R(e.slice(2),n?2:8):S.test(e)?NaN:+e}(e))===1/0||e===-1/0?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0},I=function(e,t,n){return n&&"number"!=typeof n&&function(e,t,n){if(!Object(f.a)(n))return!1;var i=typeof t;return!!("number"==i?Object(d.a)(n)&&function(e,t){var n=typeof e;return!!(t=null==t?9007199254740991:t)&&("number"==n||"symbol"!=n&&h.test(e))&&e>-1&&e%1==0&&e<t}(t,n.length):"string"==i&&t in n)&&Object(p.a)(n[t],e)}(e,t,n)&&(t=n=void 0),e=E(e),void 0===t?(t=e,e=0):t=E(t),function(e,t,n,i){for(var o=-1,c=b(u((t-e)/(n||1)),0),l=Array(c);c--;)l[++o]=e,e+=n;return l}(e,t,n=void 0===n?e<t?1:-1:E(n))},v=n("xMyE"),w=n("t9fZ"),B=n("TYT/");function y(e,t){1&e&&B.wc(0),2&e&&B.yc(" ",t.item.name," ")}var Q=function(){function e(){this.items=[],this.dataSource=new x,this.groupByFunction=null,this.disableRowsFunction=null,this.selectionMode="single",this.listSelection=null,this.virtualScrollConfig={itemSize:48},this.icon="keyboard_arrow_right",this.selectRowOnContentClick=!1,this.highlightedItem=null}return e.prototype.selectRow=function(e){this.listSelection=e},e.prototype.highlightItem=function(e){this.highlightedItem=e},e.prototype.changeDataSource=function(){this.virtualScrollConfig=null,this.dataSource=I(1,2e4).map((function(e){return{id:""+e,name:(4!==e?"aTest":"bTest")+e,disabled:1===e}})),this.listSelection=new c.V({numberOfItems:this.dataSource.length})},e.prototype.addGroupByFunction=function(){this.groupByFunction=this.groupByFunction?null:function(e){return e.name.charAt(0).toLocaleUpperCase()}},e.prototype.disableRow=function(){this.disableRowsFunction=this.disableRowsFunction?null:function(e){return e.disabled}},e.prototype.selectAll=function(){this.listSelection&&this.listSelection.format().all?this.kalListComponent.clear():this.kalListComponent.selectAll()},e.prototype.selectMultipleRows=function(){this.icon="keyboard_arrow_right",this.selectionMode="multiple",this.listSelection.clear()},e.prototype.unselectRows=function(){this.icon=null,this.selectionMode="none",this.listSelection.clear()},e.prototype.selectSingleRow=function(){this.icon="keyboard_arrow_right",this.selectionMode=null,this.listSelection.clear()},e.prototype.changeSelection=function(){this.listSelection=new c.V({added:[{id:"1"}],all:!1})},e.prototype.ngOnInit=function(){this.selectionMode="multiple",this.listSelection=new c.V({added:[{id:"1"},{id:"2"}],all:!1})},e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=B.Gb({type:e,selectors:[["app-list"]],viewQuery:function(e,t){var n;1&e&&B.sc(c.J,!0),2&e&&B.lc(n=B.bc())&&(t.kalListComponent=n.first)},decls:38,vars:16,consts:[[1,"example"],["tabindex","1",3,"icon","selection","dataSource","groupByFunction","disableRowsFunction","selectionMode","virtualScrollConfig","selectRowOnContentClick","selectionChange","highlighted"],["kalListItem",""],[1,"technical-value"],[1,"technical-value__item"],[1,"configurator"],["type","button","kalTheme","secondary",3,"click"]],template:function(e,t){1&e&&(B.Sb(0,"h1"),B.wc(1,"List"),B.Rb(),B.Sb(2,"div",0),B.Sb(3,"article"),B.Sb(4,"kal-list",1),B.ac("selectionChange",(function(e){return t.selectRow(e)}))("highlighted",(function(e){return t.highlightItem(e)})),B.uc(5,y,1,1,"ng-template",2),B.Rb(),B.Sb(6,"div",3),B.Sb(7,"div",4),B.Sb(8,"span"),B.wc(9,"Selected value"),B.Rb(),B.Sb(10,"span"),B.wc(11),B.dc(12,"json"),B.Rb(),B.Rb(),B.Sb(13,"div",4),B.Sb(14,"span"),B.wc(15,"highlighted value"),B.Rb(),B.Sb(16,"span"),B.wc(17),B.dc(18,"json"),B.Rb(),B.Rb(),B.Rb(),B.Rb(),B.Rb(),B.Sb(19,"div",5),B.Sb(20,"kal-button",6),B.ac("click",(function(){return t.addGroupByFunction()})),B.wc(21,"Group items"),B.Rb(),B.Sb(22,"kal-button",6),B.ac("click",(function(){return t.disableRow()})),B.wc(23,"Disable rows"),B.Rb(),B.Sb(24,"kal-button",6),B.ac("click",(function(){return t.unselectRows()})),B.wc(25,"Unselectable rows"),B.Rb(),B.Sb(26,"kal-button",6),B.ac("click",(function(){return t.selectSingleRow()})),B.wc(27,"Single selectable row"),B.Rb(),B.Sb(28,"kal-button",6),B.ac("click",(function(){return t.selectMultipleRows()})),B.wc(29,"Multiple selectable rows"),B.Rb(),B.Sb(30,"kal-button",6),B.ac("click",(function(){return t.selectAll()})),B.wc(31,"Select All rows"),B.Rb(),B.Sb(32,"kal-button",6),B.ac("click",(function(){return t.changeSelection()})),B.wc(33,"Select first item"),B.Rb(),B.Sb(34,"kal-button",6),B.ac("click",(function(){return t.changeDataSource()})),B.wc(35,"Change DataSource"),B.Rb(),B.Sb(36,"kal-button",6),B.ac("click",(function(){return t.selectRowOnContentClick=!t.selectRowOnContentClick})),B.wc(37,"Select row on content click "),B.Rb(),B.Rb()),2&e&&(B.Bb(4),B.Db("has-selected-element",t.listSelection&&t.listSelection.total>0),B.hc("icon",t.icon)("selection",t.listSelection)("dataSource",t.dataSource)("groupByFunction",t.groupByFunction)("disableRowsFunction",t.disableRowsFunction)("selectionMode",t.selectionMode)("virtualScrollConfig",t.virtualScrollConfig)("selectRowOnContentClick",t.selectRowOnContentClick),B.Bb(7),B.xc(B.ec(12,12,t.listSelection.format())),B.Bb(6),B.xc(B.ec(18,14,t.highlightedItem)))},directives:[c.J,c.K,c.h,c.gb],pipes:[i.e],styles:[""],encapsulation:2,changeDetection:0}),e}(),x=function(){function e(){this.subscriptionsList=[],this.datastream=new s.a([]),this.total=new s.a(0),this.page=1,this.countElement=500,this._cachedData=[],this.subscriptionsList.push(this.changePage().subscribe())}return Object.defineProperty(e.prototype,"cachedData",{get:function(){return this._cachedData},set:function(e){var t;(t=this._cachedData).push.apply(t,Object(a.f)(e)),this.datastream.next(this._cachedData)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"displayedElement",{get:function(){return this.page*this.countElement},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"list",{get:function(){return function(e,t){for(var n=[],i=(e-1)*t+1,o=Math.min(1e3,e*t),c=i;c<=o;c++)n.push({id:""+c,name:"rTest"+c,disabled:1===c});return Object(r.a)({data:n,meta:{total:1e3}})}(this.page,this.countElement)},enumerable:!0,configurable:!0}),e.prototype.connect=function(e){var t=this;return this.subscriptionsList.push(e.viewChange.pipe(Object(v.a)((function(e){e.end>=t.displayedElement&&t.cachedData.length<=t.total.getValue()&&(t.page+=1,t.subscriptionsList.push(t.changePage().subscribe()))}))).subscribe()),this.datastream},e.prototype.changePage=function(){var e=this;return this.list.pipe(Object(w.a)(1),Object(v.a)((function(t){var n=t.meta;e.cachedData=t.data,e.total.next(n.total)})))},e.prototype.disconnect=function(e){this.subscriptionsList.forEach((function(e){e&&e.unsubscribe()}))},e}(),M=function(){function e(){}return e.prototype.ngOnInit=function(){this.items=[{label:"home",route:""},{label:"activity",route:""},{label:"calendar",route:""},{label:"contact",route:""}]},e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=B.Gb({type:e,selectors:[["app-menu"]],decls:5,vars:1,consts:[[1,"example"],[3,"items"],[1,"configurator"]],template:function(e,t){1&e&&(B.Sb(0,"h1"),B.wc(1,"Nav"),B.Rb(),B.Sb(2,"div",0),B.Nb(3,"kal-nav",1),B.Rb(),B.Nb(4,"div",2)),2&e&&(B.Bb(3),B.hc("items",t.items))},directives:[c.O],styles:["kal-nav{height:auto}"],encapsulation:2,changeDetection:0}),e}();function T(e,t){if(1&e&&(B.Sb(0,"kal-button",12),B.wc(1," First step "),B.Rb()),2&e){B.cc();var n=B.mc(5);B.hc("kalTheme",0===n.selectedIndex?"primary":"tertiary")}}function G(e,t){if(1&e&&(B.Sb(0,"kal-button",12),B.wc(1," Second Step "),B.Rb()),2&e){B.cc();var n=B.mc(5);B.hc("kalTheme",1===n.selectedIndex?"primary":"tertiary")}}function U(e,t){if(1&e&&(B.Sb(0,"kal-button",12),B.wc(1," Third Step "),B.Rb()),2&e){B.cc();var n=B.mc(5);B.hc("kalTheme",2===n.selectedIndex?"primary":"tertiary")}}var F=function(){function e(e){this.formBuilder=e,this.linear=!0}return e.prototype.selectionUpdated=function(e){},e.prototype.ngOnInit=function(){this.firstFormGroup=this.formBuilder.group({email:["",[o.q.required]]}),this.secondFormGroup=this.formBuilder.group({firstname:[""]})},e.\u0275fac=function(t){return new(t||e)(B.Mb(o.c))},e.\u0275cmp=B.Gb({type:e,selectors:[["app-stepper"]],decls:32,vars:8,consts:[[1,"example"],["orientation","horizontal",3,"linear","selectionChange"],["stepper",""],[3,"stepControl"],["kalStepLabel",""],[3,"formGroup"],["formControlName","email"],["kalTheme","primary",3,"disabled","click"],["formControlName","firstname"],["kalTheme","tertiary",3,"click"],[1,"configurator"],["label","linear",3,"ngModel","ngModelChange"],[3,"kalTheme"]],template:function(e,t){if(1&e){var n=B.Tb();B.Sb(0,"h1"),B.wc(1,"Stepper"),B.Rb(),B.Sb(2,"div",0),B.Sb(3,"article"),B.Sb(4,"kal-stepper",1,2),B.ac("selectionChange",(function(e){return t.selectionUpdated(e)})),B.Sb(6,"kal-step",3),B.uc(7,T,2,1,"ng-template",4),B.Sb(8,"form",5),B.Nb(9,"kal-input",6),B.Sb(10,"div"),B.Sb(11,"kal-button",7),B.ac("click",(function(){return B.oc(n),B.mc(5).next()})),B.wc(12," Next 1 "),B.Rb(),B.Rb(),B.Rb(),B.Rb(),B.Sb(13,"kal-step",3),B.uc(14,G,2,1,"ng-template",4),B.Sb(15,"form",5),B.Nb(16,"kal-input",8),B.Sb(17,"div"),B.Sb(18,"kal-button",9),B.ac("click",(function(){return B.oc(n),B.mc(5).previous()})),B.wc(19," Previous 2 "),B.Rb(),B.Sb(20,"kal-button",7),B.ac("click",(function(){return B.oc(n),B.mc(5).next()})),B.wc(21," Next 2 "),B.Rb(),B.Rb(),B.Rb(),B.Rb(),B.Sb(22,"kal-step"),B.uc(23,U,2,1,"ng-template",4),B.Sb(24,"p"),B.wc(25," Thanks for your subscription "),B.Rb(),B.Sb(26,"div"),B.Sb(27,"kal-button",9),B.ac("click",(function(){return B.oc(n),B.mc(5).previous()})),B.wc(28," Previous 3 "),B.Rb(),B.Rb(),B.Rb(),B.Rb(),B.Rb(),B.Rb(),B.Sb(29,"div",10),B.Sb(30,"kal-form-field"),B.Sb(31,"kal-checkbox",11),B.ac("ngModelChange",(function(e){return t.linear=e})),B.Rb(),B.Rb(),B.Rb()}2&e&&(B.Bb(4),B.hc("linear",t.linear),B.Bb(2),B.hc("stepControl",t.firstFormGroup),B.Bb(2),B.hc("formGroup",t.firstFormGroup),B.Bb(3),B.hc("disabled",t.linear&&t.firstFormGroup.invalid),B.Bb(2),B.hc("stepControl",t.secondFormGroup),B.Bb(2),B.hc("formGroup",t.secondFormGroup),B.Bb(5),B.hc("disabled",t.linear&&t.firstFormGroup.invalid),B.Bb(11),B.hc("ngModel",t.linear))},directives:[c.bb,c.Z,c.ab,o.r,o.m,o.g,c.I,o.l,o.f,c.h,c.gb,c.F,c.q,o.n],styles:[""],encapsulation:2,changeDetection:0}),e}();function O(e,t){1&e&&B.wc(0," Label 1 ")}function D(e,t){1&e&&(B.Sb(0,"kal-icon"),B.wc(1,"done"),B.Rb(),B.wc(2," Label 2 "))}function q(e,t){1&e&&(B.Sb(0,"kal-tab"),B.uc(1,D,3,0,"ng-template",2),B.Sb(2,"h5"),B.wc(3,"Tab2"),B.Rb(),B.wc(4," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo nesciunt possimus quaerat veritatis. Aliquid consequuntur eaque enim ipsa, laudantium nam nisi praesentium quaerat quibusdam! At commodi eum mollitia porro reprehenderit! "),B.Rb())}function N(e,t){1&e&&(B.Sb(0,"kal-icon"),B.wc(1,"star"),B.Rb(),B.wc(2," Label 3 "))}var L=function(){function e(){this.formControl=new o.d(2),this.showTab=!0}return e.prototype.changeTab=function(){this.formControl.patchValue((this.formControl.value+1)%3)},e.prototype.toggleTab=function(){this.showTab=!this.showTab},e.prototype.ngOnInit=function(){},e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=B.Gb({type:e,selectors:[["app-tab-panel"]],decls:20,vars:2,consts:[[1,"example"],["tabIndex","1",3,"formControl"],["kalTabLabel",""],[4,"ngIf"],[1,"configurator"],[3,"click"]],template:function(e,t){1&e&&(B.Sb(0,"h1"),B.wc(1,"Tabs"),B.Rb(),B.Sb(2,"div",0),B.Sb(3,"kal-tab-group",1),B.Sb(4,"kal-tab"),B.uc(5,O,1,0,"ng-template",2),B.Sb(6,"h5"),B.wc(7,"Tab1"),B.Rb(),B.wc(8," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo nesciunt possimus quaerat veritatis. Aliquid consequuntur eaque enim ipsa, laudantium nam nisi praesentium quaerat quibusdam! At commodi eum mollitia porro reprehenderit! "),B.Rb(),B.uc(9,q,5,0,"kal-tab",3),B.Sb(10,"kal-tab"),B.uc(11,N,3,0,"ng-template",2),B.Sb(12,"h5"),B.wc(13,"Tab3"),B.Rb(),B.wc(14," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo nesciunt possimus quaerat veritatis. Aliquid consequuntur eaque enim ipsa, laudantium nam nisi praesentium quaerat quibusdam! At commodi eum mollitia porro reprehenderit! "),B.Rb(),B.Rb(),B.Rb(),B.Sb(15,"div",4),B.Sb(16,"kal-button",5),B.ac("click",(function(){return t.changeTab()})),B.wc(17,"Change tab"),B.Rb(),B.Sb(18,"kal-button",5),B.ac("click",(function(){return t.toggleTab()})),B.wc(19,"Toggle tab"),B.Rb(),B.Rb()),2&e&&(B.Bb(3),B.hc("formControl",t.formControl),B.Bb(6),B.hc("ngIf",t.showTab))},directives:[c.db,o.l,o.e,c.cb,c.eb,i.l,c.h,c.H],styles:[""],encapsulation:2,changeDetection:0}),e}();function Y(e,t){if(1&e){var n=B.Tb();B.Sb(0,"kal-tree-node",8),B.ac("kalDrop",(function(e){return B.oc(n),B.cc().drop(e)})),B.wc(1),B.Rb()}if(2&e){var i=t.$implicit;B.hc("kalDrag",i),B.Bb(1),B.yc(" ",i.title," ")}}function j(e,t){if(1&e){var n=B.Tb();B.Sb(0,"kal-tree-node",8),B.ac("kalDrop",(function(e){return B.oc(n),B.cc().drop(e)})),B.Sb(1,"kal-icon",9),B.wc(2),B.Rb(),B.wc(3),B.Rb()}if(2&e){var i=t.$implicit,o=B.cc();B.hc("kalDrag",i),B.Bb(2),B.yc(" ",o.treeControl.isExpanded(i)?"expand_more":"chevron_right"," "),B.Bb(1),B.yc(" ",i.title," ")}}function V(e,t){if(1&e&&(B.Sb(0,"kal-option",10),B.wc(1),B.Rb()),2&e){var n=t.$implicit;B.hc("value",n.id),B.Bb(1),B.yc(" ",n.title," ")}}var K=[{id:"1",title:"level A",children:[{id:"11",title:"level A1"},{id:"12",title:"level A2",children:[{id:"121",title:"level A21"},{id:"122",title:"level A22"},{id:"123",title:"level A23"}]},{id:"13",title:"level A3"}]},{id:"2",title:"level B",children:[{id:"21",title:"level B1",children:[{id:"211",title:"level B11",children:[{id:"2111",title:"level B111"},{id:"2112",title:"level B112"}]},{id:"212",title:"level B12",children:[{id:"2121",title:"level B121"},{id:"2122",title:"level B122"}]}]},{id:"22",title:"level B2",children:[{id:"221",title:"level B21"},{id:"222",title:"level B22"},{id:"223",title:"level B23"}]},{id:"23",title:"level B3"}]}],J=function(){function e(){this.hasNestedChild=function(e,t){return!!t.children},this.treeControl=new c.kb,this.dataSource=new c.lb(this.treeControl),this.dataSource.data=K}return e.prototype.select=function(e){this.dataSource.selectNode(e)},e.prototype.changed=function(e){},e.prototype.drop=function(e){console.log(e)},e.prototype.collapseAll=function(){this.treeControl.collapseAll()},e.prototype.expandAll=function(){this.treeControl.expandAll()},e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=B.Gb({type:e,selectors:[["app-tree"]],decls:16,vars:4,consts:[[1,"example"],[3,"dataSource","treeControl","selectionChanged"],["kalTreeNodePadding","",3,"kalDrag","kalDrop",4,"kalTreeNodeDef"],["kalTreeNodePadding","",3,"kalDrag","kalDrop",4,"kalTreeNodeDef","kalTreeNodeDefWhen"],[1,"configurator"],["label","select node","tabIndex","1",3,"valueChanges"],[3,"value",4,"ngFor","ngForOf"],["kalTheme","primary",3,"click"],["kalTreeNodePadding","",3,"kalDrag","kalDrop"],["kalTreeNodeToggle","",1,"mat-icon-rtl-mirror"],[3,"value"]],template:function(e,t){1&e&&(B.Sb(0,"h1"),B.wc(1,"Treeview"),B.Rb(),B.Sb(2,"div",0),B.Sb(3,"kal-tree",1),B.ac("selectionChanged",(function(e){return t.changed(e)})),B.uc(4,Y,2,2,"kal-tree-node",2),B.uc(5,j,4,3,"kal-tree-node",3),B.Rb(),B.Rb(),B.Sb(6,"div",4),B.Sb(7,"kal-form-field"),B.Sb(8,"kal-select",5),B.ac("valueChanges",(function(e){return t.select(e)})),B.uc(9,V,2,2,"kal-option",6),B.Rb(),B.Rb(),B.Sb(10,"kal-form-field"),B.Sb(11,"kal-button",7),B.ac("click",(function(){return t.collapseAll()})),B.wc(12,"collapseAll"),B.Rb(),B.Rb(),B.Sb(13,"kal-form-field"),B.Sb(14,"kal-button",7),B.ac("click",(function(){return t.expandAll()})),B.wc(15,"expandAll"),B.Rb(),B.Rb(),B.Rb()),2&e&&(B.Bb(3),B.hc("dataSource",t.dataSource)("treeControl",t.treeControl),B.Bb(2),B.hc("kalTreeNodeDefWhen",t.hasNestedChild),B.Bb(4),B.hc("ngForOf",t.dataSource._flattenedData.value))},directives:[c.jb,c.nb,c.F,c.U,i.k,c.h,c.gb,c.mb,c.ob,c.A,c.B,c.H,c.pb,c.P],styles:[""],encapsulation:2,changeDetection:0}),e}();function P(e,t){if(1&e&&(B.Sb(0,"kal-card-on-title"),B.wc(1),B.Rb()),2&e){var n=B.cc();B.Bb(1),B.xc(n.onTitle)}}function _(e,t){if(1&e&&(B.Sb(0,"kal-card-title"),B.wc(1),B.Rb()),2&e){var n=B.cc();B.Bb(1),B.xc(n.title)}}function z(e,t){1&e&&(B.Sb(0,"kal-card-actions"),B.Sb(1,"kal-button",11),B.wc(2,"action1"),B.Rb(),B.Sb(3,"kal-button",12),B.wc(4,"action2"),B.Rb(),B.Rb())}function $(e,t){if(1&e){var n=B.Tb();B.Sb(0,"a",7),B.ac("click",(function(){return B.oc(n),B.cc(),B.mc(4).previous()})),B.Rb()}}function H(e,t){if(1&e&&(B.Sb(0,"article"),B.Sb(1,"h3"),B.wc(2),B.Rb(),B.Rb()),2&e){var n=t.$implicit;B.tc("background-image","url("+n.image+")",B.Fb),B.Bb(2),B.yc(" ",n.title,"")}}function W(e,t){if(1&e){var n=B.Tb();B.Sb(0,"a",8),B.ac("click",(function(){return B.oc(n),B.cc(),B.mc(4).next()})),B.Rb()}}var Z=[{path:"accordion",component:function(){function e(){this.disabled=!1,this.multiple=!1}return e.prototype.ngOnInit=function(){},e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=B.Gb({type:e,selectors:[["app-accordion"]],decls:34,vars:5,consts:[[1,"example"],[3,"multi"],[3,"disabled"],["type","button"],[1,"configurator"],["label","disabled",3,"ngModel","ngModelChange"],["label","multiple",3,"ngModel","ngModelChange"]],template:function(e,t){1&e&&(B.Sb(0,"h1"),B.wc(1,"Accordion"),B.Rb(),B.Sb(2,"div",0),B.Sb(3,"article"),B.Sb(4,"kal-accordion",1),B.Sb(5,"kal-expansion-panel",2),B.Sb(6,"kal-expansion-panel-header"),B.Sb(7,"span"),B.wc(8),B.Rb(),B.Rb(),B.Sb(9,"kal-expansion-panel-content"),B.Sb(10,"p"),B.wc(11,"Main panel 1 content Lorem ipsum dolor sit amet, consectetur adipisicing elit. A at consequuntur eveniet maxime modi nobis sint soluta vero? Atque culpa deleniti facilis necessitatibus omnis. Architecto culpa dolore natus nisi perspiciatis?"),B.Rb(),B.Rb(),B.Sb(12,"kal-action-row"),B.Sb(13,"button",3),B.wc(14,"Submit"),B.Rb(),B.Rb(),B.Rb(),B.Sb(15,"kal-expansion-panel"),B.Sb(16,"kal-expansion-panel-header"),B.Sb(17,"span"),B.wc(18,"Second panel"),B.Rb(),B.Rb(),B.Sb(19,"kal-expansion-panel-content"),B.Sb(20,"p"),B.wc(21,"Main panel 2 content Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda facere ipsam neque rerum! Aliquid cupiditate, dolorem esse, impedit ipsa molestiae obcaecati odio reiciendis sed sunt unde veniam vero voluptates."),B.Rb(),B.Rb(),B.Rb(),B.Sb(22,"kal-expansion-panel"),B.Sb(23,"kal-expansion-panel-header"),B.Sb(24,"span"),B.wc(25,"Third panel"),B.Rb(),B.Rb(),B.Sb(26,"kal-expansion-panel-content"),B.Sb(27,"p"),B.wc(28,"Main panel 3 content Lorem ipsum dolor sit amet, consectetur adipisicing elit. At consequatur dolores eveniet, illum nemo perspiciatis reiciendis sit soluta. Deleniti eius, eligendi excepturi id ipsum nostrum obcaecati officia sapiente tempore voluptatibus!"),B.Rb(),B.Rb(),B.Rb(),B.Rb(),B.Rb(),B.Rb(),B.Sb(29,"div",4),B.Sb(30,"kal-form-field"),B.Sb(31,"kal-checkbox",5),B.ac("ngModelChange",(function(e){return t.disabled=e})),B.Rb(),B.Rb(),B.Sb(32,"kal-form-field"),B.Sb(33,"kal-checkbox",6),B.ac("ngModelChange",(function(e){return t.multiple=e})),B.Rb(),B.Rb(),B.Rb()),2&e&&(B.Bb(4),B.hc("multi",t.multiple),B.Bb(1),B.hc("disabled",t.disabled),B.Bb(3),B.yc("First panel ",t.disabled?"disabled":"",""),B.Bb(23),B.hc("ngModel",t.disabled),B.Bb(2),B.hc("ngModel",t.multiple))},directives:[c.e,c.C,c.E,c.D,c.f,c.F,c.q,o.l,o.n],styles:[""],encapsulation:2,changeDetection:0}),e}()},{path:"card",component:function(){function e(){this.themes=[],this.dismissable=!1,this.actions=!0,this.title="My title",this.onTitle="My on Title"}return e.prototype.dismissed=function(){console.log("dismissed")},e.prototype.ngOnInit=function(){},e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=B.Gb({type:e,selectors:[["app-card"]],decls:25,vars:10,consts:[[1,"example"],[3,"dismissable","kalTheme","dismissed"],[4,"ngIf"],[1,"configurator"],["label","themes",3,"ngModel","ngModelChange"],["value",""],["value","reverse"],["label","Title",3,"ngModel","ngModelChange"],["label","onTitle",3,"ngModel","ngModelChange"],["label","dismissable",3,"ngModel","ngModelChange"],["label","actions",3,"ngModel","ngModelChange"],["kalTheme","tertiary"],["kalTheme","primary"]],template:function(e,t){1&e&&(B.Sb(0,"h1"),B.wc(1,"Card"),B.Rb(),B.Sb(2,"div",0),B.Sb(3,"kal-card",1),B.ac("dismissed",(function(){return t.dismissed()})),B.Sb(4,"kal-card-header"),B.uc(5,P,2,1,"kal-card-on-title",2),B.uc(6,_,2,1,"kal-card-title",2),B.Rb(),B.Sb(7,"kal-card-content"),B.wc(8," My Content "),B.Rb(),B.uc(9,z,5,0,"kal-card-actions",2),B.Rb(),B.Rb(),B.Sb(10,"section",3),B.Sb(11,"kal-form-field"),B.Sb(12,"kal-select",4),B.ac("ngModelChange",(function(e){return t.themes=e})),B.Sb(13,"kal-option",5),B.wc(14,"default"),B.Rb(),B.Sb(15,"kal-option",6),B.wc(16,"reverse"),B.Rb(),B.Rb(),B.Rb(),B.Sb(17,"kal-form-field"),B.Sb(18,"kal-input",7),B.ac("ngModelChange",(function(e){return t.title=e})),B.Rb(),B.Rb(),B.Sb(19,"kal-form-field"),B.Sb(20,"kal-input",8),B.ac("ngModelChange",(function(e){return t.onTitle=e})),B.Rb(),B.Rb(),B.Sb(21,"kal-form-field"),B.Sb(22,"kal-checkbox",9),B.ac("ngModelChange",(function(e){return t.dismissable=e})),B.Rb(),B.Rb(),B.Sb(23,"kal-form-field"),B.Sb(24,"kal-checkbox",10),B.ac("ngModelChange",(function(e){return t.actions=e})),B.Rb(),B.Rb(),B.Rb()),2&e&&(B.Bb(3),B.hc("dismissable",t.dismissable)("kalTheme",t.themes),B.Bb(2),B.hc("ngIf",t.onTitle),B.Bb(1),B.hc("ngIf",t.title),B.Bb(3),B.hc("ngIf",t.actions),B.Bb(3),B.hc("ngModel",t.themes),B.Bb(6),B.hc("ngModel",t.title),B.Bb(2),B.hc("ngModel",t.onTitle),B.Bb(2),B.hc("ngModel",t.dismissable),B.Bb(2),B.hc("ngModel",t.actions))},directives:[c.j,c.gb,c.l,i.l,c.k,c.F,c.U,o.l,o.n,c.P,c.I,c.q,c.m,c.n,c.i,c.h],styles:[""],encapsulation:2}),e}()},{path:"carousel",component:function(){function e(){this.elements=[{title:"image 1",image:"iVBORw0KGgoAAAANSUhEUgAAAGQAAAABCAYAAAAo2wu9AAAAEklEQVR42mP8z/C/nmEUDBoAAOMkAn+dUf1PAAAAAElFTkSuQmCC"},{title:"image 2",image:"iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnUlEQVR42u3RAQ0AAAQAMFppJzo1zP4Kz5jq4IwUIgQhQhAiBCFCECJEiBCECEGIEIQIQYgQhCBECEKEIEQIQoQgBCFCECIEIUIQIgQhCBGCECEIEYIQIQhBiBCECEGIEIQIQQhChCBECEKEIEQIQhAiBCFCECIEIUIQghAhCBGCECEIEYIQhAhBiBCECEGIEIQIESIEIUIQIgQh3y3slKt97+l5oAAAAABJRU5ErkJggg=="},{title:"image 3",image:"iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnUlEQVR42u3RQREAAAQAMDr7i04N57YKy6jp4IwUIgQhQhAiBCFCECJEiBCECEGIEIQIQYgQhCBECEKEIEQIQoQgBCFCECIEIUIQIgQhCBGCECEIEYIQIQhBiBCECEGIEIQIQQhChCBECEKEIEQIQhAiBCFCECIEIUIQghAhCBGCECEIEYIQhAhBiBCECEGIEIQIESIEIUIQIgQh3y3ZssLttzj4IgAAAABJRU5ErkJggg=="},{title:"image 4",image:"iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnUlEQVR42u3RQREAAAQAMJJ7yU0N57YKy+mo4IwUIgQhQhAiBCFCECJEiBCECEGIEIQIQYgQhCBECEKEIEQIQoQgBCFCECIEIUIQIgQhCBGCECEIEYIQIQhBiBCECEGIEIQIQQhChCBECEKEIEQIQhAiBCFCECIEIUIQghAhCBGCECEIEYIQhAhBiBCECEGIEIQIESIEIUIQIgQh3y3+bsmRo2hARQAAAABJRU5ErkJggg=="},{title:"image 5",image:"iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAoUlEQVR42u3RAQ0AMAgAoBvidaxmYjtYwzmoQPTPeqwRQoQgRAhChCBECEKECBGCECEIEYIQIQgRghCECEGIEIQIQYgQhCBECEKEIEQIQoQgBCFCECIEIUIQIgQhCBGCECEIEYIQIQhBiBCECEGIEIQIQQhChCBECEKEIEQIQhAiBCFCECIEIUIQghAhCBGCECEIEYIQIUKEIEQIQoQg5LoBaUuvAe5Ayi0AAAAASUVORK5CYII="}],this.vignetteVisible=4,this.elements=this.elements.map((function(e){return{title:e.title,image:"data:image/png;base64,"+e.image}}))}return e.prototype.isEndOfViewport=function(e){return e+this.vignetteVisible>=this.elements.length},e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=B.Gb({type:e,selectors:[["app-carousel"]],decls:9,vars:3,consts:[[1,"example"],[3,"items"],["carousel","kalCarousel"],["class","previous",3,"click",4,"ngIf"],[1,"container"],[3,"background-image",4,"kalCarouselItem"],["class","next",3,"click",4,"ngIf"],[1,"previous",3,"click"],[1,"next",3,"click"]],template:function(e,t){if(1&e&&(B.Sb(0,"h1"),B.wc(1,"Carousel"),B.Rb(),B.Sb(2,"div",0),B.Sb(3,"kal-carousel",1,2),B.uc(5,$,1,0,"a",3),B.Sb(6,"div",4),B.uc(7,H,3,3,"article",5),B.Rb(),B.uc(8,W,1,0,"a",6),B.Rb(),B.Rb()),2&e){var n=B.mc(4);B.Bb(3),B.hc("items",t.elements),B.Bb(2),B.hc("ngIf",!n.isFirst),B.Bb(3),B.hc("ngIf",!t.isEndOfViewport(n.currentItem))}},directives:[c.o,i.l,c.p],styles:['kal-carousel{height:200px;position:relative;display:block}kal-carousel .container{display:flex;overflow:hidden}kal-carousel a{position:absolute;width:20px;top:0;bottom:0;background:#ccc;border:1px solid #ccc;color:#fff;display:flex}kal-carousel a:before{align-self:center;display:block;text-align:center;width:100%}kal-carousel a:hover{background:#fff;border:1px solid #ccc}kal-carousel a:hover:before{color:#ccc}kal-carousel a.previous{left:-22px}kal-carousel a.previous:before{content:"<"}kal-carousel a.next{right:-22px}kal-carousel a.next:before{content:">"}kal-carousel article{box-sizing:border-box;background-position:50%;background-size:cover;display:inline-block;flex:0 0 25%;height:200px;border:2px solid #fff;position:relative}'],encapsulation:2,changeDetection:0}),e}()},{path:"list",component:Q},{path:"nav",component:M},{path:"stepper",component:F},{path:"tab-panel",component:L},{path:"tree",component:J}],X=function(){function e(){}return e.\u0275mod=B.Kb({type:e}),e.\u0275inj=B.Jb({factory:function(t){return new(t||e)},imports:[[l.c.forChild(Z)],l.c]}),e}(),ee=function(){function e(){}return e.\u0275mod=B.Kb({type:e}),e.\u0275inj=B.Jb({factory:function(t){return new(t||e)},imports:[[i.b,o.o,o.h,X,c.qb]]}),e}()}}]);