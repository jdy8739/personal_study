import { atom, selector } from "recoil"

enum Categories {
    "TO_DO" = "TO_DO", 
    "DOING" = "DOING", 
    "DONE" = "DONE"
}

interface Itodo {
    text: string,
    id: number,
    category: Categories,   
};

const todoState = atom<Itodo[]>({
    key: 'todo',
    default: []
});

const categoryState = atom<Categories>({
    key: 'category',
    default: Categories.TO_DO
});

const todoSelector = selector({
    key: 'todoSelector',
    get: ({ get }) => {
        const todos = get(todoState);
        const category = get(categoryState);
        return todos.filter(todo => todo.category === category);
    }
});

export { todoState, Itodo, todoSelector, categoryState, Categories };