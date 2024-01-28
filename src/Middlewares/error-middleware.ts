import { BaseHttpException } from "../Utils/http-exceptions";
import { NextFunction, Request, Response } from "express";

// errorMiddleware intercepts exceptions and returns error through middleware.
function errorMiddleware(
    error: BaseHttpException,
    request: Request,
    response: Response,
    next: NextFunction
) {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    response.status(status).json({
        status,
        message,
    });
}

export default errorMiddleware;
