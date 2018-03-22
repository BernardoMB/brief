// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBlI9-LNKgP43NGsOgWUV0t1RbPCxw_u5c',
    authDomain: 'koomkin-brief.firebaseapp.com',
    databaseURL: 'https://koomkin-brief.firebaseio.com',
    projectId: 'koomkin-brief',
    storageBucket: 'koomkin-brief.appspot.com',
    messagingSenderId: '36688253160'
  },
  googleMaps: {
    api_key: 'AIzaSyBnXl-DDwNzfujUTk509A_mJG-EDD1iHO8'
  }
};

