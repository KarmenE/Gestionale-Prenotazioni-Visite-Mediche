Questo progetto è un'applicazione Angular 19 standalone per la gestione delle prenotazioni di visite mediche. Permette agli utenti di registrarsi, effettuare il login e prenotare visite con specialisti in base alla disponibilità. Il backend è simulato con JSON Server per gestire i dati delle prenotazioni e degli utenti.

Funzionalità principali:
* Autenticazione: Registrazione e login degli utenti.
* Gestione prenotazioni: Creazione, modifica e cancellazione di prenotazioni mediche.
* Calendario disponibilità: Mostra le date e gli orari disponibili per ogni specialità medica.
* Lista visite: Elenco delle visite prenotate dall'utente.
* Dettaglio visita: Informazioni dettagliate su ogni prenotazione.
* Area personale: Accesso ai dati personali e alle prenotazioni effettuate.
* Navbar fissa: Navigazione semplificata tra le sezioni principali.

Tecnologie utilizzate:
* Angular 19 – Framework frontend per la gestione delle pagine e dei componenti.
* TypeScript – Linguaggio di programmazione utilizzato in Angular.
* Bootstrap – Libreria CSS per lo stile e il layout responsive.
* JSON Server – Backend fittizio per simulare un'API REST e memorizzare dati su file db.json.
* RxJS – Per la gestione asincrona dei dati (es. HTTP requests).
* Angular Router – Per la navigazione tra le pagine dell'applicazione.



This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
