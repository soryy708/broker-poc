import { Request, Response, NextFunction } from 'express';

export type MockRequest = any;

export interface MockResponse {
    headersSent: boolean;
    status: (num: number) => MockResponse;
    send: (value?: any) => void;
}

export type MockNextFunction = () => void;

/**
 * Gracefully handles unhandled exceptions.
 * `_next` needs to be there even if it's unused, because the `express` library does metaprogramming with it
 * @param err
 * @param req
 * @param res
 * @param next
 */
export default (
    err: Error,
    _req: Request | MockRequest,
    res: Response | MockResponse,
    _next: NextFunction | MockNextFunction
): void => {
    console.error(err.stack);
    if (!res.headersSent) {
        res.status(500).send();
    }
};
