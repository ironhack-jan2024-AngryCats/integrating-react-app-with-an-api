import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ProjectListPage from './pages/ProjectListPage'
import CreateProjectPage from './pages/CreateProjectPage'

function App() {


  return (
    <>
      
      <h1>Project Management App</h1>

      <Navbar />

      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/projects" element={<ProjectListPage />} />
        <Route path="/projects/create" element={<CreateProjectPage />} />
      </Routes>
      
    </>
  )
}

export default App
