import logo from '../assets/logo.svg'


export default function Navbar(){
   return (
    
         <nav className="navbar navbar-light bg-white p-3">
  <div className="navbar-brand">
    <img src={logo} width="200" height="200" className="d-inline-block align-top px-3" alt=""/>
   
  </div>
  
</nav>
    
   )
}