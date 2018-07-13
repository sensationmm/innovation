import devConfig from './development.json';
import prodConfig from './production.json';

const url = window.location.href;
let env;
let Config;

if (url.match(/http:\/\/localhost/)) {
  // localhost
  env = 'developement';
  Config = devConfig;
} else if (url.match(/https:\/\/www.inventu.re/)) {
  // production
  env = 'production';
  Config = prodConfig;
} else if (url.match(/https:\/\/ventureview-staging(-pr-\d*)?.herokuapp.com/)) {
  // staging or review apps
  env = 'staging';
  Config = devConfig;
} else {
  // other cases
  window.alert('Unkown Enviroment!');
  Config = devConfig;
}

console.log(`You are in ${env}!!`);

export default Config;
