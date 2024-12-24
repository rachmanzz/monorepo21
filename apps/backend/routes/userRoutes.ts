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
route.get("/user/:doc_id", handlerFetchUser)
route.put("/user/:doc_id", ...handleUpdateUser)
route.delete("/user/:doc_id", handlerDeleteUser)


export default route;