const { appEvent } = require("../Event");

class BaseListener {
  constructor() {}

  listenTo(eventInfoArray, handler) {
    appEvent.registerFor(eventInfoArray[0], this.handlerWrapper(handler));
  }

  handlerWrapper(handler) {
    const handlerName = this._getHandlerEventName(handler);
    const innerHandlerWrapper = async (eventMeta) => {
      // const { name, data } = eventMeta;
      //   if (!listeners.hasOwnProperty(handlerName)) return;
      //   if (listeners[handlerName] === true) return;
      await handler.call(this, eventMeta);
      // actionEvent.publish("DOMAIN-EVENT-HANDLER-DONE", { id, groupId, listener: handlerName });
    };
    Object.defineProperty(innerHandlerWrapper, "name", { value: handlerName });
    return innerHandlerWrapper;
  }

  _getHandlerEventName(handler) {
    const domainName = this.constructor.name;
    const handlerName = handler.name;
    return `${domainName}.${handlerName}`;
  }

  static listen(container) {
    console.log("Setting up: ", this.prototype.constructor.name);
    return new this.prototype.constructor(container);
  }
}

module.exports = BaseListener;
