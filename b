
> kaligraphi@13.0.0 build
> ng build --configuration production

Building Angular Package

------------------------------------------------------------------------------
Building entry point '@kalidea/kaligraphi'
------------------------------------------------------------------------------
- Compiling with Angular sources in Ivy partial compilation mode.
✖ Compiling with Angular sources in Ivy partial compilation mode.
projects/kalidea/kaligraphi/src/lib/99-utility/directives/kal-theme/kal-theme.directive.ts:11:10 - error TS2564: Property 'rawThemes' has no initializer and is not definitely assigned in the constructor.

11   public rawThemes: string | string[];
            ~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/99-utility/directives/kal-theme/kal-theme.directive.ts:13:11 - error TS2564: Property 'themes' has no initializer and is not definitely assigned in the constructor.

13   private themes: string[];
             ~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/decorators/auto-unsubscribe.ts:47:63 - error TS7006: Parameter 'property' implicitly has an 'any' type.

47     componentInstance[decoratorSubscriptionsListKey].forEach((property) => {
                                                                 ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/decorators/auto-unsubscribe.ts:48:59 - error TS2683: 'this' implicitly has type 'any' because it does not have a type annotation.

48       const subscriptions: Subscription[] = Array.isArray(this[property]) ? this[property] : [this[property]];
                                                             ~~~~

  projects/kalidea/kaligraphi/src/lib/utils/decorators/auto-unsubscribe.ts:46:68
    46 const destroy = (componentInstance: any, originialDestroy: any) => function() {
                                                                          ~~~~~~~~
    An outer value of 'this' is shadowed by this container.
projects/kalidea/kaligraphi/src/lib/utils/decorators/auto-unsubscribe.ts:48:77 - error TS2683: 'this' implicitly has type 'any' because it does not have a type annotation.

48       const subscriptions: Subscription[] = Array.isArray(this[property]) ? this[property] : [this[property]];
                                                                               ~~~~

  projects/kalidea/kaligraphi/src/lib/utils/decorators/auto-unsubscribe.ts:46:68
    46 const destroy = (componentInstance: any, originialDestroy: any) => function() {
                                                                          ~~~~~~~~
    An outer value of 'this' is shadowed by this container.
projects/kalidea/kaligraphi/src/lib/utils/decorators/auto-unsubscribe.ts:48:95 - error TS2683: 'this' implicitly has type 'any' because it does not have a type annotation.

48       const subscriptions: Subscription[] = Array.isArray(this[property]) ? this[property] : [this[property]];
                                                                                                 ~~~~

  projects/kalidea/kaligraphi/src/lib/utils/decorators/auto-unsubscribe.ts:46:68
    46 const destroy = (componentInstance: any, originialDestroy: any) => function() {
                                                                          ~~~~~~~~
    An outer value of 'this' is shadowed by this container.
projects/kalidea/kaligraphi/src/lib/utils/decorators/auto-unsubscribe.ts:58:30 - error TS2683: 'this' implicitly has type 'any' because it does not have a type annotation.

58       originialDestroy.apply(this, arguments);
                                ~~~~

  projects/kalidea/kaligraphi/src/lib/utils/decorators/auto-unsubscribe.ts:46:68
    46 const destroy = (componentInstance: any, originialDestroy: any) => function() {
       6m                                                                   ~~~~~~~~
    An outer value of 'this' is shadowed by this container.
projects/kalidea/kaligraphi/src/lib/99-utility/kal-date/kal-date.ts:3:88 - error TS7016: Could not find a declaration file for module 'luxon'. '/home/ydomenjoud/projet/kalidea/kaligraphi/node_modules/luxon/build/node/luxon.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/luxon` if it exists or add a new declaration (.d.ts) file containing `declare module 'luxon';`

3 import { DateTime, Info, Interval, StringUnitLength, ToRelativeUnit, UnitLength } from 'luxon';
                                                                                         ~~~~~~~
projects/kalidea/kaligraphi/src/lib/99-utility/kal-date/kal-date.ts:60:7 - error TS2322: Type '(string | undefined)[]' is not assignable to type 'KalDateFormat | undefined'.
  Type '(string | undefined)[]' is not assignable to type 'string[]'.
    Type 'string | undefined' is not assignable to type 'string'.
      Type 'undefined' is not assignable to type 'string'.

60       format = [
         ~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/decorators/coerce.ts:10:61 - error TS7006: Parameter 'formatOrDefaultNumber' implicitly has an 'any' type.

10 function coerceFromType(value: any, type: KAL_COERCE_TYPES, formatOrDefaultNumber) {
                                                               ~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/decorators/coerce.ts:26:48 - error TS7006: Parameter 'formatOrDefaultNumber' implicitly has an 'any' type.

26 export function Coerce(type: KAL_COERCE_TYPES, formatOrDefaultNumber?): PropertyDecorator & MethodDecorator {
                                                  ~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/forms/form-control-access.component.ts:24:13 - error TS2322: Type 'null' is not assignable to type 'T'.
  'T' could be instantiated with an arbitrary type which could be unrelated to 'null'.

24   protected previousValue: T = null;
               ~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/forms/form-control-access.component.ts:39:20 - error TS7006: Parameter 'fn' implicitly has an 'any' type.

39   registerOnChange(fn) {
                      ~~
projects/kalidea/kaligraphi/src/lib/utils/forms/form-control-access.component.ts:46:21 - error TS7006: Parameter 'fn' implicitly has an 'any' type.

46   registerOnTouched(fn) {
                       ~~
projects/kalidea/kaligraphi/src/lib/utils/forms/form-control-access.component.ts:53:14 - error TS7006: Parameter 'value' implicitly has an 'any' type.

53   writeValue(value) {
                ~~~~~
projects/kalidea/kaligraphi/src/lib/utils/forms/form-element.component.ts:21:12 - error TS2564: Property 'label' has no initializer and is not definitely assigned in the constructor.

21   @Input() label: string;
              ~~~~~
projects/kalidea/kaligraphi/src/lib/utils/forms/form-element.component.ts:33:12 - error TS2564: Property 'placeholder' has no initializer and is not definitely assigned in the constructor.

33   @Input() placeholder: T;
              ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/forms/form-element.component.ts:69:3 - error TS2564: Property 'tabIndex' has no initializer and is not definitely assigned in the constructor.

69   tabIndex: number;
     ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/forms/form-element.component.ts:76:3 - error TS2564: Property 'readonly' has no initializer and is not definitely assigned in the constructor.

76   readonly: boolean;
     ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/forms/form-element.component.ts:82:3 - error TS2564: Property 'updateOnEvent' has no initializer and is not definitely assigned in the constructor.

82   updateOnEvent: FormHooks;
     ~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/forms/form-element.component.ts:102:10 - error TS2564: Property 'ngControl' has no initializer and is not definitely assigned in the constructor.

102   public ngControl: NgControl;
             ~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/forms/form-element.component.ts:104:10 - error TS2564: Property 'control' has no initializer and is not definitely assigned in the constructor.

104   public control: FormControl;
             ~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/forms/form-element.component.ts:114:13 - error TS2564: Property '_value' has no initializer and is not definitely assigned in the constructor.

114   protected _value: T;
                ~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/forms/form-element.component.ts:124:11 - error TS2322: Type 'BehaviorSubject<false>' is not assignable to type 'BehaviorSubject<boolean>'.
  Types of property 'observers' are incompatible.
    Type 'Observer<false>[]' is not assignable to type 'Observer<boolean>[]'.
      Type 'Observer<false>' is not assignable to type 'Observer<boolean>'.
        Type 'boolean' is not assignable to type 'false'.

124   private activeSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
              ~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/forms/form-element.component.ts:208:14 - error TS2531: Object is possibly 'null'.

208       return this.ngControl.statusChanges.pipe(distinctUntilChanged());
                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/forms/form-element.component.ts:218:5 - error TS2322: Type 'null' is not assignable to type 'AbstractControl'.

218     return null;
        ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/forms/form-element.component.ts:241:5 - error TS2322: Type 'NgControl | null' is not assignable to type 'NgControl'.
  Type 'null' is not assignable to type 'NgControl'.

241     this.ngControl = injector.get(NgControl, null);
        ~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/forms/form-element.component.ts:276:32 - error TS7006: Parameter 'type' implicitly has an 'any' type.

276 export function buildProviders(type): Provider[] {
                                   ~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/format/currency.format.ts:2:19 - error TS7016: Could not find a declaration file for module 'lodash-es/round'. '/home/ydomenjoud/projet/kalidea/kaligraphi/node_modules/lodash-es/round.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/lodash-es` if it exists or add a new declaration (.d.ts) file containing `declare module 'lodash-es/round';`

2 import round from 'lodash-es/round';
                    ~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/format/currency.format.ts:7:13 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'NumberFormat'.

7   protected digitsInfo = `.${this.decimals}-${this.decimals}`;
              ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/format/currency.format.ts:9:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'NumberFormat'.

9   toCode(value: string): any {
    ~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/helpers/phone.ts:22:28 - error TS7006: Parameter 'value' implicitly has an 'any' type.

22 function getPhoneFormatter(value): (i: number) => boolean {
                              ~~~~~
projects/kalidea/kaligraphi/src/lib/utils/helpers/phone.ts:26:7 - error TS7034: Variable 'indexes' implicitly has type 'any[]' in some locations where its type cannot be determined.

26   let indexes = [];
         ~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/helpers/phone.ts:38:17 - error TS7005: Variable 'indexes' implicitly has an 'any[]' type.

38   return (i) => indexes.indexOf(i) >= 0 || (i >= positionMin && i % 2 === modulo);
                   ~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/helpers/phone.ts:42:38 - error TS7006: Parameter 'value' implicitly has an 'any' type.

42 function formatPhoneNumberWithSpaces(value, includeSpace: (i: number) => boolean): string[] {
                                        ~~~~~
projects/kalidea/kaligraphi/src/lib/utils/helpers/phone.ts:44:28 - error TS7006: Parameter 'number' implicitly has an 'any' type.

44   value.split('').forEach((number, i) => {
                              ~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/helpers/phone.ts:44:36 - error TS7006: Parameter 'i' implicitly has an 'any' type.

44   value.split('').forEach((number, i) => {
                                      ~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.component.ts:56:3 - error TS2564: Property 'control' has no initializer and is not definitely assigned in the constructor.

56   control: FormControl;
     ~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.component.ts:56:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<string>'.

56   control: FormControl;
     ~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.component.ts:58:12 - error TS2564: Property 'autocomplete' has no initializer and is not definitely assigned in the constructor.

58   @Input() autocomplete: string;
              ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.component.ts:73:12 - error TS2564: Property 'limit' has no initializer and is not definitely assigned in the constructor.

73   @Input() limit: number;
              ~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.component.ts:78:12 - error TS2564: Property 'icon' has no initializer and is not definitely assigned in the constructor.

78   @Input() icon: string;
              ~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.component.ts:83:12 - error TS7008: Member 'defaultValue' implicitly has an 'any' type.

83   @Input() defaultValue;
              ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.component.ts:90:12 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<string>'.

90   @Input() updateOnEvent: FormHooks = 'change';
              ~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.component.ts:94:39 - error TS2564: Property 'inputElement' has no initializer and is not definitely assigned in the constructor.

94   @ViewChild('input', {static: true}) inputElement: ElementRef<HTMLInputElement>;
                                         ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.component.ts:98:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<string>'.

98   tabIndex = 0;
     ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.component.ts:102:11 - error TS2564: Property '_clearable' has no initializer and is not definitely assigned in the constructor.

102   private _clearable: boolean;
              ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.component.ts:109:5 - error TS2322: Type 'boolean | undefined' is not assignable to type 'boolean'.
  Type 'undefined' is not assignable to type 'boolean'.

109     this.clearable = this.inputOptions ? this.inputOptions.clearable : false;
        ~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.component.ts:156:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<string>'.

156   writeValue(value) {
      ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.component.ts:156:14 - error TS7006: Parameter 'value' implicitly has an 'any' type.

156   writeValue(value) {
                 ~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.component.ts:184:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<string>'.

184   notifyUpdate(value) {
      ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.component.ts:184:16 - error TS7006: Parameter 'value' implicitly has an 'any' type.

184   notifyUpdate(value) {
                   ~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.component.ts:194:3 - error TS2416: Property 'validate' in type 'KalInputComponent' is not assignable to the same property in base type 'FormElementComponent<string>'.
  Type '(c: AbstractControl) => Observable<ValidationErrors | null>' is not assignable to type '(c: AbstractControl) => Observable<{}>'.
    Type 'Observable<ValidationErrors | null>' is not assignable to type 'Observable<{}>'.
      Type 'ValidationErrors | null' is not assignable to type '{}'.
        Type 'null' is not assignable to type '{}'.

194   validate(c: AbstractControl) {
      ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.component.ts:194:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<string>'.

194   validate(c: AbstractControl) {
      ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.component.ts:231:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<string>'.

231   ngOnDestroy(): void {
      ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.component.ts:236:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<string>'.

236   ngOnChanges(changes: SimpleChanges): void {
      ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-autocomplete/kal-autocomplete-option.ts:2:3 - error TS2564: Property 'value' has no initializer and is not definitely assigned in the constructor.

2   value: T;
    ~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-autocomplete/kal-autocomplete-option.ts:3:3 - error TS2564: Property 'label' has no initializer and is not definitely assigned in the constructor.

3   label: string;
    ~~~~~
projects/kalidea/kaligraphi/src/lib/utils/decorators/memoize.ts:2:21 - error TS7016: Could not find a declaration file for module 'lodash-es/memoize'. '/home/ydomenjoud/projet/kalidea/kaligraphi/node_modules/lodash-es/memoize.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/lodash-es` if it exists or add a new declaration (.d.ts) file containing `declare module 'lodash-es/memoize';`

2 import memoize from 'lodash-es/memoize';
                      ~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/decorators/memoize.ts:4:35 - error TS7008: Member 'resolver' implicitly has an 'any' type.

4 export function Memoize(config?: {resolver}) {
                                    ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/decorators/memoize.ts:7:19 - error TS7006: Parameter 'target' implicitly has an 'any' type.

7   return function(target, key, descriptor) {
                    ~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/decorators/memoize.ts:7:27 - error TS7006: Parameter 'key' implicitly has an 'any' type.

7   return function(target, key, descriptor) {
                            ~~~
projects/kalidea/kaligraphi/src/lib/utils/decorators/memoize.ts:7:32 - error TS7006: Parameter 'descriptor' implicitly has an 'any' type.

7   return function(target, key, descriptor) {
                                 ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:3:19 - error TS7016: Could not find a declaration file for module 'lodash-es/isNil'. '/home/ydomenjoud/projet/kalidea/kaligraphi/node_modules/lodash-es/isNil.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/lodash-es` if it exists or add a new declaration (.d.ts) file containing `declare module 'lodash-es/isNil';`

3 import isNil from 'lodash-es/isNil';
                    ~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:4:17 - error TS7016: Could not find a declaration file for module 'lodash-es/xor'. '/home/ydomenjoud/projet/kalidea/kaligraphi/node_modules/lodash-es/xor.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/lodash-es` if it exists or add a new declaration (.d.ts) file containing `declare module 'lodash-es/xor';`

4 import xor from 'lodash-es/xor';
                  ~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:44:7 - error TS2322: Type 'T | undefined' is not assignable to type 'T'.
  'T' could be instantiated with an arbitrary type which could be unrelated to 'T | undefined'.

44       return this.selected.find((element: T & { id?: string }) => '' + element.id === '' + item.id);
         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:50:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'SelectionModel<T>'.

50   isSelected(item: T): boolean {
     ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:54:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'SelectionModel<T>'.

54   select(...items: T[]): void {
     ~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:59:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'SelectionModel<T>'.

59   deselect(...items: T[]): void {
     ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:60:11 - error TS7034: Variable 'filteredItems' implicitly has type 'any[]' in some locations where its type cannot be determined.

60     const filteredItems = [];
             ~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:68:23 - error TS7005: Variable 'filteredItems' implicitly has an 'any[]' type.

68     super.deselect(...filteredItems);
                         ~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:78:11 - error TS2564: Property 'addedSelection' has no initializer and is not definitely assigned in the constructor.

78   private addedSelection: SubSelectionModel<T>;
             ~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:80:11 - error TS2564: Property 'removedSelection' has no initializer and is not definitely assigned in the constructor.

80   private removedSelection: SubSelectionModel<T>;
             ~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:96:24 - error TS2532: Object is possibly 'undefined'.

96     this.initSelection(added.length > 1 || all ? true : multiple, added as T[], removed as T[]);
                          ~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:96:24 - error TS2345: Argument of type 'boolean | undefined' is not assignable to parameter of type 'boolean'.

96     this.initSelection(added.length > 1 || all ? true : multiple, added as T[], removed as T[]);
                          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:98:5 - error TS2322: Type 'boolean | undefined' is not assignable to type 'boolean'.

98     this._all = all;
       ~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:99:5 - error TS2322: Type 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.

99     this.numberOfItems = numberOfItems;
       ~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:129:36 - error TS2345: Argument of type 'T[] | undefined' is not assignable to parameter of type 'T[]'.
  Type 'undefined' is not assignable to type 'T[]'.

129     this.initSelection(isMultiple, added, removed);
                                       ~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:140:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'SelectionModel<T>'.

140   select(...items: T[]): void;
      ~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:141:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'SelectionModel<T>'.

141   select(params: { values: T[]; emitEvent?: boolean }): void;
      ~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:142:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'SelectionModel<T>'.

142   select(...params: any): void {
      ~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:146:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'SelectionModel<T>'.

146   deselect(...items: T[]): void;
      ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:147:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'SelectionModel<T>'.

147   deselect(params: { values: T[]; emitEvent?: boolean }): void;
      ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:148:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'SelectionModel<T>'.

148   deselect(...params: any): void {
      ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:152:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'SelectionModel<T>'.

152   toggle(item: T): void {
      ~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:164:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'SelectionModel<T>'.

164   clear({emitEvent}: { emitEvent: boolean } = {emitEvent: true}): void {
      ~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:174:3[0m - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'SelectionModel<T>'.

174   isSelected(item: T): boolean {
      ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:178:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'SelectionModel<T>'.

178   isEmpty(): boolean {
      ~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-selection.ts:225:5 - error TS7053: Element implicitly has an 'any' type because expression of type 'any' can't be used to index type 'SubSelectionModel<T>'.

225     collection[actionName](...items);
        ~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/operators/auto-unsubscribe.ts:4:33 - error TS7006: Parameter 'componentInstance' implicitly has an 'any' type.

4 export const autoUnsubscribe = (componentInstance) => <T>(source: BehaviorSubject<T>) => {
                                  ~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list-item-selection.directive.ts:17:12 - error TS2564: Property 'disabled' has no initializer and is not definitely assigned in the constructor.

17   @Input() disabled: boolean;
              ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list-item-selection.directive.ts:19:47 - error TS7008: Member 'hightlighted' implicitly has an 'any' type.

19   @HostBinding('class.kal-list__item--hover') hightlighted;
                                                 ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:20:19 - error TS7016: Could not find a declaration file for module 'lodash-es/isNil'. '/home/ydomenjoud/projet/kalidea/kaligraphi/node_modules/lodash-es/isNil.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/lodash-es` if it exists or add a new declaration (.d.ts) file containing `declare module 'lodash-es/isNil';`

20 import isNil from 'lodash-es/isNil';
                     ~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:55:3 - error TS2564: Property 'viewChange' has no initializer and is not definitely assigned in the constructor.

55   viewChange: Observable<ListRange>;
     ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:57:12 - error TS2322: Type 'null' is not assignable to type 'T & { id: string; }'.
  Type 'null' is not assignable to type 'T'.
    'T' could be instantiated with an arbitrary type which could be unrelated to 'null'.

57   @Input() highlightedItem: (T & {id: string}) = null;
              ~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:67:12 - error TS2322: Type 'null' is not assignable to type '(item: T) => boolean'.

67   @Input() disableRowsFunction: (item: T) => (boolean) = null;
              ~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:90:55 - error TS2564: Property 'row' has no initializer and is not definitely assigned in the constructor.

90   @ContentChild(KalListItemDirective, {static: true}) row: KalListItemDirective;
                                                         ~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:95:48 - error TS2564: Property 'children' has no initializer and is not definitely assigned in the constructor.

95   @ViewChildren(KalListItemSelectionDirective) children: QueryList<KalListItemSelectionDirective>;
                                                  ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:116:61 - error TS2322: Type 'null' is not assignable to type 'T'.
  'T' could be instantiated with an arbitrary type which could be unrelated to 'null'.

116   private groupedByParams: { previous: T; slug: string } = {previous: null, slug: ''};
                                                                ~~~~~~~~

  projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:116:30
    116   private groupedByParams: { previous: T; slug: string } = {previous: null, slug: ''};
                                     ~~~~~~~~
    The expected type comes from property 'previous' which is declared here on type '{ previous: T; slug: string; }'
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:121:11 - error TS2564: Property '_groupByFunction' has no initializer and is not definitely assigned in the constructor.

121   private _groupByFunction: (item: T) => string;
              ~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:133:29 - error TS2322: Type 'null' is not assignable to type 'T'.
  'T' could be instantiated with an arbitrary type which could be unrelated to 'null'.

133     this.groupedByParams = {previous: null, slug: ''};
                                ~~~~~~~~

  projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:116:30
    116   private groupedByParams: { previous: T; slug: string } = {previous: null, slug: ''};
                                     ~~~~~~~~
    The expected type comes from property 'previous' which is declared here on type '{ previous: T; slug: string; }'
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:138:11 - error TS2322: Type 'null' is not assignable to type 'KalListDataSource<T>'.

138   private _dataSource: KalListDataSource<T> = null;
              ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:201:11 - error TS2322: Type 'null' is not assignable to type 'KalSelectionModel<T>'.

201   private _selection: KalSelectionModel<T> = null;
              ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:237:7 - error TS2322: Type 'string | null' is not assignable to type 'string | undefined'.
  Type 'null' is not assignable to type 'string | undefined'.

237       height: value.height || null,
          ~~~~~~

  projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:38:3
    38   height?: string;
         ~~~~~~
    The expected type comes from property 'height' which is declared here on type 'KalVirtualScrollConfig'
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:278:14 - error TS7006: Parameter 'item' implicitly has an 'any' type.

278   selectItem(item) {
                 ~~~~
6mprojects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:290:18 - error TS7006: Parameter 'item' implicitly has an 'any' type.

290   selectCheckbox(item, $event?) {
                     ~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:290:24 - error TS7006: Parameter '$event' implicitly has an 'any' type.

290   selectCheckbox(item, $event?) {
                           ~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:312:17 - error TS7006: Parameter 'item' implicitly has an 'any' type.

312   isRowSelected(item): boolean {
                    ~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:319:17 - error TS7006: Parameter 'item' implicitly has an 'any' type.

319   isRowDisabled(item): boolean {
                    ~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:335:15 - error TS7006: Parameter 'currentItem' implicitly has an 'any' type.

335   getSlugName(currentItem): string {
                  ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:337:7 - error TS2322: Type 'null' is not assignable to type 'string'.

337       return null;
          ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:352:7 - error TS2322: Type 'null' is not assignable to type 'string'.

352       return null;
          ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:401:9 - error TS2345: Argument of type 'MonoTypeOperatorFunction<T[]>' is not assignable to parameter of type 'OperatorFunction<T[] | readonly T[], T[]>'.
  Types of parameters 'source' and 'source' are incompatible.
    Type 'Observable<T[] | readonly T[]>' is not assignable to type 'Observable<T[]>'.
      Type 'T[] | readonly T[]' is not assignable to type 'T[]'.
        The type 'readonly T[]' is 'readonly' and cannot be assigned to the mutable type 'T[]'.

401         tap((items: T[]) => {
            ~~~~~~~~~~~~~~~~~~~~~
402           this.results = items;
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
... 
404           this.cdr.markForCheck();
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
405         })
    ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-option/kal-option-group/kal-option-group.component.ts:14:12 - error TS2564: Property 'label' has no initializer and is not definitely assigned in the constructor.

14   @Input() label: string;
              ~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-option/kal-option.component.ts:42:12 - error TS2564: Property 'label' has no initializer and is not definitely assigned in the constructor.

42   @Input() label: string;
              ~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-option/kal-option.component.ts:50:3 - error TS2564: Property 'isHighlighted' has no initializer and is not definitely assigned in the constructor.

50   isHighlighted: boolean;
     ~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-option/kal-option.component.ts:58:11 - error TS2564: Property 'isActive' has no initializer and is not definitely assigned in the constructor.

58   private isActive: boolean;
             ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-option/kal-option.component.ts:62:11 - error TS2564: Property 'isDisabled' has no initializer and is not definitely assigned in the constructor.

62   private isDisabled: boolean;
             ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-option/kal-option.component.ts:66:11 - error TS2564: Property 'optionGroupDisabledSubscription' has no initializer and is not definitely assigned in the constructor.

66   private optionGroupDisabledSubscription: Subscription;
             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-option/kal-option.component.ts:150:22 - error TS7006: Parameter '$event' implicitly has an 'any' type.

150   emitSelectionEvent($event?): void {
                         ~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-autocomplete/kal-autocomplete.component.ts:64:11 - error TS2564: Property 'optionsComponent' has no initializer and is not definitely assigned in the constructor.

64   private optionsComponent: QueryList<KalOptionComponent>;
             ~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-autocomplete/kal-autocomplete.component.ts:69:11 - error TS2564: Property 'keyManager' has no initializer and is not definitely assigned in the constructor.

69   private keyManager: ActiveDescendantKeyManager<KalOptionComponent>;
             ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-autocomplete/kal-autocomplete.component.ts:72:11 - error TS2564: Property 'subscription' has no initializer and is not definitely assigned in the constructor.

72   private subscription: Subscription;
             ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-autocomplete/kal-autocomplete.component.ts:76:5 - error TS2322: Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

76     this.width = data.width;
       ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-autocomplete/kal-autocomplete.component.ts:77:5 - error TS2322: Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

77     this.height = data.height;
       ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-autocomplete/kal-autocomplete.component.ts:78:5 - error TS2322: Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

78     this.className = data.className;
       ~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-autocomplete/kal-autocomplete.component.ts:88:11 - error TS2564: Property '_options' has no initializer and is not definitely assigned in the constructor.

88   private _options: KalAutocompleteOption<T>[];
             ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-autocomplete/kal-autocomplete.component.ts:113:7 - error TS2322: Type 'string | null' is not assignable to type 'string | undefined'.

113       height: value.height || null,
          ~~~~~~

  projects/kalidea/kaligraphi/src/lib/03-layout/kal-list/kal-list.component.ts:38:3
    38   height?: string;
         ~~~~~~
    The expected type comes from property 'height' which is declared here on type 'KalVirtualScrollConfig'
projects/kalidea/kaligraphi/src/lib/02-form/kal-autocomplete/kal-autocomplete.component.ts:157:17 - error TS2345: Argument of type 'null' is not assignable to parameter of type 'KalAutocompleteOption<T>'.

157     this.select(null);
                    ~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-autocomplete/kal-autocomplete-scroll-strategy.ts:13:11 - error TS2564: Property '_overlayRef' has no initializer and is not definitely assigned in the constructor.

13   private _overlayRef: OverlayReference;
             ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-autocomplete/kal-autocomplete-scroll-strategy.ts:25:5 - error TS2322: Type 'null' is not assignable to type 'OverlayReference'.

25     this._overlayRef = null; // null!
       ~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-autocomplete/kal-autocomplete-scroll-strategy.ts:45:7 - error TS2345: Argument of type 'MonoTypeOperatorFunction<CdkScrollable>' is not assignable to parameter of type 'OperatorFunction<void | CdkScrollable, CdkScrollable>'.
  Types of parameters 'source' and 'source' are incompatible.
    Type 'Observable<void | CdkScrollable>' is not assignable to type 'Observable<CdkScrollable>'.
      Type 'void | CdkScrollable' is not assignable to type 'CdkScrollable'.
        Type 'void' is not assignable to type 'CdkScrollable'.

 45       tap((event: CdkScrollable) => {
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
 46         if (event?.getElementRef()?.nativeElement.id !== KalAutocompleteComponent.id && this._overlayRef.hasAttached()) {
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
... 
 50 
    
 51       })
    ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-autocomplete/kal-autocomplete.directive.ts:70:12 - error TS2564: Property 'kalAutocompleteOptionTemplate' has no initializer and is not definitely assigned in the constructor.

70   @Input() kalAutocompleteOptionTemplate: TemplateRef<any>;
              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-autocomplete/kal-autocomplete.directive.ts:75:12 - error TS2564: Property 'kalAutocompleteClassName' has no initializer and is not definitely assigned in the constructor.

75   @Input() kalAutocompleteClassName: string;
              ~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-autocomplete/kal-autocomplete.directive.ts:91:11 - error TS2564: Property 'autocompleteComponent' has no initializer and is not definitely assigned in the constructor.

91   private autocompleteComponent: KalAutocompleteComponent<T>;
             ~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-autocomplete/kal-autocomplete.directive.ts:100:11 - error TS2564: Property 'iconClickedSubscription' has no initializer and is not definitely assigned in the constructor.

100   private iconClickedSubscription: Subscription;
              ~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-autocomplete/kal-autocomplete.directive.ts:120:11 - error TS2564: Property '_optionsList' has no initializer and is not definitely assigned in the constructor.

120   private _optionsList: KalAutocompleteOption<T>[];
              ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-autocomplete/kal-autocomplete.directive.ts:148:11 - error TS2564: Property '_overlayRef' has no initializer and is not definitely assigned in the constructor.

148   private _overlayRef: OverlayRef;
              ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.component.ts:35:3 - error TS2564: Property 'control' has no initializer and is not definitely assigned in the constructor.

35   control: FormControl;
     ~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.component.ts:35:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<boolean>'.

35   control: FormControl;
     ~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.component.ts:41:3 - error TS2564: Property 'controlSubscription' has no initializer and is not definitely assigned in the constructor.

41   controlSubscription: Subscription;
     ~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.component.ts:43:39 - error TS2564: Property 'input' has no initializer and is not definitely assigned in the constructor.

43   @ViewChild('input', {static: true}) input: ElementRef<HTMLInputElement>;
                                         ~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.component.ts:49:13 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<boolean>'.

49   protected _value = false;
               ~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.component.ts:55:7 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<boolean>'.

55   get value() {
         ~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.component.ts:61:7 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<boolean>'.

61   set value(value: boolean) {
         ~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.component.ts:74:7 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<boolean>'.

74   get disabled() {
         ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.component.ts:78:7 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<boolean>'.

78   set disabled(value: boolean) {
         ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.component.ts:88:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<boolean>'.

88   writeValue(value) {
     ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.component.ts:88:14 - error TS7006: Parameter 'value' implicitly has an 'any' type.

88   writeValue(value) {
                ~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.component.ts:96:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<boolean>'.

96   setDisabledState(disabled: boolean) {
     ~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.component.ts:122:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<boolean>'.

122   ngOnChanges(changes: SimpleChanges): void {
      ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.component.ts:123:17 - error TS4111: Property 'disabled' comes from an index signature, so it must be accessed with ['disabled'].

123     if (changes.disabled && !changes.disabled.isFirstChange()) {
                    ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.component.ts:123:38 - error TS4111: Property 'disabled' comes from an index signature, so it must be accessed with ['disabled'].

123     if (changes.disabled && !changes.disabled.isFirstChange()) {
                                         ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.component.ts:124:19 - error TS4111: Property 'disabled' comes from an index signature, so it must be accessed with ['disabled'].

124       if (changes.disabled.currentValue) {
                      ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.component.ts:132:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<boolean>'.

132   ngOnDestroy(): void {
      ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-form-field/kal-form-field.component.ts:25:19 - error TS7016: Could not find a declaration file for module 'lodash-es/isNil'. '/home/ydomenjoud/projet/kalidea/kaligraphi/node_modules/lodash-es/isNil.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/lodash-es` if it exists or add a new declaration (.d.ts) file containing `declare module 'lodash-es/isNil';`

25 import isNil from 'lodash-es/isNil';
                     ~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-form-field/kal-form-field.component.ts:77:3 - error TS2564: Property 'label' has no initializer and is not definitely assigned in the constructor.

77   label: string;
     ~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-form-field/kal-form-field.component.ts:87:3 - error TS2564: Property 'for' has no initializer and is not definitely assigned in the constructor.

87   for: string;
     ~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-form-field/kal-form-field.component.ts:92:12 - error TS2564: Property 'legend' has no initializer and is not definitely assigned in the constructor.

92   @Input() legend: string;
              ~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-form-field/kal-form-field.component.ts:98:12 - error TS2564: Property 'displayErrors' has no initializer and is not definitely assigned in the constructor.

98   @Input() displayErrors: boolean;
              ~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-form-field/kal-form-field.component.ts:101:3 - error TS2564: Property 'formElement' has no initializer and is not definitely assigned in the constructor.

101   formElement: FormElementComponent;
      ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-form-field/kal-form-field.component.ts:104:3 - error TS2564: Property 'labelTemplate' has no initializer and is not definitely assigned in the constructor.

104   labelTemplate: KalFormFieldLabelDirective;
      ~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-form-field/kal-form-field.component.ts:123:5 - error TS2322: Type 'ValidationErrors | null' is not assignable to type 'Record<string, any>'.
  Type 'null' is not assignable to type 'Record<string, any>'.

123     return this.formElement.errors;
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-form-field/kal-form-field.component.ts:171:5 - error TS2322: Type 'boolean | null' is not assignable to type 'boolean'.
  Type 'null' is not assignable to type 'boolean'.

171     this.hasError = (!!this.formFieldOptions.showErrorAtDisplay || this.formElement.dirty)
        ~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/99-utility/directives/kal-autofocus/kal-autofocus.directive.ts:10:12 - error TS2564: Property 'kalAutofocus' has no initializer and is not definitely assigned in the constructor.

10   @Input() kalAutofocus: boolean;
              ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-loader/kal-loader-data.ts:2:3 - error TS2564: Property 'message' has no initializer and is not definitely assigned in the constructor.

2   message: string;
    ~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-loader/kal-loader.component.ts:25:7 - error TS7032: Property 'classes' implicitly has type 'any', because its set accessor lacks a parameter type annotation.

25   set classes(classes) {
         ~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-loader/kal-loader.component.ts:25:15 - error TS7006: Parameter 'classes' implicitly has an 'any' type.

25   set classes(classes) {
                 ~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-overlay-manager.ts:35:7 - error TS2322: Type 'null' is not assignable to type 'OverlayRef'.

35       overlayRef = null;
         ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/classes/kal-overlay-manager.ts:50:25 - error TS7006: Parameter 'config' implicitly has an 'any' type.

50   protected applyConfig(config, positionStrategy: PositionStrategy, scrollStrategy: ScrollStrategy = this.scrollStrategies.block()) {
                           ~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-loader/kal-loading.directive.ts:24:3 - error TS2564: Property 'kalLoadingMessage' has no initializer and is not definitely assigned in the constructor.

24   kalLoadingMessage: string;
     ~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-loader/kal-loading.directive.ts:45:11 - error TS2564: Property 'overlayRef' has no initializer and is not definitely assigned in the constructor.

45   private overlayRef: OverlayRef;
             ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-loader/kal-loading.directive.ts:53:15 - error TS4115: This parameter property must have an 'override' modifier because it overrides a member in base class 'KalOverlayManager'.

53               protected readonly overlay: Overlay,
                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-button/kal-button.component.ts:19:40 - error TS2564: Property 'button' has no initializer and is not definitely assigned in the constructor.

19   @ViewChild('button', {static: true}) button: ElementRef<HTMLButtonElement>;
                                          ~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-button/kal-button.component.ts:24:12 - error TS2564: Property 'tabIndex' has no initializer and is not definitely assigned in the constructor.

24   @Input() tabIndex: number;
              ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-button/kal-button.component.ts:38:5 - error TS2322: Type 'number | null' is not assignable to type 'number'.
  Type 'null' is not assignable to type 'number'.

38     this.tabIndex = this.disabled ? this.tabIndex : null;
       ~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-calendar/kal-calendar-header/kal-calendar-header.component.ts:23[0m:3 - error TS2564: Property 'isMultiView' has no initializer and is not definitely assigned in the constructor.

23   isMultiView: boolean;
     ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-calendar/kal-calendar-multi-view/kal-calendar-multi-view.component.ts:28:12 - error TS2564: Property 'displayedDate' has no initializer and is not definitely assigned in the constructor.

28   @Input() displayedDate: KalDate;
              ~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-calendar/kal-calendar-multi-view/kal-calendar-multi-view.component.ts:30:12 - error TS2564: Property 'minYear' has no initializer and is not definitely assigned in the constructor.

30   @Input() minYear: number;
              ~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-calendar/kal-calendar-multi-view/kal-calendar-multi-view.component.ts:32:12 - error TS2564: Property 'maxYear' has no initializer and is not definitely assigned in the constructor.

32   @Input() maxYear: number;
              ~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-calendar/kal-calendar-month/kal-calendar-month.component.ts:53:11 - error TS2564: Property '_validator' has no initializer and is not definitely assigned in the constructor.

53   private _validator: ValidatorFn;
             ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-calendar/kal-calendar-month/kal-calendar-month.component.ts:54:11 - error TS2564: Property '_currentDate' has no initializer and is not definitely assigned in the constructor.

54   private _currentDate: KalDate;
             ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-calendar/kal-calendar.component.ts:53:77 - error TS2564: Property 'calendarHeader' has no initializer and is not definitely assigned in the constructor.

53   @ViewChild(forwardRef(() => KalCalendarHeaderComponent), {static: false}) calendarHeader: KalCalendarHeaderComponent;
                                                                               ~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-calendar/kal-calendar.component.ts:58:58 - error TS2564: Property 'calendarMonth' has no initializer and is not definitely assigned in the constructor.

58   @ViewChild(KalCalendarMonthComponent, {static: false}) calendarMonth: KalCalendarMonthComponent;
                                                            ~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-calendar/kal-calendar.component.ts:65:11 - error TS2564: Property '_maxYear' has no initializer and is not definitely assigned in the constructor.

65   private _maxYear: number;
             ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-calendar/kal-calendar.component.ts:135:12 - error TS2531: Object is possibly 'null'.

135     return parentControl.control.validator;
               ~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-calendar/kal-calendar.component.ts:135:12 - error TS2531: Object is possibly 'null'.

135     return parentControl.control.validator;
               ~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-calendar/kal-calendar.component.ts:165:38 - error TS2345: Argument of type 'number | null' is not assignable to parameter of type 'number'.
  Type 'null' is not assignable to type 'number'.

165       this.calendarMonth.updateMonth($event);
                                         ~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-datepicker.component.ts:45:52 - error TS2564: Property 'datepickerCalendar' has no initializer and is not definitely assigned in the constructor.

45   @ViewChild('datepickerCalendar', {static: true}) datepickerCalendar: TemplatePortal;
                                                      ~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-datepicker.component.ts:50:49 - error TS2564: Property 'kalInput' has no initializer and is not definitely assigned in the constructor.

50   @ViewChild(KalInputComponent, {static: true}) kalInput: KalInputComponent;
                                                   ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-datepicker.component.ts:55:3 - error TS2564: Property 'control' has no initializer and is not definitely assigned in the constructor.

55   control: FormControl;
     ~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-datepicker.component.ts:55:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<KalDate>'.

55   control: FormControl;
     ~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-datepicker.component.ts:60:3 - error TS2564: Property 'currentDate' has no initializer and is not definitely assigned in the constructor.

60   currentDate: KalDate;
     ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-datepicker.component.ts:62:12 - error TS2564: Property 'format' has no initializer and is not definitely assigned in the constructor.

62   @Input() format: KalDateFormat;
              ~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-datepicker.component.ts:102:11 - error TS2564: Property 'overlayRef' has no initializer and is not definitely assigned in the constructor.

102   private overlayRef: OverlayRef;
              ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-datepicker.component.ts:112:11 - error TS2564: Property '_maxYear' has no initializer and is not definitely assigned in the constructor.

112   private _maxYear: number;
              ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-datepicker.component.ts:202:17 - error TS2345: Argument of type 'null' is not assignable to parameter of type 'MouseEvent | undefined'.

202       this.open(null, 'icon');
                    ~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-datepicker.component.ts:206:8 - error TS2322: Type 'null' is not assignable to type 'MouseEvent'.

206   open($event: MouseEvent = null, origin: 'icon' | 'mouse' = 'mouse') {
           ~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-datepicker.component.ts:252:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<KalDate>'.

252   writeValue(value: KalDateType) {
      ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-datepicker.component.ts:266:26 - error TS2345: Argument of type 'KalDate | null' is not assignable to parameter of type 'KalDate'.
  Type 'null' is not assignable to type 'KalDate'.

266       this.setInputValue(value ? kalDate : null, {emitEvent: false});
                             ~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-datepicker.component.ts:309:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<KalDate>'.

309   ngOnDestroy() {
      ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-datepicker.component.ts:320:7 - error TS2345: Argument of type 'OperatorFunction<any, KalDate | null>' is not assignable to parameter of type 'OperatorFunction<any, KalDate>'.
  Type 'KalDate | null' is not assignable to type 'KalDate'.
    Type 'null' is not assignable to type 'KalDate'.

320       map(value => !!value ? coerceKalDateProperty(value, this.format) : null), // transform as date or send null if the input is empty
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio.component.ts:41:78 - error TS2564: Property 'radios' has no initializer and is not definitely assigned in the constructor.

41   @ContentChildren(forwardRef(() => KalRadioComponent), {descendants: true}) radios: QueryList<KalRadioComponent>;
                                                                                ~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio.component.ts:43:39 - error TS2564: Property 'input' has no initializer and is not definitely assigned in the constructor.

43   @ViewChild('input', {static: true}) input: ElementRef<HTMLInputElement>;
                                         ~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio.component.ts:48:11 - error TS2322: Type 'null' is not assignable to type 'KalRadioComponent'.

48   private selectedRadioButton: KalRadioComponent = null;
             ~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio.component.ts:53:11 - error TS2564: Property 'radioValue' has no initializer and is not definitely assigned in the constructor.

53   private radioValue: string;
             ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio.component.ts:79:7 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<any>'.

79   get value() {
         ~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio.component.ts:83:7 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<any>'.

83   set value(value: any) {
         ~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio.component.ts:97:7 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<any>'.

97   get name() {
         ~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio.component.ts:101:7 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<any>'.

101   set name(value: string) {
          ~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio.component.ts:117:7 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<any>'.

117   get disabled() {
          ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio.component.ts:121:7 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<any>'.

121   set disabled(value: boolean) {
          ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio.component.ts:176:7 - error TS2322: Type 'null' is not assignable to type 'KalRadioComponent'.

176       this.selectedRadioButton = null;
          ~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio.component.ts:195:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<any>'.

195   writeValue(value: string) {
      ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio.component.ts:202:5 - error TS2322: Type 'NgControl | null' is not assignable to type 'NgControl'.
  Type 'null' is not assignable to type 'NgControl'.

202     this.ngControl = this.injector.get(NgControl, null);
        ~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio.component.ts:226:12 - error TS2564: Property 'name' has no initializer and is not definitely assigned in the constructor.

226   @Input() name: string;
               ~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio.component.ts:231:3 - error TS7008: Member 'inputId' implicitly has an 'any' type.

231   inputId;
      ~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio.component.ts:241:3 - error TS2564: Property 'labelRadioPosition' has no initializer and is not definitely assigned in the constructor.

241   labelRadioPosition: 'before' | 'after';
      ~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio.component.ts:251:11 - error TS2564: Property 'isChecked' has no initializer and is not definitely assigned in the constructor.

251   private isChecked: boolean;
              ~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio.component.ts:256:11 - error TS2564: Property 'radioValue' has no initializer and is not definitely assigned in the constructor.

256   private radioValue: string;
              ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio.component.ts:319:9 - error TS2322: Type 'null' is not assignable to type 'KalRadioComponent'.

319         this.radioGroup.selected = null;
            ~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-rater/kal-rater.component.ts:29:3[0m - error TS2564: Property 'rateValues' has no initializer and is not definitely assigned in the constructor.

29   rateValues: number[];
     ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-rater/kal-rater.component.ts:51:7 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<number>'.

51   get value(): number {
         ~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-rater/kal-rater.component.ts:55:7 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<number>'.

55   set value(value: number) {
         ~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-rater/kal-rater.component.ts:93:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<number>'.

93   writeValue(value) {
     ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-rater/kal-rater.component.ts:93:14 - error TS7006: Parameter 'value' implicitly has an 'any' type.

93   writeValue(value) {
                ~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-rater/kal-rater.component.ts:101:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<number>'.

101   notifyUpdate(newValue: number): void {
      ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-rater/kal-rater.component.ts:135:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<number>'.

135   ngOnChanges(changes: SimpleChanges): void {
      ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:29:21 - error TS7016: Could not find a declaration file for module 'lodash-es/isEqual'. '/home/ydomenjoud/projet/kalidea/kaligraphi/node_modules/lodash-es/isEqual.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/lodash-es` if it exists or add a new declaration (.d.ts) file containing `declare module 'lodash-es/isEqual';`

29 import isEqual from 'lodash-es/isEqual';
                       ~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:72:12 - error TS2564: Property 'triggerValueFunction' has no initializer and is not definitely assigned in the constructor.

72   @Input() triggerValueFunction: KalSelectOptionsTriggerValueFunction;
              ~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:77:61 - error TS2564: Property 'options' has no initializer and is not definitely assigned in the constructor.

77   @ContentChildren(KalOptionComponent, {descendants: true}) options: QueryList<KalOptionComponent>;
                                                               ~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:79:49 - error TS2564: Property 'kalSelectPlaceholder' has no initializer and is not definitely assigned in the constructor.

79   @ContentChild(KalSelectTriggerValueDirective) kalSelectPlaceholder: KalSelectTriggerValueDirective;
                                                   ~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:84:47 - error TS2564: Property 'optionsPortal' has no initializer and is not definitely assigned in the constructor.

84   @ViewChild('optionsPortal', {static: true}) optionsPortal: TemplatePortal;
                                                 ~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:87:33 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<any>'.

87   @HostBinding('attr.tabIndex') tabIndex = 0;
                                   ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:92:3 - error TS2564: Property 'selection' has no initializer and is not definitely assigned in the constructor.

92   selection: KalOptionComponent[];
     ~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:97:12 - error TS7008: Member 'displayCheckboxOnMultipleSelection' implicitly has an 'any' type.

97   @Input() displayCheckboxOnMultipleSelection;
              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:102:11 - error TS2564: Property 'isMultiple' has no initializer and is not definitely assigned in the constructor.

102   private isMultiple: boolean;
              ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:106:11 - error TS2564: Property 'overlayRef' has no initializer and is not definitely assigned in the constructor.

106   private overlayRef: OverlayRef;
              ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:110:11 - error TS2564: Property 'keyManager' has no initializer and is not definitely assigned in the constructor.

110   private keyManager: ActiveDescendantKeyManager<KalOptionComponent>;
              ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:114:11 - error TS2564: Property 'isFocused' has no initializer and is not definitely assigned in the constructor.

114   private isFocused: boolean;
              ~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:118:11 - error TS2564: Property 'isPanelOpen' has no initializer and is not definitely assigned in the constructor.

118   private isPanelOpen: boolean;
              ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:122:11 - error TS2564: Property 'optionsChangesSubscription' has no initializer and is not definitely assigned in the constructor.

122   private optionsChangesSubscription: Subscription;
              ~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:194:7 - error TS2322: Type 'null' is not assignable to type 'string'.

194       return null;
          ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:198:7 - error TS2322: Type 'null' is not assignable to type 'string'.

198       return null;
          ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:215:7 - error TS2322: Type 'null' is not assignable to type 'KalOptionComponent | KalOptionComponent[]'.

215       return null;
          ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:230:13 - error TS7034: Variable 'selectedValues' implicitly has type 'any[]' in some locations where its type cannot be determined.

230       const selectedValues = [];
                ~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:233:14 - error TS7005: Variable 'selectedValues' implicitly has an 'any[]' type.

233       return selectedValues;
                 ~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:316:29 - error TS2345: Argument of type '(Highlightable & KalOptionComponent) | null' is not assignable to parameter of type 'KalOptionComponent'.
  Type 'null' is not assignable to type 'KalOptionComponent'.

316         this.optionSelected(this.keyManager.activeItem, withNotify);
                                ~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:400:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<any>'.

400   writeValue(value: any) {
      ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:599:32 - error TS2345: [0mArgument of type '(Highlightable & KalOptionComponent) | null' is not assignable to parameter of type 'KalOptionComponent'.
  Type 'null' is not assignable to type 'KalOptionComponent'.

599     if (this.selection.indexOf(this.keyManager.activeItem) < 0) {
                                   ~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:632:5 - error TS2322: Type 'NgControl | null' is not assignable to type 'NgControl'.
  Type 'null' is not assignable to type 'NgControl'.

632     this.ngControl = this.injector.get(NgControl, null);
        ~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-select/kal-select.component.ts:672:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<any>'.

672   ngOnDestroy() {
      ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-slider/kal-slider.component.ts:16:19 - error TS7016: Could not find a declaration file for module 'lodash-es/isNil'. '/home/ydomenjoud/projet/kalidea/kaligraphi/node_modules/lodash-es/isNil.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/lodash-es` if it exists or add a new declaration (.d.ts) file containing `declare module 'lodash-es/isNil';`

16 import isNil from 'lodash-es/isNil';
                     ~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-slider/kal-slider.component.ts:45:3 - error TS2564: Property 'min' has no initializer and is not definitely assigned in the constructor.

45   min: number;
     ~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-slider/kal-slider.component.ts:49:[93m3 - error TS2564: Property 'max' has no initializer and is not definitely assigned in the constructor.

49   max: number;
     ~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-slider/kal-slider.component.ts:56:3 - error TS2564: Property 'color' has no initializer and is not definitely assigned in the constructor.

56   color: string;
     ~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-slider/kal-slider.component.ts:59:12 - error TS2416: Property 'valueChanges' in type 'KalSliderComponent' is not assignable to the same property in base type 'FormElementComponent<number>'.
  Type 'EventEmitter<number | null>' is not assignable to type 'EventEmitter<number>'.
    Types of property 'subscribe' are incompatible.
      Type '{ (next?: ((value: number | null) => void) | undefined, error?: ((error: any) => void) | undefined, complete?: (() => void) | undefined): Subscription; (observerOrNext?: any, error?: any, complete?: any): Subscription; }' is not assignable to type '{ (next?: ((value: number) => void) | undefined, error?: ((error: any) => void) | undefined, complete?: (() => void) | undefined): Subscription; (observerOrNext?: any, error?: any, complete?: any): Subscription; }'.
        Types of parameters 'next' and 'next' are incompatible.
          Types of parameters 'value' and 'value' are incompatible.
            Type 'number | null' is not assignable to type 'number'.
              Type 'null' is not assignable to type 'number'.

59   readonly valueChanges: EventEmitter<number | null> = new EventEmitter<number | null>();
              ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-slider/kal-slider.component.ts:59:12 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<number>'.

59   readonly valueChanges: EventEmitter<number | null> = new EventEmitter<number | null>();
              ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-slider/kal-slider.component.ts:64:55 - error TS2564: Property 'sliderWrapper' has no initializer and is not definitely assigned in the constructor.

64   @ViewChild('sliderWrapper', {static: true}) private sliderWrapper: ElementRef;
                                                         ~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-slider/kal-slider.component.ts:66:13 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<number>'.

66   protected _value = 0;
               ~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-slider/kal-slider.component.ts:72:7 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<number>'.

72   get value() {
         ~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-slider/kal-slider.component.ts:77:7 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<number>'.

77   set value(value: number) {
         ~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-slider/kal-slider.component.ts:118:20 - error TS2531: Object is possibly 'null'.

118     const offset = this.sliderDimensions.left;
                       ~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-slider/kal-slider.component.ts:164:20 - error TS2531: Object is possibly 'null'.

164     const offset = this.sliderDimensions.left;
                       ~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-slider/kal-slider.component.ts:200:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<number>'.

200   writeValue(value) {
      ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-slider/kal-slider.component.ts:200:14 - error TS7006: Parameter 'value' implicitly has an 'any' type.

200   writeValue(value) {
                 ~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-slider/kal-slider.component.ts:224:40 - error TS2531: Object is possibly 'null'.

224     const percent = clamp(position, 0, this.sliderDimensions.width) / this.sliderDimensions.width;
                                           ~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-slider/kal-slider.component.ts:224:71 - error TS2531: Object is possibly 'null'.

224     const percent = clamp(position, 0, this.sliderDimensions.width) / this.sliderDimensions.width;
                                                                          ~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-slider/kal-slider.component.ts:247:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<number>'.

247   ngOnChanges(changes: SimpleChanges): void {
      ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/gestures/gesture-config.ts:40:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'HammerGestureConfig'.

40   events = [
     ~~~~~~
projects/kalidea/kaligraphi/src/lib/utils/gestures/gesture-config.ts:66:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'HammerGestureConfig'.

66   buildHammer(element: HTMLElement): HammerInstance {
     ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-textarea/kal-textarea.component.ts:33:42 - error TS2564: Property 'textarea' has no initializer and is not definitely assigned in the constructor.

33   @ViewChild('textarea', {static: true}) textarea: ElementRef<HTMLTextAreaElement>;
                                            ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-textarea/kal-textarea.component.ts:44:7 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<string>'.

44   get disabled(): boolean {
         ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-textarea/kal-textarea.component.ts:48:7 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<string>'.

48   set disabled(value: boolean) {
         ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-textarea/kal-textarea.component.ts:59:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<string>'.

59   writeValue(value: string) {
     ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/02-form/kal-textarea/kal-textarea.component.ts:82:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<string>'.

82   ngOnDestroy() {
     ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-accordion/kal-expansion-panel/kal-expansion-panel.component.ts:57:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'CdkAccordionItem'.

57   accordion: KalAccordionBase;
     ~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-accordion/kal-expansion-panel/kal-expansion-panel.component.ts:62:38 - error TS2564: Property 'panelBody' has no initializer and is not definitely assigned in the constructor.

62   @ViewChild('body', {static: true}) panelBody: ElementRef<HTMLElement>;
                                        ~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-accordion/kal-expansion-panel/kal-expansion-panel.component.ts:106:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'CdkAccordionItem'.

106   ngOnDestroy() {
      ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-accordion/kal-expansion-panel-header/kal-expansion-panel-header.component.ts:48:33 - error TS7008: Member 'tabIndex' implicitly has an 'any' type.

48   @HostBinding('attr.tabindex') tabIndex;
                                   ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-accordion/kal-expansion-panel-header/kal-expansion-panel-header.component.ts:53:38 - error TS7008: Member 'ariaExpanded' implicitly has an 'any' type.

53   @HostBinding('attr.aria-expanded') ariaExpanded;
                                        ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-accordion/kal-expansion-panel-header/kal-expansion-panel-header.component.ts:58:38 - error TS7008: Member 'ariaDisabled' implicitly has an 'any' type.

58   @HostBinding('attr.aria-disabled') ariaDisabled;
                                        ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-accordion/kal-expansion-panel-header/kal-expansion-panel-header.component.ts:76:60 - error TS4111: Property 'hideToggle' comes from an index signature, so it must be accessed with ['hideToggle'].

76       panel.inputChanges.pipe(filter(changes => !!(changes.hideToggle || changes.disabled)))
                                                              ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-accordion/kal-expansion-panel-header/kal-expansion-panel-header.component.ts:76:82 - error TS4111: Property 'disabled' comes from an index signature, so it must be accessed with ['disabled'].

76       panel.inputChanges.pipe(filter(changes => !!(changes.hideToggle || changes.disabled)))
                                                                                    ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-accordion/kal-expansion-panel-header/kal-expansion-panel-header.component.ts:125:48 - error TS7006: Parameter '$event' implicitly has an 'any' type.

125   @HostListener('keydown', ['$event']) keydown($event) {
                                                   ~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-accordion/kal-accordion.component.ts:28:3 - error TS2564: Property 'panelsHeaders' has no initializer and is not definitely assigned in the constructor.

28   panelsHeaders: QueryList<KalExpansionPanelHeaderComponent>;
     ~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-accordion/kal-accordion.component.ts:33:11 - error TS2564: Property 'keyManager' has no initializer and is not definitely assigned in the constructor.

33   private keyManager: FocusKeyManager<KalExpansionPanelHeaderComponent>;
             ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-card/kal-card.component.ts:27:57 - error TS2564: Property 'kalCardTitleComponent' has no initializer and is not definitely assigned in the constructor.

27   @ContentChild(KalCardTitleComponent, {static: false}) kalCardTitleComponent: KalCardTitleComponent;
                                                           ~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-carousel/kal-carousel-item.directive.ts:22:3 - error TS2564: Property '$implicit' has no initializer and is not definitely assigned in the constructor.

22   $implicit: T;
     ~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-carousel/kal-carousel-item.directive.ts:25:3 - error TS2564: Property 'index' has no initializer and is not definitely assigned in the constructor.

25   index: number;
     ~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-carousel/kal-carousel-item.directive.ts:28:3 - error0m TS2564: Property 'count' has no initializer and is not definitely assigned in the constructor.

28   count: number;
     ~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-carousel/kal-carousel-item.directive.ts:31:3 - error TS2564: Property 'first' has no initializer and is not definitely assigned in the constructor.

31   first: boolean;
     ~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-carousel/kal-carousel-item.directive.ts:34:3 - error TS2564: Property 'status' has no initializer and is not definitely assigned in the constructor.

34   status: KalCarouselItemStatus;
     ~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-carousel/kal-carousel-item.directive.ts:37:3 - error TS2564: Property 'last' has no initializer and is not definitely assigned in the constructor.

37   last: boolean;
     ~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-carousel/kal-carousel-item.directive.ts:49:11 - error TS2564: Property 'player' has no initializer and is not definitely assigned in the constructor.

49   private player: AnimationPlayer;
             ~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-carousel/kal-carousel-item.directive.ts:160:27 - error TS7006: Parameter 'viewRef' implicitly has an 'any' type.

160   private createAnimation(viewRef, positionTo, moveAfterAnimation, animation: AnimationFactory) {
                              ~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-carousel/kal-carousel-item.directive.ts:160:36 - error TS7006: Parameter 'positionTo' implicitly has an 'any' type.

160[0m   private createAnimation(viewRef, positionTo, moveAfterAnimation, animation: AnimationFactory) {
                                       ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-carousel/kal-carousel-item.directive.ts:160:48 - error TS7006: Parameter 'moveAfterAnimation' implicitly has an 'any' type.

160   private createAnimation(viewRef, positionTo, moveAfterAnimation, animation: AnimationFactory) {
                                                   ~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-nav/kal-nav.component.ts:21:12 - error TS7008: Member 'logo' implicitly has an 'any' type.

21   @Input() logo;
              ~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-nav/kal-nav.component.ts:26:12 - error TS2564: Property 'items' has no initializer and is not definitely assigned in the constructor.

26   @Input() items: KalNavItem[];
              ~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-stepper/kal-stepper.component.ts:36:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'CdkStepHeader'.

36   focus() {
     ~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-stepper/kal-stepper.component.ts:56:57 - error TS2564: Property 'stepLabel' has no initializer and is not definitely assigned in the constructor.

56   @ContentChild(KalStepLabelDirective, {static: false}) stepLabel: KalStepLabelDirective;
                                                           ~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-stepper/kal-stepper.component.ts:56:57m - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'CdkStep'.

56   @ContentChild(KalStepLabelDirective, {static: false}) stepLabel: KalStepLabelDirective;
                                                           ~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-stepper/kal-stepper.component.ts:79:3 - error TS2564: Property '_stepHeader' has no initializer and is not definitely assigned in the constructor.

79   _stepHeader: QueryList<KalStepHeaderDirective>;
     ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-stepper/kal-stepper.component.ts:79:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'CdkStepper'.

79   _stepHeader: QueryList<KalStepHeaderDirective>;
     ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-stepper/kal-stepper.component.ts:82:59 - error TS2564: Property '_steps' has no initializer and is not definitely assigned in the constructor.

82   @ContentChildren(KalStepComponent, {descendants: true}) _steps: QueryList<KalStepComponent>;
                                                             ~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-stepper/kal-stepper.component.ts:82:59 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'CdkStepper'.

82   @ContentChildren(KalStepComponent, {descendants: true}) _steps: QueryList<KalStepComponent>;
                                                             ~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-stepper/kal-stepper.component.ts:85:12 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'CdkStepper'.

85   readonly steps: QueryList<KalStepComponent> = new QueryList<KalStepComponent>();
              ~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-stepper/kal-stepper.component.ts:87:13 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'CdkStepper'.

87   protected _orientation: StepperOrientation = 'horizontal';
               ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-stepper/kal-stepper.component.ts:91:7 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'CdkStepper'.

91   get orientation() {
         ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-stepper/kal-stepper.component.ts:95:7 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'CdkStepper'.

95   set orientation(orientation: StepperOrientation) {
         ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-stepper/kal-stepper.component.ts:99:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'CdkStepper'.

99   ngAfterContentInit() {
     ~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-stepper/kal-step-header.component.ts:29:12 - error TS2564: Property 'state' has no initializer and is not definitely assigned in the constructor.

29   @Input() state: string;
              ~~~~~
[96mprojects/kalidea/kaligraphi/src/lib/03-layout/kal-stepper/kal-step-header.component.ts:32:12 - error TS2564: Property 'label' has no initializer and is not definitely assigned in the constructor.

32   @Input() label: KalStepLabelDirective | string;
              ~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-stepper/kal-step-header.component.ts:35:12 - error TS2564: Property 'index' has no initializer and is not definitely assigned in the constructor.

35   @Input() index: number;
              ~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-stepper/kal-step-header.component.ts:38:12 - error TS2564: Property 'selected' has no initializer and is not definitely assigned in the constructor.

38   @Input() selected: boolean;
              ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-stepper/kal-step-header.component.ts:41:12 - error TS2564: Property 'active' has no initializer and is not definitely assigned in the constructor.

41   @Input() active: boolean;
              ~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-stepper/kal-step-header.component.ts:44:12 - error TS2564: Property 'optional' has no initializer and is not definitely assigned in the constructor.

44   @Input() optional: boolean;
              ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tabs/kal-tab/kal-tab.component.ts:37:55 - error TS2564: Property 'templateLabel' has no initializer and is not definitely assigned in the constructor.

37   @ContentChild(KalTabLabelDirective, {static: true}) templateLabel: KalTabLabelDirective;
                                                         ~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tabs/kal-tab/kal-tab.component.ts:42:76 - error TS2564: Property '_explicitContent' has no initializer and is not definitely assigned in the constructor.

42   @ContentChild(KalTabContentDirective, {read: TemplateRef, static: true}) _explicitContent: TemplateRef<any>;
                                                                              ~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tabs/kal-tab/kal-tab.component.ts:47:43 - error TS2564: Property '_implicitContent' has no initializer and is not definitely assigned in the constructor.

47   @ViewChild(TemplateRef, {static: true}) _implicitContent: TemplateRef<any>;
                                             ~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tabs/kal-tab/kal-tab.component.ts:119:5 - error TS2322: Type 'TemplatePortal<any> | null' is not assignable to type 'TemplatePortal<any>'.
  Type 'null' is not assignable to type 'TemplatePortal<any>'.

119     return this._contentPortal;
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tabs/kal-tab-area.ts:11:12 - error TS2564: Property 'content' has no initializer and is not definitely assigned in the constructor.

11   @Input() content: TemplatePortal;
              ~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tabs/kal-tab-area.ts:16:48 - error TS2564: Property 'portalOutlet' has no initializer and is not definitely assigned in the constructor.

16   @ViewChild(CdkPortalOutlet, {static: false}) portalOutlet: CdkPortalOutlet;
                                                  ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tabs/kal-tab-header/kal-tab-header.component.ts:22:3 - error TS2564: Property 'highlighted' has no initializer and is not definitely assigned in the constructor.

22   highlighted: boolean;
     ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tabs/kal-tab-group/kal-tab-group.component.ts:44:76 - error TS2564: Property 'tabs' has no initializer and is not definitely assigned in the constructor.

44   @ContentChildren(forwardRef(() => KalTabComponent), {descendants: true}) tabs: QueryList<KalTabComponent>;
                                                                              ~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tabs/kal-tab-group/kal-tab-group.component.ts:49:40 - error TS2564: Property 'headers' has no initializer and is not definitely assigned in the constructor.

49   @ViewChildren(KalTabHeaderComponent) headers: QueryList<KalTabHeaderComponent>;
                                          ~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tabs/kal-tab-group/kal-tab-group.component.ts:59:11 - error TS2564: Property 'keyManager' has no initializer and is not definitely assigned in the constructor.

59   private keyManager: ActiveDescendantKeyManager<KalTabHeaderComponent>;
             ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tabs/kal-tab-group/kal-tab-group.component.ts:64:11 - error TS2564: Property 'isFocused' has no initializer and is not definitely assigned in the constructor.

64   private isFocused: boolean;
             ~~~~~~~~~[0m
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tabs/kal-tab-group/kal-tab-group.component.ts:98:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'FormElementComponent<any>'.

98   writeValue(value = null) {
     ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tabs/kal-tab-group/kal-tab-group.component.ts:113:15 - error TS7006: Parameter 'value' implicitly has an 'any' type.

113   getTabIndex(value): number {
                  ~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tabs/kal-tab-group/kal-tab-group.component.ts:168:28 - error TS2345: Argument of type 'KalTabComponent | undefined' is not assignable to parameter of type 'KalTabComponent'.
  Type 'undefined' is not assignable to type 'KalTabComponent'.

168       this.selectTabHeader(tabToSelect, this.keyManager.activeItemIndex);
                               ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tree/classes/kal-tree-node.ts:3:3 - error TS2564: Property 'id' has no initializer and is not definitely assigned in the constructor.

3   id: string;
    ~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tree/classes/kal-tree-node.ts:22:3 - error TS2564: Property 'id' has no initializer and is not definitely assigned in the constructor.

22   id: string;
     ~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tree/classes/kal-tree-control.ts:12:7 - error TS2345: Argument of type '(node: KalFlatTreeNode) => number | undefined' is not assignable to parameter of type '(dataNode: KalFlatTreeNode) => number'.
  Type 'number | undefined' is not assignable to type 'number'.
    Type 'undefined' is not assignable to type 'number'.

12       (node: KalFlatTreeNode) => node.level,
         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tree/components/kal-tree.component.ts:38:58 - error TS2564: Property '_nodeOutlet' has no initializer and is not definitely assigned in the constructor.

38   @ViewChild(KalTreeNodeOutletDirective, {static: true}) _nodeOutlet: KalTreeNodeOutletDirective;
                                                            ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tree/components/kal-tree.component.ts:38:58 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'CdkTree<KalTreeNode, KalTreeNode>'.

38   @ViewChild(KalTreeNodeOutletDirective, {static: true}) _nodeOutlet: KalTreeNodeOutletDirective;
                                                            ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tree/components/kal-tree.component.ts:42:12 - error TS2564: Property 'treeControl' has no initializer and is not definitely assigned in the constructor.

42   @Input() treeControl: KalTreeControl;
              ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tree/components/kal-tree.component.ts:42:12 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'CdkTree<KalTreeNode, KalTreeNode>'.

42   @Input() treeControl: KalTreeControl;
              ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tree/components/kal-tree.component.ts:56:m3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'CdkTree<KalTreeNode, KalTreeNode>'.

56   ngOnInit() {
     ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tree/components/kal-tree.component.ts:62:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'CdkTree<KalTreeNode, KalTreeNode>'.

62   ngOnDestroy(): void {
     ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tree/components/kal-tree-node.component.ts:42:12 - error TS7008: Member 'disabled' implicitly has an 'any' type.

42   @Input() disabled;
              ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tree/components/kal-tree-node.component.ts:46:69 - error TS2564: Property 'nodeOutlet' has no initializer and is not definitely assigned in the constructor.

46   @ContentChildren(KalTreeNodeOutletDirective, {descendants: true}) nodeOutlet: QueryList<KalTreeNodeOutletDirective>;
                                                                       ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tree/components/kal-tree-node.component.ts:68:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'CdkTreeNode<KalTreeNode, KalTreeNode>'.

68   ngOnDestroy() {
     ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tree/directives/kal-tree-node-def.directive.ts:10:3 - error TS2564: Property 'data' has no initializer and is not definitely assigned in the constructor.

10   data: T;
     ~~~~m
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tree/directives/kal-tree-node-def.directive.ts:18:7 - error TS7032: Property 'kalTreeNodeDefWhen' implicitly has type 'any', because its set accessor lacks a parameter type annotation.

18   set kalTreeNodeDefWhen(when) {
         ~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tree/directives/kal-tree-node-def.directive.ts:18:26 - error TS7006: Parameter 'when' implicitly has an 'any' type.

18   set kalTreeNodeDefWhen(when) {
                            ~~~~
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tree/classes/kal-tree-data-source.ts:110:15 - error TS2322: Type 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.

110       node => node.level,
                  ~~~~~~~~~~

  projects/kalidea/kaligraphi/src/lib/03-layout/kal-tree/classes/kal-tree-data-source.ts:24:32
    24               public getLevel: (node: KalFlatTreeNode) => number,
                                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    The expected type comes from the return type of this signature.
projects/kalidea/kaligraphi/src/lib/03-layout/kal-tree/classes/kal-tree-data-source.ts:142:45 - error TS2345: Argument of type 'KalTreeNode | undefined' is not assignable to parameter of type 'KalFlatTreeNode'.
  Type 'undefined' is not assignable to type 'KalFlatTreeNode'.

142     this.treeControl.expansionModel.select( ...nodesOrIds.map(id => this.getFlatNode(id)));
                                                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-dialog/kal-dialog-config.ts:16:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'KalOverlayConfig'.

16   hasBackdrop ? = true;
     ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-dialog/kal-dialog-config.ts:21:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'KalOverlayConfig'.

21   backdropClass ? = 'dialog-backdrop';
     ~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-dialog/kal-dialog-config.ts:31:3 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'KalOverlayConfig'.

31   maxWidth?: number | string = '80vw';
     ~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-dialog/kal-dialog-config.ts:38:13 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'KalOverlayConfig'.

38   protected configName ? = 'dialog';
               ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-dialog/kal-dialog-config.ts:46:9 - error TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'KalDialogConfig<D>'.
  No index signature with a parameter of type 'string' was found on type 'KalDialogConfig<D>'.

46         this[key] = config[key];
           ~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-dialog/kal-dialog-config.ts:46:21 - error TS2532: Object is possibly 'undefined'.

46         this[key] = config[key];
                       ~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-dialog/kal-dialog-config.ts:46:21 - error TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'KalDialogConfig<D>'.
  No index signature with a parameter of type 'string' was found on type 'KalDialogConfig<D>'.

46         this[key] = config[key];
                       ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-dialog/kal-dialog.service.ts:23:15 - error TS4115: This parameter property must have an 'override' modifier because it overrides a member in base class 'KalOverlayManager'.

23   constructor(protected overlay: Overlay,
                 ~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-dialog/kal-dialog-ref.ts:17:3 - error TS2564: Property 'componentInstance' has no initializer and is not definitely assigned in the constructor.

17   componentInstance: T;
     ~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-dialog/kal-dialog-container.component.ts:25:47 - error TS2564: Property 'portalOutlet' has no initializer and is not definitely assigned in the constructor.

25   @ViewChild(CdkPortalOutlet, {static: true}) portalOutlet: CdkPortalOutlet;
                                                 ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-dialog/kal-dialog-container.component.ts:27:11 - error TS2564: Property 'dialogRef' has no initializer and is not definitely assigned in the constructor.

27   private dialogRef: KalDialogRef<any>;
             ~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-dialog/directives/kal-dialog-close.directive.ts:13:20 - error TS2564: Property 'kalDialogClose' has no initializer and is not definitely assigned in the constructor.

13   @Input() private kalDialogClose: string;
                      ~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-drag-drop/directives/kal-drop.directive.ts:38:12 - error TS7008: Member 'kalDropAllowed' implicitly has an 'any' type.

38   @Input() kalDropAllowed;
              ~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-drag-drop/directives/kal-drop.directive.ts:50:11 - error TS2322: Type 'null' is not assignable to type 'KalDropPosition'.

50   private dropPosition: KalDropPosition = null;
             ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-drag-drop/directives/kal-drop.directive.ts:92:5 - error TS2322: Type 'null' is not assignable to type 'KalDropPosition'.

92     this.dropPosition = null;
       ~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-drag-drop/directives/kal-drop.directive.ts:101:7 - error TS2322: Type 'null' is not assignable to type 'KalDropPosition'.

101       this.dropPosition = null;
          ~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-drag-drop/directives/kal-drop.directive.ts:112:8 - error TS7006: Parameter '$event' implicitly has an 'any' type.

112   drop($event) {
           ~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-drag-drop/directives/kal-drop.directive.ts:133:14 - error TS7006: Parameter 'targetHeight' implicitly has an 'any' type.

133     resolver(targetHeight, positionsList) {
                 ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-drag-drop/directives/kal-drop.directive.ts:133:28 - error TS7006: Parameter 'positionsList' implicitly has an 'any' type.

133     resolver(targetHeight, positionsList) {
                               ~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-drag-drop/directives/kal-drop.directive.ts:165:9 - error TS2532: Object is possibly 'undefined'.

165         getPosition(KalDropPosition.Middle).min = 0;
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-drag-drop/directives/kal-drop.directive.ts:167:9 - error TS2532: Object is possibly 'undefined'.

167         getPosition(KalDropPosition.Top).max = targetHeight / 2;
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-drag-drop/directives/kal-drop.directive.ts:168:9 - error TS2532: Object is possibly 'undefined'.

168         getPosition(KalDropPosition.Bot).min = targetHeight / 2;
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-drag-drop/directives/kal-drop.directive.ts:170:9 - error TS2532: Object is possibly 'undefined'.

170         getPosition(KalDropPosition.Middle).max = targetHeight;
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-drag-drop/directives/kal-drop.directive.ts:178:14 - error TS7006: Parameter '$event' implicitly has an 'any' type.

178     resolver($event, positionsList) {
                 ~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-drag-drop/directives/kal-drop.directive.ts:178:22 - error TS7006: Parameter 'positionsList' implicitly has an 'any' type.

178     resolver($event, positionsList) {
                         ~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-drag-drop/directives/kal-drop.directive.ts:195:7 - error TS2322: Type 'KalDropPosition | null' is not assignable to type 'KalDropPosition'.
  Type 'null' is not assignable to type 'KalDropPosition'.

195       dropPosition = positionFound ? positionFound.position : null;
          ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-drag-drop/directives/kal-drag.directive.ts:9:12 - error TS7008: Member 'kalDrag' implicitly has an 'any' type.

9   @Input() kalDrag;
             ~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-drag-drop/directives/kal-drag.directive.ts:19:13 - error TS7006: Parameter '$event' implicitly has an 'any' type.

19   dragStart($event) {
               ~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-menu/kal-menu.component.ts:40:3 - error TS2564: Property 'theme' has no initializer and is not definitely assigned in the constructor.

40   theme: string | string[];
     ~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-menu/kal-menu.component.ts:42:61 - error TS2564: Property 'options' has no initializer and is not definitely assigned in the constructor.

42   @ContentChildren(KalOptionComponent, {descendants: true}) options: QueryList<KalOptionComponent>;
                                                               ~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-menu/kal-menu.component.ts:44:45 - error TS2564: Property 'templateRef' has no initializer and is not definitely assigned in the constructor.

44   @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;
                                               ~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-menu/kal-menu.component.ts:58:11 - error TS2564: Property 'keyManager' has no initializer and is not definitely assigned in the constructor.

58   private keyManager: ActiveDescendantKeyManager<KalOptionComponent>;
             ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-menu/kal-menu.component.ts:64:5 - error TS2322: Type '(Highlightable & KalOptionComponent) | null' is not assignable to type 'KalOptionComponent'.
  Type 'null' is not assignable to type 'KalOptionComponent'.

64     return this.keyManager.activeItem;
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-menu/kal-menu-trigger-for.directive.ts:21:11 - error TS2564: Property 'menu' has no initializer and is not definitely assigned in the constructor.

21   private menu: KalMenuComponent;
             ~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-menu/kal-menu-trigger-for.directive.ts:26:11 - error TS2564: Property 'overlayRef' has no initializer and is not definitely assigned in the constructor.

26   private overlayRef: OverlayRef;
             ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-menu/kal-menu-trigger-for.directive.ts:36:15 - error TS4115: This parameter property must have an 'override' modifier because it overrides a member in base class 'KalOverlayManager'.

36   constructor(protected overlay: Overlay,
                 ~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-menu/kal-menu-trigger-for.directive.ts:102:22 - error TS4111: Property 'bottom' comes from an index signature, so it must be accessed with ['bottom'].

102         kalPositions.bottom,
                         ~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-menu/kal-menu-trigger-for.directive.ts:103:22 - error TS4111: Property 'top' comes from an index signature, so it must be accessed with ['top'].

103         kalPositions.top,
                         ~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-menu/kal-menu-trigger-for.directive.ts:104:22 - error TS4111: Property 'left' comes from an index signature, so it must be accessed with ['left'].

104         kalPositions.left,
                         ~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-menu/kal-menu-trigger-for.directive.ts:105:22 - error TS4111: Property 'right' comes from an index signature, so it must be accessed with ['right'].

105         kalPositions.right,
                         ~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-snackbar/kal-snackbar-config.ts:23:13 - error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'KalOverlayConfig'.

23   protected configName ? = 'snackbar';
               ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-snackbar/kal-snackbar.component.ts:41:11 - error TS7008: Member 'timer' implicitly has an 'any' type.

41   private timer;
             ~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-snackbar/kal-snackbar.component.ts:47:5 - error TS2532: Object is possibly 'undefined'.

47     this.config.action.callback();
       ~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-snackbar/kal-snackbar.component.ts:52:31 - error TS2345: Argument of type 'number | undefined' is not assignable to parameter of type 'number'.
  Type 'undefined' is not assignable to type 'number'.

52     const duration = Math.max(this.config.duration, 1) * 1000;
                                 ~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-snackbar/kal-snackbar.service.ts:19:11 - error TS2564: Property 'activeSnackbar' has no initializer and is not definitely assigned in the constructor.

19   private activeSnackbar: ComponentRef<KalSnackbarComponent>;
             ~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-snackbar/kal-snackbar.service.ts:26:15 - error TS4115: This parameter property must have an 'override' modifier because it overrides a member in base class 'KalOverlayManager'.

26   constructor(protected overlay: Overlay,
                 ~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-snackbar/kal-snackbar.service.ts:63:5 - error TS2322: Type 'null' is not assignable to type 'ComponentRef<KalSnackbarComponent>'.

63     this.activeSnackbar = null;
       ~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-snackbar/kal-snackbar.service.ts:65:26 - error TS2345: Argument of type 'OverlayRef | undefined' is not assignable to parameter of type 'OverlayRef'.
  Type 'undefined' is not assignable to type 'OverlayRef'.

65     this.disposeIfExists(config.overlayRef);
                            ~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-tooltip/kal-tooltip.directive.ts:44:3 - error TS2564: Property 'kalTooltip' has no initializer and is not definitely assigned in the constructor.

44   kalTooltip: string;
     ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-tooltip/kal-tooltip.directive.ts:47:3 - error TS2564: Property 'contentAsTemplate' has no initializer and is not definitely assigned in the constructor.

47   contentAsTemplate: CdkPortal;
     ~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-tooltip/kal-tooltip.directive.ts:49:11 - error TS2564: Property 'overlayRef' has no initializer and is not definitely assigned in the constructor.

49   private overlayRef: OverlayRef;
             ~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-tooltip/kal-tooltip.directive.ts:51:11 - error TS2564: Property 'componentRef' has no initializer and is not definitely assigned in the constructor.

51   private componentRef: ComponentRef<KalTooltipComponent>;
             ~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-tooltip/kal-tooltip.directive.ts:59:15 - error TS4115: This parameter property must have an 'override' modifier because it overrides a member in base class 'KalOverlayManager'.

59   constructor(protected readonly overlay: Overlay,
                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-tooltip/kal-tooltip.directive.ts:147:22 - error TS4111: Property 'bottom' comes from an index signature, so it must be accessed with ['bottom'].

147         kalPositions.bottom,
                         ~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-tooltip/kal-tooltip.directive.ts:148:22 - error TS4111: Property 'top' comes from an index signature, so it must be accessed with ['top'].

148         kalPositions.top,
                         ~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-tooltip/kal-tooltip.directive.ts:149:22 - error TS4111: Property 'left' comes from an index signature, so it must be accessed with ['left'].

149         kalPositions.left,
                         ~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-tooltip/kal-tooltip.directive.ts:150:22 - error TS4111: Property 'right' comes from an index signature, so it must be accessed with ['right'].

150         kalPositions.right,
                         ~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-tooltip/kal-tooltip.directive.ts:198:5 - error TS2322: Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.

198     return this.config.content;
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-tooltip/kal-tooltip.directive.ts:202:5 - error TS2322: Type 'CdkPortal | undefined' is not assignable to type 'CdkPortal'.
  Type 'undefined' is not assignable to type 'CdkPortal'.

202     return this.config.contentAsTemplate;
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
projects/kalidea/kaligraphi/src/lib/04-overlay/kal-tooltip/kal-tooltip.directive.ts:206:5 - error TS2322: Type 'string | string[] | undefined' is not assignable to type 'string | string[]'.
  Type 'undefined' is not assignable to type 'string | string[]'.

206     return this.config.theme;
        ~~~~~~~~~~~~~~~~~~~~~~~~~

