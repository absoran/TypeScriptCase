export const HttpStatusCode = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
};

interface BaseHttpExceptionConstructor {
    isOperational?: boolean;
    status?: number;
    message: string;
    success?: boolean;
}

export class BaseHttpException extends Error {
    isOperational: boolean | undefined;
    status: number | undefined;
    message: string;
    success: boolean | undefined;

    constructor({
                    isOperational = false,
                    status,
                    message,
                    success,
                }: BaseHttpExceptionConstructor) {
        super();
        Object.setPrototypeOf(this, new.target.prototype);

        this.isOperational = isOperational;
        this.status = status;
        this.message = message;
        this.success = success;

        Error.captureStackTrace(this);
    }
}

export class InternalServerHttpException extends BaseHttpException {
    constructor({
                    isOperational,
                    status = HttpStatusCode.INTERNAL_SERVER,
                    message,
                    success,
                }: BaseHttpExceptionConstructor) {
        super({
            isOperational,
            message,
            status,
            success,
        });
    }
}

export class NotFoundHttpException extends BaseHttpException {
    constructor({
                    isOperational,
                    status = HttpStatusCode.NOT_FOUND,
                    message,
                    success,
                }: BaseHttpExceptionConstructor) {
        super({
            isOperational,
            message,
            status,
            success,
        });
    }
}

export class BadRequestHttpException extends BaseHttpException {
    constructor({
                    isOperational,
                    status = HttpStatusCode.BAD_REQUEST,
                    message,
                    success = false,
                }: BaseHttpExceptionConstructor) {
        super({
            isOperational,
            message,
            status,
            success,
        });
    }
}

export class UnauthorizedRequestHttpException extends BaseHttpException {
    constructor({
                    isOperational,
                    status = HttpStatusCode.UNAUTHORIZED,
                    message,
                    success = false,
                }: BaseHttpExceptionConstructor) {
        super({
            isOperational,
            message,
            status,
            success,
        });
    }
}

export class ForbiddenRequestHttpException extends BaseHttpException {
    constructor({
                    isOperational,
                    status = HttpStatusCode.FORBIDDEN,
                    message,
                    success = false,
                }: BaseHttpExceptionConstructor) {
        super({
            isOperational,
            message,
            status,
            success,
        });
    }
}
