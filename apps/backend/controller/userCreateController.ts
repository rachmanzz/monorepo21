import { expressHandler, JSONResponseResultType } from "./handlerBaseType"
import UserCollection from "../repository/userCollection"
import { UserSchemaType, userSchema } from "@repo/schema/src/user";
import zodValidator from "../middleware/zodValidator"
import { z } from "zod";
import { ResultData } from "../repository/repositoryBase";

const middleware = zodValidator(userSchema);

const createHandler: expressHandler<UserSchemaType,  JSONResponseResultType<ResultData<UserSchemaType>>> = async (req, res) => {
    try {
        const repo = UserCollection.init()
        const body = req.body
        const data = await repo.create(body)
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

const handleCreateUser = [middleware, createHandler];

export default handleCreateUser;