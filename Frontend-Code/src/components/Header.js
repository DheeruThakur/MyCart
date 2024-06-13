
import { FaRegUser } from "react-icons/fa6";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="h-20 flex justify-between bg-pink-50 shadow-md">
            <Link to="/"><img className="h-20 w-20 py-2 px-2 rounded-xl" src="https://scontent.fdel76-1.fna.fbcdn.net/v/t39.30808-6/348294232_1405811396818641_6842587255405740661_n.png?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rPCj2oZ-nLcQ7kNvgG-ZWZk&_nc_ht=scontent.fdel76-1.fna&oh=00_AYCKPVbe8hkYYfdr1cgiPaxnelO3h3MVv4zbILPsZ1w20g&oe=666A2C1B" alt="Logo" /></Link>
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