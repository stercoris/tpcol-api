import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export default class Lecture {
    @Field(() => Int, { nullable: false })
    id: number;

    @Field(() => String, { nullable: false })
    title: string;

    @Field(() => String, { nullable: true })
    teacher: string;
}
