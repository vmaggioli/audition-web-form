// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAmDhvEdGwMZ6SuZKibrUAVHCpR0DFpnXo",
    authDomain: "audition-web-form.firebaseapp.com",
    databaseURL: "https://audition-web-form.firebaseio.com",
    projectId: "audition-web-form",
    storageBucket: "audition-web-form.appspot.com",
    messagingSenderId: "32575069764"
  }
};
