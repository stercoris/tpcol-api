import { registerEnumType } from "type-graphql";

enum WeekColor {
  Green = 1,
  Red = 0,
}

registerEnumType(WeekColor, {
  name: "WeekColor",
  description: "Red or Green",
});

export default WeekColor;
