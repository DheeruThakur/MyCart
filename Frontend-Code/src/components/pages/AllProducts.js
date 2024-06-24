import UploadProduct from "./UploadProduct"
import { useState } from "react"

const AllProducts = () => {

    const [showUploadProductModal , setShowUploadProductModal] = useState(false)

    const handleClick = () => {
        setShowUploadProductModal(true);
    }

    return (
        <div>
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
        </div>
        
        
    )
}

export default AllProducts