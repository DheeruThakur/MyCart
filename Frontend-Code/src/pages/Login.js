import { Link, useNavigate } from "react-router-dom"
import { TbEyeglass2 } from "react-icons/tb";
import { TbEyeglassOff } from "react-icons/tb";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { endpoints } from "../utils/constants";
import UserContext from "../context/index"
import useFetchCartItems from "../utils/useFetchCartItems";


const Login = () => {

    const [showPassword , setShowPassword] = useState(false)
    const [formData , setFormData] = useState({
        email : "",
        password : "",
    })

    const {fetchCartItems} = useFetchCartItems();

    const navigate = useNavigate();
    const userContext = useContext(UserContext)

    const handleChange = (e) => {
        const {name , value} = e.target;
        setFormData(prevFormDate => {
            return {
                ...prevFormDate,
                [name] : value,
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const URL = `${endpoints.login.path}`;
        try {
            const responseData = await fetch(URL , {
                method : `${endpoints.login.method}`,
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    email : formData.email,
                    password : formData.password,
                })
            });
    
            const jsonData = await responseData.json();
            if(jsonData.success){
                localStorage.setItem('token' , jsonData?.data?.token);
                toast.success("User login successfully");
                userContext.fetchUserDetails();
                fetchCartItems();
                navigate("/");
            }
            else {
                toast.error(`${jsonData.message}`);
            }
        } catch (error) {
            console.log("Error" ,error);
            toast.error("User login failed");
        }
    }

    return (
       
        <section className="min-h-screen flex justify-center">
            <div className="flex flex-col items-center justify-center px-6 py-8 mt-10 mx-auto h-[500px] w-1/3">
                <div className="w-full bg-pink-50 rounded-lg shadow h-full">
                    <div className="p-6 h-full">
                        <h1 className="text-xl font-bold text-green-500 flex justify-center my-6">
                            Sign in to your account
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col my-2">
                                <label className="mb-2 text-sm font-medium text-black">Your email</label>
                                <input type="email" name="email" value={formData.email} className="border border-gray-300 text-sm rounded-lg px-4 py-[6px] outline-none" placeholder="enter email" required onChange={handleChange} />
                            </div>
                            <div className="flex flex-col my-2">
                                <label className="mb-2 text-sm font-medium text-black">Password</label>
                                <div className="flex items-center relative">
                                    <input type={ showPassword ? "text" : "password"} name="password" value={formData.password} placeholder="enter password" className="w-full border border-gray-300 text-sm rounded-lg px-4 py-[6px] outline-none" required onChange={handleChange} />
                                    {
                                        showPassword ? 
                                                    <TbEyeglassOff className="h-[16px] w-[18px] absolute right-4" onClick={() => setShowPassword(prev => !prev)}/> 
                                                    : 
                                                    <TbEyeglass2 className="h-[16px] w-[18px] absolute right-4" onClick={() => setShowPassword(prev => !prev)}/>
                                    }
                                    
                                </div>
                                
                            </div>
                            <div className="flex justify-center">
                                <button className="border border-green-500 text-green-500 font-medium rounded-lg text-sm px-7 py-1 my-5 text-center bg-white transform hover:scale-105 transition duration-100 hover:bg-green-500 hover:text-white">Sign in</button>
                            </div>
                            <div className="flex items-center justify-end mb-2">
                                <p className="text-sm font-medium text-primary-600 hover:underline hover:text-green-500"><Link to="/forgot-password">Forgot password?</Link></p>
                            </div>
                            
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link to="/signup" className="font-medium hover:underline hover:text-green-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        
    )
}

export default Login