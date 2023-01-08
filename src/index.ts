import express, { Application, Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { Server } from "http";
import { config } from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import router from "./router";

config();
const app: Application = express();
const PORT: Number = Number(process.env.PORT) || 4000;
const URI: any = process.env.MONGO_DB_URI;

mongoose.set("strictQuery", false);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", router);

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound("Invalid Request!"));
});

function connectDb(uri: string) {
    return mongoose.connect(uri);
}

(async function () {
    try {
        await connectDb(URI);
        const server: Server = app.listen(PORT, () =>
            console.log(`server is listening on port: ${PORT}`)
        );
    } catch (error) {
        throw new Error(`failed to connect to server ${error}`);
    }
})();
