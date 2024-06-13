import ReactDOM from "react-dom/client"
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import ForgotPassword from "./components/pages/ForgotPassword";
import Signup from "./components/pages/Signup";


const AppLayout = () => {
    return (
        <>
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
            
        ]
    },
    {
        path : "/login",
        element : <Login />
    },
    {
        path : "/forgot-password",
        element : <ForgotPassword />
    },
    {
        path : "/signup",
        element : <Signup />
    }
    
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>)