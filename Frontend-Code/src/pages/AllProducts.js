import { toast } from "react-toastify"
import { endpoints } from "../utils/constants"
import UploadProduct from "./UploadProduct"
import { useEffect, useState } from "react"
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {

    const [showUploadProductModal , setShowUploadProductModal] = useState(false)
    const [allProducts , setAllProducts] = useState([]);

    const handleClick = () => {
        setShowUploadProductModal(true);
    }

    const fetchAllProducts = async () => {
        const fetchURL = endpoints.fetchAllProducts.path;
        try {

            const result = await fetch(fetchURL , {
                method : endpoints.fetchAllProducts.method
            })

            const jsonData = await result.json();

            if(jsonData.success){
                setAllProducts(jsonData.data);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchAllProducts();
    }, [])


    return (
        <div className="overflow-y-auto h-full w-full">
            <div className="bg-slate-100 flex justify-between m-2 p-4">
                <div className="ml-2 flex items-center">
                    <p className="font-bold text-lg">All Products</p>
                </div>
                <div className="mr-2">
                    <button className="border-2 border-green-500 px-2 py-1 rounded-md text-green-500" onClick={handleClick}>
                        Upload Product
                    </button>
                </div>
            </div>
            {
                showUploadProductModal && <UploadProduct setShowUploadProductModal={setShowUploadProductModal} />
            }
            <AdminProductCard products={allProducts} fetchAllProducts={fetchAllProducts}/>
        </div>
        

        
        
    )
}

export default AllProducts