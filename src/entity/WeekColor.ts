import { registerEnumType } from "type-graphql";

enum WeekColor {
    Green = "RED",
    Red = "GREEN"
}

registerEnumType(WeekColor,
    {
        name: "WeecColor",
        description: "Red or Green",
    });

export default WeekColor;
