import * as winston from "winston";

var TransportStream = require("winston-transport");

// enumeration to assign color values to
const LevelColors = {
  INFO: "darkturquoise",
  WARN: "orange",
  ERROR: "tomato",
};

const defaultColor = "color: inherit";

//! Overriding winston console transporter
class Console extends TransportStream {
  constructor(options = {}) {
    super(options);
    this.setMaxListeners(30);
  }

  log(info, next) {
    // styles a console log statement accordingly to the log level
    // log level colors are taken from level colors enum
    console.log(
      `%c[%c${info.level.toUpperCase()}%c]:`,
      defaultColor,
      `color: ${LevelColors[info.level.toUpperCase()]};`,
      defaultColor,
      // message will be included after stylings
      // through this objects and arrays will be expandable
      info.message
    );

    // must call the next function here
    // or otherwise you'll only be able to send one message
    next();
  }
}

// creating silent loggers with according levels
// silent by default to be automatically deactivated
// in production mode
export const log = winston.createLogger({
  transports: [
    new Console({
      silent: true,
      level: "info",
    }),
  ],
});

// don't log anything in production mode
// probably should go further and return non
// working logger function to reduce
// execution time and improve speed results
// on application
if (process.env.NODE_ENV !== "production") {
  log.transports.forEach((transport) => (transport.silent = false));
}
