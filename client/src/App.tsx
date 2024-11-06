import './App.css'
import { Outlet } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Leftside } from './components/Leftside'

function App() {
  return (
    <>
      <div className="allbody">
        <Leftside/>
        <div className="wrapper">
          <Header/>
          <div className="main">
            <Outlet/>
          </div>
          <Footer/>
        </div>
      </div>
    </>
  );
}

export default App;
