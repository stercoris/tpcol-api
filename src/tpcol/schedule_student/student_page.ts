import DailySchedule from "../../entity/group/DailySchedule";
import Lecture from "../../entity/group/Lecture";
import GroupStatus from "../../entity/group/GroupStatus";
import WeekColor from "../../entity/WeekColor";
import WeekDays from "../../entity/WeekDays";
import { TPCPages } from "../page";
import SchedulePage from "../schedule_page";
import Replacement from "../../entity/group/Replacement";

class StudentPage {
    private document: Document;

    private weekColor: WeekColor;

    private replaces: GroupStatus;

    private requestedDay: WeekDays;

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
        this.requestedDay = day;

        if (!weekColor) {
            weekColor = SchedulePage.getWeekColor(
                await SchedulePage.getPage(TPCPages.ScheduleByGroups),
            );
        }
        args.append("week", weekColor.toString());

        this.weekColor = weekColor;
        this.document = await SchedulePage.getPage(TPCPages.ScheduleByGroups, args);
        this.replaces = SchedulePage.getStatus(this.document);
    }

    public getLessonsWithReplacements(): DailySchedule {
        const schedule: DailySchedule = {
            lectures: [...this.replaces.DayLessons.lectures],
            weekcolor: this.weekColor,
            status: this.replaces,
        };
        if (!this.replaces.DayLessons.exist
            && !this.replaces.TodayReplaces.exist
            && !this.replaces.TomorrowReplaces.exist) {
            return (schedule);
        }

        const Today = new Date().getDay();
        const Tomorrow = Today + 1;

        if (this.replaces.TodayReplaces.exist
            && this.requestedDay === Today
        ) {
            schedule.lectures = StudentPage.mergeReplaces(
                this.replaces.DayLessons.lectures,
                this.replaces.TodayReplaces.lectures,
            );
        } else if (this.replaces.TomorrowReplaces.exist && this.requestedDay === Tomorrow
        ) {
            schedule.lectures = StudentPage.mergeReplaces(
                this.replaces.DayLessons.lectures,
                this.replaces.TomorrowReplaces.lectures,
            );
        }
        return (schedule);
    }

    private static mergeReplaces(lessons: Lecture[], replaces: Replacement[]) {
        replaces.map((replace) => {
            const { id, title: lectureToTitle } = replace;
            const repLecture = lessons.findIndex((lesson) => lesson.id === id);
            if (repLecture !== -1) {
                lessons[repLecture].title = lectureToTitle;
            } else {
                lessons.push(replace as Lecture);
            }
            return (replace);
        });
        return (lessons);
    }
}

export default StudentPage;
