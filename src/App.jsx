import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Login from './components/Login'
import CreateAccount from './components/CreateAccount';
import Dashboard from './components/Dahsboard';

// Assets
import './index.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/createAccount' element={<CreateAccount />} />
        <Route path='/userDashbord' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
