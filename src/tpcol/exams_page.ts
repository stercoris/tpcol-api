import Exam from "../entity/exam/Exam";
import Page, { TPCPages } from "./page";

export default class ExamsPage {
  document: Document;

  exams: Exam[];

  public async init(group: number) {
    const args = new URLSearchParams();
    args.append("group", group.toString());
    this.document = await Page.getPage(TPCPages.Exams, args);
    this.exams = this.getExams();
  }

  private getExams(): Exam[] {
    const exams: Exam[] = [];

    const getColumn = (column: number) =>
      `/html/body/table//tr[1]/td[2]/table[2]//tr[1]/td[2]/table//tr/td/table[2]//tr[position()>1]/td[${column}]/text()`;
    const dates = Page.getByXPath(this.document, getColumn(1));
    const professions = Page.getByXPath(this.document, getColumn(2));
    const teachers = Page.getByXPath(this.document, getColumn(3));
    const cabinets = Page.getByXPath(this.document, getColumn(4));

    dates.forEach((date, i) => {
      exams.push({
        date,
        cabinet: cabinets[i],
        profession: professions[i],
        teacher: teachers[i],
      } as Exam);
    });
    return exams;
  }
}
