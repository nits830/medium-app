
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/signin" element={<SignIn />} />  
        <Route path="*" element={<NotFound />} />  
      </Routes>
    </BrowserRouter>
  )
}