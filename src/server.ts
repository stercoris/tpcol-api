import express, { Application } from "express";
import { graphqlHTTP, OptionsData } from "express-graphql";
import TPCRouter from "./tpcol";

const server: Application = express();

(async () => {
    // Запускаем TpcolASU API
    const options: OptionsData = {
        schema: TPCRouter,
        graphiql: true,
    };
    server.use("/tpcol-api", graphqlHTTP(options));
})();

server.listen(5000, () => console.log("server run"));
