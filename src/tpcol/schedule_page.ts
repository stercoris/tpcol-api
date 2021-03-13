import Lecture from "../entity/Lecture";
import Replaces from "../entity/Replaces";
import WeekColor from "../entity/WeekColor";
import Page from "./page";

class SchedulePage extends Page {
    public static getReplaces(page: Document): Replaces {
        const replaces: Replaces = {
            haveLessons: true,
            Lessons: [],
            haveTodayReplaces: true,
            TodayReplaces: [],
            haveTomorrowReplaces: true,
            TomorrowReplaces: [],
        };
        const titles = SchedulePage.getByXPath(
            page,
            "/html/body/table//tr[1]/td[2]/table[2]//tr[1]/td[2]/table//tr/td/table//tr/td[@class='head3']/text()",
        );
        titles.forEach((header) => {
            if (header.includes("нет!")) {
                if (header.includes("на сегодня")) replaces.haveTodayReplaces = false;
                if (header.includes("на завтра")) replaces.haveTomorrowReplaces = false;
            }
            if (header.includes("расписания нет!")) replaces.haveLessons = false;
        });

        if (replaces.haveLessons) {
            replaces.Lessons = SchedulePage.getIdAndTitle(page, 3);
        }
        if (replaces.haveTodayReplaces) {
            replaces.TodayReplaces = SchedulePage.getIdAndTitle(
                page, 5 - (replaces.haveLessons ? 0 : 1), 3,
            );
        }
        if (replaces.haveTomorrowReplaces) {
            replaces.TomorrowReplaces = SchedulePage.getIdAndTitle(
                page,
                7 - (replaces.haveLessons ? 0 : 1) - (replaces.haveTodayReplaces ? 0 : 1), 3,
            );
        }
        return (replaces);
    }

    private static getIdAndTitle(
        document: Document,
        tableNumber: number,
        titleColumn = 2,
    ) {
        const lectures: Lecture[] = [];
        const lessonNumbers = SchedulePage.getColumn(document, tableNumber, 1);
        const lessonTitles = SchedulePage.getColumn(document, tableNumber, titleColumn);
        lessonNumbers.map(
            (id, i) => lectures.push(
                {
                    id: Number(id),
                    title: lessonTitles[i],
                } as Lecture,
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
