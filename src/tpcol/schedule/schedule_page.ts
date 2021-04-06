import WeekColor from "../../entity/WeekColor";
import Page from "../page";

class SchedulePage extends Page {
  public static getWeekColor(page: Document) {
    const xpath =
      "/html/body/table//tr[1]/td[2]/table[2]//tr[1]/td[2]/table//tr/td/table//tr[2]/td/table//tr/td[2]/font/text()";
    const weekColor = Page.getByXPath(page, xpath)[0];
    if (weekColor === "КРАСНАЯ неделя") {
      return WeekColor.Red;
    }
    return WeekColor.Green;
  }
}

export default SchedulePage;
