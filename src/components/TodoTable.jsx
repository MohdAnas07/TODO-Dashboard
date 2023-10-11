import { useEffect, useState } from 'react';
import '../styles/todoTable.scss'
import { useSelector } from 'react-redux/es/exports'
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { addTodo, deleteTodo, editTodo, updateCheckList } from '../store/action'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TodoTable = () => {
    const { allTodos } = useSelector((state) => state)
    const [todos, setTodos] = useState([])
    const [filterTodos, setFilterTodos] = useState([])
    const dispatch = useDispatch();
    const [text, setText] = useState('')
    const [finishD, setFinishD] = useState('')
    const [editId, setEditId] = useState(-1)
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')

    // For Assigning Todos Very first time or whenever alltodos change this component will render.
    useEffect(() => {
        setFilterTodos(allTodos)
        setTodos(allTodos)
    }, [allTodos])


    // for handle the delete todo taks
    const handleDeleteTodo = (todo) => {
        dispatch(deleteTodo(todo))
    }

    // For handle the edit todo taks
    const handleEditTodo = (todo) => {
        setEditId(todo.id)
        setText(todo.data)
        setFinishD(todo.finishDate)
    }

    // To Update the Todo taks into redux store
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

    // whenever date range will change todos render accordingly
    useEffect(() => {
        if (fromDate && toDate)
            handleFilter()
    }, [fromDate, toDate])


    // filter todo by date range
    const handleFilter = () => {
        let frmD = new Date(fromDate).getTime()
        let toD = new Date(toDate).getTime()
        const filteredTodo = todos.filter(todo => {
            let finishD = new Date(todo.finishDate).getTime()
            return finishD >= frmD && finishD <= toD;
        })
        console.log(filteredTodo);
        setFilterTodos(filteredTodo)
    }

    // Function for handling the print api
    const handlePrint = () => {
        const selectedTodoArray = []
        for (let t of allTodos) {
            if (t.checked) {
                selectedTodoArray.push(t)
            }
        }
        console.log(selectedTodoArray);
    }

    // Function for update todo checked or not in store data
    const handleSelect = (todoId) => {
        let todoData = {
            id: todoId,
        }
        dispatch(updateCheckList(todoData))
    }


    return (
        <>
            <div className="selectContainer wrapper">
                <div className="dateSelected">
                    <DatePicker className="datePicker" name="from" dateFormat="MM-dd-y" selected={fromDate} onChange={(date) => setFromDate(date)} placeholderText={"From"} format="MM-dd-y" />
                    <DatePicker className="datePicker" name="to" dateFormat="MM-dd-y" selected={toDate} onChange={(date) => setToDate(date)} placeholderText={"To"} format="MM-dd-y" />
                </div>
                <div className="printSelected">
                    <button className="btn" onClick={handlePrint}>Print Selected</button>
                </div>
            </div>

            <div className="todoTable wrapper">
                <table className='table' style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Select All</th>
                            <th style={{ width: "45%" }}>TODO</th>
                            <th>Finish Date</th>
                            <th style={{ width: "25%" }}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            // Map to iterate all todos =======
                            filterTodos?.map((todo, index) => {
                                return (
                                    todo.id === editId ?
                                        <tr key={todo.id}>
                                            <td>
                                                <input type="checkbox"
                                                    name="checked"
                                                    onClick={() =>
                                                        handleSelect(todo.id)
                                                    }
                                                />
                                            </td>
                                            <td><input type="text" name='' value={text} onChange={(e) => setText(e.target.value)} /></td>
                                            <td>
                                                <DatePicker className="datePicker" dateFormat="MM-dd-y" selected={finishD} onChange={(date) => setFinishD(date)} placeholderText={"Finish Date"} format="MM-dd-y" />
                                            </td>
                                            <td><button className='btn btnEdit' onClick={handleUpdate} >Update</button></td>
                                        </tr>
                                        :
                                        <tr key={todo.id}>
                                            <td>
                                                <input type="checkbox"
                                                    name="checked"
                                                    onClick={() =>
                                                        handleSelect(todo.id)
                                                    }
                                                />
                                            </td>
                                            <td>{todo.data}</td>
                                            <td>{`${todo.finishDate.getMonth() + 1}-${todo.finishDate.getDate()}-${todo.finishDate.getFullYear()}`}</td>
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
        </>
    );
};

export default TodoTable
