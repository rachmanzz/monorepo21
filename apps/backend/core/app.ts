import * as dotenv from 'dotenv';
dotenv.config();

import express from "express"
import useRoutes from "../routes/userRoutes"
import cors from "cors"


const app = express()

const port = parseInt(process.env.PORT ?? "5000")

app.use(cors());


app.use(express.json());

app.use(useRoutes)


app.listen(port, () => console.log(`backend api run on port: ${port}`))