import {useState, useEffect} from "react"
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
  const [tasks, setTasks] = useState([])
  
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  const toggler = () => {
    toggle ? setToggle(false) : setToggle(true)
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch (`http://localhost:5000/tasks/${id}`,
      {method: 'DELETE'}
    )
    setTasks(tasks.filter((task) => task.id !== id))
  }

    // Toggle Reminder
    const toggleReminder = async (id) => {
      const taskToToggle = await fetchTask(id)
      const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
  
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updTask),
      })
  
      const data = await res.json()
  
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, reminder: data.reminder } : task
        )
      )
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
