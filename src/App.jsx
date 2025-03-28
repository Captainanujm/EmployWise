import Login from "./pages/Login"
import Users from "./pages/Users"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
function App() {
 

  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/users" element={<Users/>}/>
      </Routes>
      

    </Router>
      
    </>
  )
}

export default App
