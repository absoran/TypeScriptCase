import { NextFunction, Request, Response } from "express";
import Joi, { Schema, ValidationResult, ValidationErrorItem } from "joi";
import {BaseHttpException} from "../Utils/http-exceptions";

export interface ValidationResponse {
    error: boolean;
    validationErrors?: ValidationErrorItem[];
}

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
