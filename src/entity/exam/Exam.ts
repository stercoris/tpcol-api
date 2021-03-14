import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Exam {
    @Field(() => String, { nullable: false })
    date: string;

    @Field(() => String, { nullable: false })
    profession: string;

    @Field(() => String, { nullable: false })
    teacher: string;

    @Field(() => String, { nullable: false })
    cabinet: string;
}
