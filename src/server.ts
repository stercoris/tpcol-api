import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import DailyScheduleResolver from "./resolvers/dailySchaduleResolver";


(async () => {
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [DailyScheduleResolver],
        }),
        context: ({ req, res }) => ({ req, res }),
    });

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(4588, () => {
        console.log("express server started");
    });
})();
