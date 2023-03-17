import { v4 as uuidv4 } from "uuid";

export const dummyUserList = [
    {
        id: uuidv4(),
        firstName: "John",
        lastName: "Doe",
        balance: 1,
    },
    {
        id: uuidv4(),
        firstName: "Marryle",
        lastName: "Samnite",
        balance: 1337,
    },
];
