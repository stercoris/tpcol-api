import { Field, ObjectType } from "type-graphql";
import WeekColor from "../WeekColor";
import Lecture from "./Lecture";
import GroupStatus from "./GroupStatus";

@ObjectType()
export default class DailySchedule {
    @Field(() => WeekColor, { nullable: false })
    weekcolor: WeekColor;

    @Field(() => [Lecture], { nullable: true })
    lectures: Lecture[];

    @Field(() => GroupStatus, { nullable: true })
    status: GroupStatus;
}
