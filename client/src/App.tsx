import Navbar from './components/navbar'
import './App.css'
import Modal from 'react-modal';

import Content  from './components/content'

 function App() {
  
  return (
   <div className="">
     <Navbar/>
     <h1 className="text-white font-extrabold text-5xl align-top p-4">Dashboard</h1>
     <Content/>
   </div>
  )
}

export default App
