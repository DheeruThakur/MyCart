
import { FaRegUser } from "react-icons/fa6";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { Link } from "react-router-dom";
import logo from "../assets/logo/logo.svg"

const Header = () => {
    return (
        <div className="h-20 flex justify-between bg-pink-50 shadow-md">
            <Link to="/"><img className="h-[82px] w-[150px] ml-2 py-2 px-2 rounded-xl" src={logo} alt="Logo" /></Link>
            <div className="py-5 ml-32"> 
                <input className="mr-1 border-2 border-solid border-gray-300 px-10 py-1 rounded-md text-sm outline-none" type="text" placeholder="Search for products"/>
                <button className="text-green-500 border-2 border-solid border-green-500 rounded-md px-2 py-[2px]">Search</button>
            </div>
            <div className="flex mr-10">

                <div className="mt-7 px-5">
                    <FaRegUser className="h-6 w-6"/>
                </div>
                <div className="mt-7 px-5 relative">
                    <HiMiniShoppingCart className="h-6 w-6"/>
                    <p className="bg-green-500 text-white text-xs h-5 w-5 flex items-center justify-center absolute top-0 right-0 rounded-full transform -translate-x-1/2 -translate-y-1/2">0</p>
                </div>
                <div className="py-5 px-5">
                    <Link to="/login"><button className="text-green-500 border-2 border-solid border-green-500 rounded-md px-2 py-[2px]">Login</button></Link>
                </div>

            </div>
        </div>
    )
}

export default Header