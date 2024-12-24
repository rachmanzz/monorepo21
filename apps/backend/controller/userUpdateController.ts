import { expressHandler, JSONResponseResultType } from "./handlerBaseType"
import UserCollection from "../repository/userCollection"
import { UserSchemaType, userSchema } from "@repo/schema/src/user";
import zodValidator from "../middleware/zodValidator"
import { z } from "zod";

const middleware = zodValidator(userSchema.partial());
const handleUpdate: expressHandler<Partial<UserSchemaType>, JSONResponseResultType<null>> = async (req, res) => {
    try {
        const repo = UserCollection.init()
        await repo.update(req.params.doc_id, req.body)
        return res.json({ status: "OK" })
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

const handlerUpdateUser = [middleware, handleUpdate];

export default handlerUpdateUser;