import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export default class Group {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field(() => String, { nullable: false })
  name: string;
}
