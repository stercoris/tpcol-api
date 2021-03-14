import { Field, ObjectType } from "type-graphql";
import Replacement from "./Replacement";

@ObjectType({ description: "Values of 'Replacements on %day%' table" })
export default class ReplaceTable {
    @Field(() => Boolean, { nullable: false })
    exist: boolean;

    @Field(() => [Replacement], { nullable: false })
    lectures: Replacement[];
}
