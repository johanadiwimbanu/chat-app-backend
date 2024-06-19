class ConflictError extends Error {
  constructor(message) {
    super();
    this.name = 'ConflictError';
    this.message = message;
  }
}

module.exports = ConflictError;
