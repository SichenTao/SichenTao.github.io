export class AppError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly expose = true,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class ConfigurationError extends AppError {
  constructor(message: string) {
    super(503, "service_not_configured", message, true);
    this.name = "ConfigurationError";
  }
}
