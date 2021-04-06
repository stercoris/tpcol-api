import { Resolver, Arg, Query } from "type-graphql";
import Group from "../entity/group/group";
import GroupsPage from "../tpcol/groups/groups";

@Resolver()
export default class GroupsResolver {
  @Query(() => Group)
  async GroupByName(
    @Arg("name", () => String, { nullable: false })
    name: string
  ) {
    const groupsPage = new GroupsPage();
    await groupsPage.init();
    const group = groupsPage.GetGroupByName(name);
    return group;
  }
}
