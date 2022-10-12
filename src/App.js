
import './App.css';
import NavigationBar from './component/NavigationBar';
import Intro from './component/Intro';
import ListImages from './component/ListImages';
import Dashboard from './component/Dashboard';
import ListPost from './component/ListPost';
import Login from './component/Login';

import "./style/style.css"


import {BrowserRouter,Routes, Route, Outlet } from 'react-router-dom';




const AuthLayout = () => {
 
  return (
    <>
     <NavigationBar/> 
      <Outlet />
    </>
  );
};
function App() {
  return (
    <BrowserRouter>
 
      <Routes>

      <Route path="/" element={<Login />} />
        <Route element={<AuthLayout />}>
        <Route path='/dasboard' element={<><Dashboard/></>}/> 
        <Route path='/listpost' element={<><ListPost/></>}/>  
        <Route path='/index' element={<><div className='bg'><Intro/></div> <ListImages/></>}/>  
        </Route> 
      </Routes>
  
   
      {/* <Routes>
             <Route path='/dasboard' element={<><Dashboard/></>}/> 
             <Route path='/listpost' element={<><ListPost/></>}/>  
      </Routes> */}
    
    </BrowserRouter>
  );
}

export default App;
