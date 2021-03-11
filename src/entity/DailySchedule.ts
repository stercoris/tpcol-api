import { Field, ObjectType } from "type-graphql";
import WeekColor from "./WeekColor";
import Lecture from "./lecture";

@ObjectType()
export default class DailySchedule {
    @Field(() => WeekColor, { nullable: false })
    weekcolor: WeekColor;

    @Field(() => Lecture, { nullable: true })
    lectures: Lecture[];
}
