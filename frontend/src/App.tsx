
import {  Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Write from './pages/Write';
import Header from './components/Header';
import TrendingHero from './components/TrendingHero';






export default function App() {
  return (
      <div>
        <Header/>
       
      <Routes>
         
        <Route path="/" element={<Home />} /> 
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/signin" element={<SignIn />} />  
        <Route path="/write" element={<Write />} />

        <Route path="*" element={<NotFound />} />  
      </Routes>
      </div>
    
  )
}