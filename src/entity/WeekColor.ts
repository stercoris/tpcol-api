import { registerEnumType } from "type-graphql";

enum WeekColor {
    Green = 0,
    Red = 1,
}

registerEnumType(WeekColor,
    {
        name: "WeecColor",
        description: "Red or Green",
    });

export default WeekColor;
