import { atom, selector } from "recoil";

export const minuteState = atom<number>({
    key: 'minutes',
    default: 0
});

export const hourSelector = selector<number>({
    key: 'hours',
    get: ({ get }) => {
        return Math.round(get(minuteState) / 60);
    },
    set: ({ set }, newValue) => {
        const newMinutes = Number(newValue) * 60;
        set(minuteState, newMinutes);
    }
});