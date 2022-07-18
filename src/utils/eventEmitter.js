class EventEmitter {
  constructor() {
    this.events = {};
  }

  dispatch = (event, data) => {
    if (!this.events[event]) return;

    this.events[event].forEach((currentEvent) => {
      const {
        options: { once },
      } = currentEvent;
      currentEvent.callback(data);
      if (once) {
        this.unsubscribe(event, currentEvent.callback);
      }
    });
  };

  subscribe = (event, callback) => {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push({ callback, options: {} });
  };

  subscribeOnce = (event, callback) => {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push({ callback, options: { once: true } });
  };

  unsubscribe = (event, callback) => {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter(
      (currentEvent) => currentEvent.callback !== callback,
    );
  };
}

const instance = new EventEmitter();
window.EventEmitter = instance;
export default instance;
