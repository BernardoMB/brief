# Brief

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:420/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Ng serve will serve the app with
```
ng build --aot = true
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Changes

The app will run in port 420.

## Modales

Tener cuidado con lo que se agrega en los modulos como ModalModule.forRoot y esas cosas.

## Se agrega JQuery

https://medium.com/@swarnakishore/how-to-include-and-use-jquery-in-angular-cli-project-592e0fe63176

## Bootstrap

Instalar ng-bootstrap y bootstrap normal. Incluir bootstrap en los estilos globales.
Add the following script into angular-cli.config.json 
``` 
"scripts": [
"../node_modules/jquery/dist/jquery.min.js",
"../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

# Fontawesome

Inser the following code to ``index.html``
```
<!-- FontAwesome -->
<script src="https://use.fontawesome.com/6c2fcf37ca.js"></script>
```

# Status bar color

Inser the following code to ``index.html``
```
<!-- Status bar color for Chrome, Firefox OS and Opera -->
  <meta name="theme-color" content="#32b3aa">
  <!-- Status bar color for Windows Phone -->
  <meta name="msapplication-navbutton-color" content="#32b3aa">
  <!-- Status bar color for iOS Safari -->
  <meta name="apple-mobile-web-app-status-bar-style" content="#32b3aa">
```

## Server

Para correr el server es necesario installar `ts-node` como dependencia global:
```
$ npm install -g ts-node
```

El server se conecta mediante sockets con el cliente.


## NgRx Store

The store is a small client-side in-memory database that is going to be a single service or a single point of interaction between multiple components inside the aplication. If we want to modify something in the state of the aplication we shall dispatch an action to the store. Once the action is recieved by the store it will take its internal state and apply a function to produce the new state. That function is the reducer function. The store will produce the new state, safe the old state internally, and send the new store to all the views that have subscribed to the state of the aplication.

The problem that the store solves is the problem of displaying the same data (or transformations of it) in several parts of the user interface. The server will be sending this data and the client will be able to interact with it, the client will also be able to modify this data and update it in all parts of the user interface throught the store without necessarlly updating the server.


## Test URL

http://localhost:4200/activity/product/1/%7B%22fullName%22:%22John%20Doe%22%7D/420

## Scripts

- Alternative script
    ``` javascript
    "start": "ng serve --proxy proxy.conf.json",
    ```

## Deployment

Configure server to serve static files in dist folder once the proyect is compiled and builded. See `server.ts`.

Move the following dev-dependencies to dependencies:
``` javascript
{
    "@angular/cli": "1.6.3",
    "@angular/compiler-cli": "^4.0.0",
    "typescript": "~2.3.3",
    "@types/node": "~6.0.60",
    "ts-node": "~3.2.0"
}
```
Tell Heroku which versions of NodeJS and NPM you are using by adding the following to `package.json`:
``` javascript
"engines": {
    "node": "8.9.3",
    "npm": "5.5.1"
}
```
Tell Heroku to compile and build the project in production mode after installing all dependencies by adding the following script to `package.json`:
``` javascript
"scripts": {
    [...]
    "postinstall": "ng build --aot -prod"
}
```
Change start script to run the server written in TypeScript.
``` javascript
"scripts": {
    [...]
    "start": "ts-node server.ts"
    [...]
}
```
Comment the following lines in the client
``` javascript
this.socket = io({path: '/socket'});
```
and use the following
``` javascript
this.socket = io();
```

## Debugging

Contraseña pepe 001992


