import DailySchedule from "../../entity/DailySchedule";
import Lecture from "../../entity/Lecture";
import Replaces from "../../entity/Replaces";
import WeekColor from "../../entity/WeekColor";
import WeekDays from "../../entity/WeekDays";
import { TPCPages } from "../page";
import SchedulePage from "../schedule_page";

class StudentPage {
    private document: Document;

    private weekColor: WeekColor;

    private replaces: Replaces;

    private day: WeekDays;

    public async init(
        group: number,
        day?: WeekDays,
        weekColor?: WeekColor,
    ) {
        const args = new URLSearchParams();
        args.append("group", group.toString());

        if (!day) {
            day = new Date().getDay();
        }
        args.append("day", day.toString());
        this.day = day;

        if (!weekColor) {
            weekColor = SchedulePage.getWeekColor(
                await SchedulePage.getPage(TPCPages.ScheduleByGroups),
            );
        }
        args.append("week", weekColor.toString());

        this.weekColor = weekColor;
        this.document = await SchedulePage.getPage(TPCPages.ScheduleByGroups, args);
        this.replaces = SchedulePage.getReplaces(this.document);
    }

    public getLessonsWithReplacements(): DailySchedule {
        const schedule: DailySchedule = {
            lectures: this.replaces.Lessons,
            weekcolor: this.weekColor,
        };
        if (!this.replaces.haveLessons
            && !this.replaces.haveTodayReplaces
            && !this.replaces.haveTomorrowReplaces) {
            return (schedule);
        }
        if (this.replaces.haveTodayReplaces && this.day === new Date().getDay()) {
            schedule.lectures = StudentPage.mergeReplaces(
                this.replaces.Lessons,
                this.replaces.TodayReplaces,
            );
        } else if (this.replaces.haveTomorrowReplaces && this.day === new Date().getDay() + 1) {
            schedule.lectures = StudentPage.mergeReplaces(
                this.replaces.Lessons,
                this.replaces.TomorrowReplaces,
            );
        }
        return (schedule);
    }

    private static mergeReplaces(lessons: Lecture[], replaces: Lecture[]) {
        replaces.map((replace) => {
            const { id, title } = replace;
            const repLecture = lessons.findIndex((lesson) => lesson.id === id);
            if (repLecture !== -1) {
                lessons[repLecture].title = title;
            } else {
                lessons.push(replace);
            }
            return (replace);
        });
        return (lessons);
    }
}

export default StudentPage;
