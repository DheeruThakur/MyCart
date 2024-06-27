import { useState } from "react";
import { HiPencil } from "react-icons/hi2";
import EditProductCard from "./EditProductCard";

const AdminProductCard = ({products , fetchAllProducts}) => {

    const [showEditCard , setShowEditCard] = useState(false);
    const [productData , setProductData] = useState({});

    const handleEditProduct = (product) => {
        setShowEditCard(true);
        setProductData(product);
    }

    return (
        <div className="flex items-center gap-2 p-2">
            {
                products.map((product , idx) => {
                    return (
                        <div className="bg-white h-40 w-40 rounded-lg">
                            <img src={product.productImage[0]} alt="product-img" className="rounded"/>
                            <p className="font-semibold text-center pt-2">{product.productName}</p>
                            <div className="h-8 w-8 border border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center rounded-full ml-[120px] mb-10" onClick={() => handleEditProduct(product)}>
                                <HiPencil />
                            </div> 
                        </div>
                    )
                    
                })
            }
            {
                showEditCard && <EditProductCard productData={productData} setProductData={setProductData} setShowEditCard={setShowEditCard} fetchAllProducts={fetchAllProducts}/>
            }
        </div>
    )
}

export default AdminProductCard