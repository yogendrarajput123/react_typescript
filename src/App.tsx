import AddTodo from './components/AddTodo'
import Navbar from './components/navbar'
import Todos from './components/todos'

const App = () => {
  return (
    <div>
      <main>
         <h1>TODO REACT + TYPESCRIPT</h1>
         <Navbar />
         <AddTodo />
         <Todos />
      </main>
    </div>
  )
}

export default App
