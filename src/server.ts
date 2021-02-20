import express, { Application } from "express";
import { graphqlHTTP, OptionsData } from "express-graphql";
import TPCRouter from "./tpcol";

const server: Application = express();

async function startup() {
    // Запускаем TpcolASU API
    const options: OptionsData = {
        schema: TPCRouter,
        graphiql: true,
    };
    server.use("/tpcol-api", graphqlHTTP(options));
}
startup();

server.listen(5000, () => console.log("server run"));
