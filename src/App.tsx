
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import JobBoard from './pages/Admin'
import Index from './pages/Job'
import Interview from './pages/Interview'

function App() {


  return (
    <div>
      <BrowserRouter>
         <Routes>
             <Route path='/' element={<Home/>}/>
             <Route path='/auth' element={<Auth/>}/>
             <Route path='/admin' element={<JobBoard/>}/>
             <Route path='/jobs' element={<Index/>}/>
             <Route path='/jobs/:id' element={<Interview/>}/>
         </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
