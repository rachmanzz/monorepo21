import { UserSchemaType, userSchema } from "@repo/schema/src/user";
import RepositoryBase from "./repositoryBase";

export default class UserCollection extends RepositoryBase<UserSchemaType>{
    constructor () {
        super();
        this.registerSchema("users", userSchema)
    }
}