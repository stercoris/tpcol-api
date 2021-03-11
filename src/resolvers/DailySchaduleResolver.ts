import {
    Resolver,
    Arg,
    Query,
    Int,
    InputType,
    Field,
} from "type-graphql";
import DailySchedule from "../entity/DailySchedule";
import WeekColor from "../entity/WeekColor";


@InputType()
class DailyScheduleRequest {
    @Field(() => Int)
    group: number;

    @Field(() => Int)
    day: number;

    @Field(() => WeekColor)
    week: WeekColor;
}

@Resolver()
export default class DailyScheduleResolver {
    @Query(() => DailySchedule)
    async DailySchedule(
        @Arg("params", () => DailyScheduleRequest, { nullable: false }) request: DailyScheduleRequest,
    ) {
        let schedule;

        return (schedule);
    }
}
