# Brief

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

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

