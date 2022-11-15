import './App.css'
import Button from "@mui/material/Button";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from "react-router-dom";
import {Provider} from 'react-redux';
import {store} from './store';
import AuthProvider, { useAuth } from './firebase/auth';

function ProtectedRoute({children}){
  const {user} = useAuth();
  if(!user) {
    return <Navigate to={"/login"} />
  }else {
    return children;
  }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Layout/>}>
      <Route index element={<Home />}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/checkout" element={
      <ProtectedRoute><Checkout/></ProtectedRoute>}></Route>
    </Route>
    <Route path="/login" element={<Login/>}></Route>
    </>
  )
)
function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
  )
}

export default App
