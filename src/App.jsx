import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import AuthLayout from './components/layout/AuthLayout';
import MainLayout from './components/layout/MainLayout';



function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout/>}>
            <Route path='/login' element={<Login />} /> 
            <Route path='/register' element={<Register/>} />
        </Route>
        <Route path='/' element={<MainLayout/>} >

        </Route>
      </Routes>
    </Router>
  );
}

export default App
