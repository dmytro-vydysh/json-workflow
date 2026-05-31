
/**
 * Base error class for all operation-related exceptions.
 */
export class JWOperationError extends Error {

  /**
   * Creates a new operation error.
   *
   * @param message - Error description.
   */
  constructor(message: string) {
    super(message);
    this.name = 'JWOperationError';
  }
}

/**
 * Error thrown when one or more operation arguments
 * are invalid, missing, or of an unexpected type.
 */
export class JWOperationArgumentError extends Error {

  /**
   * Creates a new operation argument error.
   *
   * @param message - Error description.
   */
  constructor(message: string) {
    super(message);
    this.name = 'JWOperationArgumentError';
  }
}