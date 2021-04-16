import { Resolver, Arg, Query, Int, InputType, Field } from "type-graphql";
import DailySchedule from "../entity/group/DailySchedule";
import WeekColor from "../entity/WeekColor";
import WeekDays from "../entity/WeekDays";
import { StudentPage } from "../tpcol/exports";
import { TPCPages } from "../tpcol/page";
import SchedulePage from "../tpcol/schedule/schedule_page";

@InputType()
class DailyScheduleRequest {
  @Field(() => Int)
  group: number;

  @Field(() => WeekDays, { nullable: true })
  day?: WeekDays;

  @Field(() => WeekColor, { nullable: true })
  weekColor?: WeekColor;
}

@Resolver()
export default class DailyScheduleResolver {
  @Query(() => DailySchedule)
  async DailySchedule(
    @Arg("params", () => DailyScheduleRequest, { nullable: false })
    request: DailyScheduleRequest
  ) {
    const studentPage = new StudentPage();
    await studentPage.init(request.group, request.day, request.weekColor);
    return studentPage.getLessonsWithReplacements();
  }

  @Query(() => WeekColor)
  async WeekColor() {
    return SchedulePage.getWeekColor(
      await SchedulePage.getPage(TPCPages.ScheduleByGroups)
    );
  }
}
