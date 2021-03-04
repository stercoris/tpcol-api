import {
    GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString,
} from "graphql";
import Page, { TPCPages } from "./page";
import Lecture from "./schedule_student/lecture";
import Schedule from "./schedule_student/parser";
import ScheduleRequest from "./schedule_student/request";
import WeekColor, { WeekColors } from "./weekcolor";
import WeekDays from "./weekdays";

const LectureType = new GraphQLObjectType({
    name: "Lecture",
    description: "lecture of student",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLNonNull(GraphQLString) },
        teacher: { type: GraphQLString },
    }),
});

const ScheduleType = new GraphQLObjectType({
    name: "Schedule",
    description: "schedule of student",
    fields: () => ({
        week_color: { type: GraphQLNonNull(GraphQLInt) },
        lectures: { type: GraphQLNonNull(GraphQLList(LectureType)) },
    }),
});

const ScheduleSchema = {
    type: GraphQLList(LectureType),
    resolve: async () => {
        const req: ScheduleRequest = {
            day: WeekDays.Wednesday,
            week: await WeekColor.get_week_color(await Page.getPage(TPCPages.ScheduleByGroups)),
            group: 556,
        };
        const response = await Schedule.get(req);
        return (response);
    },
};

export default ScheduleSchema;
