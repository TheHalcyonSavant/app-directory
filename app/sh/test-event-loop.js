const EventEmitter = require('node:events');

class MyEmitter extends EventEmitter {
  constructor() {
    super();

    // use setImmediate to emit the event once a handler is assigned

    setImmediate(() => {
      console.log('emit event');
      this.emit('event');
    });
    queueMicrotask(() => {
      console.log('Microtask');
    });
    process.nextTick(() => {
      console.log('nextTick');
    });
  }
}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
