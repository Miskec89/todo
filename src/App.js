import {useState} from "react"
import {HashRouter as Router, Route} from "react-router-dom"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Tasks from "./Components/Tasks"
import AddTask from "./Components/AddTask"
import About from "./Components/About"
import { FaMoon, FaSun, FaLongArrowAltRight } from "react-icons/fa"

function App() {
  const [showAddTask, setShowAddTask] = useState(false) 
  const [toggle, setToggle] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Food Shopping",
      day: "Feb 6th at 2:30pm",
      reminder: "true"
    }
  ])

const toggler = () => {
  toggle ? setToggle(false) : setToggle(true)
}

const addTask = (task) => {
  const id = Math.floor(Math.random() * 1000) + 1 ;
  const newTask = {id, ...task}
  setTasks([...tasks, newTask])
}

const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !== id))
}

const toggleReminder = (id) => {
  setTasks(tasks.map((task) => task.id === id? {...task, reminder: !task.reminder} : task ))
}

const sunColor = {
  color: '#DBE2E9',
}

const moonColor = {
  color: '#8c92ac'
}

  return (
    <Router>
      <div style={{backgroundColor : toggle? "rgba(3, 31, 48, 0.5)" : "#fff"}} className="container">
        {toggle ?  
          (<><FaMoon /> <FaLongArrowAltRight /> <FaSun style={sunColor} onClick={toggler}/></>) : 
          (<><FaSun/> <FaLongArrowAltRight /> <FaMoon style={moonColor} onClick={toggler}/></>) 
        }
        <Header  onAdd={() => setShowAddTask(!showAddTask)} showAddStatus={showAddTask} />
        <Route 
          path = '/' 
          exact 
          render={(props) => 
          (
            <>
              { showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (<Tasks  tasks={tasks} onDelete={deleteTask} 
              onToggle={toggleReminder} />) :
              ("No Tasks to Show")
              }
           </>
          )} />
        <Route path="/about" component={About}/>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
