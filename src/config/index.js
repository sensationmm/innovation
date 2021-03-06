import devConfig from './development.json';
import prodConfig from './production.json';

const url = window.location.href;
let env;
let Config;

if (url.match(/http:\/\/localhost/)) {
  // localhost
  env = 'developement';
  Config = devConfig;
} else if (url.match(/staging/)) {
  // staging or review apps
  env = 'staging';
  Config = devConfig;
} else if (url.match(/inventu.re/) || url.match(/prod/)) {
  // production
  env = 'production';
  Config = prodConfig;
} else {
  // other cases
  window.alert('Unkown Enviroment!');
  Config = devConfig;
}

Config.app = 'innovation';
Config.env = env;

console.log(`You are in ${env}!!`);

export default Config;
