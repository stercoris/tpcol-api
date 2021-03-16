import fetch from "node-fetch";
import { JSDOM } from "jsdom";

export default class Page {
  /**
   * Пробегаеца по каждой строчке в столбике в таблице в документе, записывая данные из оных
   * @param document страница (Document)
   * @param tableNumber номер таблицы на странице
   * @param columnNumber номер столбика на странице
   * @param queryPostfix дополнительный постфикс запроса
   * @returns массив текстовых значений ячеек
   */
  public static getColumn(
    document: Document,
    tableNumber: number,
    columnNumber: number,
    queryPostfix = ""
  ): string[] {
    const path = `/html/body/table//tr[1]/td[2]/table[2]//tr[1]/td[2]/table//tr/td/table[${tableNumber}]//tr/td[2]/table//tr[1]/td[2]/table//tr[position()>1]/td[${columnNumber}]${queryPostfix}`;
    const table = Page.getByXPath(document, path);
    return table;
  }

  /**
   * Отправляет post запрос на указанную страницу тпк
   * @param url url запроса
   * @param args post аргументы
   * @returns Document страницы сайта тпк
   */
  public static async getPage(
    url: string,
    args: URLSearchParams = new URLSearchParams()
  ): Promise<Document> {
    return new Promise<Document>(async (resolve) => {
      const response = await fetch(url, {
        method: "post",
        body: args.toString(),
        headers: { "Content-Type": "application/x-www-form-urlencoded;" },
      });
      const jsdom: JSDOM = new JSDOM();
      const domParser: DOMParser = new jsdom.window.DOMParser();
      const doc: Document = domParser.parseFromString(
        await response.textConverted(),
        "text/html"
      );
      resolve(doc);
    });
  }

  /**
   * Возвращает элементы по xpath'у
   * @param document страница (Document)
   * @param xpath путь к элементу в формате XPath
   * @returns элементы по xpath'у
   */
  public static getByXPath(document: Document, xpath: string): string[] {
    const nodeValues: string[] = [];
    const nodes = document.evaluate(xpath, document, null, 0, null);
    let nodeValue: string | null | undefined;
    while ((nodeValue = nodes.iterateNext()?.textContent)) {
      nodeValues.push(nodeValue.replace(/\s+/g, " "));
    }
    if (nodeValues === null) {
      throw new Error("node values was NULL? something is baaad");
    } else {
      return nodeValues;
    }
  }
}

export enum TPCPages {
  /** Расписание групп */
  ScheduleByGroups = "http://www.tpcol.ru/asu/timetablestud.php?f=1",
  /** Расписание преподавателей */
  ScheduleByTeachers = "http://www.tpcol.ru/asu/timetableprep.php?f=1",
  /** Расписание экзаменов */
  Exams = "http://www.tpcol.ru/asu/exams.php?f=1",
}
