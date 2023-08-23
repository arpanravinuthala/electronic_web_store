import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import RootLayer from './components/RootLayer';
import Home from './components/home/Home.js';
import Register from './components/register/Register';
import Login from './components/login/Login';
import UserProfile from './components/user-profile/UserProfile';
import AdminProfile from './components/admin-profile/AdminProfile';
import User from './components/user/User';
import Users from './components/users/Users';
import AddProduct from './components/add-product/AddProduct';
import AvailableProducts from './components/available-products/AvailableProducts';
import AddToCart from './components/add-to-cart/AddToCart';


function App() {

  const browserRouter=createBrowserRouter([{
    path:'/',
    element:<RootLayer />,
    children: [
      {
        path:'/',
        element: <Home />,
      },
      {
        path:'register',
        element: <Register />
      },
      {
        path:'login',
        element: <Login />
      },
      {
        path:'user-profile',
        element: <UserProfile />,
        children:[
          {
            path:'user-profile',
            element: <User />
          },
          {
            path:'add-to-cart',
            element:<AddToCart />
          }
        ]
      },
      {
        path:'admin-profile',
        element: <AdminProfile />,
        children:[
          {
            path:'addProduct',
            element:<AddProduct />
          },
          {
            path:'avialableProducts',
            element:<AvailableProducts />
          },
          {
            path:'users',
            element: <Users />
          }
        ]
      },
      {
        path:'user',
        element:<User />
      }
    ]
  }])

  return (
    <div>
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
