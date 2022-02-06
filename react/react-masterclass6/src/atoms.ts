import { atom } from "recoil";

export interface ITodo {
    todo: string,
    id: number
};

export interface ITodoList {
    [key: string]: ITodo[]
};

export const arr = atom<ITodoList>({
    key: 'arr',
    default: {
        toDo: [],
        doing: [],
        done: [],
    }
});