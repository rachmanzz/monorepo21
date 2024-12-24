import { Router } from "express";
import { handlerFetchUser } from "../controller/userFetchController";
import handlerCreateUser from "../controller/userCreateController";
import { handlerFetchAllUser } from "../controller/userFetchAllController";
import handleUpdateUser from "../controller/userUpdateController";
import { handlerDeleteUser } from "../controller/userDeleteController";
import authBearer from "../middleware/authBearer";

const route = Router();

route.use(authBearer)

route.post("/user", ...handlerCreateUser)
route.get("/users", handlerFetchAllUser)
route.get("/fetch-user-data/:doc_id", handlerFetchUser)
route.put("/update-user-data/:doc_id", ...handleUpdateUser)
route.delete("/delete-user-data/:doc_id", handlerDeleteUser)


export default route;