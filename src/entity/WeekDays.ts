import { registerEnumType } from "type-graphql";

enum WeekDays {
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
    Sunday = 7,
}

registerEnumType(WeekDays,
    {
        name: "DayOfWeek",
        description: "1-7",
    });

export default WeekDays;
