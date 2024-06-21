import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoPencil } from "react-icons/io5";
import { useEffect , useState } from "react";
import { endpoints } from "../../utils/constants";
import { toast } from "react-toastify";
import Moment from "react-moment"
import { FaUsersLine } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import EditUser from "./EditUser";


const AdminPanel = () => {
    const user = useSelector(state => state.userDetails.user);
    const [users , setUsers] = useState([]);
    const [isEditModalOpen , setIsEditModalOpen] = useState(false)
    const [selectedUser , setSelectedUser] = useState({});

    const fetchUsers = async () => {
        const fetchAllUsersURL = endpoints.fetchAllUsers.path;
        try {
            const dataApi = await fetch(fetchAllUsersURL , {
                method : endpoints.fetchAllUsers.method,
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                },
            });
    
            const jsonData = await dataApi.json();

            if(jsonData.success){
                setUsers(jsonData.data)
            }
        } catch (error) {
            console.log("Error ", error.message )
            toast.error(error.message)
        }
    }

    const handleUserEdit = (user) => {
        console.log("UseR",user)
       setIsEditModalOpen(true)
       setSelectedUser(user)
       
    }

    useEffect(() => {
         fetchUsers();
    }, [])

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
                    <nav className="flex flex-col items-center h-full">
                        <div className="h-12 w-full p-2 my-1 flex ">
                            <FaUsersLine className="h-7 w-7 ml-4 mr-4 text-white"/>
                            <Link className="py-1 px-3 text-white hover:text-green-500">All Users</Link>
                        </div>

                        <div className="h-12 w-full p-2 mt-1 flex ">
                            <AiFillProduct className="h-7 w-7 ml-4 mr-4 text-white"/>
                            <Link className="py-1 px-3 text-white hover:text-green-500">All Products</Link>
                        </div>
                    </nav>
                </div>
            </aside>

            <main className="bg-gray-200 h-[687px] w-full ">
                <div className="container mx-auto p-4">
                        <table className="w-full bg-white shadow-md rounded-lg">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    <th className="w-[10%] py-3 uppercase font-semibold text-sm rounded-tl-lg">Sr.</th>
                                    <th className="w-[20%] py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                    <th className="w-[25%] py-3 px-4 uppercase font-semibold text-sm">Email</th>
                                    <th className="w-[15%] py-3 px-4 uppercase font-semibold text-sm">Role</th>
                                    <th className="w-[20%] py-3 px-4 uppercase font-semibold text-sm">Created Date</th>
                                    <th className="w-[15%] py-3 px-4 uppercase font-semibold text-sm rounded-tr-lg">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {
                                    users.map((user , idx) => {
                                        return (
                                            <tr key={user._id}>
                                                <td className="w-[10%] py-3 px-14 text-center">{idx + 1}</td>
                                                <td className="w-[10%] py-3 px-14 text-center">{user.fullName}</td>
                                                <td className="w-[20%] py-3 px-14 text-center">{user.email}</td>
                                                <td className="w-[25%] py-3 px-4 text-center">{user.role}</td>
                                                <td className="w-[15%] py-3 px-4 text-center">
                                                    <Moment format="D MMM YYYY">{user.createdAt}</Moment>
                                                </td>
                                                <td className="w-[15%] py-3 px-14">
                                                    <button 
                                                        className="bg-green-100 h-10 w-10 flex items-center justify-center cursor-pointer rounded-full hover:bg-green-500" 
                                                        onClick={() => handleUserEdit(user)}
                                                    >
                                                        <IoPencil />
                                                    </button>
                                                </td>
                                            </tr>  
                                        )
                                    })
                                }
                                
                            </tbody>
                        </table>
                        {
                            isEditModalOpen && <EditUser user={selectedUser} setIsEditModalOpen={setIsEditModalOpen} fetchUsers={fetchUsers} />
                        }
                </div>
            </main>
        </div>
    )
}

export default AdminPanel