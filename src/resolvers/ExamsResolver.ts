import { Resolver, Arg, Query, Int, InputType, Field } from "type-graphql";
import Exam from "../entity/exam/Exam";
import { ExamsPage } from "../tpcol/exports";

@InputType()
class ExamsRequest {
  @Field(() => Int)
  group: number;
}

@Resolver()
export default class ExamsResolver {
  @Query(() => [Exam])
  async Exams(
    @Arg("params", () => ExamsRequest, { nullable: false })
    request: ExamsRequest
  ) {
    const examsPage = new ExamsPage();
    await examsPage.init(request.group);
    return examsPage.exams;
  }
}
