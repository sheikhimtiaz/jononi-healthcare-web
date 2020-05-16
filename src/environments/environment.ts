// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyCtKefu6jtnavYPEvHjIDsQ2FoE_NqajIQ",
    authDomain: "jononi-assistant.firebaseapp.com",
    databaseURL: "https://jononi-assistant.firebaseio.com",
    projectId: "jononi-assistant",
    storageBucket: "jononi-assistant.appspot.com",
    messagingSenderId: "393050620220"
  }
};


/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
