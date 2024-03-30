import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import Send from './pages/Send';
import Receive from './pages/Receive';
import Notifications from './pages/Notifications';
import Home from './pages/Home';
import WalletPage from './pages/Wallet';
import Profile from './pages/Profile';
import Tranasctions from './pages/Transactions';
import Navigation from './components/Navigation';


function RouteFile() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/send" element={<Send />} />
        <Route path="/receive" element={<Receive />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/transactions" element={<Tranasctions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Navigation />
    </Router>
  );
}

export default RouteFile;