import ReactDOM from "react-dom/client"
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import ForgotPassword from "./components/pages/ForgotPassword";
import Signup from "./components/pages/Signup";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AppLayout = () => {
    return (
        <>
            <ToastContainer />
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

const appRouter = createBrowserRouter([
    {
        path : '/',
        element : <AppLayout />, 
        children : [
            {
                path : '/',
                element : <Home />, 
            },
            {
                path : "/signup",
                element : <Signup />
            },
            {
                path : "/login",
                element : <Login />
            },
            {
                path : "/forgot-password",
                element : <ForgotPassword />
            },
            
        ]
    },
    
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />)