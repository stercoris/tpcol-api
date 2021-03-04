import express, { Router } from "express";
import {
    GraphQLSchema,
    GraphQLObjectType,
} from "graphql";
import ScheduleSchema from "./tpcol/schedule_student";

const RootQuery = new GraphQLObjectType(
    {
        name: "TpcolAPI",
        fields: () => ({
            ScheduleSchema,
        }),
    },
);

const schema = new GraphQLSchema({
    query: RootQuery,
});
// Определение роутера
const router = Router();

// Парсим body на json
router.use("/", express.json());

export default schema;
