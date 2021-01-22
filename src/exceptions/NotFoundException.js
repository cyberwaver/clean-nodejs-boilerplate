class NotFoundException extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports = NotFoundException;
