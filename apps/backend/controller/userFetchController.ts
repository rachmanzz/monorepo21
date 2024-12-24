import { expressHandler, JSONResponseResultType } from "./handlerBaseType"
import UserCollection from "../repository/userCollection"
import { UserSchemaType } from "@repo/schema/src/user";
import { ResultData } from "../repository/repositoryBase";
import { z } from "zod";

export const handlerFetchUser: expressHandler<any, JSONResponseResultType<ResultData<UserSchemaType> | null>> = async (req, res) => {
    try {
        const repo = UserCollection.init()
        const data = await repo.getOne(req.params.doc_id)
        return res.json({ status: "OK", data })
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                status: "ERROR",
                message: "Validation failed",
                errors: error.errors,
            });
            return;
        }
        // we may need handler firestore error, but in this case I pass them
        if (error instanceof Error) {
            return res.status(500)
                .json({ status: "ERROR", message: error.message });
        }

        return res.status(500)
            .json({ status: "ERROR", message: "unknown error message" });
    }
}