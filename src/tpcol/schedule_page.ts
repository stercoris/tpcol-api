import Lecture from "../entity/group/Lecture";
import GroupStatus from "../entity/group/GroupStatus";
import WeekColor from "../entity/WeekColor";
import Page from "./page";
import Replacement from "../entity/group/Replacement";

class SchedulePage extends Page {
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
            page, "/html/body/table//tr[1]/td[2]/table[2]//tr[1]/td[2]/table//tr/td/table//tr/td[@class='head3']/text()",
        );
        titles.forEach((header) => {
            if (header.includes("нет!")) {
                if (header.includes("на сегодня")) replaces.TodayReplaces.exist = false;
                if (header.includes("на завтра")) replaces.TomorrowReplaces.exist = false;
            }
            if (header.includes("расписания нет!")) replaces.DayLessons.exist = false;
        });

        if (replaces.DayLessons.exist) {
            replaces.DayLessons.lectures = SchedulePage.getLectureTable(page, 3);
        }
        if (replaces.TodayReplaces.exist) {
            replaces.TodayReplaces.lectures = SchedulePage.getReplacementsTable(
                page, 5 - (replaces.DayLessons.exist ? 0 : 1),
            );
        }
        if (replaces.TomorrowReplaces.exist) {
            replaces.TomorrowReplaces.lectures = SchedulePage.getReplacementsTable(
                page,
                7 - (replaces.DayLessons.exist ? 0 : 1) - (replaces.TodayReplaces.exist ? 0 : 1),
            );
        }
        return (replaces);
    }

    private static getLectureTable(
        document: Document,
        tableNumber: number,
    ): Lecture[] {
        const lectures: Lecture[] = [];
        const lessonNumbers = SchedulePage.getColumn(document, tableNumber, 1);
        const lessonTitles = SchedulePage.getColumn(document, tableNumber, 2);
        const lessonCabinet = SchedulePage.getColumn(document, tableNumber, 3);
        lessonNumbers.map(
            (id, i) => lectures.push(
                {
                    id: Number(id),
                    title: lessonTitles[i],
                    cabinet: lessonCabinet[i],
                } as Lecture,
            ),
        );
        return (lectures);
    }

    private static getReplacementsTable(
        document: Document,
        tableNumber: number,
    ): Replacement[] {
        const lectures: Replacement[] = [];
        const lessonNumbers = SchedulePage.getColumn(document, tableNumber, 1);

        const lessonFromTitles = SchedulePage.getColumn(document, tableNumber, 2, "/text()[1]");
        const lessonFromTeachers = SchedulePage.getColumn(document, tableNumber, 2, "/font");

        const lessonToTitles = SchedulePage.getColumn(document, tableNumber, 3, "/text()[1]");
        const lessonToTeachers = SchedulePage.getColumn(document, tableNumber, 3, "/font");

        const lessonCabinet = SchedulePage.getColumn(document, tableNumber, 4);
        lessonNumbers.map(
            (id, i) => lectures.push(
                {
                    id: Number(id),
                    fromTitle: lessonFromTitles[i],
                    title: lessonToTitles[i],
                    fromTeacher: lessonFromTeachers[i],
                    teacher: lessonToTeachers[i],
                    cabinet: lessonCabinet[i],
                } as Replacement,
            ),
        );
        return (lectures);
    }

    public static getWeekColor(page: Document) {
        const xpath = "/html/body/table//tr[1]/td[2]/table[2]//tr[1]/td[2]/table//tr/td/table//tr[2]/td/table//tr/td[2]/font/text()";
        const weekColor = (Page.getByXPath(page, xpath))[0];
        if (weekColor === "КРАСНАЯ неделя") {
            return (WeekColor.Red);
        }
        return (WeekColor.Green);
    }
}

export default SchedulePage;
