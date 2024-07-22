
import { FaRegUser } from "react-icons/fa6";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo.svg"
import { useDispatch, useSelector } from "react-redux";
import {clearUserDetails} from "../utils/slice/userSlice"
import { useState } from "react";
import Roles from "../utils/role";

const Header = () => {

    const navigate = useNavigate();

    const [showPanel , setShowPanel] = useState(false);

    const user = useSelector(state => state.userDetails.user);
    const cartItemsCount = useSelector(state => state.cartDetails.cartItemsCount);
    const dispatch = useDispatch();

    const handleLogout = () => {
        try {
            localStorage.removeItem("token");
            dispatch(clearUserDetails());
            navigate("/");
        } catch (error) {
            console.log("Error" , error);
        }
    }

    const handleShowPanel = () => {
        try {
            if(user != null){
                setShowPanel(prev => !prev)
            }
        } catch (error) {
            console.log("Error" , error);
        }
    }


    return (
        <div className="h-20 flex justify-between bg-pink-50 shadow-md fixed w-full z-40">
            <Link to="/"><img className="h-[82px] w-[150px] ml-2 py-2 px-2 rounded-xl" src={logo} alt="Logo" /></Link>
            <div className="py-5 ml-32"> 
                <input className="mr-1 border-2 border-solid border-gray-300 px-10 py-1 rounded-md text-sm outline-none" type="text" placeholder="Search for products"/>
                <button className="text-green-500 border-2 border-solid border-green-500 rounded-md px-2 py-[2px]">Search</button>
            </div>
            <div className="flex mr-10">
                <div className="relative flex justify-center">
                    {
                        (user != null)
                            && 
                        <div className="mt-7 px-5">
                            <FaRegUser className="h-6 w-6" onClick={handleShowPanel}/>
                        </div>
                    }
                    
                    {
                        (showPanel && user?.role == Roles.ADMIN)
                        &&
                        <div className="absolute bottom-0 p-2 py-6 rounded-sm top-16 h-16 bg-pink-50 shadow-lg">
                            <nav className="bg-slate-50 rounded-sm">
                                <Link to="/admin-panel" className="whitespace-nowrap p-3 hover:text-green-500" onClick={() => setShowPanel(prev => !prev)} >Admin Panel</Link>
                            </nav>
                        </div>        
                    }
                </div>
                {
                    (user != null)
                    &&
                    <Link to='/cart' className="mt-7 px-5 relative">
                        <HiMiniShoppingCart className="h-6 w-6"/>
                        <p className="bg-green-500 text-white text-xs h-5 w-5 flex items-center justify-center absolute top-0 right-0 rounded-full transform -translate-x-1/2 -translate-y-1/2">{cartItemsCount}</p>
                    </Link>
                }
                
                <div className="py-5 px-5">
                    {
                        (user != null)
                            ? 
                                <button className="text-green-500 border-2 border-solid border-green-500 rounded-md px-2 py-[2px]" onClick={handleLogout}>Logout</button>
                            :
                                <Link to="/login"><button className="text-green-500 border-2 border-solid border-green-500 rounded-md px-2 py-[2px]">Login</button></Link>
                    } 
                </div>

            </div>
        </div>
    )
}

export default Header