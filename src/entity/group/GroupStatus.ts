import { Field, ObjectType } from "type-graphql";
import LectureTable from "./LectureTable";
import ReplaceTable from "./ReplaceTable";

@ObjectType()
export default class GroupStatus {
    @Field(() => LectureTable, { nullable: false })
    DayLessons: LectureTable;

    @Field(() => ReplaceTable, { nullable: false })
    TodayReplaces: ReplaceTable;

    @Field(() => ReplaceTable, { nullable: false })
    TomorrowReplaces: ReplaceTable;
}
