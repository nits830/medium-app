
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home route */}
        <Route path="/signup" element={<Signup />} />  {/* About route */}
        <Route path="*" element={<NotFound />} />  {/* Not Found route */}
      </Routes>
    </BrowserRouter>
  )
}