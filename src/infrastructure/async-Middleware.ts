import type {
    RequestHandler,
    Request,
    Response,
    NextFunction
} from "express";

const asyncMidlleware = (handler: RequestHandler) => {
    return (
        request: Request,
        response:Response,
        next:NextFunction
    )=>{
        Promise.resolve(
            handler(request,response,next)
        ).catch(next);
    };
}

export { asyncMidlleware};