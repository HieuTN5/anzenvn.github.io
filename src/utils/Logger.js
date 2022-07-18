class Logger {
  log = (...params) => {
    // eslint-disable-next-line no-console
    console.log.apply(null, params);
  };

  warn = (...params) => {
    if (['dev', 'sit', 'uat'].includes(AZURE_ENV)) {
      // eslint-disable-next-line no-console
      console.warn.apply(null, params);
    }
  };

  error = (...params) => {
    if (['dev', 'sit', 'uat'].includes(AZURE_ENV)) {
      // eslint-disable-next-line no-console
      console.error.apply(null, params);
    }
  };
}

const logger = new Logger();

export default logger;
