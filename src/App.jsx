import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styles/app.scss';
import TodoTable from "./components/TodoTable";
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { addTodo } from './store/action'

function App() {
  const [todoText, setTodoText] = useState('');
  const [finishDate, setFinishDate] = useState('');
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
        finishDate: finishDate,
        checked: false,
      }
      dispatch(addTodo(todoData))
      setTodoText('')
    }
  }


  return (
    <>
      <div className="container">
        <h1 style={{ marginBottom: '1rem' }}>TODO Dashboard</h1>
        <div className="inputContainer wrapper">
          <input className="inputField" type="text" value={todoText} placeholder="Enter your TODO..." onChange={(e) => setTodoText(e.target.value)} />

          <DatePicker className="datePicker" dateFormat="MM-dd-y" selected={finishDate} onChange={(date) => setFinishDate(date)} placeholderText={"Finish Date"} format="MM-dd-y" />

          <button className="btn" onClick={handleTodo}>+ Add</button>
        </div>

        {/* Table Data component======================== */}
        <TodoTable setTodoText={setTodoText} setFinishDate={setFinishDate} />

      </div>
    </>
  )
}

export default App
