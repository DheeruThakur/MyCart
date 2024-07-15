import { Link, useNavigate } from "react-router-dom"
import { TbEyeglass2 } from "react-icons/tb";
import { TbEyeglassOff } from "react-icons/tb";
import { useEffect, useState } from "react";
import { endpoints } from "../utils/constants";
import {toast} from 'react-toastify'


const Signup = () => {

    const [showPassword , setShowPassword] = useState(false)
    const [showConfirmPassword , setShowConfirmPassword] = useState(false)
    const [formData , setFormData] = useState({
        fullName : "",
        email : "",
        password : "",
        confirmPassword : "",
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name , value} = e.target;
        setFormData(prev => {
            return {
                ...prev,
                [name] : value,
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(formData.password !== formData.confirmPassword){
            toast.error("password and confirm-password must be same");
            return;
        }
        const URL = `${endpoints.signup.path}`;
        
        try {
            const responseData = await fetch(URL , {
                method : `${endpoints.signup.method}`,
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    fullName : formData.fullName,
                    email : formData.email, 
                    password : formData.password
                })
            })
            const jsonData = await responseData?.json();
            if(jsonData.success){
                toast.success("User signup successfully");
                navigate("/login");
            }
            else {
                toast.error(`${jsonData.message}`);
            }
        } catch (error) {
            console.log("Error" , error);
            toast.error("Failed to register user");
        }
        
    }

    return (
       
        <section className="min-h-screen flex justify-center">
            <div className="flex flex-col items-center justify-center px-6 py-8 mt-10 mx-auto h-[580px] w-1/3">
                <div className="w-full bg-pink-50 rounded-lg shadow h-full">
                    <div className="p-6 h-full">
                        <h1 className="text-xl font-bold text-green-500 flex justify-center my-6">
                            Create Account
                        </h1>
                        <form onSubmit={handleSubmit}>
                        <div className="flex flex-col my-2">
                                <label className="mb-2 text-sm font-medium text-black">Full Name</label>
                                <input type="text" name="fullName" value={formData.fullName}  className="border border-gray-300 text-sm rounded-lg px-4 py-[6px] outline-none" placeholder="enter full name" required onChange={handleChange}/>
                            </div>
                            <div className="flex flex-col my-2">
                                <label className="mb-2 text-sm font-medium text-black">Email</label>
                                <input type="email" name="email" value={formData.email}  className="border border-gray-300 text-sm rounded-lg px-4 py-[6px] outline-none" placeholder="enter email" required onChange={handleChange}/>
                            </div>
                            <div className="flex flex-col my-2">
                                <label className="mb-2 text-sm font-medium text-black">Password</label>
                                <div className="flex items-center relative">
                                    <input type={ showPassword ? "text" : "password"} name="password" value={formData.password} placeholder="enter password" className="w-full border border-gray-300 text-sm rounded-lg px-4 py-[6px] outline-none" required onChange={handleChange}/>
                                    {
                                        showPassword ? 
                                                    <TbEyeglassOff className="h-[16px] w-[18px] absolute right-4" onClick={() => setShowPassword(prev => !prev)}/> 
                                                    : 
                                                    <TbEyeglass2 className="h-[16px] w-[18px] absolute right-4" onClick={() => setShowPassword(prev => !prev)}/>
                                    }
                                    
                                </div>
                            </div>
                            <div className="flex flex-col my-2">
                                <label className="mb-2 text-sm font-medium text-black">Confirm Password</label>
                                <div className="flex items-center relative">
                                    <input type={ showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} placeholder="enter confirm password" className="w-full border border-gray-300 text-sm rounded-lg px-4 py-[6px] outline-none" required onChange={handleChange}/>
                                    {
                                        showConfirmPassword ? 
                                                    <TbEyeglassOff className="h-[16px] w-[18px] absolute right-4" onClick={() => setShowConfirmPassword(prev => !prev)}/> 
                                                    : 
                                                    <TbEyeglass2 className="h-[16px] w-[18px] absolute right-4" onClick={() => setShowConfirmPassword(prev => !prev)}/>
                                    }
                                    
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button className="border border-green-500 text-green-500 font-medium rounded-lg text-sm px-7 py-1 my-5 text-center bg-white transform hover:scale-105 transition duration-100 hover:bg-green-500 hover:text-white">Sign up</button>
                            </div>
                            
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account ? <Link to="/login" className="font-medium hover:underline hover:text-green-500">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        
    )
}

export default Signup