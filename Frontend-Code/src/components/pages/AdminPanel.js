import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const AdminPanel = () => {
    const user = useSelector(state => state.userDetails.user)
    return (
        <div className="h-[687px] w-full flex ">
            <aside className="h-full w-1/5 shadow-right-side">
                <div className="bg-slate-100 top-0 h-[200px] flex flex-col justify-center items-center shadow-bottom-only relative rounded-md">
                    <FaRegCircleUser className="h-16 w-16 "/>
                    <p className="capitalize font-semibold text-lg px-2 py-1">{user?.fullName}</p>
                    <p className="capitalize text-lg">{user?.role}</p>
                </div>
                <div className="h-[487px] bg-pink-50">
                    <nav className="flex flex-col items-center h-full">
                        <Link className="p-2 mt-10 hover:text-green-500">All Users</Link>
                        <Link className="p-2 m-2 hover:text-green-500">All Products</Link>
                    </nav>
                </div>
            </aside>

            <main>
                <h1>Main</h1>
            </main>
        </div>
    )
}

export default AdminPanel