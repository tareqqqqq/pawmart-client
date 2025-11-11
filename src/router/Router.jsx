import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login"
import Register from "../pages/Register"
import ListDetails from "../pages/ListDetails";
import PetsAndSupplies from "../pages/PetsAndSupplies";
import AddListing from "../pages/AddListing"
import MyOrder from "../pages/MyOrder"
import MyListing from "../pages/MyListing"
import CategoryFilteredProduct from "../pages/CategoryFilteredProduct";
import PrivateRouter from "./PrivateRouter";
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
         path:"/category-filtered-product/:categoryName",
        element:<CategoryFilteredProduct/>,
      },
      
      {
        path: "/product-details/:id",
        
        element:<PrivateRouter><ListDetails/></PrivateRouter> ,
      },
       
      {
        path: "/products",
          loader: () => fetch('http://localhost:3000/listing'),
        element:<PrivateRouter><PetsAndSupplies /></PrivateRouter> ,
      },
      
      {
        path: "/add-listing",
         
        element:<PrivateRouter><AddListing/></PrivateRouter> ,
      },
      {
        path: "/my-orders",
         
        element:<PrivateRouter><MyOrder/></PrivateRouter> ,
      },
      
      {
        path: "/my-listing",
         
        element: <PrivateRouter><MyListing/></PrivateRouter>,
      },
      
      
     
      
      

      

       

        
      
    ],
  },
]);