import Group from "../../entity/group/group";
import { ExamsPage } from "../exports";
import Page, { TPCPages } from "../page";

export default class GroupsPage extends ExamsPage {
  Document: Document;

  Groups: Group[];

  public async init() {
    const args = new URLSearchParams();
    this.Document = await Page.getPage(TPCPages.Exams, args);
    this.Groups = this.getGroups();
  }

  private getGroups(): Group[] {
    const groupsNames = Page.getByXPath(
      this.Document,
      "/html/body/table//tr[1]/td[2]/table[2]//tr[1]/td[2]/table//tr/td/table//tr[2]/td/table//tr/td[2]/form/table//tr[1]/td[2]/select/option"
    );

    const groupsIds = Page.getByXPath(
      this.Document,
      "/html/body/table//tr[1]/td[2]/table[2]//tr[1]/td[2]/table//tr/td/table//tr[2]/td/table//tr/td[2]/form/table//tr[1]/td[2]/select/option/@value"
    );

    const groups: Group[] = groupsIds.map(
      (id, index) =>
        ({
          id: Number(id),
          name: groupsNames[index],
        } as Group)
    );
    return groups;
  }

  public GetGroupByName(name: string): Group {
    const probGroups: Group[] = [];
    this.Groups.forEach((group) => {
      const [prefix, postfix] = group.name.split("-");
      if (name.includes(prefix) && name.includes(postfix)) {
        probGroups.push(group);
      }
    });

    console.warn(probGroups);
    const foundedGroup = probGroups.reduce((prev, group) =>
      prev.name.length > group.name.length ? prev : group
    );
    return foundedGroup;
  }
}
