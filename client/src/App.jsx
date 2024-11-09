import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Cart from './pages/Cart';
import DetailProduct from './pages/Detail_product';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './redux/slices/user-slice';
import { useEffect } from 'react';
import Dashboard from './dashboard';

function App() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.authToken);

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      dispatch(login(storedToken)); 
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  const ProtectedRoute = ({ children }) => {
    return authToken ? children : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/details_product/:id" element={<ProtectedRoute><DetailProduct /></ProtectedRoute>} />
      </Route>

      <Route path="/dashboard/*" element={<Dashboard />} />


      <Route path="/register" element={authToken ? <Navigate to="/" /> : <Register />} />
      <Route path="/login" element={authToken ? <Navigate to="/" /> : <Login />} />
    </Routes>
  );
}

export default App;
