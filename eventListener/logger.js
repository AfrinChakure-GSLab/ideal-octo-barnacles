const EventEmitter = require('events');

var url = 'https://requestbin.io';


class Logger extends EventEmitter{
  log(message){
    //Sends an HTTP request
    console.log(message);

    //raise an event
    this.emit('messageLogged', {id : 1, url : 'http://'});
  }
}
module.exports = Logger;
