import { Field, ObjectType } from "type-graphql";
import Lecture from "./Lecture";

@ObjectType({ description: "Values of 'Schedule on %day%' table" })
export default class LectureTable {
    @Field(() => Boolean, { nullable: false })
    exist: boolean;

    @Field(() => [Lecture], { nullable: false })
    lectures: Lecture[];
}
