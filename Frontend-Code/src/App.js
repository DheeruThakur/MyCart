import ReactDOM from "react-dom/client"
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./pages/Signup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { endpoints } from "./utils/constants";
import { useEffect } from "react";
import Context from "./context";
import { Provider, useDispatch } from "react-redux";
import store from "./utils/store/store";
import { setUserDetail } from "./utils/slice/userSlice";
import AdminPanel from "./pages/AdminPanel";
import AllUsers from "./pages/AllUsers";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import HomePage from "./pages/Home"


const AppLayout = () => {
    
    const dispatch = useDispatch();

    const fetchUserDetails = async () => {

        const fetchUserDetailsURL = `${endpoints.userDetail.path}`
       
        try {
            const userDetails = await fetch(fetchUserDetailsURL , {
                method : endpoints.userDetail.method,
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                },
            });
        
            const jsonUserDetails = await userDetails.json();

            if(jsonUserDetails.success){
                dispatch(setUserDetail(jsonUserDetails?.data));
            }

        } catch (error) {
            console.log("Error ",error);
        }
    }

    useEffect(() => {
        fetchUserDetails();
    }, [])

    return (
        <>
            <Context.Provider value={{fetchUserDetails}}>
                <ToastContainer />
                <Header />
                <Outlet />
                <Footer />
            </ Context.Provider>
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
                element : <HomePage />, 
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
            {
                path : "/admin-panel",
                element : <AdminPanel />,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers />
                    },
                    {
                        path : "all-products",
                        element : <AllProducts />
                    }
                ]
            },
            {
                path : "/product-category/:categoryName",
                element : <ProductCategory />
            },
            
        ]
    },
    
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store} >
        <RouterProvider router={appRouter} />
    </Provider>    
)