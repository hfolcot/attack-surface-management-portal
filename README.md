


# AttackSurfaceManagementPortal

![Dashboard](/screenshots/covertSwarm.gif)

## Contents

A dashboard consisting of a pie chart, bar chart and table populated with data from a Node/Express backend using json data.

Components are grouped into related modules. All common components are in a `core-components` module. 

There is a module for charts which uses [Chart.js](https://www.chartjs.org/) and will create any chart based on the data passed in.

[Angular Material](https://material.angular.io/) has been utilised for the table/pagination and some styling.

The app has routing implemented and therefore is ready to add further pages if necessary.

There are a small number of sample tests using jasmine/karma. All tests currently pass. 

The dashboard is viewable on any screen size.
![Large Screen](/screenshots/dashboard.png)
![Mobile Screen](/screenshots/responsiveDashboard.png)

The project was planned and designed using Figma.

## Room for improvement

Test coverage is very low, it would be ideal to complete this to include all methods. 

The app is not yet production ready - API/env data should be moved into a separate git-ignored file.

Mobile responsiveness could be improved for the table, for example the number of columns could be reduced based on the screen width. Currently it is very squashed on a mobile screen.


----------------------------------------------------------------------------------------------------

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
