import { useEffect, useState } from 'react';
import '../styles/todoTable.scss'
import { useSelector } from 'react-redux/es/exports'
import Todo from './Todo';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { addTodo, deleteTodo, editTodo } from '../store/action'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TodoTable = () => {
    const { allTodos } = useSelector((state) => state)
    const [todos, setTodos] = useState([])
    const dispatch = useDispatch();
    const [text, setText] = useState('')
    const [finishD, setFinishD] = useState('')
    const [editId, setEditId] = useState(-1)

    useEffect(() => {
        const sorted = allTodos.sort((a, b) => {
            return a.data - b.data;
        });
        console.log(sorted);
        setTodos(allTodos)
    }, [allTodos, todos])

    const handleDeleteTodo = (todo) => {
        dispatch(deleteTodo(todo))
    }

    const handleEditTodo = (todo) => {
        setEditId(todo.id)
        setText(todo.data)
        setFinishD(todo.finishDate)
    }

    const handleUpdate = () => {
        console.log(editId);
        if (!text) {
            alert("Please Enter Todo Text.")
        } else if (!finishD) alert("Please Assign Finish Date")
        else {
            let todoData = {
                id: editId,
                data: text,
                finishDate: finishD
            }
            dispatch(editTodo(todoData))
            setEditId(-1)
        }
    }

    return (
        <div className="todoTable">
            <table className='table' style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th style={{ width: "50%" }}>TODO</th>
                        <th>Finish Date</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        todos?.map((todo, index) => {
                            return (
                                todo.id === editId ?
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td><input type="text" name='' value={text} onChange={(e) => setText(e.target.value)} /></td>
                                        <td>
                                            <DatePicker className="datePicker" dateFormat="MM-dd-y" selected={finishD} onChange={(e) => setFinishD(e.target.value)} placeholderText={"Finish Date"} format="MM-dd-y" />
                                        </td>
                                        <td><button className='btn btnEdit' onClick={handleUpdate} >Update</button></td>
                                    </tr>
                                    :
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{todo.data}</td>
                                        <td>{`${todo.finishDate.getDate()}-${todo.finishDate.getMonth()}-${todo.finishDate.getFullYear()}`}</td>
                                        <td className='btnBox'>
                                            <button className='btn btnEdit' onClick={() => handleEditTodo(todo)}>Edit</button>
                                            <button className='btn btnDelete' onClick={() => handleDeleteTodo(todo)}>Delete</button>
                                        </td>
                                    </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div >
    );
};

export default TodoTable
