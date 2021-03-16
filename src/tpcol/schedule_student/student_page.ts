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

  public async init(group: number, day?: WeekDays, weekColor?: WeekColor) {
    const args = new URLSearchParams();
    args.append("group", group.toString());

    if (!day) {
      day = new Date().getDay();
    }
    args.append("day", day.toString());
    this.requestedDay = day;

    if (!weekColor) {
      weekColor = SchedulePage.getWeekColor(
        await SchedulePage.getPage(TPCPages.ScheduleByGroups)
      );
    }
    args.append("week", weekColor.toString());

    this.weekColor = weekColor;
    this.document = await SchedulePage.getPage(TPCPages.ScheduleByGroups, args);
    this.replaces = StudentPage.getStatus(this.document);
  }

  public getLessonsWithReplacements(): DailySchedule {
    const schedule: DailySchedule = {
      lectures: [...this.replaces.DayLessons.lectures],
      weekcolor: this.weekColor,
      status: this.replaces,
    };
    if (
      !this.replaces.DayLessons.exist &&
      !this.replaces.TodayReplaces.exist &&
      !this.replaces.TomorrowReplaces.exist
    ) {
      return schedule;
    }

    const Today = new Date().getDay();
    const Tomorrow = Today + 1;

    if (this.replaces.TodayReplaces.exist && this.requestedDay === Today) {
      schedule.lectures = StudentPage.mergeReplaces(
        this.replaces.DayLessons.lectures,
        this.replaces.TodayReplaces.lectures
      );
    } else if (
      this.replaces.TomorrowReplaces.exist &&
      this.requestedDay === Tomorrow
    ) {
      schedule.lectures = StudentPage.mergeReplaces(
        this.replaces.DayLessons.lectures,
        this.replaces.TomorrowReplaces.lectures
      );
    }
    return schedule;
  }

  private static mergeReplaces(lectures: Lecture[], replaces: Replacement[]) {
    const main = lectures.map((obj) => ({ ...obj }));
    replaces.forEach((replace) => {
      const { id, title: lectureToTitle } = replace;
      const repLecture = main.findIndex((lesson) => lesson.id === id);
      if (repLecture !== -1) {
        main[repLecture].title = lectureToTitle;
      } else {
        main.push(replace as Lecture);
      }
    });
    return main;
  }

  public static getStatus(page: Document): GroupStatus {
    const replaces: GroupStatus = {
      DayLessons: {
        exist: true,
        lectures: [],
      },
      TodayReplaces: {
        exist: true,
        lectures: [],
      },
      TomorrowReplaces: {
        exist: true,
        lectures: [],
      },
    };
    const titles = SchedulePage.getByXPath(
      page,
      "/html/body/table//tr[1]/td[2]/table[2]//tr[1]/td[2]/table//tr/td/table//tr/td[@class='head3']/text()"
    );
    titles.forEach((header) => {
      if (header.includes("нет!")) {
        if (header.includes("на сегодня")) {
          replaces.TodayReplaces.exist = false;
        }
        if (header.includes("на завтра")) {
          replaces.TomorrowReplaces.exist = false;
        }
      }
      if (header.includes("расписания нет!")) replaces.DayLessons.exist = false;
    });

    if (replaces.DayLessons.exist) {
      replaces.DayLessons.lectures = StudentPage.getLectureTable(page, 3);
    }
    if (replaces.TodayReplaces.exist) {
      replaces.TodayReplaces.lectures = StudentPage.getReplacementsTable(
        page,
        5 - (replaces.DayLessons.exist ? 0 : 1)
      );
    }
    if (replaces.TomorrowReplaces.exist) {
      replaces.TomorrowReplaces.lectures = StudentPage.getReplacementsTable(
        page,
        7 -
          (replaces.DayLessons.exist ? 0 : 1) -
          (replaces.TodayReplaces.exist ? 0 : 1)
      );
    }
    return replaces;
  }

  private static getLectureTable(
    document: Document,
    tableNumber: number
  ): Lecture[] {
    const lectures: Lecture[] = [];
    const lessonNumbers = SchedulePage.getColumn(document, tableNumber, 1);
    const lessonTitles = SchedulePage.getColumn(document, tableNumber, 2);
    const lessonCabinet = SchedulePage.getColumn(document, tableNumber, 3);
    lessonNumbers.map((id, i) =>
      lectures.push({
        id: Number(id),
        title: lessonTitles[i],
        cabinet: lessonCabinet[i],
      } as Lecture)
    );
    return lectures;
  }

  private static getReplacementsTable(
    document: Document,
    tableNumber: number
  ): Replacement[] {
    const lectures: Replacement[] = [];
    const lessonNumbers = SchedulePage.getColumn(document, tableNumber, 1);

    const lessonFromTitles = SchedulePage.getColumn(
      document,
      tableNumber,
      2,
      "/text()[1]"
    );
    const lessonFromTeachers = SchedulePage.getColumn(
      document,
      tableNumber,
      2,
      "/font"
    );

    const lessonToTitles = SchedulePage.getColumn(
      document,
      tableNumber,
      3,
      "/text()[1]"
    );
    const lessonToTeachers = SchedulePage.getColumn(
      document,
      tableNumber,
      3,
      "/font"
    );

    const lessonCabinet = SchedulePage.getColumn(document, tableNumber, 4);
    lessonNumbers.map((id, i) =>
      lectures.push({
        id: Number(id),
        fromTitle: lessonFromTitles[i],
        title: lessonToTitles[i],
        fromTeacher: lessonFromTeachers[i],
        teacher: lessonToTeachers[i],
        cabinet: lessonCabinet[i],
      } as Replacement)
    );
    return lectures;
  }
}

export default StudentPage;
