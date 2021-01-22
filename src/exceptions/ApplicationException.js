class ApplicationException extends Error {
  constructor(message, key) {
    super();
    this.key = key;
    this.message = message;
  }
}

module.exports = ApplicationException;
