import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export default class Replacement {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field(() => String, { nullable: false })
  fromTitle: string;

  @Field(() => String, { nullable: true })
  fromTeacher?: string;

  @Field(() => String, { nullable: false })
  title: string;

  @Field(() => String, { nullable: true })
  teacher?: string;

  @Field(() => String, { nullable: false })
  cabinet: string;
}
