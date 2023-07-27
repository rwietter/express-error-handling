import { CustomError } from "../../lib/error/customError";

export class Http {
  public static readonly BAD_REQUEST = 400;
  public static readonly NOT_FOUND = 404;
  public static readonly INTERNAL_SERVER_ERROR = 500;
  public static readonly OK = 200;
  public static readonly CREATED = 201;
  public static readonly NO_CONTENT = 204;
  public static readonly UNAUTHORIZED = 401;
  public static readonly FORBIDDEN = 403;
  public static readonly CONFLICT = 409;
  public static readonly UNPROCESSABLE_ENTITY = 422;
  public static readonly TOO_MANY_REQUESTS = 429;
  public static readonly SERVICE_UNAVAILABLE = 503;
  public static readonly GATEWAY_TIMEOUT = 504;
  public static readonly NETWORK_AUTHENTICATION_REQUIRED = 511;
  public static readonly PRECONDITION_FAILED = 412;
  public static readonly REQUEST_TIMEOUT = 408;
  public static readonly PAYLOAD_TOO_LARGE = 413;
  public static readonly UNSUPPORTED_MEDIA_TYPE = 415;
  
  private constructor() {}

  public static badRequest(message: string) {
    return new CustomError(message, Http.BAD_REQUEST);
  }

  public static notFound(message: string) {
    return new CustomError(message, Http.NOT_FOUND);
  }

  public static internalServerError(message: string) {
    return new CustomError(message, Http.INTERNAL_SERVER_ERROR);
  }

  public static ok() {
    return Http.OK;
  }

  public static created(message: string) {
    return new CustomError(message, Http.CREATED);
  }

  public static noContent(message: string) {
    return new CustomError(message, Http.NO_CONTENT);
  }

  public static unauthorized(message: string) {
    return new CustomError(message, Http.UNAUTHORIZED);
  }

  public static forbidden(message: string) {
    return new CustomError(message, Http.FORBIDDEN);
  }

  public static conflict(message: string) {
    return new CustomError(message, Http.CONFLICT);
  }

  public static unprocessableEntity(message: string) {
    return new CustomError(message, Http.UNPROCESSABLE_ENTITY);
  }

  public static tooManyRequests(message: string) {
    return new CustomError(message, Http.TOO_MANY_REQUESTS);
  }

  public static serviceUnavailable(message: string) {
    return new CustomError(message, Http.SERVICE_UNAVAILABLE);
  }

  public static gatewayTimeout(message: string) {
    return new CustomError(message, Http.GATEWAY_TIMEOUT);
  }

  public static networkAuthenticationRequired(message: string) {
    return new CustomError(message, Http.NETWORK_AUTHENTICATION_REQUIRED);
  }

  public static preconditionFailed(message: string) {
    return new CustomError(message, Http.PRECONDITION_FAILED);
  }

  public static requestTimeout(message: string) {
    return new CustomError(message, Http.REQUEST_TIMEOUT);
  }

  public static payloadTooLarge(message: string) {
    return new CustomError(message, Http.PAYLOAD_TOO_LARGE);
  }

  public static unsupportedMediaType(message: string) {
    return new CustomError(message, Http.UNSUPPORTED_MEDIA_TYPE);
  }
}