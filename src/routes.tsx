import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import Send from './pages/Send';
import Receive from './pages/Receive';


function RouteFile() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/send" element={<Send />} />
        <Route path="/receive" element={<Receive />} />
      </Routes>
    </Router>
  );
}

export default RouteFile;