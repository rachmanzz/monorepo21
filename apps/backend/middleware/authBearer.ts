import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";

export default async function authBearer(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, token] = authHeader.split(/\s/);
        try {
            const decode = await getAuth().verifyIdToken(token)
            req.user = {
                uid: decode.uid,
                email: decode.email,
                email_verified: decode.email_verified,
            };
            next();
            return;
        } catch (error) {
            // assume error cause token incorret
            res.sendStatus(401);
            return;
        }
    } else {
        res.sendStatus(401);
    }
    
}
