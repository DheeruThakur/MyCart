import { useState } from "react";
import { IoPencil } from "react-icons/io5";
import { useEffect , useState } from "react";
import { endpoints } from "../utils/constants";
import { toast } from "react-toastify";
import Moment from "react-moment"
import EditUser from "./EditUser";


const AllUsers = () => {

    const [users , setUsers] = useState([]);
    const [isEditModalOpen , setIsEditModalOpen] = useState(false)
    const [selectedUser , setSelectedUser] = useState({});

    const handleUserEdit = (user) => {
        console.log("UseR",user)
       setIsEditModalOpen(true)
       setSelectedUser(user)
       
    }

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

    

    useEffect(() => {
         fetchUsers();
    }, [])

    return (
        <div className="container mx-auto p-4 overflow-y-auto h-full">
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
                                            className="bg-green-100 h-10 w-10 flex items-center justify-center cursor-pointer rounded-full hover:bg-green-500 hover:text-white" 
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
    )
}

export default AllUsers;