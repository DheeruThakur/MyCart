import { useState } from 'react';
import Roles from '../utils/role'
import { IoClose } from "react-icons/io5";
import { endpoints } from '../utils/constants';
import { toast } from 'react-toastify';

const EditUser = ({user , setIsEditModalOpen , fetchUsers}) => {

    const [updatedUser , setUpdatedUser] = useState({
        userId : user._id,
        name : "",
        email : "",
        role : user.role,
    })

    const handleChange = (e) => {
        const {name , value} = e.target;
        setUpdatedUser({
            ...updatedUser,
            [name] : value
        });
    }

    const handlechangeUser = async () => {
        console.log("handlechangeUser clicked")
        const updateURL = endpoints.updateUser.path;
        console.log("updateURL" , updateURL)
        try {
            const dataApi = await fetch(updateURL , {
                method : endpoints.updateUser.method,
                headers : {
                    'Content-Type' : "application/json",
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                },
                body : JSON.stringify({user : updatedUser}),
            })
            const jsonData = await dataApi.json();
            
            if(jsonData.success){
                fetchUsers();
                setIsEditModalOpen(false)
                toast.success(`${jsonData.message}`)
            }

        } catch (error) {
            console.log("Error ", error.message )
            toast.error(error.message)
        }
    }
    
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 h-full w-full flex justify-center items-center bg-slate-400 bg-opacity-[0.3]">
            
            <div className="relative max-w-sm bg-white mx-auto shadow-md px-8 rounded-md">
                <div className='absolute top-0 right-0 m-3 hover:bg-red-400 hover:rounded-full'>
                    <IoClose className='h-6 w-6 hover:text-white' onClick={() => setIsEditModalOpen(false)}/>
                </div>
                <h1 className='mt-8 font-semibold ml-16'>Change User Role</h1>
                <p className='mt-6 capitalize'>Name : {user.fullName}</p>
                <p className='my-2'>Email : {user.email}</p>
                <div className='flex mt-4 mb-8'>
                    <p className='mr-36'>Role :</p>
                    <select name='role' className='border rounded-sm px-3 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-green-500' value={updatedUser.role} onChange={handleChange}>
                        {
                            Object.values(Roles).map((role , idx) => {
                                return (
                                    <option key={idx}>{role}</option>
                                )
                            })
                        }
                        
                    </select>
                </div>
                <button className='border-2 border-green-500 rounded-md px-2 py-1 mb-6 mx-16 text-green-500' onClick={handlechangeUser}>Change User</button>
                
            </div>
            
        </div>
    )
}

export default EditUser