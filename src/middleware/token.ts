import type { Request, Response, NextFunction } from "express";

export const tokenMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (req.method !== "GET") {

        const token = req.headers.token;

        if (token !== "HIZe4D32twWOUP9h0I1IVTlr") {
            return res.status(403).json({ message: "Token inválido" });
        }

    }

    next();
};