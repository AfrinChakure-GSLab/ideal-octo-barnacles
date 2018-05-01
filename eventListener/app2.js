const EventEmitter = require('events');

const Logger = require('./logger');
const logger = new Logger();


// Register a listener
logger.on('messageLogged', (arg) => {
  console.log('Listener called', arg);
});

//Raise an event
logger.log('message');
