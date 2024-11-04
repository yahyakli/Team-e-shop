import Layout from "./components/Layout";
import {Routes, Route, json} from 'react-router-dom'
import Register from "./pages/Register"
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Detail_product from "./pages/Detail_product";

function App() {

  let auth_token = localStorage.getItem('auth_token')

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/details_product/:id" element={<Detail_product />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App;
