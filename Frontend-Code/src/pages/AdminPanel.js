import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { AiFillProduct } from "react-icons/ai";
import { TbUsers } from "react-icons/tb";


const AdminPanel = () => {
    const user = useSelector(state => state.userDetails.user);

    return (
        <div className="h-[687px] w-full flex">
            <aside className="h-full w-1/5 shadow-xl bg-gray-900">
                <div className="flex pt-6">
                    <div className="h-14 w-14 rounded-full border-2 border-green-500 flex items-center justify-center m-3 ml-4">
                        <FaRegCircleUser className="h-[58px] w-[58px] text-gray-100"/>
                    </div>
                    
                    <div className="mt-2 ">
                        <p className="capitalize font-semibold text-md px-2 pt-1 mb-3 text-gray-100">{user?.fullName}</p>
                        <p className="capitalize text-sm px-2 text-gray-500">{user?.role}</p>
                    </div>
                </div>
                <div class="border-b border-gray-700 my-4 px-8 mx-4"></div>
                <div className="h-[487px]">
                    <p className="text-gray-500 mt-8 mb-4 ml-6">Menu</p>
                    <nav className="flex flex-col items-center h-full">
                        <div className="h-12 w-full p-2 my-1 flex ">
                            <TbUsers  className="h-7 w-7 ml-4 mr-4 text-white"/>
                            <Link to="all-users" className="py-1 px-3 text-white hover:text-green-500">All Users</Link>
                        </div>

                        <div className="h-12 w-full p-2 mt-1 flex ">
                            <AiFillProduct className="h-7 w-7 ml-4 mr-4 text-white"/>
                            <Link to="all-products" className="py-1 px-3 text-white hover:text-green-500">All Products</Link>
                        </div>
                    </nav>
                </div>
            </aside>

            <main className="bg-gray-200 h-[687px] w-full ">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminPanel