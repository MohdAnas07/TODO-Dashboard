import React, { useState } from 'react'
import '../styles/todoTable.scss'
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { addTodo, deleteTodo, editTodo } from '../store/action'

const Todo = ({ todo, index }) => {
    const dispatch = useDispatch();
    const [editId, setEditId] = useState(-1)

    const handleDeleteTodo = () => {
        dispatch(deleteTodo(todo))
    }

    const handleEditTodo = () => {
        dispatch(deleteTodo(todo))
    }

    return (
        <>

        </>
    )
}

export default Todo