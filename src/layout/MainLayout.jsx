import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";




const MainLayout = () => {
  return (
    <div className="">
     
        <NavBar />
       
         <main className="min-h-screen">
    <Outlet />
  </main>
        
        <Footer/>
     

     
    </div>
  );
};

export default MainLayout;