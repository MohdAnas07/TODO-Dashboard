import { ADD_TODO, DELETE_TODO, EDIT_TODO, UPDATE_CHECKLIST, FILTERED_TODOS } from "../constant";

const Todos = []

export const todoReducer = (state = Todos, action) => {
    let { type, payload } = action
    switch (type) {
        case ADD_TODO:
            const allTodos = [...state, payload]
            function compare(a, b) {
                if (a.data.toLowerCase() < b.data.toLowerCase()) {
                    return -1;
                }
                if (a.data.toLowerCase() > b.data.toLowerCase()) {
                    return 1;
                }
                return 0;
            }
            allTodos.sort(compare)
            return allTodos;

        case EDIT_TODO:
            const updatedArray = []
            state.map(todo => {
                if (todo.id === payload.id) {
                    todo.data = payload.data;
                    todo.finishDate = payload.finishDate;
                }
                updatedArray.push(todo)
            })
            return updatedArray;

        case UPDATE_CHECKLIST:
            const updatedCheckListArr = []
            state.map(todo => {
                if (todo.id === payload.id) {
                    todo.checked = !todo.checked;
                }
                updatedCheckListArr.push(todo)
            })
            return updatedCheckListArr;

        case FILTERED_TODOS:
            return payload

        case DELETE_TODO:
            return state.filter(todo => todo.id !== payload.id)

        default: return state
    }
}

