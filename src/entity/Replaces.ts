import { Field, ObjectType } from "type-graphql";
import Lecture from "./Lecture";

@ObjectType()
export default class Replaces {
    @Field(() => Boolean, { nullable: false })
    haveTodayReplaces: boolean;

    @Field(() => [Lecture], { nullable: false })
    TodayReplaces: Lecture[];

    @Field(() => Boolean, { nullable: false })
    haveTomorrowReplaces: boolean;

    @Field(() => [Lecture], { nullable: false })
    TomorrowReplaces: Lecture[];

    @Field(() => Boolean, { nullable: false })
    haveLessons: boolean;

    @Field(() => [Lecture], { nullable: false })
    Lessons: Lecture[];
}
