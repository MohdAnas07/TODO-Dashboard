import { ADD_TODO, DELETE_TODO, EDIT_TODO, UPDATE_CHECKLIST } from "./constant"

export const addTodo = (todo) => {
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export const editTodo = (editTodo) => {
    return {
        type: EDIT_TODO,
        payload: editTodo
    }
}

export const updateCheckList = (editTodo) => {
    return {
        type: UPDATE_CHECKLIST,
        payload: editTodo
    }
}

export const deleteTodo = (deleteTodo) => {
    return {
        type: DELETE_TODO,
        payload: deleteTodo
    }
}


