import { useState } from "react";
import { HiPencil } from "react-icons/hi2";
import EditProductCard from "./EditProductCard";
import { formatNumberToCurrency } from "../utils/formatNumberToCurrency";

const AdminProductCard = ({products , fetchAllProducts}) => {

    const [showEditCard , setShowEditCard] = useState(false);
    const [productData , setProductData] = useState({});

    const handleEditProduct = (product) => {
        setShowEditCard(true);
        setProductData(product);
    }
    
    return (
        <div className="flex items-center gap-3 px-6 flex-wrap justify-start">
            {
                products.map((product , idx) => {
                    return (
                        <div className="bg-white h-[320px] w-56 rounded-lg">
                            <div className="h-[220px] w-full">
                                <img src={product.productImage[0]} alt="product-img" className="h-full w-full object-contain p-2"/>
                            </div>
                            <h1 className="px-6 pt-2 text-ellipsis overflow-hidden text-wrap">{product.productName}</h1>
                            <div className="">
                                <div className="pl-6 font-semibold">
                                    {
                                        formatNumberToCurrency(product.sellingPrice)
                                    }
                                </div>
                                <div className="h-8 w-8 border border-green-500 hover:bg-green-500 hover:text-white flex items-center justify-center rounded-full mx-[170px] bottom-2" onClick={() => handleEditProduct(product)}>
                                    <HiPencil />
                                </div> 
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