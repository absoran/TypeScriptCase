import { NextFunction, Request, Response } from "express";
import Joi, { Schema, ValidationResult, ValidationErrorItem } from "joi";
import {BaseHttpException} from "../Utils/http-exceptions";

export interface ValidationResponse {
    error: boolean;
    validationErrors?: ValidationErrorItem[];
}

// validationMiddleware, takes schema that we defined validations and handles validation. If the request is not valid-
// response status set as 422 and response will be returned without going service layer.
export const validationMiddleware =
    (schema: Schema, validationOptions: Joi.ValidationOptions = {}) =>
        async (req: Request, response: Response, next: NextFunction) => {
            try {
                (await schema.validateAsync(
                    {
                        body: req.body,
                        query: req.query,
                        params: req.params,
                    },
                    {
                        abortEarly: false,
                        allowUnknown: true,
                        ...validationOptions,
                    }
                )) as ValidationResult;

                return next();

            } catch (error) {
                (error as BaseHttpException).status = 422;
                next(error);
            }
        };
