import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login"
import Register from "../pages/Register"
import ListDetails from "../pages/ListDetails";
import PetsAndSupplies from "../pages/PetsAndSupplies";
import AddListing from "../pages/AddListing"
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    //  errorElement: <Error/>,
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
          loader: () => fetch('http://localhost:3000/listing'),
        element: <PetsAndSupplies />,
      },
      
      {
        path: "/add-listing",
         
        element: <AddListing/>,
      },
      
     
      
      

      

       

        
      
    ],
  },
]);