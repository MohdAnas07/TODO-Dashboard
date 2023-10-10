import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "../constant";

const Todos = []

export const todoReducer = (state = Todos, action) => {
    let { type, payload } = action
    switch (type) {
        case ADD_TODO:
            return [...state, payload];

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

        case DELETE_TODO:
            return state.filter(todo => todo.id !== payload.id)

        default: return state
    }
}

