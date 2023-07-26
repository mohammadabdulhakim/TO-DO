import { create as add } from "zustand";

/* 
?
=========> [ To-do attributes ] <=========
{
*    id: "1",
*    title: "Toggle dark and light mode",
*    description: "using mui, tailwindCSS...",
*    writtenAt: "1690395123480",
*    checked: false,  //? default is false
*    finishedAt: null, //? default is null
*    archivedAt: null //? default is null
}
*/

const useStore = add((set) => ({
    toDos: [],
    addToDo: (newOne) => set((state) => ({ toDos: [...state.toDos, newOne] })),
    updateToDo: (updatedOne) =>
        set((state) => ({
            toDos: state.toDos.filter((todo) => {
                if (todo.id === updatedOne.id) {
                    todo = updatedOne;
                }
                return todo;
            }),
        })),
    checkToDo: (id) =>
        set((state) => ({
            toDos: state.toDos.filter((todo) => {
                if (todo.id === id) {
                    todo.checked = true;
                }
                return todo;
            }),
        })),
    deleteToDo: (id) => set((state) => ({ toDos: state.toDos.filter((todo) => todo.id !== id) })),
    archiveToDo: (id) =>
        set((state) => ({
            toDos: state.toDos.filter((todo) => {
                if (todo.id === id) {
                    todo.archivedAt = Date.now();
                }
                return todo;
            }),
        })),
}));

export default useStore;
