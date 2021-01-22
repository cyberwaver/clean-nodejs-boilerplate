class ValidationException extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports = ValidationException;
