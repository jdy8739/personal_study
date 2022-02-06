import { atom, selector } from "recoil";

export enum Categories {
    'TO_DO' = 'TO_DO',
    'DOING' = 'DOING',
    'DONE' = 'DONE'
}

export interface ITodo {
    todo: string,
    id: number
    category: Categories
}

export const todoState = atom<ITodo[]>({
    key: 'todo',
    default: []
});

export const categoryState = atom<Categories>({
    key: 'category',
    default: Categories.TO_DO
});

export const todoSelector = selector({
    key: 'todoSelector',
    get: ({ get }) => {
        const todoList = get(todoState);
        const newCategory = get(categoryState);
        return todoList.filter(todo => todo.category === newCategory);
    }
})