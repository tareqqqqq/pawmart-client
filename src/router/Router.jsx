import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login"
import Register from "../pages/Register"
import ListDetails from "../pages/ListDetails";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch('http://localhost:3000/current-listing')
      },
      
      {
        path: "/auth/login",
         
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
      
      {
        path: "/product-details/:id",
        loader: ({params}) => fetch(`http://localhost:3000/listing/${params.id}`),
        element: <ListDetails/>,
      },
       
      {
        path: "/products",
         
        element: <PetsAndSupplies />,
      },
      
     
      
      

      

       

        
      
    ],
  },
]);