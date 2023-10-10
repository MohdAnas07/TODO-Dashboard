import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styles/app.scss';
import TodoTable from "./components/TodoTable";
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { addTodo, deleteTodo, editTodo } from './store/action'

function App() {
  const [todoText, setTodoText] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const dispatch = useDispatch()
  // const { allTodos } = useSelector((state) => state)

  const handleTodo = () => {
    if (!todoText) {
      alert("Please Enter Todo Text.")
    } else if (!finishDate) alert("Please Assign Finish Date")
    else {
      let todoData = {
        id: Date.now(),
        data: todoText,
        finishDate: finishDate
      }
      dispatch(addTodo(todoData))
      setTodoText('')
    }
  }


  return (
    <>
      <div className="container">
        <h1 style={{ marginBottom: '1rem' }}>TODO Dashboard</h1>
        <div className="inputContainer">
          <input className="inputField" type="text" value={todoText} placeholder="Enter your TODO..." onChange={(e) => setTodoText(e.target.value)} />

          <DatePicker className="datePicker" dateFormat="MM-dd-y" selected={finishDate} onChange={(date) => setFinishDate(date)} placeholderText={"Finish Date"} format="MM-dd-y" />

          <button className="btn" onClick={handleTodo}>+ Add</button>
        </div>

        <div className="selectContainer">
          <div className="dateSelected">
            <DatePicker className="datePicker" name="from" dateFormat="MM-dd-y" selected={fromDate} onChange={(date) => setFromDate(date)} placeholderText={"From"} format="MM-dd-y" />
            <DatePicker className="datePicker" name="to" dateFormat="MM-dd-y" selected={toDate} onChange={(date) => setToDate(date)} placeholderText={"To"} format="MM-dd-y" />

          </div>
          <div className="printSelected">
            <button className="btn">Print Selected</button>
          </div>
        </div>
        <TodoTable setTodoText={setTodoText} setFinishDate={setFinishDate} />

      </div>
    </>
  )
}

export default App
