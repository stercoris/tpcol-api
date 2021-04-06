import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import DailyScheduleResolver from "./resolvers/DailyScheduleResolver";
import ExamsResolver from "./resolvers/ExamsResolver";
import GroupsResolver from "./resolvers/GroupsResolver";

const PORT = 4588;

(async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [DailyScheduleResolver, ExamsResolver, GroupsResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`
        express server STARTED
        on port ${PORT}
        url = http://localhost:${PORT}/graphql
        `);
  });
})();
