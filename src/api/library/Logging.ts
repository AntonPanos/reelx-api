import chalk from 'chalk';

const info = (args: any): void => {
  console.log(
    chalk.blue(`[${new Date().toLocaleString()}] [INFO]`),
    typeof args === 'string' ? chalk.blueBright(args) : args
  );
};

const warn = (args: any): void => {
  console.log(
    chalk.yellow(`[${new Date().toLocaleString()}] [WARN]`),
    typeof args === 'string' ? chalk.yellowBright(args) : args
  );
};

const error = (args: any): void => {
  console.log(
    chalk.red(`[${new Date().toLocaleString()}] [ERROR]`),
    typeof args === 'string' ? chalk.redBright(args) : args
  );
};

const log = (args: any): void => {
  info(args);
};

export default { log, info, warn, error };
