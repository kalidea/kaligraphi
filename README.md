# Kaligraphi

Agnostic Graphic Library based on angular CDK.

Online Demo with last build available here : https://kalidea.github.io/kaligraphi/

[![npm version](https://badge.fury.io/js/%40kalidea%2Fkaligraphi.svg)](https://badge.fury.io/js/%40kalidea%2Fkaligraphi)
[![Build Status](https://travis-ci.org/kalidea/kaligraphi.svg?branch=master)](https://travis-ci.org/kalidea/kaligraphi)
[![Maintainability](https://api.codeclimate.com/v1/badges/2fcfe36810c6e928c806/maintainability)](https://codeclimate.com/github/kalidea/kaligraphi/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2fcfe36810c6e928c806/test_coverage)](https://codeclimate.com/github/kalidea/kaligraphi/test_coverage)

## How To Use

### Installation

* install package `npm i @kalidea/kaligraphi`
* add main module to your app.module.ts : 
  ```
  @NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      KaligraphiModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
  ```
* add library styles :
  * with library compiled stylesheet : 
    ```css
    @import '~@kalidea/kaligraphi/styles/styles.css
    ```
  * with library mixin in sass/scss :
    ```sass  
    @import ~@kalidea/kaligraphi/styles/parameters
    @import ~@kalidea/kaligraphi/styles/kaligraphi
    
    +kaligraphi($parameters)
    ```

### Customization

* override default sass $parameters :
  ```sass  
  @import ~@kalidea/kaligraphi/styles/parameters
  @import ~@kalidea/kaligraphi/styles/kaligraphi
  
  $parameters = deep-map-merge($parameters, ( 'input': ('border' : ('radius': '5px' ))))
  
  +kaligraphi($parameters)
  ```
* use only some composants style
  ```sass  
  @import ~@kalidea/kaligraphi/styles/parameters
  @import ~@kalidea/kaligraphi/styles/kaligraphi
  
  +kal-input($parameters)
  +kal-select($parameters)
  +kal-checkbox($parameters)
  +kal-textarea($parameters)
  ```

## Development

### Code style
use [typescript-code-style.xml](./blob/master/typescript-code-style.xml) file to provide consistency accross development

### Playground

* `npm run serve:playground` for a dev server. Navigate to `http://localhost:4200/`
* `npm run build:playground` for a production build

### Library

* `npm run build:lib` to build library
* `npm run dev:lib` to build library with hot reload

## Link

#### Kaligraphi

* ng build @kalidea/kaligraphi --watch
* npm run copy:styles
* cd dist/kalidea/kaligraphi
* npm link

#### Project

* npm link @kalidea/kaligraphi
