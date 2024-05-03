
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthProvider';
import ProtectedRoute from './utils/ProtectedRoute';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';




export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Route path="/" element={<Home />} />  
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/signin" element={<SignIn />} /> 
        
        <ProtectedRoute path="/dashboard" component={Dashboard} /> 
        <Route path="*" element={<NotFound />} />  
      </Router>
      </AuthProvider>
  )
}