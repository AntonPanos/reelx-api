const info = (args: any): void => {
  console.log(`[${new Date().toLocaleString()}] [INFO]`, args);
};

const warn = (args: any): void => {
  console.warn(`[${new Date().toLocaleString()}] [WARN]`, args);
};

const error = (args: any): void => {
  console.error(`[${new Date().toLocaleString()}] [ERROR]`, args);
};

const log = (args: any): void => {
  info(args);
};

export default { log, info, warn, error };
