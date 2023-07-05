import 'module-alias/register';

import validateEnv from './config/validateEnv';
import App from './app';

validateEnv();

App.listen();
