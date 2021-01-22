const EmailListener = require("./listeners/EmailListener");
const UserListener = require("./listeners/UserListener");

const Listeners = [EmailListener, UserListener];
const registerListeners = (container) => () => {
  Listeners.forEach((Listener) => Listener.listen(container));
};

module.exports = registerListeners;
